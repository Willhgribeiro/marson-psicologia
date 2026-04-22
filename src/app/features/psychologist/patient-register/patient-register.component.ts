import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../../core/services/patient.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-patient-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.scss']
})
export class PatientRegisterComponent {
  // Pre-filled from previous screen
  patientName = signal('');

  // Full registration form
  rg = signal('');
  cpf = signal('');
  address = signal('');
  motherName = signal('');
  fatherName = signal('');
  reason = signal('');
  generatedCode = signal<string | null>(null);

  constructor(
    private patientService: PatientService,
    private toastService: ToastService,
    public router: Router
  ) {
    // Get name from navigation state
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { name?: string };
    if (state?.name) {
      this.patientName.set(state.name);
    }
  }

  async createPatient(): Promise<void> {
    if (!this.patientName().trim()) {
      this.toastService.show('Nome do paciente é obrigatório.', 'error');
      return;
    }
    if (!this.reason().trim()) {
      this.toastService.show('Informe o motivo do atendimento.', 'error');
      return;
    }

    const code = await this.patientService.createPatientFull({
      name: this.patientName().trim(),
      rg: this.rg().trim(),
      cpf: this.cpf().trim(),
      address: this.address().trim(),
      motherName: this.motherName().trim(),
      fatherName: this.fatherName().trim(),
      reason: this.reason().trim()
    });

    this.generatedCode.set(code);
    this.toastService.show('Paciente cadastrado!', 'success');
  }

  copyCode(code: string): void {
    navigator.clipboard.writeText(code);
    this.toastService.show('Código copiado!');
  }

  goBack(): void {
    this.router.navigate(['/psych']);
  }

  goToPatients(): void {
    this.router.navigate(['/psych']);
  }
}