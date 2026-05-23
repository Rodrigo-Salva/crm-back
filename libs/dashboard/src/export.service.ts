import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
const PDFDocument = require('pdfkit');

@Injectable()
export class ExportService {
  async toExcel(summary: any, pipeline: any[], forecast: any[]): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'CRM System';
    workbook.created = new Date();

    const ws = workbook.addWorksheet('Reporte Ejecutivo', {
      views: [{ showGridLines: false }]
    });

    // Add Logo/Header
    ws.mergeCells('A1:D2');
    const titleCell = ws.getCell('A1');
    titleCell.value = 'REPORTE EJECUTIVO - CRM';
    titleCell.font = { name: 'Arial', size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
    titleCell.alignment = { vertical: 'middle', horizontal: 'center' };

    ws.addRow([]);

    const addSectionHeader = (title: string, row: number) => {
      ws.mergeCells(`A${row}:D${row}`);
      const cell = ws.getCell(`A${row}`);
      cell.value = title;
      cell.font = { name: 'Arial', size: 12, bold: true, color: { argb: 'FF333333' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F5F9' } };
      cell.border = { bottom: { style: 'medium', color: { argb: 'FFCBD5E1' } } };
    };

    // Resumen General
    addSectionHeader('Resumen General', 4);
    
    ws.columns = [
      { key: 'col1', width: 25 },
      { key: 'col2', width: 20 },
      { key: 'col3', width: 25 },
      { key: 'col4', width: 20 },
    ];

    ws.addRow({ col1: 'Total de Contactos', col2: summary.totalContacts, col3: 'Negocios Ganados', col4: summary.closedDealsCount });
    ws.addRow({ col1: 'Total de Negocios', col2: summary.totalDeals, col3: 'Valor Ganado', col4: summary.closedDealsValue });
    ws.addRow({ col1: 'Total de Empresas', col2: summary.totalCompanies, col3: 'Total de Actividades', col4: summary.totalActivities });

    // Format numbers
    ['B5', 'B6', 'B7', 'D5', 'D7'].forEach(ref => {
      ws.getCell(ref).alignment = { horizontal: 'right' };
    });
    ws.getCell('D6').numFmt = '"$"#,##0.00';
    ws.getCell('D6').alignment = { horizontal: 'right' };

    ws.addRow([]);

    // Pipeline
    const pipelineStart = 9;
    addSectionHeader('Embudo de Ventas (Pipeline)', pipelineStart);
    ws.addRow({ col1: 'Etapa', col2: 'Cantidad', col3: 'Porcentaje' });
    const pHeaderRow = ws.getRow(pipelineStart + 1);
    pHeaderRow.font = { bold: true };
    pHeaderRow.border = { bottom: { style: 'thin' } };

    let currentRow = pipelineStart + 2;
    for (const s of pipeline) {
      ws.addRow({ col1: s.name, col2: s.count, col3: `${s.percentage}%` });
      ws.getCell(`B${currentRow}`).alignment = { horizontal: 'right' };
      ws.getCell(`C${currentRow}`).alignment = { horizontal: 'right' };
      currentRow++;
    }

    ws.addRow([]);
    currentRow++;

    // Forecast
    addSectionHeader('Pronóstico (Forecast)', currentRow);
    currentRow++;
    ws.addRow({ col1: 'Mes', col2: 'Total Proyectado', col3: 'Total Ponderado' });
    const fHeaderRow = ws.getRow(currentRow);
    fHeaderRow.font = { bold: true };
    fHeaderRow.border = { bottom: { style: 'thin' } };
    currentRow++;

    for (const f of forecast) {
      ws.addRow({ col1: f.month, col2: f.total, col3: f.weighted });
      ws.getCell(`B${currentRow}`).numFmt = '"$"#,##0.00';
      ws.getCell(`C${currentRow}`).numFmt = '"$"#,##0.00';
      currentRow++;
    }

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  async toPdf(summary: any, pipeline: any[], forecast: any[]): Promise<Buffer> {
    return new Promise((resolve) => {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const chunks: Buffer[] = [];
      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      // Helper functions
      const drawHeader = (title: string, y: number) => {
        doc.rect(50, y, 495, 20).fill('#0f172a');
        doc.fillColor('#ffffff').fontSize(12).text(title, 60, y + 5);
        doc.fillColor('#333333');
      };

      const drawRow = (y: number, col1: string, col2: string, col3: string, col4: string) => {
        doc.fontSize(10);
        doc.text(col1, 60, y);
        doc.text(col2, 200, y, { width: 80, align: 'right' });
        doc.text(col3, 300, y);
        doc.text(col4, 450, y, { width: 80, align: 'right' });
        doc.moveTo(50, y + 15).lineTo(545, y + 15).lineWidth(0.5).strokeColor('#e2e8f0').stroke();
      };

      // Title
      doc.fontSize(24).fillColor('#0f172a').text('Reporte Ejecutivo CRM', { align: 'center' });
      doc.fontSize(10).fillColor('#64748b').text(`Generado: ${new Date().toLocaleDateString()}`, { align: 'center' });
      doc.moveDown(2);

      let currentY = doc.y;

      // Summary Section
      drawHeader('Resumen General', currentY);
      currentY += 30;
      drawRow(currentY, 'Total de Contactos:', summary.totalContacts.toString(), 'Negocios Ganados:', summary.closedDealsCount.toString());
      currentY += 20;
      drawRow(currentY, 'Total de Negocios:', summary.totalDeals.toString(), 'Valor Ganado:', `$${Number(summary.closedDealsValue).toLocaleString()}`);
      currentY += 20;
      drawRow(currentY, 'Total de Empresas:', summary.totalCompanies.toString(), 'Total Actividades:', summary.totalActivities.toString());
      
      currentY += 40;

      // Pipeline Section
      drawHeader('Embudo de Ventas', currentY);
      currentY += 30;
      doc.fontSize(10).font('Helvetica-Bold');
      doc.text('Etapa', 60, currentY);
      doc.text('Cantidad', 300, currentY, { width: 80, align: 'right' });
      doc.text('Porcentaje', 400, currentY, { width: 80, align: 'right' });
      doc.moveTo(50, currentY + 15).lineTo(545, currentY + 15).lineWidth(1).strokeColor('#cbd5e1').stroke();
      currentY += 20;
      
      doc.font('Helvetica');
      for (const s of pipeline) {
        doc.text(s.name, 60, currentY);
        doc.text(s.count.toString(), 300, currentY, { width: 80, align: 'right' });
        doc.text(`${s.percentage}%`, 400, currentY, { width: 80, align: 'right' });
        doc.moveTo(50, currentY + 15).lineTo(545, currentY + 15).lineWidth(0.5).strokeColor('#f1f5f9').stroke();
        currentY += 20;
      }

      currentY += 20;

      // Forecast Section
      if (currentY > 700) {
        doc.addPage();
        currentY = 50;
      }

      drawHeader('Pronóstico Financiero', currentY);
      currentY += 30;
      doc.fontSize(10).font('Helvetica-Bold');
      doc.text('Mes', 60, currentY);
      doc.text('Proyectado', 300, currentY, { width: 80, align: 'right' });
      doc.text('Ponderado', 420, currentY, { width: 80, align: 'right' });
      doc.moveTo(50, currentY + 15).lineTo(545, currentY + 15).lineWidth(1).strokeColor('#cbd5e1').stroke();
      currentY += 20;

      doc.font('Helvetica');
      for (const f of forecast) {
        doc.text(f.month, 60, currentY);
        doc.text(`$${Number(f.total).toLocaleString()}`, 300, currentY, { width: 80, align: 'right' });
        doc.text(`$${Number(f.weighted).toLocaleString()}`, 420, currentY, { width: 80, align: 'right' });
        doc.moveTo(50, currentY + 15).lineTo(545, currentY + 15).lineWidth(0.5).strokeColor('#f1f5f9').stroke();
        currentY += 20;
      }

      // Footer
      const bottom = doc.page.height - 50;
      doc.fontSize(8).fillColor('#94a3b8').text('Generado automáticamente por el CRM.', 50, bottom, { align: 'center' });

      doc.end();
    });
  }
}
