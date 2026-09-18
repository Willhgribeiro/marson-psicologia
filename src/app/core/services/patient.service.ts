import { Injectable, signal, computed, OnDestroy } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy, getDoc, setDoc } from '@angular/fire/firestore';
import { PatientRecord, Answer, PatientInvite, PatientFull } from '../models/models';

@Injectable({ providedIn: 'root' })
export class PatientService implements OnDestroy {
  private _patients = signal<PatientRecord[]>([]);
  private _invites = signal<PatientInvite[]>([]);

  private patientsUnsubscribe: (() => void) | null = null;
  private invitesUnsubscribe: (() => void) | null = null;

  readonly patients = this._patients.asReadonly();
  readonly fullPatients = this._invites.asReadonly();
  readonly invites = this._invites.asReadonly();
  readonly count = computed(() => this._patients().length);

  constructor(private firestore: Firestore) {
    this.initRealtimeListeners();
  }

  private initRealtimeListeners(): void {
    const patientsRef = collection(this.firestore, 'patients');
    const patientsQuery = query(patientsRef, orderBy('createdAt', 'desc'));

    this.patientsUnsubscribe = onSnapshot(patientsQuery, (snapshot) => {
      const patients = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PatientRecord[];
      this._patients.set(patients);
    });
  }

  async loadPendingPatients(): Promise<void> {
    const invitesRef = collection(this.firestore, 'invites');
    const invitesQuery = query(invitesRef, orderBy('createdAt', 'desc'));

    this.invitesUnsubscribe = onSnapshot(invitesQuery, (snapshot) => {
      const invites = snapshot.docs.map(doc => {
        const data: any = doc.data();
        return {
          code: doc.id,
          ...data,
          patientName: data.patientName || data.name || 'Paciente'
        };
      }) as PatientInvite[];
      this._invites.set(invites);
    });
  }

  getById(id: string): PatientRecord | undefined {
    return this._patients().find(p => p.id === id);
  }

  async addRecord(name: string, answers: Answer[], fullData: Partial<PatientRecord> = {}): Promise<PatientRecord> {
    const patientsRef = collection(this.firestore, 'patients');
    const now = new Date();

    const record: any = {
      name,
      date: now.toLocaleDateString('pt-BR'),
      time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      answers,
      createdAt: now.toISOString(),
      ...fullData
    };

    const docRef = await addDoc(patientsRef, record);
    return { id: docRef.id, ...record };
  }

  async deleteRecord(id: string): Promise<void> {
    const docRef = doc(this.firestore, 'patients', id);
    await deleteDoc(docRef);
  }

  async createPatientFull(data: Omit<PatientFull, 'code' | 'createdAt' | 'used'>): Promise<string> {
    const code = this.generateUniqueCode();
    const inviteRef = doc(this.firestore, 'invites', code);

    await setDoc(inviteRef, {
      ...data,
      code,
      createdAt: new Date().toISOString(),
      used: false
    });

    return code;
  }

  private generateUniqueCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    do {
      code = '';
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    } while (this._invites().some(inv => inv.code === code));
    return code;
  }

  async validateCode(code: string): Promise<PatientInvite | undefined> {
    const normalizedCode = code.toUpperCase();
    const inviteRef = doc(this.firestore, 'invites', normalizedCode);
    const snapshot = await getDoc(inviteRef);
    if (!snapshot.exists()) return undefined;

    const invite = { code: snapshot.id, ...snapshot.data() } as PatientInvite;
    return invite.used ? undefined : invite;
  }

async validateFullCode(
    code: string
  ): Promise<PatientFull | undefined> {
    const normalizedCode = code.toUpperCase();

    const inviteRef = doc(
      this.firestore,
      'invites',
      normalizedCode
    );

    const snapshot = await getDoc(inviteRef);

    if (!snapshot.exists()) {
      return undefined;
    }

    const invite = {
      code: snapshot.id,
      ...snapshot.data()
    } as any;

    if (invite.used) {
      return undefined;
    }

    // Retorno mapeado para a interface PatientFull
    return {
      code: invite.code,
      name: invite.patientName || invite.name || '',
      education: invite.education || '',
      birthDate: invite.birthDate || '',
      isMinor: !!invite.isMinor, // Converte para booleano (garante que não seja undefined)
      address: invite.address || '',
      motherName: invite.motherName || '',
      fatherName: invite.fatherName || '',
      guardianName: invite.guardianName || '',
      doctorName: invite.doctorName || '',
      doctorCrm: invite.doctorCrm || '',
      doctorSpecialty: invite.doctorSpecialty || '',
      diagnosticHypothesis: invite.diagnosticHypothesis || '',
      reason: invite.reason || '',
      createdAt: invite.createdAt,
      used: invite.used,
      usedAt: invite.usedAt
    };
  }

async getFullPatientByCode(
    code: string
  ): Promise<PatientFull | undefined> {
    const normalizedCode = code.toUpperCase();

    const inviteRef = doc(
      this.firestore,
      'invites',
      normalizedCode
    );

    const snapshot = await getDoc(inviteRef);

    if (!snapshot.exists()) {
      return undefined;
    }

    const invite = {
      code: snapshot.id,
      ...snapshot.data()
    } as any;

    return {
      code: invite.code,
      name: invite.patientName || invite.name || '',
      education: invite.education || '',
      birthDate: invite.birthDate || '',
      isMinor: !!invite.isMinor, // Adicionado para resolver o erro
      address: invite.address || '',
      motherName: invite.motherName || '',
      fatherName: invite.fatherName || '',
      guardianName: invite.guardianName || '',
      doctorName: invite.doctorName || '',
      doctorCrm: invite.doctorCrm || '',
      doctorSpecialty: invite.doctorSpecialty || '',
      diagnosticHypothesis: invite.diagnosticHypothesis || '',
      reason: invite.reason || '',
      createdAt: invite.createdAt,
      used: invite.used,
      usedAt: invite.usedAt
    };
  }
  
  async markFullCodeAsUsed(code: string): Promise<void> {
    const normalizedCode = code.toUpperCase();
    const inviteRef = doc(this.firestore, 'invites', normalizedCode);
    await updateDoc(inviteRef, { used: true, usedAt: new Date().toISOString() });
  }

  async deleteFullPatient(code: string): Promise<void> {
    await this.deleteInvite(code);
  }

  async deleteInvite(code: string): Promise<void> {
    const normalizedCode = code.toUpperCase();
    const inviteRef = doc(this.firestore, 'invites', normalizedCode);
    await deleteDoc(inviteRef);
  }

  generateInviteCode(patientName: string): string {
    return this.generateUniqueCode();
  }

  markCodeAsUsed(code: string): void {
    this.markFullCodeAsUsed(code);
  }

  ngOnDestroy(): void {
    if (this.patientsUnsubscribe) this.patientsUnsubscribe();
    if (this.invitesUnsubscribe) this.invitesUnsubscribe();
  }
}