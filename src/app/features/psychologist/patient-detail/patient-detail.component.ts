import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../../core/services/patient.service';
import { PdfService } from '../../../core/services/pdf.service';
import { ToastService } from '../../../core/services/toast.service';
import { PatientRecord } from '../../../core/models/models';

@Component({
  selector: 'app-patient-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {
  patient = signal<PatientRecord | null>(null);
  exporting = signal(false);

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private patientService: PatientService,
    private pdfService: PdfService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    const p = this.patientService.getById(id);
    if (!p) { this.router.navigate(['/psych/panel']); return; }
    this.patient.set(p);
  }

  isArray(val: unknown): val is string[] {
    return Array.isArray(val);
  }

  hasAnswer(answer: string | string[]): boolean {
    if (Array.isArray(answer)) return answer.length > 0;
    return !!answer;
  }

  async exportPdf(): Promise<void> {
    const p = this.patient();
    if (!p) return;
    this.exporting.set(true);
    try {
      await this.pdfService.export(p);
      this.toastService.show('PDF gerado com sucesso!', 'success');
    } catch {
      this.toastService.show('Erro ao gerar PDF.', 'error');
    } finally {
      this.exporting.set(false);
    }
  }

  async deletePatient(): Promise<void> {
    const p = this.patient();
    if (!p) return;
    if (!confirm('Excluir este registro de paciente?')) return;
    await this.patientService.deleteRecord(p.id);
    this.toastService.show('Registro excluído.');
    this.router.navigate(['/psych/panel']);
  }
}
