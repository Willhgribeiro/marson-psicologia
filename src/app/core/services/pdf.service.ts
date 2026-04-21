import { Injectable } from '@angular/core';
import { PatientRecord } from '../models/models';

@Injectable({ providedIn: 'root' })
export class PdfService {

  async export(p: PatientRecord): Promise<void> {
    const { jsPDF } = (window as any).jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const W = 210, margin = 18, contentW = W - margin * 2;
    let y = 0;

    const checkPage = (needed = 10) => {
      if (y + needed > 272) { doc.addPage(); y = margin; }
    };

    // ── Header ──
    doc.setFillColor(26, 58, 92);
    doc.rect(0, 0, W, 38, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Marson Psicologia', margin, 16);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(180, 205, 230);
    doc.text('ANAMNESE NEUROPSICOLÓGICA', margin, 23);
    doc.setDrawColor(126, 184, 232);
    doc.setLineWidth(0.5);
    doc.line(margin, 28, W - margin, 28);
    doc.setFontSize(8);
    doc.setTextColor(200, 220, 240);
    doc.text(`Gerado em ${new Date().toLocaleDateString('pt-BR')}`, W - margin, 34, { align: 'right' });
    y = 46;

    // ── Patient info ──
    doc.setFillColor(232, 238, 245);
    doc.roundedRect(margin, y, contentW, 22, 3, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(26, 58, 92);
    doc.text(p.name, margin + 6, y + 9);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(107, 114, 128);
    doc.text(`Data de resposta: ${p.date} às ${p.time}`, margin + 6, y + 17);
    y += 30;

    doc.setDrawColor(200, 210, 225);
    doc.setLineWidth(0.3);
    doc.line(margin, y, W - margin, y);
    y += 8;

    // ── Answers ──
    p.answers.forEach((a, i) => {
      checkPage(24);

      doc.setFillColor(26, 58, 92);
      doc.circle(margin + 4, y + 1, 4, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text(String(i + 1), margin + 4, y + 2.5, { align: 'center' });

      const tagColor = a.type === 'mc' ? [193, 127, 74] : [45, 95, 138];
      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...(tagColor as [number, number, number]));
      doc.text(a.type === 'mc' ? 'MÚLTIPLA ESCOLHA' : 'TEXTO LIVRE', margin + 10, y + 2);
      y += 7;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(30, 30, 46);
      const qLines = doc.splitTextToSize(a.question, contentW - 2);
      qLines.forEach((line: string) => { checkPage(6); doc.text(line, margin + 2, y); y += 5.5; });
      y += 1;

      const ans = a.answer;
      const isEmpty = !ans || (Array.isArray(ans) && !ans.length) || ans === '';

      if (isEmpty) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        doc.setTextColor(180, 180, 180);
        doc.text('Não respondida', margin + 4, y);
        y += 6;
      } else if (Array.isArray(ans)) {
        let chipX = margin + 2;
        const chipH = 6, chipPadX = 3, chipPadY = 1.5;
        ans.forEach((opt: string) => {
          doc.setFontSize(8.5);
          const tw = doc.getTextWidth(opt);
          const chipW = tw + chipPadX * 2;
          if (chipX + chipW > W - margin) { chipX = margin + 2; y += chipH + 2; checkPage(chipH + 4); }
          doc.setFillColor(232, 238, 245);
          doc.roundedRect(chipX, y - chipH + chipPadY, chipW, chipH, 1.5, 1.5, 'F');
          doc.setTextColor(26, 58, 92);
          doc.setFont('helvetica', 'bold');
          doc.text(opt, chipX + chipPadX, y);
          chipX += chipW + 3;
        });
        y += 8;
      } else {
        doc.setFillColor(250, 251, 253);
        const aLines = doc.splitTextToSize(String(ans), contentW - 8);
        const boxH = aLines.length * 5 + 6;
        checkPage(boxH + 4);
        doc.roundedRect(margin + 2, y - 1, contentW - 4, boxH, 2, 2, 'F');
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9.5);
        doc.setTextColor(55, 65, 81);
        aLines.forEach((line: string) => { doc.text(line, margin + 5, y + 3.5); y += 5; });
        y += 5;
      }

      checkPage(6);
      doc.setDrawColor(225, 232, 240);
      doc.setLineWidth(0.25);
      doc.line(margin, y, W - margin, y);
      y += 7;
    });

    // ── Footer on every page ──
    const pageCount = doc.getNumberOfPages();
    for (let pg = 1; pg <= pageCount; pg++) {
      doc.setPage(pg);
      doc.setFillColor(26, 58, 92);
      doc.rect(0, 287, W, 10, 'F');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(180, 205, 230);
      doc.text('Marson Psicologia · Documento confidencial', margin, 293);
      doc.text(`Página ${pg} de ${pageCount}`, W - margin, 293, { align: 'right' });
    }

    const filename = `Anamnese_${p.name.replace(/\s+/g, '_')}_${p.date.replace(/\//g, '-')}.pdf`;
    doc.save(filename);
  }
}
