// ============================================================
// DATOS BASE — Programación Didáctica 2026/2027
// Enseñanzas Profesionales de Música — Extremadura
// ============================================================

export type Subject = 'camara' | 'banda' | 'orquesta';
export type Course = 1 | 2 | 3 | 4 | 5 | 6;

export interface Criterion {
  code: string;
  name: string;
  description: string;
}

export interface Competency {
  code: string;
  name: string;
}

export interface RubricDescriptor {
  nivel1: string;
  nivel2: string;
  nivel3: string;
  nivel4: string;
}

export interface RubricEntry {
  criterion: string;
  descriptors: {
    [key: string]: RubricDescriptor; // key = `${subject}-${course}` or 'default'
  };
}

// Criterios de Evaluación (Bloque X y XVII)
export const CRITERIA: Criterion[] = [
  { code: 'CO-01', name: 'Preparación', description: 'Capacidad de preparar el repertorio asignado con rigor y anticipación.' },
  { code: 'CO-02', name: 'Ritmo y coordinación', description: 'Mantenimiento del pulso, precisión rítmica y coordinación con el grupo.' },
  { code: 'CO-03', name: 'Escucha y ajuste', description: 'Capacidad de escuchar activamente y ajustar la interpretación al conjunto.' },
  { code: 'CO-04', name: 'Afinación y sonido', description: 'Control de la afinación individual y colectiva, calidad del sonido producido.' },
  { code: 'CO-05', name: 'Articulación y dinámica', description: 'Ejecución correcta de articulaciones y matices dinámicos indicados.' },
  { code: 'CO-06', name: 'Balance y función', description: 'Equilibrio sonoro entre las voces y comprensión del rol dentro del conjunto.' },
  { code: 'CO-07', name: 'Interpretación y discurso', description: 'Construcción del discurso musical, fraseo, agógica y expresividad.' },
  { code: 'CO-08', name: 'Adaptación', description: 'Flexibilidad para adaptarse a cambios de tempo, dinámica, director o contexto.' },
  { code: 'CO-09', name: 'Continuidad', description: 'Capacidad de mantener la continuidad musical ante dificultades o imprevistos.' },
  { code: 'CO-10', name: 'Resolución de problemas', description: 'Habilidad para resolver incidencias musicales de forma autónoma durante la interpretación.' },
  { code: 'CO-11', name: 'Autonomía y responsabilidad', description: 'Grado de autonomía en el estudio, organización del trabajo y responsabilidad con el grupo.' },
  { code: 'CO-12', name: 'Revisión y transferencia', description: 'Capacidad de autoevaluarse, reflexionar sobre la interpretación y transferir aprendizajes.' },
];

// Competencias (Bloque V)
export const COMPETENCIES: Competency[] = [
  { code: 'CM-1', name: 'Ejecución instrumental' },
  { code: 'CM-2', name: 'Competencia rítmica y de coordinación' },
  { code: 'CM-3', name: 'Competencia auditiva y de ajuste sonoro' },
  { code: 'CM-4', name: 'Competencia de interpretación musical' },
  { code: 'CM-5', name: 'Competencia de interacción musical' },
  { code: 'CM-6', name: 'Competencia de análisis y resolución musical' },
  { code: 'CM-7', name: 'Competencia de transferencia musical' },
];

// Mapeo de criterios a competencias
export const CRITERIA_COMPETENCY_MAP: Record<string, string[]> = {
  'CO-01': ['CM-1', 'CM-6'],
  'CO-02': ['CM-2', 'CM-5'],
  'CO-03': ['CM-3', 'CM-5'],
  'CO-04': ['CM-1', 'CM-3'],
  'CO-05': ['CM-1', 'CM-4'],
  'CO-06': ['CM-5', 'CM-3'],
  'CO-07': ['CM-4', 'CM-7'],
  'CO-08': ['CM-5', 'CM-6'],
  'CO-09': ['CM-1', 'CM-6'],
  'CO-10': ['CM-6', 'CM-5'],
  'CO-11': ['CM-6', 'CM-7'],
  'CO-12': ['CM-7', 'CM-6'],
};

// Subject display names
export const SUBJECT_NAMES: Record<Subject, string> = {
  camara: 'Música de Cámara',
  banda: 'Banda',
  orquesta: 'Orquesta',
};

// Course display names
export const COURSE_NAMES: Record<number, string> = {
  1: '1.º curso',
  2: '2.º curso',
  3: '3.º curso',
  4: '4.º curso',
  5: '5.º curso',
  6: '6.º curso',
};

// Valid course ranges per subject
export const VALID_COURSES: Record<Subject, Course[]> = {
  camara: [4, 5, 6],
  banda: [1, 2, 3, 4, 5, 6],
  orquesta: [1, 2, 3, 4, 5, 6],
};

// ============================================================
// DESCRIPTORES DE RÚBRICA POR CRITERIO, MATERIA Y CURSO
// ============================================================

type DescriptorKey = `${Subject}-${Course}` | 'default';

interface CriterionDescriptors {
  [key: string]: RubricDescriptor;
}

// Helper to create descriptors with progressive difficulty
function createDescriptors(
  subject: Subject,
  course: Course,
  criterion: string,
  n1: string, n2: string, n3: string, n4: string
): { key: DescriptorKey; descriptors: RubricDescriptor } {
  return {
    key: `${subject}-${course}` as DescriptorKey,
    descriptors: { nivel1: n1, nivel2: n2, nivel3: n3, nivel4: n4 }
  };
}

// ============================================================
// RÚBRICAS COMPLETAS — Música de Cámara
// ============================================================

