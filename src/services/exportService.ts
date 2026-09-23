import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType } from 'docx';
import { saveAs } from 'file-saver';
import { DOCUMENTO_COMPLETO, DOCUMENTO_COMPLETO_3_30, DOCUMENTO_RESTO, DOCUMENTO_FINAL } from '../data';
import { ESTRUCTURA_60_UD, UNIDADES_DETALLADAS } from '../data';
import { ASIGNATURA_INFO, CRITERIOS_EVALUACION, COMPETENCIAS, getRubricasByAsignatura } from '../data';

export type ExportFormat = 'xlsx' | 'pdf' | 'docx' | 'odt' | 'html';

export interface ExportOptions {
  format: ExportFormat;
  includeDocument: boolean;
  includeUnits: boolean;
  includeRubrics: boolean;
  subject?: string;
}

/**
 * Exporta el documento completo en el formato especificado
 */
export async function exportDocument(options: ExportOptions): Promise<void> {
  const { format, includeDocument, includeUnits, includeRubrics, subject } = options;

  switch (format) {
    case 'xlsx':
      await exportToXLSX(includeDocument, includeUnits, includeRubrics, subject);
      break;
    case 'pdf':
      await exportToPDF(includeDocument, includeUnits, includeRubrics, subject);
      break;
    case 'docx':
      await exportToDOCX(includeDocument, includeUnits, includeRubrics, subject);
      break;
    case 'odt':
      await exportToODT(includeDocument, includeUnits, includeRubrics, subject);
      break;
    case 'html':
      await exportToHTML(includeDocument, includeUnits, includeRubrics, subject);
      break;
  }
}

/**
 * Exporta a Excel (XLSX)
 */
