import { Injectable, signal, computed } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy, where, getDocs } from '@angular/fire/firestore';
import { PatientRecord, Answer, PatientInvite, PatientFull } from '../models/models';

@Injectable({ providedIn: 'root' })
export class PatientService {
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
    // Listen to patients collection
    const patientsRef = collection(this.firestore, 'patients');
    const patientsQuery = query(patientsRef, orderBy('createdAt', 'desc'));
    
    this.patientsUnsubscribe = onSnapshot(patientsQuery, (snapshot) => {
      const patients = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PatientRecord[];
      this._patients.set(patients);
    });

    // Listen to invites collection
    const invitesRef = collection(this.firestore, 'invites');
    const invitesQuery = query(invitesRef, orderBy('createdAt', 'desc'));
    
    this.invitesUnsubscribe = onSnapshot(invitesQuery, (snapshot) => {
      const invites = snapshot.docs.map(doc => ({
        code: doc.id,
        ...doc.data()
      })) as PatientInvite[];
      this._invites.set(invites);
    });
  }

  // ── Patient Records (answers) ──
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

  // ── Full Patient Registration ──
  async createPatientFull(data: Omit<PatientFull, 'code' | 'createdAt' | 'used'>): Promise<string> {
    const code = this.generateUniqueCode();
    const invitesRef = collection(this.firestore, 'invites');
    
    await addDoc(invitesRef, {
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

  validateCode(code: string): PatientInvite | undefined {
    return this._invites().find(inv => inv.code === code.toUpperCase() && !inv.used);
  }

  validateFullCode(code: string): PatientFull | undefined {
    const invite = this._invites().find(inv => inv.code === code.toUpperCase() && !inv.used);
    if (invite) {
      return {
        code: invite.code,
        name: invite.patientName,
        rg: invite.rg || '',
        cpf: invite.cpf || '',
        address: invite.address || '',
        motherName: invite.motherName || '',
        fatherName: invite.fatherName || '',
        reason: invite.reason || '',
        createdAt: invite.createdAt,
        used: invite.used,
        usedAt: invite.usedAt
      };
    }
    return undefined;
  }

  getFullPatientByCode(code: string): PatientFull | undefined {
    const invite = this._invites().find(inv => inv.code === code.toUpperCase());
    if (invite) {
      return {
        code: invite.code,
        name: invite.patientName,
        rg: invite.rg || '',
        cpf: invite.cpf || '',
        address: invite.address || '',
        motherName: invite.motherName || '',
        fatherName: invite.fatherName || '',
        reason: invite.reason || '',
        createdAt: invite.createdAt,
        used: invite.used,
        usedAt: invite.usedAt
      };
    }
    return undefined;
  }

  async markFullCodeAsUsed(code: string): Promise<void> {
    const invitesRef = collection(this.firestore, 'invites');
    const q = query(invitesRef, where('code', '==', code));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const docRef = doc(this.firestore, 'invites', snapshot.docs[0].id);
      await updateDoc(docRef, {
        used: true,
        usedAt: new Date().toISOString()
      });
    }
  }

  async deleteFullPatient(code: string): Promise<void> {
    await this.deleteInvite(code);
  }

  async deleteInvite(code: string): Promise<void> {
    const invitesRef = collection(this.firestore, 'invites');
    const q = query(invitesRef, where('code', '==', code));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const docRef = doc(this.firestore, 'invites', snapshot.docs[0].id);
      await deleteDoc(docRef);
    }
  }

  // Legacy methods for compatibility
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
