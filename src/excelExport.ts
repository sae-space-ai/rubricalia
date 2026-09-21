import * as XLSX from 'xlsx';
import {
  Subject,
  Course,
  CRITERIA,
  COMPETENCIES,
  CRITERIA_COMPETENCY_MAP,
  SUBJECT_NAMES,
  COURSE_NAMES,
  ASSESSMENT_INSTRUMENTS,
  PEDAGOGICAL_NOTES,
  getRubricDescriptor,
} from './data';

/**
 * Genera y descarga un archivo XLSX con la rúbrica completa
 */
export function exportRubricToXLSX(
  subject: Subject,
  course: Course,
  selectedCriteria: string[],
  instrumentId: string
) {
  // Crear un nuevo workbook
  const wb = XLSX.utils.book_new();

  // ============================================================
  // HOJA 1: PORTADA / CABECERA
  // ============================================================
  const headerData: (string | null)[][] = [];

  // Título
  headerData.push(['RÚBRICA DE EVALUACIÓN']);
  headerData.push([`${SUBJECT_NAMES[subject]} — ${COURSE_NAMES[course]}`]);
  headerData.push([null]);

  // Información general
  headerData.push(['NIVEL Y MATERIA', `${COURSE_NAMES[course]} — ${SUBJECT_NAMES[subject]}`]);
  headerData.push(['INSTRUMENTO DE EVALUACIÓN', ASSESSMENT_INSTRUMENTS.find(i => i.id === instrumentId)?.name || '']);
  headerData.push([null]);

  // Criterios
  headerData.push(['CRITERIOS DE EVALUACIÓN']);
  selectedCriteria.forEach(code => {
    const criterion = CRITERIA.find(c => c.code === code);
    if (criterion) {
      headerData.push([`${criterion.code}: ${criterion.name}`, criterion.description]);
    }
  });
  headerData.push([null]);

  // Competencias
  const competencies = getCompetenciesForCriteria(selectedCriteria);
  headerData.push(['COMPETENCIAS ABORDADAS']);
  competencies.forEach(code => {
    const comp = COMPETENCIES.find(c => c.code === code);
    if (comp) {
      headerData.push([`${comp.code}: ${comp.name}`]);
    }
  });
  headerData.push([null]);

  const wsHeader = XLSX.utils.aoa_to_sheet(headerData);

  // Establecer anchos de columna
  wsHeader['!cols'] = [
    { wch: 40 },
    { wch: 60 },
  ];

  // Fusionar celdas para el título
  wsHeader['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 1 } },
  ];

  XLSX.utils.book_append_sheet(wb, wsHeader, 'Portada');

  // ============================================================
  // HOJA 2: TABLA DE RÚBRICA
  // ============================================================
  const rubricData: string[][] = [];

  // Cabecera de la tabla
  rubricData.push([
    'Criterio de Evaluación (CO)',
    'Nivel 1: Inicial',
    'Nivel 2: En desarrollo',
    'Nivel 3: Adecuado',
    'Nivel 4: Consolidado',
  ]);

  // Filas de datos
  selectedCriteria.forEach(code => {
    const criterion = CRITERIA.find(c => c.code === code);
    const descriptors = getRubricDescriptor(subject, course, code);

    if (criterion) {
      rubricData.push([
        `${criterion.code}: ${criterion.name}`,
        descriptors.nivel1,
        descriptors.nivel2,
        descriptors.nivel3,
        descriptors.nivel4,
      ]);
    }
  });

  const wsRubric = XLSX.utils.aoa_to_sheet(rubricData);

  // Establecer anchos de columna para la tabla
  wsRubric['!cols'] = [
    { wch: 30 },
    { wch: 45 },
    { wch: 45 },
    { wch: 45 },
    { wch: 45 },
  ];

  XLSX.utils.book_append_sheet(wb, wsRubric, 'Rúbrica');

  // ============================================================
  // HOJA 3: SISTEMA DE PUNTUACIÓN
  // ============================================================
  const maxScore = selectedCriteria.length * 4;
  const scoringData: (string | number | null)[][] = [
    ['SISTEMA DE PUNTUACIÓN'],
    [null],
    ['Cada criterio se puntúa de 1 (Inicial) a 4 (Consolidado).'],
    [null],
    ['Número de criterios:', selectedCriteria.length],
    ['Puntuación máxima:', maxScore],
    [null],
    ['Fórmula de cálculo:', 'Nota final = (Suma total × 10) / ' + maxScore],
    [null],
    ['ESCALA DE CALIFICACIÓN'],
    ['Rango', 'Nivel', 'Calificación'],
    ['1.0 – 3.9', 'Inicial', 'Insuficiente'],
    ['4.0 – 5.9', 'En desarrollo', 'Suficiente'],
    ['6.0 – 7.9', 'Adecuado', 'Notable'],
    ['8.0 – 10', 'Consolidado', 'Sobresaliente'],
    [null],
    ['EJEMPLO DE CÁLCULO'],
    ['Si la suma total de puntos es:', 'Ej: 36 puntos'],
    ['Nota final =', '(36 × 10) / ' + maxScore + ' = ' + ((36 * 10) / maxScore).toFixed(2)],
  ];

  const wsScoring = XLSX.utils.aoa_to_sheet(scoringData);
  wsScoring['!cols'] = [
    { wch: 35 },
    { wch: 30 },
    { wch: 20 },
  ];
  wsScoring['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } },
  ];

  XLSX.utils.book_append_sheet(wb, wsScoring, 'Puntuación');

  // ============================================================
  // HOJA 4: OBSERVACIONES PEDAGÓGICAS
  // ============================================================
  const notesData: (string | null)[][] = [
    ['OBSERVACIONES Y NOTAS PEDAGÓGICAS'],
    [null],
    [PEDAGOGICAL_NOTES[subject]],
    [null],
    ['RECOMENDACIONES DE USO'],
    ['1. Aplicar la rúbrica de forma continua y formativa durante todo el proceso de aprendizaje.'],
    ['2. Combinar la observación directa con la autoevaluación y coevaluación del estudiante.'],
    ['3. Utilizar la evidencia audiovisual como base para la evaluación objetiva.'],
    ['4. Compartir los criterios con los estudiantes al inicio del curso para fomentar la transparencia.'],
    ['5. Revisar y ajustar la rúbrica según las necesidades del grupo y el contexto.'],
    [null],
    ['NOTAS DEL PROFESOR'],
    ['Espacio para observaciones adicionales:'],
    [''],
    [''],
    [''],
    [''],
  ];

  const wsNotes = XLSX.utils.aoa_to_sheet(notesData);
  wsNotes['!cols'] = [
    { wch: 100 },
  ];
  wsNotes['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } },
  ];

  XLSX.utils.book_append_sheet(wb, wsNotes, 'Observaciones');

  // ============================================================
  // HOJA 5: HOJA DE EVALUACIÓN (para rellenar)
  // ============================================================
  const evalData: (string | null)[][] = [];
  evalData.push(['HOJA DE EVALUACIÓN DEL ESTUDIANTE']);
  evalData.push([null]);
  evalData.push(['Materia:', SUBJECT_NAMES[subject]]);
  evalData.push(['Curso:', COURSE_NAMES[course]]);
  evalData.push(['Nombre del estudiante:', '']);
  evalData.push(['Fecha de evaluación:', '']);
  evalData.push(['Evaluador:', '']);
  evalData.push([null]);
  evalData.push(['PUNTUACIÓN POR CRITERIO']);
  evalData.push(['Criterio', 'Puntuación (1-4)', 'Observaciones']);

  selectedCriteria.forEach(code => {
    const criterion = CRITERIA.find(c => c.code === code);
    if (criterion) {
      evalData.push([`${criterion.code}: ${criterion.name}`, '', '']);
    }
  });

  evalData.push([null]);
  evalData.push(['TOTAL:', '', '']);
  evalData.push(['NOTA FINAL (sobre 10):', '', '']);
  evalData.push([null]);
  evalData.push(['COMENTARIOS FINALES:']);
  evalData.push(['']);
  evalData.push(['']);
  evalData.push(['']);
  evalData.push(['']);
  evalData.push(['Firma del evaluador:', '', 'Fecha:']);

  const wsEval = XLSX.utils.aoa_to_sheet(evalData);
  wsEval['!cols'] = [
    { wch: 40 },
    { wch: 20 },
    { wch: 40 },
  ];
  wsEval['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } },
  ];

  XLSX.utils.book_append_sheet(wb, wsEval, 'Evaluación');

  // ============================================================
  // GENERAR Y DESCARGAR EL ARCHIVO
  // ============================================================
  const fileName = `Rubrica_${SUBJECT_NAMES[subject].replace(/\s+/g, '_')}_${COURSE_NAMES[course].replace(/[.\º\s]/g, '')}.xlsx`;
  XLSX.writeFile(wb, fileName);
}

/**
 * Función auxiliar para obtener las competencias asociadas a los criterios
 */
function getCompetenciesForCriteria(criteria: string[]): string[] {
  const comps = new Set<string>();
  criteria.forEach(c => {
    CRITERIA_COMPETENCY_MAP[c]?.forEach(cm => comps.add(cm));
  });
  return Array.from(comps).sort();
}
