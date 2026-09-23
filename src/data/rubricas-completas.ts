/**
 * RÚBRICAS COMPLETAS - CONSOLIDACIÓN
 * Todas las rúbricas de la Programación Didáctica V2.0
 */

import { RUBRICAS_CAMARA, RUBRICAS_BANDA, RUBRICAS_ORQUESTA, CRITERIOS_EVALUACION } from './collective';

export interface RubricaTecnica {
  id: string;
  codigo: string;
  dimension: string;
  descripcion: string;
  L1: string;
  L2: string;
  L3: string;
  L4: string;
  categoria?: 'tecnica' | 'musical' | 'interpretativa' | 'autonomia';
  etapa?: 'EE' | 'EP' | 'ambas';
}

export interface RubricaAsignatura {
  id: string;
  asignatura: string;
  curso: number;
  criterio: string;
  L1: string;
  L2: string;
  L3: string;
  L4: string;
}

// Rúbricas técnicas del documento maestro (apartado 26)
export const RUBRICAS_TECNICAS: RubricaTecnica[] = [
  {
    id: 'RT-01',
    codigo: 'R-26.4',
    dimension: 'Técnica general',
    descripcion: 'Dominio técnico global del instrumento',
    L1: 'No controla los fundamentos técnicos básicos. Requiere intervención constante del profesor.',
    L2: 'Controla parcialmente los fundamentos técnicos. Necesita apoyo frecuente para corregir errores.',
    L3: 'Controla los fundamentos técnicos con autonomía en situaciones habituales.',
    L4: 'Domina la técnica con soltura y la aplica de forma creativa en contextos diversos.',
    categoria: 'tecnica',
    etapa: 'ambas'
  },
  {
    id: 'RT-02',
    codigo: 'R-26.5',
    dimension: 'Postura',
    descripcion: 'Postura corporal y colocación del instrumento',
    L1: 'Postura incorrecta habitual. Tensiones visibles que afectan a la emisión.',
    L2: 'Postura correcta con recordatorios frecuentes. Tensiones ocasionales.',
    L3: 'Postura correcta y relajada de forma autónoma en la mayoría de situaciones.',
    L4: 'Postura óptima y relajada constante. Adapta la postura según el contexto musical.'
  },
  {
    id: 'RT-03',
    codigo: 'R-26.6',
    dimension: 'Respiración',
    descripcion: 'Control de la respiración diafragmática',
    L1: 'No utiliza respiración diafragmática. Respiración superficial y tensionada.',
    L2: 'Utiliza respiración diafragmática con ayuda del profesor. Control irregular.',
    L3: 'Utiliza respiración diafragmática de forma autónoma. Control adecuado del aire.',
    L4: 'Gestiona la respiración con total control y naturalidad. Adapta el aire a las exigencias musicales.'
  },
  {
    id: 'RT-04',
    codigo: 'R-26.7',
    dimension: 'Embocadura',
    descripcion: 'Formación y control de la embocadura',
    L1: 'Embocadura incorrecta. No logra producir un sonido estable.',
    L2: 'Embocadura aceptable con tensión visible. Sonido inestable.',
    L3: 'Embocadura correcta y relajada. Sonido estable y centrado.',
    L4: 'Embocadura óptima y adaptable. Control fino según dinámicas y registros.'
  },
  {
    id: 'RT-05',
    codigo: 'R-26.8',
    dimension: 'Emisión',
    descripcion: 'Inicio y control del sonido',
    L1: 'Emisión irregular. Dificultad para iniciar el sonido de forma controlada.',
    L2: 'Emisión aceptable en contexto sencillo. Ataques imprecisos ocasionalmente.',
    L3: 'Emisión controlada. Ataques precisos y adecuados al contexto musical.',
    L4: 'Emisión precisa y variada. Domina diferentes tipos de ataque con expresividad.'
  },
  {
    id: 'RT-06',
    codigo: 'R-26.9',
    dimension: 'Sonido',
    descripcion: 'Calidad y proyección del sonido',
    L1: 'Sonido inestable o de baja calidad. Falta de proyección.',
    L2: 'Sonido aceptable en registro medio. Proyección limitada.',
    L3: 'Sonido estable y de calidad en toda la extensión. Buena proyección.',
    L4: 'Sonido personal, proyectado y con variedad de colores. Identidad sonora propia.'
  },
  {
    id: 'RT-07',
    codigo: 'R-26.10',
    dimension: 'Afinación',
    descripcion: 'Control de la afinación',
    L1: 'Afinación imprecisa habitual. No percibe los desajustes.',
    L2: 'Afinación aceptable con ayuda del profesor o afinador. Ajustes parciales.',
    L3: 'Afinación correcta autónoma en la mayoría del repertorio. Ajustes conscientes.',
    L4: 'Afinación precisa y adaptable. Control sistemático en todas las tessituras y contextos.'
  },
  {
    id: 'RT-08',
    codigo: 'R-26.11',
    dimension: 'Articulación',
    descripcion: 'Control de las articulaciones',
    L1: 'No diferencia las articulaciones. Ejecución monótona.',
    L2: 'Diferencia las articulaciones básicas con imprecisión. Falta de contraste.',
    L3: 'Ejecuta las articulaciones con corrección y contraste adecuado.',
    L4: 'Domina las articulaciones con expresividad y sensibilidad estilística.'
  },
  {
    id: 'RT-09',
    codigo: 'R-26.12',
    dimension: 'Digitación',
    descripcion: 'Agilidad y precisión digital',
    L1: 'Digitación confusa. Errores frecuentes en pasajes sencillos.',
    L2: 'Digitación correcta en pasajes sencillos. Dificultades en pasajes rápidos.',
    L3: 'Digitación precisa y ágil en la mayoría del repertorio.',
    L4: 'Digitación ágil y segura en todo contexto. Domina pasajes virtuosísticos.'
  },
  {
    id: 'RT-10',
    codigo: 'R-26.13',
    dimension: 'Escalas',
    descripcion: 'Ejecución de escalas',
    L1: 'No ejecuta escalas con fluidez. Errores en digitación y ritmo.',
    L2: 'Ejecuta escalas básicas con errores ocasionales. Velocidad limitada.',
    L3: 'Ejecuta escalas con corrección y fluidez en todas las tonalidades.',
    L4: 'Ejecuta escalas con agilidad, precisión y variedad de articulaciones.'
  },
  {
    id: 'RT-11',
    codigo: 'R-26.14',
    dimension: 'Lectura',
    descripcion: 'Lectura de partituras',
    L1: 'Lectura muy lenta y con errores frecuentes. No comprende la partitura.',
    L2: 'Lectura con errores pero comprensiva. Velocidad limitada.',
    L3: 'Lectura fluida y correcta. Comprensión adecuada de la partitura.',
    L4: 'Lectura con comprensión y expresividad. Anticipa y analiza mientras lee.'
  },
  {
    id: 'RT-12',
    codigo: 'R-26.15',
    dimension: 'Primera vista',
    descripcion: 'Lectura a primera vista',
    L1: 'No logra leer a primera vista. Se detiene constantemente.',
    L2: 'Lee con muchas interrupciones. Pierde el pulso frecuentemente.',
    L3: 'Lee con fluidez aceptable. Mantiene el pulso en la mayoría del tiempo.',
    L4: 'Lee con fluidez y comprensión musical. Mantiene el pulso y el fraseo.'
  },
  {
    id: 'RT-13',
    codigo: 'R-26.16',
    dimension: 'Estudios',
    descripcion: 'Resolución de estudios técnicos',
    L1: 'No resuelve las dificultades técnicas del estudio. Errores constantes.',
    L2: 'Resuelve las dificultades técnicas parcialmente. Necesita trabajo adicional.',
    L3: 'Resuelve las dificultades técnicas con corrección y fluidez.',
    L4: 'Resuelve las dificultades técnicas con musicalidad y expresividad.'
  },
  {
    id: 'RT-14',
    codigo: 'R-26.17',
    dimension: 'Repertorio',
    descripcion: 'Interpretación del repertorio',
    L1: 'No domina el repertorio. Errores constantes en la interpretación.',
    L2: 'Domina el repertorio parcialmente. Necesita repeticiones para corregir.',
    L3: 'Domina el repertorio con corrección y fluidez.',
    L4: 'Domina el repertorio con madurez interpretativa y personalidad artística.'
  },
  {
    id: 'RT-15',
    codigo: 'R-26.18',
    dimension: 'Fraseo',
    descripcion: 'Construcción del fraseo musical',
    L1: 'Sin sentido de frase. Ejecución mecánica sin dirección musical.',
    L2: 'Fraseo básico con dirección musical limitada. Falta de coherencia.',
    L3: 'Fraseo coherente con dirección musical clara. Respiraciones adecuadas.',
    L4: 'Fraseo expresivo y personal. Construcción musical sofisticada y convincente.'
  },
  {
    id: 'RT-16',
    codigo: 'R-26.19',
    dimension: 'Expresión',
    descripcion: 'Expresividad musical',
    L1: 'Sin intención expresiva. Ejecución mecánica y monótona.',
    L2: 'Intención expresiva básica con contrastes limitados.',
    L3: 'Expresividad coherente con contrastes dinámicos y de carácter adecuados.',
    L4: 'Expresividad personal y comunicativa. Transmite emociones e ideas musicales.'
  },
  {
    id: 'RT-17',
    codigo: 'R-26.20',
    dimension: 'Memoria',
    descripcion: 'Interpretación de memoria',
    L1: 'No interpreta de memoria. Dependencia total de la partitura.',
    L2: 'Interpreta de memoria con inseguridad. Olvidos frecuentes.',
    L3: 'Interpreta de memoria con seguridad en la mayoría del repertorio.',
    L4: 'Interpreta de memoria con total dominio y libertad expresiva.'
  },
  {
    id: 'RT-18',
    codigo: 'R-26.21',
    dimension: 'Autonomía',
    descripcion: 'Autonomía en el trabajo',
    L1: 'Dependencia total del profesor. No trabaja de forma independiente.',
    L2: 'Dependencia parcial. Necesita orientación constante para avanzar.',
    L3: 'Trabajo autónomo en situaciones habituales. Planifica y organiza su estudio.',
    L4: 'Autonomía plena y proactiva. Lidera su propio proceso de aprendizaje.'
  },
  {
    id: 'RT-19',
    codigo: 'R-26.22',
    dimension: 'Interpretación pública',
    descripcion: 'Interpretación en público',
    L1: 'No se presenta en público. Evita las audiciones y conciertos.',
    L2: 'Se presenta en público con gran inseguridad. Nerviosismo excesivo.',
    L3: 'Se presenta en público con solvencia. Control adecuado de la situación.',
    L4: 'Se presenta en público con dominio escénico y comunicativo. Disfruta la interpretación.'
  }
];