async function exportToXLSX(
  includeDocument: boolean,
  includeUnits: boolean,
  includeRubrics: boolean,
  subject?: string
): Promise<void> {
  const wb = XLSX.utils.book_new();

  if (includeDocument) {
    const allSections = [...DOCUMENTO_COMPLETO, ...DOCUMENTO_COMPLETO_3_30, ...DOCUMENTO_RESTO, ...DOCUMENTO_FINAL];
    
    allSections.forEach((apartado, index) => {
      const wsData: any[][] = [
        [`APARTADO ${apartado.numero}: ${apartado.titulo}`],
        [],
      ];

      apartado.subapartados.forEach(sub => {
        wsData.push([`${sub.numero} ${sub.titulo}`]);
        sub.contenido.forEach(linea => {
          wsData.push(['', linea]);
        });
        wsData.push([]);
      });

      const ws = XLSX.utils.aoa_to_sheet(wsData);
      ws['!cols'] = [{ wch: 15 }, { wch: 100 }];
      XLSX.utils.book_append_sheet(wb, ws, `${apartado.numero.substring(0, 30)}`);
    });
  }

  if (includeUnits) {
    const wsData: any[][] = [
      ['Código', 'Título', 'Curso', 'Trimestre', 'Fase'],
      ...ESTRUCTURA_60_UD.map(ud => [
        ud.codigo,
        ud.titulo,
        ud.curso,
        ud.trimestre,
        ud.curso.startsWith('EE') ? getEEFase(ud.curso) : getEPFase(ud.curso)
      ])
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    ws['!cols'] = [{ wch: 12 }, { wch: 50 }, { wch: 8 }, { wch: 10 }, { wch: 30 }];
    XLSX.utils.book_append_sheet(wb, ws, 'Unidades Didácticas');
  }

  if (includeRubrics && subject) {
    const rubricas = getRubricasByAsignatura(subject as any);
    
    if (rubricas.length > 0) {
      const wsData: any[][] = [
        ['Criterio', 'Curso', 'Nivel 1 (Inicial)', 'Nivel 2 (En desarrollo)', 'Nivel 3 (Adecuado)', 'Nivel 4 (Consolidado)'],
        ...rubricas.map(r => [
          r.criterio,
          `${r.curso}º`,
          r.descriptores.L1,
          r.descriptores.L2,
          r.descriptores.L3,
          r.descriptores.L4
        ])
      ];

      const ws = XLSX.utils.aoa_to_sheet(wsData);
      ws['!cols'] = [{ wch: 10 }, { wch: 8 }, { wch: 40 }, { wch: 40 }, { wch: 40 }, { wch: 40 }];
      XLSX.utils.book_append_sheet(wb, ws, 'Rúbricas');
    }
  }

  XLSX.writeFile(wb, `Programacion_Didactica_Clarinete_2026-2027.xlsx`);
}

/**
 * Exporta a PDF
 */
async function exportToPDF(
  includeDocument: boolean,
  includeUnits: boolean,
  includeRubrics: boolean,
  subject?: string
): Promise<void> {
  const doc = new jsPDF();
  let yPos = 20;

  // Título principal
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Programación Didáctica de Clarinete 2026/2027', 105, yPos, { align: 'center' });
  yPos += 10;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Enseñanzas Profesionales de Música - Extremadura', 105, yPos, { align: 'center' });
  yPos += 15;

  if (includeDocument) {
    const allSections = [...DOCUMENTO_COMPLETO, ...DOCUMENTO_COMPLETO_3_30, ...DOCUMENTO_RESTO, ...DOCUMENTO_FINAL];
    
    allSections.forEach((apartado) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`${apartado.numero}. ${apartado.titulo}`, 20, yPos);
      yPos += 8;

      apartado.subapartados.forEach(sub => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }

        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(`${sub.numero} ${sub.titulo}`, 25, yPos);
        yPos += 6;

        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        
        sub.contenido.forEach(linea => {
          if (yPos > 280) {
            doc.addPage();
            yPos = 20;
          }
          
          const lines = doc.splitTextToSize(linea, 160);
          doc.text(lines, 30, yPos);
          yPos += lines.length * 4;
        });
        
        yPos += 3;
      });
      
      yPos += 5;
    });
  }

  if (includeUnits) {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Unidades Didácticas', 20, yPos);
    yPos += 10;

    const tableData = ESTRUCTURA_60_UD.map(ud => [
      ud.codigo,
      ud.titulo.substring(0, 40),
      ud.curso,
      ud.trimestre
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [['Código', 'Título', 'Curso', 'Trim.']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246] },
      styles: { fontSize: 8 }
    });
  }

  if (includeRubrics && subject) {
    const rubricas = getRubricasByAsignatura(subject as any);
    
    if (rubricas.length > 0) {
      doc.addPage();
      yPos = 20;

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`Rúbricas - ${ASIGNATURA_INFO[subject as keyof typeof ASIGNATURA_INFO]?.nombre || subject}`, 20, yPos);
      yPos += 10;

      const tableData = rubricas.map(r => [
        r.criterio,
        `${r.curso}º`,
        r.descriptores.L1.substring(0, 30),
        r.descriptores.L4.substring(0, 30)
      ]);

      autoTable(doc, {
        startY: yPos,
        head: [['Criterio', 'Curso', 'Nivel 1', 'Nivel 4']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [16, 185, 129] },
        styles: { fontSize: 7 }
      });
    }
  }

  doc.save('Programacion_Didactica_Clarinete_2026-2027.pdf');
}

/**
 * Exporta a Word (DOCX)
 */