export const CAMARA_RUBRICS: Record<number, Record<string, RubricDescriptor>> = {
  4: {
    'CO-01': {
      nivel1: 'No prepara el repertorio asignado. Acude a los ensayos sin haber estudiado su parte.',
      nivel2: 'Prepara parcialmente el repertorio, pero requiere recordatorios frecuentes del profesor.',
      nivel3: 'Prepara el repertorio asignado de forma regular y acude a los ensayos con un nivel de dominio aceptable.',
      nivel4: 'Anticipa la preparación del repertorio, investiga el contexto de la obra y propone ideas interpretativas propias.'
    },
    'CO-02': {
      nivel1: 'No mantiene el pulso de forma consistente. Se desincroniza frecuentemente del grupo.',
      nivel2: 'Mantiene el pulso en pasajes sencillos, pero pierde la coordinación en secciones con mayor complejidad rítmica.',
      nivel3: 'Mantiene el pulso y se coordina con el grupo en la mayoría de las secciones del repertorio trabajado.',
      nivel4: 'Mantiene el pulso con seguridad, anticipa entradas y facilita la coordinación del grupo en pasajes rítmicamente complejos.'
    },
    'CO-03': {
      nivel1: 'No escucha a los compañeros durante la interpretación. Se centra exclusivamente en su propia parte.',
      nivel2: 'Escucha al grupo de forma intermitente, pero no logra ajustar su interpretación en consecuencia.',
      nivel3: 'Escucha activamente a los compañeros y ajusta su afinación, dinámica y fraseo al conjunto.',
      nivel4: 'Escucha de forma integral, identifica desequilibrios en tiempo real y propone ajustes que enriquecen la interpretación colectiva.'
    },
    'CO-04': {
      nivel1: 'La afinación es imprecisa de forma habitual. No controla la calidad del sonido en el contexto camerístico.',
      nivel2: 'Logra una afinación aceptable en pasajes sencillos, pero presenta desajustes en intervalos o tonalidades complejas.',
      nivel3: 'Mantiene una afinación correcta en la mayoría del repertorio y produce un sonido adecuado al contexto camerístico.',
      nivel4: 'Controla la afinación con precisión en todo momento, adapta el color sonoro a las exigencias estilísticas y contribuye a la cohesión tímbrica del grupo.'
    },
    'CO-05': {
      nivel1: 'No diferencia las articulaciones indicadas. Las dinámicas son monótonas o no se corresponden con la partitura.',
      nivel2: 'Ejecuta las articulaciones básicas y dinámicas principales, pero con falta de contraste o precisión.',
      nivel3: 'Ejecuta correctamente las articulaciones y dinámicas indicadas, aportando contraste y coherencia al discurso.',
      nivel4: 'Domina las articulaciones y dinámicas con sensibilidad estilística, aportando matices expresivos que enriquecen la interpretación del conjunto.'
    },
    'CO-06': {
      nivel1: 'No es consciente de su rol en el conjunto. Toca siempre al mismo volumen sin considerar el equilibrio.',
      nivel2: 'Comienza a ser consciente de los planos sonoros, pero no logra ajustarse de forma consistente.',
      nivel3: 'Comprende su función en el tejido musical y ajusta su volumen para mantener el equilibrio con los compañeros.',
      nivel4: 'Gestiona con autonomía los planos sonoros, asumiendo roles de protagonista o acompañamiento según la estructura de la obra.'
    },
    'CO-07': {
      nivel1: 'La interpretación es mecánica, sin fraseo ni intención expresiva. No hay discurso musical.',
      nivel2: 'Muestra intención expresiva básica, pero el fraseo es irregular y el discurso carece de dirección.',
      nivel3: 'Construye un discurso musical coherente con fraseo, agógica y dinámica adecuados al estilo de la obra.',
      nivel4: 'Ofrece una interpretación personal y convincente, con un discurso musical estructurado, flexible y estilísticamente fundamentado.'
    },
    'CO-08': {
      nivel1: 'Se bloquea ante cualquier cambio de tempo, dinámica o indicación del compañero que dirige.',
      nivel2: 'Se adapta con dificultad a los cambios, necesitando que el grupo se detenga para reorganizarse.',
      nivel3: 'Se adapta a los cambios de tempo y dinámica propuestos por el grupo o el compañero que lidera el ensayo.',
      nivel4: 'Anticipa y facilita los cambios, mostrando flexibilidad y contribuyendo a la cohesión del grupo ante situaciones nuevas.'
    },
    'CO-09': {
      nivel1: 'Se detiene ante cualquier error o dificultad. No logra mantener el flujo musical.',
      nivel2: 'Logra continuar en pasajes conocidos, pero se interrumpe en las secciones de mayor dificultad.',
      nivel3: 'Mantiene la continuidad musical en la mayoría de las situaciones, superando dificultades sin interrumpir el discurso.',
      nivel4: 'Mantiene la continuidad musical con total naturalidad, convirtiendo las incidencias en oportunidades expresivas sin que el público perciba la dificultad.'
    },
    'CO-10': {
      nivel1: 'No identifica los problemas musicales. Depende del profesor para cualquier corrección.',
      nivel2: 'Identifica problemas evidentes con ayuda del profesor, pero no propone soluciones.',
      nivel3: 'Identifica y resuelve problemas musicales habituales de forma autónoma durante el ensayo.',
      nivel4: 'Anticipa problemas potenciales, propone soluciones creativas y guía al grupo en la resolución de incidencias complejas.'
    },
    'CO-11': {
      nivel1: 'Muestra falta de responsabilidad con el grupo. No organiza su tiempo de estudio ni asume compromisos.',
      nivel2: 'Asume responsabilidades básicas pero requiere supervisión constante para mantener la organización del trabajo.',
      nivel3: 'Organiza su trabajo de forma autónoma, asume responsabilidades con el grupo y cumple los compromisos de ensayo.',
      nivel4: 'Lidera la organización del trabajo del grupo, propone objetivos de mejora y fomenta la responsabilidad colectiva.'
    },
    'CO-12': {
      nivel1: 'No reflexiona sobre su interpretación. No identifica aspectos mejorables ni los transfiere a otras situaciones.',
      nivel2: 'Identifica aspectos mejorables con ayuda del profesor, pero no los transfiere a nuevos contextos.',
      nivel3: 'Se autoevalúa de forma crítica y transfiere los aprendizajes a repertorios y contextos similares.',
      nivel4: 'Realiza una autoevaluación rigurosa, identifica patrones de mejora y transfiere estrategias a contextos musicales diversos con autonomía.'
    }
  },
  5: {
    'CO-01': {
      nivel1: 'No prepara el repertorio asignado. Acude a los ensayos sin haber estudiado su parte.',
      nivel2: 'Prepara parcialmente el repertorio. Requiere indicaciones del profesor para priorizar el trabajo.',
      nivel3: 'Prepara el repertorio de forma sistemática y llega a los ensayos con un nivel de dominio que permite avanzar.',
      nivel4: 'Planifica su estudio de forma estratégica, aborda el repertorio con criterio analítico y llega a los ensayos con propuestas interpretativas fundamentadas.'
    },
    'CO-02': {
      nivel1: 'No mantiene el pulso. La coordinación con el grupo es inexistente o muy deficiente.',
      nivel2: 'Mantiene el pulso en secciones de dificultad media, pero presenta desajustes en cambios de métrica o tempo.',
      nivel3: 'Mantiene el pulso con seguridad y se coordina con el grupo incluso en pasajes de complejidad rítmica moderada.',
      nivel4: 'Domina el pulso y la coordinación rítmica con precisión, facilitando la cohesión del grupo en polirritmias y cambios de compás.'
    },
    'CO-03': {
      nivel1: 'No escucha al grupo. Su interpretación es independiente del conjunto.',
      nivel2: 'Escucha al grupo de forma parcial y realiza ajustes limitados a indicaciones externas.',
      nivel3: 'Escucha activamente y ajusta su interpretación en tiempo real, equilibrando su voz con el conjunto.',
      nivel4: 'Desarrolla una escucha multidireccional, identifica relaciones armónicas y contrapuntísticas en tiempo real y ajusta su interpretación para maximizar la cohesión del grupo.'
    },
    'CO-04': {
      nivel1: 'La afinación es imprecisa de forma habitual. El sonido no se integra en el conjunto.',
      nivel2: 'Controla la afinación en registros cómodos, pero presenta desajustes en extremos o en armonías cerradas.',
      nivel3: 'Mantiene una afinación precisa y produce un sonido que se integra correctamente en el equilibrio del grupo.',
      nivel4: 'Domina la afinación en todo el registro, modula el color del sonido según el contexto armónico y contribuye activamente a la cohesión tímbrica del ensemble.'
    },
    'CO-05': {
      nivel1: 'No ejecuta las articulaciones ni dinámicas indicadas. La interpretación carece de matices.',
      nivel2: 'Ejecuta articulaciones y dinámicas de forma correcta pero mecánica, sin sensibilidad estilística.',
      nivel3: 'Ejecuta articulaciones y dinámicas con precisión y coherencia estilística, aportando contraste al discurso.',
      nivel4: 'Domina articulaciones y dinámicas con una sensibilidad expresiva que enriquece el discurso colectivo, adaptando los matices al contexto acústico y estilístico.'
    },
    'CO-06': {
      nivel1: 'No comprende su función en el conjunto. No ajusta su volumen ni su rol.',
      nivel2: 'Comprende su función de forma básica pero no la gestiona con la suficiente autonomía.',
      nivel3: 'Comprende y gestiona su función en el tejido musical, alternando roles de forma coherente con la estructura.',
      nivel4: 'Gestiona con maestría los planos sonoros y los roles dentro del grupo, anticipando cambios de textura y adaptando su contribución a la arquitectura de la obra.'
    },
    'CO-07': {
      nivel1: 'La interpretación carece de intención musical. No hay construcción del discurso.',
      nivel2: 'Muestra intención expresiva pero el discurso es irregular y la construcción formal es débil.',
      nivel3: 'Construye un discurso musical sólido con fraseo, dirección y coherencia estilística.',
      nivel4: 'Ofrece una interpretación madura y personal con una visión global de la obra, integrando forma, estilo y expresión de forma convincente.'
    },
    'CO-08': {
      nivel1: 'No se adapta a los cambios. Se bloquea ante situaciones no previstas.',
      nivel2: 'Se adapta con dificultad y requiere apoyo del grupo para reorganizarse.',
      nivel3: 'Se adapta con fluidez a cambios de tempo, dinámica y decisiones del grupo.',
      nivel4: 'Anticipa y facilita los cambios, mostrando liderazgo musical y contribuyendo a la cohesión del grupo en situaciones de improvisación o variación.'
    },
    'CO-09': {
      nivel1: 'Se interrumpe ante cualquier dificultad. No mantiene el flujo musical.',
      nivel2: 'Mantiene la continuidad en pasajes preparados pero se interrumpe ante imprevistos.',
      nivel3: 'Mantiene la continuidad musical con solvencia, superando dificultades sin romper el discurso.',
      nivel4: 'Mantiene la continuidad musical con total naturalidad en cualquier circunstancia, integrando las incidencias en el discurso sin pérdida de calidad.'
    },
    'CO-10': {
      nivel1: 'No identifica ni resuelve problemas musicales de forma autónoma.',
      nivel2: 'Identifica problemas con ayuda y resuelve los más sencillos.',
      nivel3: 'Identifica y resuelve problemas musicales de forma autónoma, aplicando estrategias de estudio eficaces.',
      nivel4: 'Anticipa problemas, diseña estrategias de resolución innovadoras y transfiere las soluciones a contextos diversos.'
    },
    'CO-11': {
      nivel1: 'No asume responsabilidades con el grupo ni organiza su trabajo de forma autónoma.',
      nivel2: 'Asume responsabilidades básicas pero requiere supervisión para mantener el ritmo de trabajo.',
      nivel3: 'Asume responsabilidades con el grupo, organiza su trabajo de forma autónoma y contribuye al buen funcionamiento del ensemble.',
      nivel4: 'Ejerce un liderazgo positivo en el grupo, fomenta la responsabilidad colectiva y propone estrategias de trabajo que mejoran el rendimiento del ensemble.'
    },
    'CO-12': {
      nivel1: 'No reflexiona sobre su interpretación ni identifica aspectos mejorables.',
      nivel2: 'Identifica aspectos mejorables con ayuda pero no los transfiere a nuevos contextos.',
      nivel3: 'Se autoevalúa de forma crítica y transfiere aprendizajes a situaciones musicales diversas.',
      nivel4: 'Desarrolla un pensamiento metacognitivo avanzado, analiza su proceso de aprendizaje y transfiere estrategias de forma sistemática a contextos musicales nuevos.'
    }
  },
  6: {
    'CO-01': {
      nivel1: 'No prepara el repertorio. Acude a los ensayos sin dominio del material.',
      nivel2: 'Prepara el repertorio de forma insuficiente para el nivel exigido en 6.º curso.',
      nivel3: 'Prepara el repertorio con rigor, llegando a los ensayos con un dominio que permite un trabajo de alto nivel.',
      nivel4: 'Aborda el repertorio con una preparación exhaustiva, analítica y creativa, proponiendo interpretaciones fundamentadas y aportando valor al trabajo del grupo.'
    },
    'CO-02': {
      nivel1: 'No mantiene el pulso ni la coordinación rítmica con el grupo.',
      nivel2: 'Mantiene el pulso en contextos sencillos pero presenta inestabilidad en pasajes complejos.',
      nivel3: 'Mantiene el pulso y la coordinación rítmica con precisión en repertorio de nivel profesional.',
      nivel4: 'Domina el pulso y la coordinación rítmica con total seguridad, liderando al grupo en pasajes de alta complejidad métrica y rítmica.'
    },
    'CO-03': {
      nivel1: 'No escucha al grupo durante la interpretación.',
      nivel2: 'Escucha de forma parcial y realiza ajustes limitados.',
      nivel3: 'Escucha activamente y se ajusta al conjunto con precisión en repertorio exigente.',
      nivel4: 'Desarrolla una escucha polifónica avanzada, percibiendo todas las voces simultáneamente y ajustando su interpretación para optimizar la cohesión armónica, rítmica y expresiva del grupo.'
    },
    'CO-04': {
      nivel1: 'La afinación es deficiente y el sonido no se integra en el conjunto.',
      nivel2: 'Controla la afinación de forma intermitente, con desajustes en contextos armónicos complejos.',
      nivel3: 'Mantiene una afinación precisa y un sonido integrado en el ensemble en repertorio de nivel profesional.',
      nivel4: 'Domina la afinación y el color sonoro con excelencia, adaptando el timbre y la proyección a las exigencias del repertorio y la acústica, contribuyendo a la identidad sonora del grupo.'
    },
    'CO-05': {
      nivel1: 'No ejecuta articulaciones ni dinámicas de forma diferenciada.',
      nivel2: 'Ejecuta articulaciones y dinámicas de forma correcta pero sin sensibilidad estilística avanzada.',
      nivel3: 'Ejecuta articulaciones y dinámicas con precisión estilística y sensibilidad expresiva en repertorio exigente.',
      nivel4: 'Domina las articulaciones y dinámicas con una expresividad que define el carácter de la obra, estableciendo estándares de calidad interpretativa para el grupo.'
    },
    'CO-06': {
      nivel1: 'No gestiona el equilibrio sonoro ni comprende su función en el conjunto.',
      nivel2: 'Comprende su función pero no la gestiona con la autonomía requerida en 6.º curso.',
      nivel3: 'Gestiona el equilibrio sonoro y los roles con autonomía en repertorio de nivel profesional.',
      nivel4: 'Gestiona con maestría los planos sonoros y la arquitectura del conjunto, asumiendo roles de liderazgo musical y tomando decisiones de balance en tiempo real.'
    },
    'CO-07': {
      nivel1: 'La interpretación es mecánica, sin discurso musical ni intención expresiva.',
      nivel2: 'Muestra intención expresiva pero el discurso carece de la madurez esperada en 6.º curso.',
      nivel3: 'Construye un discurso musical maduro, coherente y estilísticamente fundamentado.',
      nivel4: 'Ofrece una interpretación de nivel preprofesional con una visión artística personal, integrando técnica, estilo y expresión de forma orgánica y convincente.'
    },
    'CO-08': {
      nivel1: 'No se adapta a cambios durante la interpretación.',
      nivel2: 'Se adapta con dificultad a situaciones no previstas.',
      nivel3: 'Se adapta con fluidez y naturalidad a cambios de cualquier naturaleza durante la interpretación.',
      nivel4: 'Anticipa, facilita y lidera los cambios, convirtiendo las situaciones imprevistas en oportunidades expresivas y demostrando una flexibilidad artística excepcional.'
    },
    'CO-09': {
      nivel1: 'No mantiene la continuidad musical ante dificultades.',
      nivel2: 'Mantiene la continuidad en contextos conocidos pero se interrumpe ante imprevistos.',
      nivel3: 'Mantiene la continuidad musical con solvencia en cualquier situación del repertorio profesional.',
      nivel4: 'Mantiene la continuidad musical con absoluta naturalidad, gestionando las incidencias como parte integral del discurso sin que se perciba interrupción alguna.'
    },
    'CO-10': {
      nivel1: 'No resuelve problemas musicales de forma autónoma.',
      nivel2: 'Resuelve problemas sencillos pero necesita ayuda en situaciones complejas.',
      nivel3: 'Resuelve problemas musicales complejos de forma autónoma y eficaz.',
      nivel4: 'Anticipa, previene y resuelve problemas musicales con creatividad, desarrollando estrategias transferibles a cualquier contexto profesional.'
    },
    'CO-11': {
      nivel1: 'No asume responsabilidades ni muestra autonomía en el trabajo.',
      nivel2: 'Asume responsabilidades básicas pero no con la autonomía esperada en 6.º curso.',
      nivel3: 'Asume plena responsabilidad en el trabajo del grupo y demuestra autonomía en la organización y ejecución.',
      nivel4: 'Ejerce un liderazgo artístico y organizativo pleno, fomentando la excelencia colectiva y demostrando una madurez profesional que prepara para el acceso a estudios superiores.'
    },
    'CO-12': {
      nivel1: 'No reflexiona sobre su proceso de aprendizaje ni transfiere conocimientos.',
      nivel2: 'Reflexiona superficialmente y transfiere aprendizajes de forma limitada.',
      nivel3: 'Reflexiona de forma crítica sobre su interpretación y transfiere aprendizajes a contextos diversos.',
      nivel4: 'Desarrolla un pensamiento artístico reflexivo y autónomo, analizando su proceso de aprendizaje con rigor y transfiriendo estrategias y conocimientos a cualquier contexto musical, demostrando preparación para la formación superior.'
    }
  }
};