// Consolidar todas las rúbricas de asignaturas colectivas
export const TODAS_LAS_RUBRICAS = {
  camara: RUBRICAS_CAMARA,
  banda: RUBRICAS_BANDA,
  orquesta: RUBRICAS_ORQUESTA,
  tecnicas: RUBRICAS_TECNICAS
};

// Funciones auxiliares
export function getRubricasAsignaturaConsolidadas(asignatura: string): RubricaAsignatura[] {
  switch (asignatura) {
    case 'camara':
      return RUBRICAS_CAMARA.map(r => ({
        id: `camara-${r.curso}-${r.criterio}`,
        asignatura: 'Música de Cámara',
        curso: r.curso,
        criterio: r.criterio,
        L1: r.descriptores.L1,
        L2: r.descriptores.L2,
        L3: r.descriptores.L3,
        L4: r.descriptores.L4
      }));
    case 'banda':
      return RUBRICAS_BANDA.map(r => ({
        id: `banda-${r.curso}-${r.criterio}`,
        asignatura: 'Banda',
        curso: r.curso,
        criterio: r.criterio,
        L1: r.descriptores.L1,
        L2: r.descriptores.L2,
        L3: r.descriptores.L3,
        L4: r.descriptores.L4
      }));
    case 'orquesta':
      return RUBRICAS_ORQUESTA.map(r => ({
        id: `orquesta-${r.curso}-${r.criterio}`,
        asignatura: 'Orquesta',
        curso: r.curso,
        criterio: r.criterio,
        L1: r.descriptores.L1,
        L2: r.descriptores.L2,
        L3: r.descriptores.L3,
        L4: r.descriptores.L4
      }));
    default:
      return [];
  }
}

export function getNombreCriterio(codigo: string): string {
  const criterio = CRITERIOS_EVALUACION.find(c => c.codigo === codigo);
  return criterio ? criterio.nombre : codigo;
}

export function getEstadisticasRubricas() {
  return {
    totalRubricasTecnicas: RUBRICAS_TECNICAS.length,
    totalRubricasCamara: RUBRICAS_CAMARA.length,
    totalRubricasBanda: RUBRICAS_BANDA.length,
    totalRubricasOrquesta: RUBRICAS_ORQUESTA.length,
    totalGeneral: RUBRICAS_TECNICAS.length + RUBRICAS_CAMARA.length + RUBRICAS_BANDA.length + RUBRICAS_ORQUESTA.length
  };
}