async function exportToDOCX(
  includeDocument: boolean,
  includeUnits: boolean,
  includeRubrics: boolean,
  subject?: string
): Promise<void> {
  const children: any[] = [];

  // Título principal
  children.push(
    new Paragraph({
      text: 'Programación Didáctica de Clarinete 2026/2027',
      heading: HeadingLevel.TITLE,
      alignment: 'center'
    }),
    new Paragraph({
      text: 'Enseñanzas Profesionales de Música - Extremadura',
      alignment: 'center'
    }),
    new Paragraph({ text: '' })
  );

  if (includeDocument) {
    const allSections = [...DOCUMENTO_COMPLETO, ...DOCUMENTO_COMPLETO_3_30, ...DOCUMENTO_RESTO, ...DOCUMENTO_FINAL];
    
    allSections.forEach((apartado) => {
      children.push(
        new Paragraph({
          text: `${apartado.numero}. ${apartado.titulo}`,
          heading: HeadingLevel.HEADING_1
        })
      );

      apartado.subapartados.forEach(sub => {
        children.push(
          new Paragraph({
            text: `${sub.numero} ${sub.titulo}`,
            heading: HeadingLevel.HEADING_2
          })
        );

        sub.contenido.forEach(linea => {
          children.push(
            new Paragraph({
              children: [new TextRun(linea)]
            })
          );
        });

        children.push(new Paragraph({ text: '' }));
      });
    });
  }

  if (includeUnits) {
    children.push(
      new Paragraph({
        text: 'Unidades Didácticas',
        heading: HeadingLevel.HEADING_1
      })
    );

    const tableRows = [
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph('Código')], width: { size: 15, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph('Título')], width: { size: 55, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph('Curso')], width: { size: 15, type: WidthType.PERCENTAGE } }),
          new TableCell({ children: [new Paragraph('Trimestre')], width: { size: 15, type: WidthType.PERCENTAGE } })
        ]
      }),
      ...ESTRUCTURA_60_UD.map(ud =>
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph(ud.codigo)] }),
            new TableCell({ children: [new Paragraph(ud.titulo)] }),
            new TableCell({ children: [new Paragraph(ud.curso)] }),
            new TableCell({ children: [new Paragraph(ud.trimestre)] })
          ]
        })
      )
    ];

    children.push(new Table({ rows: tableRows }));
    children.push(new Paragraph({ text: '' }));
  }

  if (includeRubrics && subject) {
    const rubricas = getRubricasByAsignatura(subject as any);
    
    if (rubricas.length > 0) {
      children.push(
        new Paragraph({
          text: `Rúbricas - ${ASIGNATURA_INFO[subject as keyof typeof ASIGNATURA_INFO]?.nombre || subject}`,
          heading: HeadingLevel.HEADING_1
        })
      );

      const tableRows = [
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph('Criterio')], width: { size: 10, type: WidthType.PERCENTAGE } }),
            new TableCell({ children: [new Paragraph('Curso')], width: { size: 10, type: WidthType.PERCENTAGE } }),
            new TableCell({ children: [new Paragraph('Nivel 1')], width: { size: 20, type: WidthType.PERCENTAGE } }),
            new TableCell({ children: [new Paragraph('Nivel 4')], width: { size: 20, type: WidthType.PERCENTAGE } })
          ]
        }),
        ...rubricas.map(r =>
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph(r.criterio)] }),
              new TableCell({ children: [new Paragraph(`${r.curso}º`)] }),
              new TableCell({ children: [new Paragraph(r.descriptores.L1)] }),
              new TableCell({ children: [new Paragraph(r.descriptores.L4)] })
            ]
          })
        )
      ];

      children.push(new Table({ rows: tableRows }));
    }
  }

  const doc = new Document({
    sections: [{ children }]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, 'Programacion_Didactica_Clarinete_2026-2027.docx');
}

/**
 * Exporta a ODT (OpenDocument Text)
 */
async function exportToODT(
  includeDocument: boolean,
  includeUnits: boolean,
  includeRubrics: boolean,
  subject?: string
): Promise<void> {
  // ODT es complejo de generar directamente, exportamos como HTML que se puede abrir en LibreOffice
  await exportToHTML(includeDocument, includeUnits, includeRubrics, subject, 'odt');
}

/**
 * Exporta a HTML
 */