// ============================================================
// RÚBRICAS — Banda
// ============================================================

export const BANDA_RUBRICS: Record<number, Record<string, RubricDescriptor>> = {
  1: {
    'CO-01': {
      nivel1: 'No prepara las partituras asignadas. Acude a los ensayos sin haber trabajado su parte.',
      nivel2: 'Prepara parcialmente las partituras, pero comete errores por falta de estudio.',
      nivel3: 'Prepara las partituras asignadas y acude a los ensayos con un nivel de preparación adecuado.',
      nivel4: 'Prepara las partituras con anticipación, estudia el contexto de la obra y muestra iniciativa en su preparación.'
    },
    'CO-02': {
      nivel1: 'No mantiene el pulso. Se desincroniza constantemente del grupo y la dirección.',
      nivel2: 'Mantiene el pulso en fragmentos sencillos, pero pierde la coordinación en pasajes con mayor dificultad.',
      nivel3: 'Mantiene el pulso y sigue la dirección del director en la mayoría de las secciones.',
      nivel4: 'Mantiene el pulso con seguridad, sigue la dirección con atención y facilita la coordinación de su sección.'
    },
    'CO-03': {
      nivel1: 'No escucha al conjunto. Se centra exclusivamente en su propia parte sin considerar el grupo.',
      nivel2: 'Escucha al conjunto de forma intermitente, pero no realiza ajustes significativos.',
      nivel3: 'Escucha al conjunto y ajusta su interpretación a las indicaciones del director y al sonido global.',
      nivel4: 'Escucha activamente al conjunto, anticipa las intenciones del director y ajusta su interpretación con sensibilidad.'
    },
    'CO-04': {
      nivel1: 'La afinación es imprecisa de forma habitual. No controla la calidad del sonido.',
      nivel2: 'Logra una afinación aceptable en pasajes sencillos, pero presenta desajustes frecuentes.',
      nivel3: 'Mantiene una afinación correcta en la mayoría del repertorio y produce un sonido adecuado al contexto de banda.',
      nivel4: 'Controla la afinación con precisión, adapta el sonido al contexto acústico y contribuye a la afinación colectiva de su sección.'
    },
    'CO-05': {
      nivel1: 'No diferencia las articulaciones ni dinámicas indicadas en la partitura.',
      nivel2: 'Ejecuta articulaciones y dinámicas básicas, pero con falta de contraste o precisión.',
      nivel3: 'Ejecuta correctamente las articulaciones y dinámicas indicadas por el director.',
      nivel4: 'Ejecuta articulaciones y dinámicas con precisión y sensibilidad, aportando contraste y coherencia al conjunto.'
    },
    'CO-06': {
      nivel1: 'No es consciente de su rol en la banda. Toca siempre al mismo volumen.',
      nivel2: 'Comienza a ser consciente de los planos sonoros, pero no se ajusta de forma consistente.',
      nivel3: 'Comprende su función en la banda y ajusta su volumen según las indicaciones del director.',
      nivel4: 'Comprende su función en la estructura de la banda y gestiona su volumen con autonomía para mantener el equilibrio entre secciones.'
    },
    'CO-07': {
      nivel1: 'La interpretación es mecánica, sin fraseo ni intención expresiva.',
      nivel2: 'Muestra intención expresiva básica, pero el fraseo es irregular.',
      nivel3: 'Construye un discurso musical coherente con fraseo y dinámica adecuados a las indicaciones del director.',
      nivel4: 'Ofrece una interpretación expresiva y comprometida, aportando ideas musicales que enriquecen el resultado colectivo.'
    },
    'CO-08': {
      nivel1: 'Se bloquea ante cualquier cambio de tempo o indicación del director.',
      nivel2: 'Se adapta con dificultad a los cambios, necesitando repeticiones para ajustarse.',
      nivel3: 'Se adapta a los cambios de tempo y dinámica indicados por el director.',
      nivel4: 'Se adapta con fluidez a los cambios y anticipa las intenciones del director, facilitando la respuesta del conjunto.'
    },
    'CO-09': {
      nivel1: 'Se detiene ante cualquier error. No logra mantener la continuidad musical.',
      nivel2: 'Logra continuar en pasajes conocidos, pero se interrumpe ante dificultades.',
      nivel3: 'Mantiene la continuidad musical en la mayoría de las situaciones, superando dificultades sin detenerse.',
      nivel4: 'Mantiene la continuidad musical con naturalidad, recuperándose rápidamente de las incidencias sin que se perciba la interrupción.'
    },
    'CO-10': {
      nivel1: 'No identifica problemas musicales. Depende totalmente del director para las correcciones.',
      nivel2: 'Identifica problemas evidentes con ayuda, pero no propone soluciones.',
      nivel3: 'Identifica y resuelve problemas musicales habituales de forma autónoma.',
      nivel4: 'Anticipa problemas potenciales y propone soluciones que benefician al conjunto.'
    },
    'CO-11': {
      nivel1: 'Muestra falta de responsabilidad con el grupo. No organiza su tiempo de estudio.',
      nivel2: 'Asume responsabilidades básicas pero requiere supervisión.',
      nivel3: 'Organiza su trabajo de forma autónoma y cumple los compromisos con el grupo.',
      nivel4: 'Muestra iniciativa en la organización del trabajo y fomenta la responsabilidad en su sección.'
    },
    'CO-12': {
      nivel1: 'No reflexiona sobre su interpretación ni identifica aspectos mejorables.',
      nivel2: 'Identifica aspectos mejorables con ayuda del director.',
      nivel3: 'Se autoevalúa de forma crítica y aplica mejoras en sucesivas interpretaciones.',
      nivel4: 'Realiza una autoevaluación rigurosa, establece objetivos de mejora y transfiere aprendizajes a nuevos repertorios.'
    }
  },
  2: {
    'CO-01': {
      nivel1: 'No prepara las partituras asignadas para el ensayo.',
      nivel2: 'Prepara las partituras de forma incompleta, requiriendo indicaciones para priorizar el trabajo.',
      nivel3: 'Prepara las partituras de forma sistemática y llega a los ensayos con un nivel adecuado.',
      nivel4: 'Planifica su estudio con criterio, aborda el repertorio con análisis previo y muestra iniciativa en la preparación.'
    },
    'CO-02': {
      nivel1: 'No mantiene el pulso de forma consistente con el grupo.',
      nivel2: 'Mantiene el pulso en secciones de dificultad media, pero presenta inestabilidad en cambios de métrica.',
      nivel3: 'Mantiene el pulso con seguridad y se coordina con la dirección y el conjunto.',
      nivel4: 'Mantiene el pulso con precisión y facilita la coordinación de su sección en pasajes complejos.'
    },
    'CO-03': {
      nivel1: 'No escucha al conjunto durante la interpretación.',
      nivel2: 'Escucha de forma parcial y realiza ajustes limitados.',
      nivel3: 'Escucha activamente y ajusta su interpretación al conjunto y a las indicaciones del director.',
      nivel4: 'Escucha de forma integral, identifica desequilibrios y propone ajustes que mejoran el resultado colectivo.'
    },
    'CO-04': {
      nivel1: 'La afinación es imprecisa de forma habitual.',
      nivel2: 'Controla la afinación en contextos sencillos, pero presenta desajustes en pasajes complejos.',
      nivel3: 'Mantiene una afinación correcta y produce un sonido integrado en el conjunto.',
      nivel4: 'Controla la afinación con precisión y adapta el sonido al contexto, contribuyendo a la cohesión de su sección.'
    },
    'CO-05': {
      nivel1: 'No ejecuta articulaciones ni dinámicas diferenciadas.',
      nivel2: 'Ejecuta articulaciones y dinámicas de forma correcta pero sin suficiente contraste.',
      nivel3: 'Ejecuta articulaciones y dinámicas con precisión y coherencia estilística.',
      nivel4: 'Ejecuta articulaciones y dinámicas con sensibilidad expresiva, aportando calidad al discurso colectivo.'
    },
    'CO-06': {
      nivel1: 'No comprende su función en la banda ni ajusta su volumen.',
      nivel2: 'Comprende su función de forma básica pero no la gestiona con autonomía.',
      nivel3: 'Comprende y gestiona su función en la banda, ajustando su volumen según las necesidades del conjunto.',
      nivel4: 'Gestiona los planos sonoros con autonomía y contribuye activamente al equilibrio entre secciones.'
    },
    'CO-07': {
      nivel1: 'La interpretación es mecánica, sin intención expresiva.',
      nivel2: 'Muestra intención expresiva pero el fraseo es irregular.',
      nivel3: 'Construye un discurso musical coherente con fraseo y dirección adecuados.',
      nivel4: 'Ofrece una interpretación expresiva y comprometida, con un discurso musical sólido y estilísticamente fundamentado.'
    },
    'CO-08': {
      nivel1: 'Se bloquea ante cambios no previstos.',
      nivel2: 'Se adapta con dificultad a los cambios de la dirección.',
      nivel3: 'Se adapta con fluidez a los cambios de tempo, dinámica y dirección.',
      nivel4: 'Anticipa los cambios y facilita la respuesta del conjunto ante nuevas indicaciones.'
    },
    'CO-09': {
      nivel1: 'Se interrumpe ante cualquier dificultad.',
      nivel2: 'Mantiene la continuidad en pasajes conocidos pero se detiene ante imprevistos.',
      nivel3: 'Mantiene la continuidad musical con solvencia, superando dificultades sin interrumpir el discurso.',
      nivel4: 'Mantiene la continuidad con naturalidad, convirtiendo las incidencias en parte del discurso sin pérdida de calidad.'
    },
    'CO-10': {
      nivel1: 'No identifica ni resuelve problemas de forma autónoma.',
      nivel2: 'Identifica problemas con ayuda y resuelve los más sencillos.',
      nivel3: 'Identifica y resuelve problemas musicales de forma autónoma.',
      nivel4: 'Anticipa problemas y propone soluciones creativas que benefician al conjunto.'
    },
    'CO-11': {
      nivel1: 'No asume responsabilidades ni organiza su trabajo.',
      nivel2: 'Asume responsabilidades básicas con supervisión.',
      nivel3: 'Organiza su trabajo de forma autónoma y asume responsabilidades con el grupo.',
      nivel4: 'Lidera la organización del trabajo en su sección y fomenta la responsabilidad colectiva.'
    },
    'CO-12': {
      nivel1: 'No reflexiona sobre su interpretación.',
      nivel2: 'Identifica aspectos mejorables con ayuda.',
      nivel3: 'Se autoevalúa de forma crítica y aplica mejoras en sucesivas interpretaciones.',
      nivel4: 'Realiza una autoevaluación rigurosa y transfiere aprendizajes a contextos musicales diversos.'
    }
  },
  3: {
    'CO-01': {
      nivel1: 'No prepara el repertorio asignado.',
      nivel2: 'Prepara el repertorio de forma incompleta para el nivel de 3.º curso.',
      nivel3: 'Prepara el repertorio con rigor y llega a los ensayos con un dominio adecuado.',
      nivel4: 'Aborda el repertorio con criterio analítico, investiga el contexto y propone ideas interpretativas.'
    },
    'CO-02': {
      nivel1: 'No mantiene el pulso ni la coordinación con el grupo.',
      nivel2: 'Mantiene el pulso en contextos sencillos pero presenta inestabilidad rítmica.',
      nivel3: 'Mantiene el pulso y se coordina con el grupo en repertorio de nivel medio.',
      nivel4: 'Domina el pulso y la coordinación, facilitando la cohesión rítmica del conjunto.'
    },
    'CO-03': {
      nivel1: 'No escucha al conjunto durante la interpretación.',
      nivel2: 'Escucha de forma parcial y ajusta limitadamente.',
      nivel3: 'Escucha activamente y ajusta su interpretación al conjunto con precisión.',
      nivel4: 'Desarrolla una escucha integral, identificando relaciones entre voces y ajustando su interpretación en consecuencia.'
    },
    'CO-04': {
      nivel1: 'La afinación es deficiente de forma habitual.',
      nivel2: 'Controla la afinación en contextos básicos pero presenta desajustes en armonías complejas.',
      nivel3: 'Mantiene una afinación precisa y un sonido integrado en el conjunto.',
      nivel4: 'Domina la afinación en todo el registro y adapta el color sonoro al contexto estilístico.'
    },
    'CO-05': {
      nivel1: 'No ejecuta articulaciones ni dinámicas diferenciadas.',
      nivel2: 'Ejecuta articulaciones y dinámicas de forma correcta pero mecánica.',
      nivel3: 'Ejecuta articulaciones y dinámicas con precisión y sensibilidad estilística.',
      nivel4: 'Domina articulaciones y dinámicas con expresividad, enriqueciendo el discurso colectivo.'
    },
    'CO-06': {
      nivel1: 'No gestiona el equilibrio sonoro ni su función en el conjunto.',
      nivel2: 'Comprende su función pero no la gestiona con autonomía.',
      nivel3: 'Gestiona su función y el equilibrio sonoro con autonomía en el conjunto.',
      nivel4: 'Gestiona los planos sonoros con maestría, asumiendo diferentes roles según la estructura de la obra.'
    },
    'CO-07': {
      nivel1: 'La interpretación es mecánica, sin discurso musical.',
      nivel2: 'Muestra intención expresiva pero el discurso es débil.',
      nivel3: 'Construye un discurso musical coherente y estilísticamente fundamentado.',
      nivel4: 'Ofrece una interpretación madura con una visión personal que enriquece el resultado colectivo.'
    },
    'CO-08': {
      nivel1: 'No se adapta a cambios durante la interpretación.',
      nivel2: 'Se adapta con dificultad a situaciones no previstas.',
      nivel3: 'Se adapta con fluidez a cambios de tempo, dinámica y dirección.',
      nivel4: 'Anticipa y facilita los cambios, mostrando flexibilidad y liderazgo musical.'
    },
    'CO-09': {
      nivel1: 'No mantiene la continuidad ante dificultades.',
      nivel2: 'Mantiene la continuidad en contextos conocidos pero se interrumpe ante imprevistos.',
      nivel3: 'Mantiene la continuidad musical con solvencia en cualquier situación.',
      nivel4: 'Mantiene la continuidad con total naturalidad, gestionando las incidencias como parte del discurso.'
    },
    'CO-10': {
      nivel1: 'No resuelve problemas de forma autónoma.',
      nivel2: 'Resuelve problemas sencillos con ayuda.',
      nivel3: 'Identifica y resuelve problemas musicales de forma autónoma.',
      nivel4: 'Anticipa problemas, propone soluciones creativas y transfiere estrategias a nuevos contextos.'
    },
    'CO-11': {
      nivel1: 'No asume responsabilidades ni muestra autonomía.',
      nivel2: 'Asume responsabilidades básicas con supervisión.',
      nivel3: 'Asume responsabilidades con el grupo y organiza su trabajo de forma autónoma.',
      nivel4: 'Ejerce un liderazgo positivo, fomenta la responsabilidad colectiva y propone mejoras.'
    },
    'CO-12': {
      nivel1: 'No reflexiona sobre su aprendizaje.',
      nivel2: 'Reflexiona superficialmente con ayuda.',
      nivel3: 'Se autoevalúa de forma crítica y transfiere aprendizajes a situaciones similares.',
      nivel4: 'Desarrolla un pensamiento reflexivo avanzado y transfiere estrategias a contextos diversos.'
    }
  },
  4: {
    'CO-01': {
      nivel1: 'No prepara el repertorio asignado.',
      nivel2: 'Prepara el repertorio de forma insuficiente para el nivel de 4.º curso.',
      nivel3: 'Prepara el repertorio con rigor y llega a los ensayos con dominio suficiente.',
      nivel4: 'Planifica su estudio de forma estratégica y aborda el repertorio con criterio analítico y propositivo.'
    },
    'CO-02': {
      nivel1: 'No mantiene el pulso ni la coordinación con el grupo.',
      nivel2: 'Mantiene el pulso en secciones de dificultad media pero presenta inestabilidad.',
      nivel3: 'Mantiene el pulso con seguridad y se coordina con el grupo en repertorio exigente.',
      nivel4: 'Domina el pulso y la coordinación, liderando la cohesión rítmica del conjunto en pasajes complejos.'
    },
    'CO-03': {
      nivel1: 'No escucha al conjunto.',
      nivel2: 'Escucha de forma parcial y ajusta limitadamente.',
      nivel3: 'Escucha activamente y ajusta su interpretación al conjunto con precisión.',
      nivel4: 'Desarrolla una escucha multidireccional, identificando relaciones armónicas y ajustando su interpretación en tiempo real.'
    },
    'CO-04': {
      nivel1: 'La afinación es deficiente.',
      nivel2: 'Controla la afinación en contextos básicos pero presenta desajustes.',
      nivel3: 'Mantiene una afinación precisa y un sonido integrado en el conjunto.',
      nivel4: 'Domina la afinación y el color sonoro, contribuyendo activamente a la cohesión tímbrica.'
    },
    'CO-05': {
      nivel1: 'No ejecuta articulaciones ni dinámicas diferenciadas.',
      nivel2: 'Ejecuta articulaciones y dinámicas de forma correcta pero mecánica.',
      nivel3: 'Ejecuta articulaciones y dinámicas con precisión y sensibilidad estilística.',
      nivel4: 'Domina articulaciones y dinámicas con expresividad que enriquece el discurso colectivo.'
    },
    'CO-06': {
      nivel1: 'No gestiona el equilibrio ni su función.',
      nivel2: 'Comprende su función pero no la gestiona con autonomía.',
      nivel3: 'Gestiona su función y el equilibrio sonoro con autonomía.',
      nivel4: 'Gestiona los planos sonoros con maestría, alternando roles y liderando el equilibrio del conjunto.'
    },
    'CO-07': {
      nivel1: 'La interpretación es mecánica.',
      nivel2: 'Muestra intención expresiva pero el discurso es irregular.',
      nivel3: 'Construye un discurso musical sólido y estilísticamente fundamentado.',
      nivel4: 'Ofrece una interpretación madura con visión personal que define el carácter de la obra.'
    },
    'CO-08': {
      nivel1: 'No se adapta a cambios.',
      nivel2: 'Se adapta con dificultad.',
      nivel3: 'Se adapta con fluidez a cambios de cualquier naturaleza.',
      nivel4: 'Anticipa y facilita los cambios, mostrando liderazgo musical.'
    },
    'CO-09': {
      nivel1: 'No mantiene la continuidad.',
      nivel2: 'Mantiene la continuidad en contextos conocidos.',
      nivel3: 'Mantiene la continuidad con solvencia en cualquier situación.',
      nivel4: 'Mantiene la continuidad con total naturalidad, integrando las incidencias en el discurso.'
    },
    'CO-10': {
      nivel1: 'No resuelve problemas de forma autónoma.',
      nivel2: 'Resuelve problemas sencillos con ayuda.',
      nivel3: 'Identifica y resuelve problemas de forma autónoma.',
      nivel4: 'Anticipa problemas y diseña estrategias de resolución innovadoras.'
    },
    'CO-11': {
      nivel1: 'No asume responsabilidades.',
      nivel2: 'Asume responsabilidades básicas con supervisión.',
      nivel3: 'Asume plena responsabilidad y organiza su trabajo de forma autónoma.',
      nivel4: 'Ejerce liderazgo positivo y fomenta la excelencia colectiva.'
    },
    'CO-12': {
      nivel1: 'No reflexiona sobre su aprendizaje.',
      nivel2: 'Reflexiona superficialmente.',
      nivel3: 'Se autoevalúa críticamente y transfiere aprendizajes.',
      nivel4: 'Desarrolla pensamiento metacognitivo avanzado y transfiere estrategias de forma sistemática.'
    }
  },
  5: {
    'CO-01': {
      nivel1: 'No prepara el repertorio asignado.',
      nivel2: 'Prepara el repertorio de forma insuficiente para el nivel exigido.',
      nivel3: 'Prepara el repertorio con rigor y dominio, llegando a los ensayos con un nivel avanzado.',
      nivel4: 'Aborda el repertorio con una preparación exhaustiva, analítica y creativa, aportando valor al trabajo colectivo.'
    },
    'CO-02': {
      nivel1: 'No mantiene el pulso ni la coordinación.',
      nivel2: 'Mantiene el pulso en contextos sencillos pero presenta inestabilidad.',
      nivel3: 'Mantiene el pulso con precisión en repertorio de nivel avanzado.',
      nivel4: 'Domina el pulso y la coordinación con excelencia, liderando la cohesión del conjunto.'
    },
    'CO-03': {
      nivel1: 'No escucha al conjunto.',
      nivel2: 'Escucha de forma parcial.',
      nivel3: 'Escucha activamente y se ajusta al conjunto con precisión.',
      nivel4: 'Desarrolla una escucha polifónica avanzada, optimizando la cohesión armónica y expresiva.'
    },
    'CO-04': {
      nivel1: 'La afinación es deficiente.',
      nivel2: 'Controla la afinación de forma intermitente.',
      nivel3: 'Mantiene afinación precisa y sonido integrado en repertorio exigente.',
      nivel4: 'Domina afinación y color sonoro con excelencia, definiendo la identidad tímbrica del conjunto.'
    },
    'CO-05': {
      nivel1: 'No ejecuta articulaciones ni dinámicas diferenciadas.',
      nivel2: 'Ejecuta de forma correcta pero sin sensibilidad avanzada.',
      nivel3: 'Ejecuta con precisión estilística y sensibilidad expresiva.',
      nivel4: 'Domina con expresividad que define el carácter de la obra y establece estándares de calidad.'
    },
    'CO-06': {
      nivel1: 'No gestiona el equilibrio ni su función.',
      nivel2: 'Comprende su función pero no la gestiona con autonomía.',
      nivel3: 'Gestiona el equilibrio y los roles con autonomía en repertorio avanzado.',
      nivel4: 'Gestiona con maestría los planos sonoros, liderando el equilibrio y la arquitectura del conjunto.'
    },
    'CO-07': {
      nivel1: 'La interpretación es mecánica.',
      nivel2: 'Muestra intención pero el discurso carece de madurez.',
      nivel3: 'Construye un discurso musical maduro y estilísticamente fundamentado.',
      nivel4: 'Ofrece una interpretación de nivel preprofesional con visión artística personal.'
    },
    'CO-08': {
      nivel1: 'No se adapta a cambios.',
      nivel2: 'Se adapta con dificultad.',
      nivel3: 'Se adapta con fluidez y naturalidad a cambios de cualquier naturaleza.',
      nivel4: 'Anticipa, facilita y lidera los cambios, demostrando flexibilidad artística excepcional.'
    },
    'CO-09': {
      nivel1: 'No mantiene la continuidad.',
      nivel2: 'Mantiene en contextos conocidos.',
      nivel3: 'Mantiene con solvencia en repertorio de nivel profesional.',
      nivel4: 'Mantiene con absoluta naturalidad, gestionando incidencias como parte del discurso.'
    },
    'CO-10': {
      nivel1: 'No resuelve problemas autónomamente.',
      nivel2: 'Resuelve problemas sencillos con ayuda.',
      nivel3: 'Resuelve problemas complejos de forma autónoma.',
      nivel4: 'Anticipa, previene y resuelve con creatividad, desarrollando estrategias transferibles.'
    },
    'CO-11': {
      nivel1: 'No asume responsabilidades.',
      nivel2: 'Asume responsabilidades básicas.',
      nivel3: 'Asume plena responsabilidad con autonomía.',
      nivel4: 'Ejerce liderazgo artístico y organizativo pleno, fomentando la excelencia colectiva.'
    },
    'CO-12': {
      nivel1: 'No reflexiona sobre su aprendizaje.',
      nivel2: 'Reflexiona superficialmente.',
      nivel3: 'Reflexiona críticamente y transfiere aprendizajes.',
      nivel4: 'Desarrolla pensamiento artístico reflexivo y autónomo, transfiriendo estrategias a cualquier contexto.'
    }
  },
  6: {
    'CO-01': {
      nivel1: 'No prepara el repertorio.',
      nivel2: 'Prepara de forma insuficiente para el nivel de 6.º curso.',
      nivel3: 'Prepara con rigor y dominio de nivel profesional.',
      nivel4: 'Aborda el repertorio con preparación exhaustiva, analítica y creativa, aportando valor artístico al conjunto.'
    },
    'CO-02': {
      nivel1: 'No mantiene el pulso ni la coordinación.',
      nivel2: 'Mantiene el pulso en contextos sencillos.',
      nivel3: 'Mantiene el pulso con precisión en repertorio de nivel profesional.',
      nivel4: 'Domina el pulso y la coordinación con total seguridad, liderando al conjunto en pasajes de alta complejidad.'
    },
    'CO-03': {
      nivel1: 'No escucha al conjunto.',
      nivel2: 'Escucha de forma parcial.',
      nivel3: 'Escucha activamente y se ajusta con precisión en repertorio profesional.',
      nivel4: 'Desarrolla escucha polifónica avanzada, percibiendo todas las voces y optimizando la cohesión global.'
    },
    'CO-04': {
      nivel1: 'La afinación es deficiente.',
      nivel2: 'Controla la afinación de forma intermitente.',
      nivel3: 'Mantiene afinación precisa y sonido integrado en nivel profesional.',
      nivel4: 'Domina afinación y color sonoro con excelencia, adaptando timbre y proyección a las exigencias del repertorio.'
    },
    'CO-05': {
      nivel1: 'No ejecuta articulaciones ni dinámicas diferenciadas.',
      nivel2: 'Ejecuta de forma correcta pero sin sensibilidad avanzada.',
      nivel3: 'Ejecuta con precisión estilística y sensibilidad expresiva en nivel profesional.',
      nivel4: 'Domina con expresividad que define el carácter de la obra, estableciendo estándares de calidad para el conjunto.'
    },
    'CO-06': {
      nivel1: 'No gestiona el equilibrio ni su función.',
      nivel2: 'Comprende su función pero no la gestiona con la autonomía de 6.º curso.',
      nivel3: 'Gestiona el equilibrio y los roles con autonomía en nivel profesional.',
      nivel4: 'Gestiona con maestría los planos sonoros y la arquitectura del conjunto, asumiendo roles de liderazgo musical.'
    },
    'CO-07': {
      nivel1: 'La interpretación es mecánica.',
      nivel2: 'Muestra intención pero carece de madurez para 6.º curso.',
      nivel3: 'Construye un discurso musical maduro y estilísticamente fundamentado.',
      nivel4: 'Ofrece una interpretación de nivel preprofesional con visión artística personal y convincente.'
    },
    'CO-08': {
      nivel1: 'No se adapta a cambios.',
      nivel2: 'Se adapta con dificultad.',
      nivel3: 'Se adapta con fluidez y naturalidad a cualquier cambio.',
      nivel4: 'Anticipa, facilita y lidera los cambios, convirtiendo lo imprevisto en oportunidad expresiva.'
    },
    'CO-09': {
      nivel1: 'No mantiene la continuidad.',
      nivel2: 'Mantiene en contextos conocidos.',
      nivel3: 'Mantiene con solvencia en cualquier situación profesional.',
      nivel4: 'Mantiene con absoluta naturalidad, gestionando incidencias como parte integral del discurso.'
    },
    'CO-10': {
      nivel1: 'No resuelve problemas autónomamente.',
      nivel2: 'Resuelve problemas sencillos con ayuda.',
      nivel3: 'Resuelve problemas complejos de forma autónoma y eficaz.',
      nivel4: 'Anticipa, previene y resuelve con creatividad, desarrollando estrategias transferibles a cualquier contexto profesional.'
    },
    'CO-11': {
      nivel1: 'No asume responsabilidades.',
      nivel2: 'Asume responsabilidades básicas sin la autonomía de 6.º curso.',
      nivel3: 'Asume plena responsabilidad con autonomía profesional.',
      nivel4: 'Ejerce liderazgo artístico y organizativo pleno, demostrando madurez profesional para estudios superiores.'
    },
    'CO-12': {
      nivel1: 'No reflexiona sobre su aprendizaje.',
      nivel2: 'Reflexiona superficialmente.',
      nivel3: 'Reflexiona críticamente y transfiere aprendizajes a contextos diversos.',
      nivel4: 'Desarrolla pensamiento artístico reflexivo y autónomo, transfiriendo estrategias a cualquier contexto musical con preparación para la formación superior.'
    }
  }
};