async function exportToHTML(
  includeDocument: boolean,
  includeUnits: boolean,
  includeRubrics: boolean,
  subject?: string,
  format: 'html' | 'odt' = 'html'
): Promise<void> {
  let html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Programación Didáctica de Clarinete 2026/2027</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
    h1 { color: #1e40af; border-bottom: 3px solid #1e40af; padding-bottom: 10px; }
    h2 { color: #1e3a8a; margin-top: 30px; border-bottom: 2px solid #3b82f6; padding-bottom: 5px; }
    h3 { color: #1e40af; margin-top: 20px; }
    table { border-collapse: collapse; width: 100%; margin: 15px 0; }
    th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: left; }
    th { background-color: #dbeafe; font-weight: bold; }
    tr:nth-child(even) { background-color: #f8fafc; }
    .categoria { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; margin-left: 10px; }
    .norma { background-color: #d1fae5; color: #065f46; }
    .desarrollo { background-color: #dbeafe; color: #1e40af; }
    .hold { background-color: #fef3c7; color: #92400e; }
  </style>
</head>
<body>
  <h1>Programación Didáctica de Clarinete 2026/2027</h1>
  <p><strong>Enseñanzas Profesionales de Música - Extremadura</strong></p>
  <hr>
`;

  if (includeDocument) {
    const allSections = [...DOCUMENTO_COMPLETO, ...DOCUMENTO_COMPLETO_3_30, ...DOCUMENTO_RESTO, ...DOCUMENTO_FINAL];
    
    allSections.forEach((apartado) => {
      html += `<h2>${apartado.numero}. ${apartado.titulo}</h2>`;

      apartado.subapartados.forEach(sub => {
        html += `<h3>${sub.numero} ${sub.titulo}`;
        if (sub.categoria) {
          const catClass = sub.categoria === 'NORMA' ? 'norma' : sub.categoria === 'HOLD' ? 'hold' : 'desarrollo';
          html += `<span class="categoria ${catClass}">${sub.categoria}</span>`;
        }
        html += `</h3>`;

        sub.contenido.forEach(linea => {
          html += `<p>${linea}</p>`;
        });
      });
    });
  }

  if (includeUnits) {
    html += `
    <h2>Unidades Didácticas</h2>
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Título</th>
          <th>Curso</th>
          <th>Trimestre</th>
        </tr>
      </thead>
      <tbody>
    `;

    ESTRUCTURA_60_UD.forEach(ud => {
      html += `
        <tr>
          <td>${ud.codigo}</td>
          <td>${ud.titulo}</td>
          <td>${ud.curso}</td>
          <td>${ud.trimestre}</td>
        </tr>
      `;
    });

    html += `</tbody></table>`;
  }

  if (includeRubrics && subject) {
    const rubricas = getRubricasByAsignatura(subject as any);
    
    if (rubricas.length > 0) {
      html += `
      <h2>Rúbricas - ${ASIGNATURA_INFO[subject as keyof typeof ASIGNATURA_INFO]?.nombre || subject}</h2>
      <table>
        <thead>
          <tr>
            <th>Criterio</th>
            <th>Curso</th>
            <th>Nivel 1 (Inicial)</th>
            <th>Nivel 2 (En desarrollo)</th>
            <th>Nivel 3 (Adecuado)</th>
            <th>Nivel 4 (Consolidado)</th>
          </tr>
        </thead>
        <tbody>
      `;

      rubricas.forEach(r => {
        html += `
          <tr>
            <td>${r.criterio}</td>
            <td>${r.curso}º</td>
            <td>${r.descriptores.L1}</td>
            <td>${r.descriptores.L2}</td>
            <td>${r.descriptores.L3}</td>
            <td>${r.descriptores.L4}</td>
          </tr>
        `;
      });

      html += `</tbody></table>`;
    }
  }

  html += `
  <hr>
  <p style="text-align: center; color: #64748b; font-size: 12px;">
    V2.0 Auditada para Departamento - Prof. Manuel Gago Fernández
  </p>
</body>
</html>
`;

  const blob = new Blob([html], { type: format === 'odt' ? 'application/vnd.oasis.opendocument.text' : 'text/html' });
  const extension = format === 'odt' ? 'odt' : 'html';
  saveAs(blob, `Programacion_Didactica_Clarinete_2026-2027.${extension}`);
}

// Funciones auxiliares
function getEEFase(curso: string): string {
  const fases: Record<string, string> = {
    'EE1': 'Fundamentación',
    'EE2': 'Consolidación',
    'EE3': 'Desarrollo',
    'EE4': 'Autonomía y Transición'
  };
  return fases[curso] || '';
}

function getEPFase(curso: string): string {
  const fases: Record<string, string> = {
    'EP1': 'Transición Profesional',
    'EP2': 'Consolidación Profesional',
    'EP3': 'Integración Técnico-Musical',
    'EP4': 'Control Avanzado y Estilos',
    'EP5': 'Autonomía Interpretativa Avanzada',
    'EP6': 'Consolidación, Proyecto y Transferencia'
  };
  return fases[curso] || '';
}