// ============================================================
// RÚBRICAS — Orquesta
// ============================================================

export const ORQUESTA_RUBRICS: Record<number, Record<string, RubricDescriptor>> = {
  1: {
    'CO-01': {
      nivel1: 'No prepara las partituras asignadas. Acude a los ensayos sin haber trabajado su parte.',
      nivel2: 'Prepara parcialmente las partituras, pero comete errores por falta de estudio.',
      nivel3: 'Prepara las partituras asignadas y acude a los ensayos con un nivel de preparación adecuado al primer curso.',
      nivel4: 'Prepara las partituras con anticipación, estudia la obra en su conjunto y muestra iniciativa en su preparación.'
    },
    'CO-02': {
      nivel1: 'No mantiene el pulso. Se desincroniza constantemente de la dirección y el grupo.',
      nivel2: 'Mantiene el pulso en fragmentos sencillos, pero pierde la coordinación en pasajes con mayor dificultad.',
      nivel3: 'Mantiene el pulso y sigue la dirección del director en la mayoría de las secciones.',
      nivel4: 'Mantiene el pulso con seguridad, sigue la batuta con atención y facilita la coordinación de su atril.'
    },
    'CO-03': {
      nivel1: 'No escucha al conjunto. Se centra exclusivamente en su propia parte.',
      nivel2: 'Escucha al conjunto de forma intermitente, pero no realiza ajustes significativos.',
      nivel3: 'Escucha al conjunto y ajusta su interpretación a las indicaciones del director y al sonido de la orquesta.',
      nivel4: 'Escucha activamente al conjunto, anticipa las intenciones del director y ajusta su interpretación con sensibilidad al contexto orquestal.'
    },
    'CO-04': {
      nivel1: 'La afinación es imprecisa de forma habitual. No controla la calidad del sonido.',
      nivel2: 'Logra una afinación aceptable en pasajes sencillos, pero presenta desajustes frecuentes.',
      nivel3: 'Mantiene una afinación correcta en la mayoría del repertorio y produce un sonido adecuado al contexto orquestal.',
      nivel4: 'Controla la afinación con precisión, adapta el sonido a la acústica y contribuye a la afinación colectiva de su sección.'
    },
    'CO-05': {
      nivel1: 'No diferencia las articulaciones ni dinámicas indicadas en la partitura.',
      nivel2: 'Ejecuta articulaciones y dinámicas básicas, pero con falta de contraste.',
      nivel3: 'Ejecuta correctamente las articulaciones y dinámicas indicadas por el director.',
      nivel4: 'Ejecuta articulaciones y dinámicas con precisión y sensibilidad, aportando coherencia al sonido de su sección.'
    },
    'CO-06': {
      nivel1: 'No es consciente de su rol en la orquesta. Toca siempre al mismo volumen.',
      nivel2: 'Comienza a ser consciente de los planos sonoros, pero no se ajusta de forma consistente.',
      nivel3: 'Comprende su función en la orquesta y ajusta su volumen según las indicaciones del director.',
      nivel4: 'Comprende su función en la estructura orquestal y gestiona su volumen con autonomía para mantener el equilibrio entre secciones.'
    },
    'CO-07': {
      nivel1: 'La interpretación es mecánica, sin fraseo ni intención expresiva.',
      nivel2: 'Muestra intención expresiva básica, pero el fraseo es irregular.',
      nivel3: 'Construye un discurso musical coherente con fraseo adecuado a las indicaciones del director.',
      nivel4: 'Ofrece una interpretación expresiva y comprometida, aportando ideas musicales al resultado colectivo.'
    },
    'CO-08': {
      nivel1: 'Se bloquea ante cualquier cambio de tempo o indicación del director.',
      nivel2: 'Se adapta con dificultad a los cambios, necesitando repeticiones.',
      nivel3: 'Se adapta a los cambios de tempo y dinámica indicados por el director.',
      nivel4: 'Se adapta con fluidez a los cambios y anticipa las intenciones del director.'
    },
    'CO-09': {
      nivel1: 'Se detiene ante cualquier error. No logra mantener la continuidad musical.',
      nivel2: 'Logra continuar en pasajes conocidos, pero se interrumpe ante dificultades.',
      nivel3: 'Mantiene la continuidad musical en la mayoría de las situaciones.',
      nivel4: 'Mantiene la continuidad musical con naturalidad, recuperándose rápidamente de las incidencias.'
    },
    'CO-10': {
      nivel1: 'No identifica problemas musicales. Depende totalmente del director.',
      nivel2: 'Identifica problemas evidentes con ayuda, pero no propone soluciones.',
      nivel3: 'Identifica y resuelve problemas musicales habituales de forma autónoma.',
      nivel4: 'Anticipa problemas potenciales y propone soluciones que benefician al conjunto.'
    },
    'CO-11': {
      nivel1: 'Muestra falta de responsabilidad con el grupo. No organiza su tiempo de estudio.',
      nivel2: 'Asume responsabilidades básicas pero requiere supervisión.',
      nivel3: 'Organiza su trabajo de forma autónoma y cumple los compromisos con la orquesta.',
      nivel4: 'Muestra iniciativa en la organización del trabajo y fomenta la responsabilidad en su sección.'
    },
    'CO-12': {
      nivel1: 'No reflexiona sobre su interpretación.',
      nivel2: 'Identifica aspectos mejorables con ayuda del director.',
      nivel3: 'Se autoevalúa de forma crítica y aplica mejoras en sucesivas interpretaciones.',
      nivel4: 'Realiza una autoevaluación rigurosa, establece objetivos y transfiere aprendizajes a nuevos repertorios.'
    }
  },
  2: {
    'CO-01': {
      nivel1: 'No prepara las partituras asignadas.',
      nivel2: 'Prepara de forma incompleta, requiriendo indicaciones para priorizar.',
      nivel3: 'Prepara de forma sistemática y llega a los ensayos con nivel adecuado.',
      nivel4: 'Planifica su estudio con criterio, analiza el repertorio y muestra iniciativa.'
    },
    'CO-02': {
      nivel1: 'No mantiene el pulso de forma consistente.',
      nivel2: 'Mantiene el pulso en secciones de dificultad media pero presenta inestabilidad.',
      nivel3: 'Mantiene el pulso con seguridad y se coordina con la dirección.',
      nivel4: 'Mantiene el pulso con precisión y facilita la coordinación de su atril.'
    },
    'CO-03': {
      nivel1: 'No escucha al conjunto.',
      nivel2: 'Escucha de forma parcial y ajusta limitadamente.',
      nivel3: 'Escucha activamente y ajusta su interpretación al conjunto.',
      nivel4: 'Escucha de forma integral, identifica desequilibrios y propone ajustes.'
    },
    'CO-04': {
      nivel1: 'La afinación es imprecisa de forma habitual.',
      nivel2: 'Controla la afinación en contextos sencillos pero presenta desajustes.',
      nivel3: 'Mantiene afinación correcta y sonido integrado en el conjunto.',
      nivel4: 'Controla la afinación con precisión y contribuye a la cohesión de su sección.'
    },
    'CO-05': {
      nivel1: 'No ejecuta articulaciones ni dinámicas diferenciadas.',
      nivel2: 'Ejecuta de forma correcta pero sin suficiente contraste.',
      nivel3: 'Ejecuta con precisión y coherencia estilística.',
      nivel4: 'Ejecuta con sensibilidad expresiva, aportando calidad al discurso.'
    },
    'CO-06': {
      nivel1: 'No comprende su función en la orquesta.',
      nivel2: 'Comprende su función de forma básica pero no la gestiona con autonomía.',
      nivel3: 'Comprende y gestiona su función, ajustando su volumen al conjunto.',
      nivel4: 'Gestiona los planos sonoros con autonomía y contribuye al equilibrio entre secciones.'
    },
    'CO-07': {
      nivel1: 'La interpretación es mecánica.',
      nivel2: 'Muestra intención expresiva pero el fraseo es irregular.',
      nivel3: 'Construye un discurso musical coherente con fraseo adecuado.',
      nivel4: 'Ofrece una interpretación expresiva con discurso sólido y fundamentado.'
    },
    'CO-08': {
      nivel1: 'Se bloquea ante cambios no previstos.',
      nivel2: 'Se adapta con dificultad a la dirección.',
      nivel3: 'Se adapta con fluidez a cambios de tempo y dinámica.',
      nivel4: 'Anticipa los cambios y facilita la respuesta del conjunto.'
    },
    'CO-09': {
      nivel1: 'Se interrumpe ante cualquier dificultad.',
      nivel2: 'Mantiene la continuidad en pasajes conocidos.',
      nivel3: 'Mantiene la continuidad con solvencia.',
      nivel4: 'Mantiene la continuidad con naturalidad, integrando incidencias en el discurso.'
    },
    'CO-10': {
      nivel1: 'No identifica ni resuelve problemas autónomamente.',
      nivel2: 'Identifica problemas con ayuda y resuelve los sencillos.',
      nivel3: 'Identifica y resuelve problemas de forma autónoma.',
      nivel4: 'Anticipa problemas y propone soluciones creativas.'
    },
    'CO-11': {
      nivel1: 'No asume responsabilidades.',
      nivel2: 'Asume responsabilidades básicas con supervisión.',
      nivel3: 'Organiza su trabajo autónomamente y asume responsabilidades.',
      nivel4: 'Lidera la organización del trabajo y fomenta la responsabilidad colectiva.'
    },
    'CO-12': {
      nivel1: 'No reflexiona sobre su interpretación.',
      nivel2: 'Identifica aspectos mejorables con ayuda.',
      nivel3: 'Se autoevalúa críticamente y aplica mejoras.',
      nivel4: 'Realiza autoevaluación rigurosa y transfiere aprendizajes.'
    }
  },
  3: {
    'CO-01': {
      nivel1: 'No prepara el repertorio asignado.',
      nivel2: 'Prepara de forma incompleta para el nivel de 3.º curso.',
      nivel3: 'Prepara con rigor y llega a los ensayos con dominio adecuado.',
      nivel4: 'Aborda el repertorio con criterio analítico y propone ideas interpretativas.'
    },
    'CO-02': {
      nivel1: 'No mantiene el pulso ni la coordinación.',
      nivel2: 'Mantiene el pulso en contextos sencillos pero presenta inestabilidad.',
      nivel3: 'Mantiene el pulso y se coordina con el grupo en repertorio de nivel medio.',
      nivel4: 'Domina el pulso y la coordinación, facilitando la cohesión del conjunto.'
    },
    'CO-03': {
      nivel1: 'No escucha al conjunto.',
      nivel2: 'Escucha de forma parcial.',
      nivel3: 'Escucha activamente y ajusta su interpretación con precisión.',
      nivel4: 'Desarrolla escucha integral, identificando relaciones entre secciones.'
    },
    'CO-04': {
      nivel1: 'La afinación es deficiente.',
      nivel2: 'Controla la afinación en contextos básicos.',
      nivel3: 'Mantiene afinación precisa y sonido integrado.',
      nivel4: 'Domina la afinación y adapta el color sonoro al contexto estilístico.'
    },
    'CO-05': {
      nivel1: 'No ejecuta articulaciones ni dinámicas diferenciadas.',
      nivel2: 'Ejecuta de forma correcta pero mecánica.',
      nivel3: 'Ejecuta con precisión y sensibilidad estilística.',
      nivel4: 'Domina con expresividad, enriqueciendo el discurso colectivo.'
    },
    'CO-06': {
      nivel1: 'No gestiona el equilibrio ni su función.',
      nivel2: 'Comprende su función pero no la gestiona con autonomía.',
      nivel3: 'Gestiona su función y el equilibrio con autonomía.',
      nivel4: 'Gestiona los planos sonoros con maestría, asumiendo diferentes roles.'
    },
    'CO-07': {
      nivel1: 'La interpretación es mecánica.',
      nivel2: 'Muestra intención pero el discurso es débil.',
      nivel3: 'Construye un discurso coherente y fundamentado.',
      nivel4: 'Ofrece una interpretación madura con visión personal.'
    },
    'CO-08': {
      nivel1: 'No se adapta a cambios.',
      nivel2: 'Se adapta con dificultad.',
      nivel3: 'Se adapta con fluidez a cambios de dirección.',
      nivel4: 'Anticipa y facilita los cambios, mostrando liderazgo.'
    },
    'CO-09': {
      nivel1: 'No mantiene la continuidad.',
      nivel2: 'Mantiene en contextos conocidos.',
      nivel3: 'Mantiene con solvencia en cualquier situación.',
      nivel4: 'Mantiene con total naturalidad, integrando incidencias.'
    },
    'CO-10': {
      nivel1: 'No resuelve problemas autónomamente.',
      nivel2: 'Resuelve problemas sencillos con ayuda.',
      nivel3: 'Identifica y resuelve problemas de forma autónoma.',
      nivel4: 'Anticipa problemas y propone soluciones creativas.'
    },
    'CO-11': {
      nivel1: 'No asume responsabilidades.',
      nivel2: 'Asume responsabilidades básicas con supervisión.',
      nivel3: 'Asume responsabilidades y organiza su trabajo autónomamente.',
      nivel4: 'Ejerce liderazgo positivo y fomenta la responsabilidad colectiva.'
    },
    'CO-12': {
      nivel1: 'No reflexiona sobre su aprendizaje.',
      nivel2: 'Reflexiona superficialmente con ayuda.',
      nivel3: 'Se autoevalúa críticamente y transfiere aprendizajes.',
      nivel4: 'Desarrolla pensamiento reflexivo avanzado y transfiere estrategias.'
    }
  },
  4: {
    'CO-01': {
      nivel1: 'No prepara el repertorio asignado.',
      nivel2: 'Prepara de forma insuficiente para 4.º curso.',
      nivel3: 'Prepara con rigor y dominio suficiente para el nivel.',
      nivel4: 'Planifica su estudio estratégicamente y aborda el repertorio con criterio analítico.'
    },
    'CO-02': {
      nivel1: 'No mantiene el pulso ni la coordinación.',
      nivel2: 'Mantiene el pulso en secciones de dificultad media.',
      nivel3: 'Mantiene el pulso con seguridad en repertorio exigente.',
      nivel4: 'Domina el pulso y lidera la cohesión rítmica del conjunto.'
    },
    'CO-03': {
      nivel1: 'No escucha al conjunto.',
      nivel2: 'Escucha de forma parcial.',
      nivel3: 'Escucha activamente y se ajusta con precisión.',
      nivel4: 'Desarrolla escucha multidireccional, identificando relaciones armónicas en tiempo real.'
    },
    'CO-04': {
      nivel1: 'La afinación es deficiente.',
      nivel2: 'Controla la afinación en contextos básicos.',
      nivel3: 'Mantiene afinación precisa y sonido integrado.',
      nivel4: 'Domina afinación y color sonoro, contribuyendo a la cohesión tímbrica.'
    },
    'CO-05': {
      nivel1: 'No ejecuta articulaciones ni dinámicas diferenciadas.',
      nivel2: 'Ejecuta de forma correcta pero mecánica.',
      nivel3: 'Ejecuta con precisión y sensibilidad estilística.',
      nivel4: 'Domina con expresividad que enriquece el discurso colectivo.'
    },
    'CO-06': {
      nivel1: 'No gestiona el equilibrio ni su función.',
      nivel2: 'Comprende su función pero no la gestiona con autonomía.',
      nivel3: 'Gestiona su función y el equilibrio con autonomía.',
      nivel4: 'Gestiona los planos sonoros con maestría, liderando el equilibrio.'
    },
    'CO-07': {
      nivel1: 'La interpretación es mecánica.',
      nivel2: 'Muestra intención pero el discurso es irregular.',
      nivel3: 'Construye un discurso sólido y fundamentado.',
      nivel4: 'Ofrece una interpretación madura con visión personal.'
    },
    'CO-08': {
      nivel1: 'No se adapta a cambios.',
      nivel2: 'Se adapta con dificultad.',
      nivel3: 'Se adapta con fluidez a cualquier cambio.',
      nivel4: 'Anticipa y facilita los cambios con liderazgo musical.'
    },
    'CO-09': {
      nivel1: 'No mantiene la continuidad.',
      nivel2: 'Mantiene en contextos conocidos.',
      nivel3: 'Mantiene con solvencia en cualquier situación.',
      nivel4: 'Mantiene con total naturalidad, integrando incidencias.'
    },
    'CO-10': {
      nivel1: 'No resuelve problemas autónomamente.',
      nivel2: 'Resuelve problemas sencillos con ayuda.',
      nivel3: 'Identifica y resuelve problemas de forma autónoma.',
      nivel4: 'Anticipa problemas y diseña estrategias innovadoras.'
    },
    'CO-11': {
      nivel1: 'No asume responsabilidades.',
      nivel2: 'Asume responsabilidades básicas con supervisión.',
      nivel3: 'Asume plena responsabilidad con autonomía.',
      nivel4: 'Ejerce liderazgo positivo y fomenta la excelencia colectiva.'
    },
    'CO-12': {
      nivel1: 'No reflexiona sobre su aprendizaje.',
      nivel2: 'Reflexiona superficialmente.',
      nivel3: 'Se autoevalúa críticamente y transfiere aprendizajes.',
      nivel4: 'Desarrolla pensamiento metacognitivo avanzado.'
    }
  },
  5: {
    'CO-01': {
      nivel1: 'No prepara el repertorio.',
      nivel2: 'Prepara de forma insuficiente para el nivel exigido.',
      nivel3: 'Prepara con rigor y dominio avanzado.',
      nivel4: 'Aborda el repertorio con preparación exhaustiva y creativa, aportando valor al colectivo.'
    },
    'CO-02': {
      nivel1: 'No mantiene el pulso ni la coordinación.',
      nivel2: 'Mantiene el pulso en contextos sencillos.',
      nivel3: 'Mantiene el pulso con precisión en repertorio avanzado.',
      nivel4: 'Domina el pulso con excelencia, liderando la cohesión del conjunto.'
    },
    'CO-03': {
      nivel1: 'No escucha al conjunto.',
      nivel2: 'Escucha de forma parcial.',
      nivel3: 'Escucha activamente y se ajusta con precisión.',
      nivel4: 'Desarrolla escucha polifónica avanzada, optimizando la cohesión armónica y expresiva.'
    },
    'CO-04': {
      nivel1: 'La afinación es deficiente.',
      nivel2: 'Controla la afinación de forma intermitente.',
      nivel3: 'Mantiene afinación precisa en repertorio exigente.',
      nivel4: 'Domina afinación y color sonoro con excelencia, definiendo la identidad tímbrica.'
    },
    'CO-05': {
      nivel1: 'No ejecuta articulaciones ni dinámicas diferenciadas.',
      nivel2: 'Ejecuta de forma correcta pero sin sensibilidad avanzada.',
      nivel3: 'Ejecuta con precisión estilística y sensibilidad expresiva.',
      nivel4: 'Domina con expresividad que define el carácter de la obra.'
    },
    'CO-06': {
      nivel1: 'No gestiona el equilibrio ni su función.',
      nivel2: 'Comprende su función pero sin autonomía suficiente.',
      nivel3: 'Gestiona el equilibrio y los roles con autonomía.',
      nivel4: 'Gestiona con maestría los planos sonoros, liderando la arquitectura del conjunto.'
    },
    'CO-07': {
      nivel1: 'La interpretación es mecánica.',
      nivel2: 'Muestra intención pero carece de madurez.',
      nivel3: 'Construye un discurso maduro y fundamentado.',
      nivel4: 'Ofrece una interpretación preprofesional con visión artística personal.'
    },
    'CO-08': {
      nivel1: 'No se adapta a cambios.',
      nivel2: 'Se adapta con dificultad.',
      nivel3: 'Se adapta con fluidez y naturalidad.',
      nivel4: 'Anticipa, facilita y lidera los cambios con flexibilidad excepcional.'
    },
    'CO-09': {
      nivel1: 'No mantiene la continuidad.',
      nivel2: 'Mantiene en contextos conocidos.',
      nivel3: 'Mantiene con solvencia en nivel profesional.',
      nivel4: 'Mantiene con absoluta naturalidad, integrando incidencias en el discurso.'
    },
    'CO-10': {
      nivel1: 'No resuelve problemas autónomamente.',
      nivel2: 'Resuelve problemas sencillos con ayuda.',
      nivel3: 'Resuelve problemas complejos de forma autónoma.',
      nivel4: 'Anticipa, previene y resuelve con creatividad, transfiriendo estrategias.'
    },
    'CO-11': {
      nivel1: 'No asume responsabilidades.',
      nivel2: 'Asume responsabilidades básicas.',
      nivel3: 'Asume plena responsabilidad con autonomía.',
      nivel4: 'Ejerce liderazgo artístico y organizativo pleno, fomentando la excelencia.'
    },
    'CO-12': {
      nivel1: 'No reflexiona sobre su aprendizaje.',
      nivel2: 'Reflexiona superficialmente.',
      nivel3: 'Reflexiona críticamente y transfiere aprendizajes.',
      nivel4: 'Desarrolla pensamiento artístico reflexivo, transfiriendo estrategias a cualquier contexto.'
    }
  },
  6: {
    'CO-01': {
      nivel1: 'No prepara el repertorio.',
      nivel2: 'Prepara de forma insuficiente para 6.º curso.',
      nivel3: 'Prepara con rigor y dominio de nivel profesional.',
      nivel4: 'Aborda el repertorio con preparación exhaustiva, analítica y creativa, aportando valor artístico al conjunto.'
    },
    'CO-02': {
      nivel1: 'No mantiene el pulso ni la coordinación.',
      nivel2: 'Mantiene el pulso en contextos sencillos.',
      nivel3: 'Mantiene el pulso con precisión en repertorio profesional.',
      nivel4: 'Domina el pulso con total seguridad, liderando al conjunto en pasajes de alta complejidad.'
    },
    'CO-03': {
      nivel1: 'No escucha al conjunto.',
      nivel2: 'Escucha de forma parcial.',
      nivel3: 'Escucha activamente y se ajusta con precisión en nivel profesional.',
      nivel4: 'Desarrolla escucha polifónica avanzada, percibiendo todas las voces y optimizando la cohesión global.'
    },
    'CO-04': {
      nivel1: 'La afinación es deficiente.',
      nivel2: 'Controla la afinación de forma intermitente.',
      nivel3: 'Mantiene afinación precisa y sonido integrado en nivel profesional.',
      nivel4: 'Domina afinación y color sonoro con excelencia, adaptando timbre y proyección a las exigencias del repertorio.'
    },
    'CO-05': {
      nivel1: 'No ejecuta articulaciones ni dinámicas diferenciadas.',
      nivel2: 'Ejecuta de forma correcta pero sin sensibilidad avanzada.',
      nivel3: 'Ejecuta con precisión estilística en nivel profesional.',
      nivel4: 'Domina con expresividad que define el carácter de la obra, estableciendo estándares de calidad.'
    },
    'CO-06': {
      nivel1: 'No gestiona el equilibrio ni su función.',
      nivel2: 'Comprende su función sin la autonomía de 6.º curso.',
      nivel3: 'Gestiona el equilibrio y los roles con autonomía profesional.',
      nivel4: 'Gestiona con maestría los planos sonoros y la arquitectura del conjunto, asumiendo roles de liderazgo musical.'
    },
    'CO-07': {
      nivel1: 'La interpretación es mecánica.',
      nivel2: 'Muestra intención pero carece de madurez para 6.º curso.',
      nivel3: 'Construye un discurso maduro y fundamentado.',
      nivel4: 'Ofrece una interpretación preprofesional con visión artística personal y convincente.'
    },
    'CO-08': {
      nivel1: 'No se adapta a cambios.',
      nivel2: 'Se adapta con dificultad.',
      nivel3: 'Se adapta con fluidez y naturalidad a cualquier cambio.',
      nivel4: 'Anticipa, facilita y lidera los cambios, convirtiendo lo imprevisto en oportunidad expresiva.'
    },
    'CO-09': {
      nivel1: 'No mantiene la continuidad.',
      nivel2: 'Mantiene en contextos conocidos.',
      nivel3: 'Mantiene con solvencia en cualquier situación profesional.',
      nivel4: 'Mantiene con absoluta naturalidad, gestionando incidencias como parte integral del discurso.'
    },
    'CO-10': {
      nivel1: 'No resuelve problemas autónomamente.',
      nivel2: 'Resuelve problemas sencillos con ayuda.',
      nivel3: 'Resuelve problemas complejos de forma autónoma.',
      nivel4: 'Anticipa, previene y resuelve con creatividad, transfiriendo estrategias a cualquier contexto profesional.'
    },
    'CO-11': {
      nivel1: 'No asume responsabilidades.',
      nivel2: 'Asume responsabilidades básicas sin autonomía de 6.º curso.',
      nivel3: 'Asume plena responsabilidad con autonomía profesional.',
      nivel4: 'Ejerce liderazgo artístico y organizativo pleno, con madurez para estudios superiores.'
    },
    'CO-12': {
      nivel1: 'No reflexiona sobre su aprendizaje.',
      nivel2: 'Reflexiona superficialmente.',
      nivel3: 'Reflexiona críticamente y transfiere aprendizajes.',
      nivel4: 'Desarrolla pensamiento artístico reflexivo y autónomo, con preparación para la formación superior.'
    }
  }
};

// Function to get rubric descriptors based on subject, course, and criterion
export function getRubricDescriptor(subject: Subject, course: Course, criterionCode: string): RubricDescriptor {
  let rubricData: RubricDescriptor | undefined;

  if (subject === 'camara') {
    rubricData = CAMARA_RUBRICS[course]?.[criterionCode];
  } else if (subject === 'banda') {
    rubricData = BANDA_RUBRICS[course]?.[criterionCode];
  } else if (subject === 'orquesta') {
    rubricData = ORQUESTA_RUBRICS[course]?.[criterionCode];
  }

  return rubricData || {
    nivel1: 'No alcanza los requisitos mínimos del criterio.',
    nivel2: 'Alcanza parcialmente los requisitos del criterio con apoyo.',
    nivel3: 'Alcanza los requisitos del criterio de forma autónoma.',
    nivel4: 'Supera los requisitos del criterio con excelencia y autonomía.'
  };
}

// Assessment instruments
export const ASSESSMENT_INSTRUMENTS = [
  { id: 'rubrica', name: 'Rúbrica analítica', description: 'Instrumento detallado con descriptores por nivel de logro para cada criterio.' },
  { id: 'lista_cotejo', name: 'Lista de cotejo', description: 'Instrumento binario (sí/no) para verificar el cumplimiento de indicadores.' },
  { id: 'registro_aula', name: 'Registro de aula', description: 'Documento de seguimiento continuo del proceso de aprendizaje.' },
  { id: 'autoevaluacion', name: 'Autoevaluación', description: 'Instrumento para que el estudiante reflexione sobre su propio proceso.' },
  { id: 'coevaluacion', name: 'Coevaluación', description: 'Evaluación entre pares basada en criterios compartidos.' },
  { id: 'evidencia_av', name: 'Evidencia audiovisual', description: 'Grabación de la interpretación como base para la evaluación.' },
];

// Pedagogical notes per subject
export const PEDAGOGICAL_NOTES: Record<Subject, string> = {
  camara: 'Esta rúbrica debe aplicarse en el contexto de la evaluación continua y formativa propia de la Música de Cámara. Se recomienda combinar la observación directa del profesor durante los ensayos con la autoevaluación y coevaluación de los integrantes del grupo. La evidencia audiovisual de las interpretaciones permite una revisión posterior objetiva. Es fundamental que el estudiante participe activamente en la fijación de objetivos de ensayo y en la reflexión sobre el proceso.',
  banda: 'Esta rúbrica debe aplicarse en el contexto de la evaluación continua propia de la formación de Banda. Se recomienda complementar la observación del director durante los ensayos con registros de aula que documenten la evolución individual y colectiva. La preparación individual previa a los ensayos colectivos es un factor determinante en el progreso. Se valorará especialmente la actitud de escucha activa y la capacidad de integración en el conjunto.',
  orquesta: 'Esta rúbrica debe aplicarse en el contexto de la evaluación continua propia de la formación orquestal. Se recomienda combinar la evaluación del director con la autoevaluación del estudiante y, cuando sea pertinente, la coevaluación dentro de la sección. La capacidad de adaptación a diferentes directores, repertorios y contextos acústicos es un indicador clave de progreso. La evidencia audiovisual permite un análisis detallado del proceso de mejora.'
};
