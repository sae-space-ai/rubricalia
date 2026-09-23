// ============================================================
// ASIGNATURAS COLECTIVAS — Cámara, Banda, Orquesta
// Programación Didáctica V2.0 Auditada
// ============================================================

export type AsignaturaColectiva = 
  | 'lenguaje'
  | 'armonia'
  | 'analisis'
  | 'historia'
  | 'literatura'
  | 'coro'
  | 'piano_complementario'
  | 'camara'
  | 'banda'
  | 'orquesta';
export type CursoColectivo = 1 | 2 | 3 | 4 | 5 | 6;

export interface CriterioEvaluacion {
  codigo: string;
  nombre: string;
  descripcion: string;
}

export interface Competencia {
  codigo: string;
  nombre: string;
}

export interface DescriptorRubrica {
  L1: string;
  L2: string;
  L3: string;
  L4: string;
}

export interface RubricaCompleta {
  criterio: string;
  curso: CursoColectivo;
  descriptores: DescriptorRubrica;
}

// ============================================================
// CRITERIOS DE EVALUACIÓN (CO-01 a CO-12)
// ============================================================

export const CRITERIOS_EVALUACION: CriterioEvaluacion[] = [
  {
    codigo: 'CO-01',
    nombre: 'Preparación',
    descripcion: 'Capacidad de preparar el repertorio asignado con rigor y anticipación.'
  },
  {
    codigo: 'CO-02',
    nombre: 'Ritmo y coordinación',
    descripcion: 'Mantenimiento del pulso, precisión rítmica y coordinación con el grupo.'
  },
  {
    codigo: 'CO-03',
    nombre: 'Escucha y ajuste',
    descripcion: 'Capacidad de escuchar activamente y ajustar la interpretación al conjunto.'
  },
  {
    codigo: 'CO-04',
    nombre: 'Afinación y sonido',
    descripcion: 'Control de la afinación individual y colectiva, calidad del sonido producido.'
  },
  {
    codigo: 'CO-05',
    nombre: 'Articulación y dinámica',
    descripcion: 'Ejecución correcta de articulaciones y matices dinámicos indicados.'
  },
  {
    codigo: 'CO-06',
    nombre: 'Balance y función',
    descripcion: 'Equilibrio sonoro entre las voces y comprensión del rol dentro del conjunto.'
  },
  {
    codigo: 'CO-07',
    nombre: 'Interpretación y discurso',
    descripcion: 'Construcción del discurso musical, fraseo, agógica y expresividad.'
  },
  {
    codigo: 'CO-08',
    nombre: 'Adaptación',
    descripcion: 'Flexibilidad para adaptarse a cambios de tempo, dinámica, director o contexto.'
  },
  {
    codigo: 'CO-09',
    nombre: 'Continuidad',
    descripcion: 'Capacidad de mantener la continuidad musical ante dificultades o imprevistos.'
  },
  {
    codigo: 'CO-10',
    nombre: 'Resolución de problemas',
    descripcion: 'Habilidad para resolver incidencias musicales de forma autónoma durante la interpretación.'
  },
  {
    codigo: 'CO-11',
    nombre: 'Autonomía y responsabilidad',
    descripcion: 'Grado de autonomía en el estudio, organización del trabajo y responsabilidad con el grupo.'
  },
  {
    codigo: 'CO-12',
    nombre: 'Revisión y transferencia',
    descripcion: 'Capacidad de autoevaluarse, reflexionar sobre la interpretación y transferir aprendizajes.'
  }
];

// ============================================================
// COMPETENCIAS (CM-1 a CM-7)
// ============================================================

export const COMPETENCIAS: Competencia[] = [
  { codigo: 'CM-1', nombre: 'Ejecución instrumental' },
  { codigo: 'CM-2', nombre: 'Competencia rítmica y de coordinación' },
  { codigo: 'CM-3', nombre: 'Competencia auditiva y de ajuste sonoro' },
  { codigo: 'CM-4', nombre: 'Competencia de interpretación musical' },
  { codigo: 'CM-5', nombre: 'Competencia de interacción musical' },
  { codigo: 'CM-6', nombre: 'Competencia de análisis y resolución musical' },
  { codigo: 'CM-7', nombre: 'Competencia de transferencia musical' }
];

// ============================================================
// MAPEO CRITERIOS → COMPETENCIAS
// ============================================================

export const CRITERIO_COMPETENCIA_MAP: Record<string, string[]> = {
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
  'CO-12': ['CM-7', 'CM-6']
};

// ============================================================
// CURSOS VÁLIDOS POR ASIGNATURA
// ============================================================

export const CURSOS_VALIDOS: Record<AsignaturaColectiva, CursoColectivo[]> = {
  lenguaje: [1, 2, 3, 4],
  armonia: [1, 2],
  analisis: [3, 4, 5, 6],
  historia: [3, 4, 5, 6],
  literatura: [1, 2, 3, 4, 5, 6],
  coro: [1, 2, 3, 4, 5, 6],
  piano_complementario: [1, 2],
  camara: [4, 5, 6],
  banda: [1, 2, 3, 4, 5, 6],
  orquesta: [1, 2, 3, 4, 5, 6]
};

// ============================================================
// NOMBRES Y METADATOS
// ============================================================

export const ASIGNATURA_INFO: Record<AsignaturaColectiva, { nombre: string; descripcion: string; color: string }> = {
  lenguaje: {
    nombre: 'Lenguaje Musical',
    descripcion: 'Formación teórica en lectura, escritura, ritmo, entonación y percepción auditiva.',
    color: 'indigo'
  },
  armonia: {
    nombre: 'Armonía',
    descripcion: 'Estudio de la construcción de acordes, progresiones armónicas y su análisis.',
    color: 'violet'
  },
  analisis: {
    nombre: 'Análisis Musical',
    descripcion: 'Estudio de la estructura, forma y organización de las obras musicales.',
    color: 'fuchsia'
  },
  historia: {
    nombre: 'Historia de la Música',
    descripcion: 'Estudio de la evolución histórica de la música y sus contextos culturales.',
    color: 'rose'
  },
  literatura: {
    nombre: 'Literatura del Instrumento',
    descripcion: 'Estudio del repertorio, compositores y evolución histórica del instrumento.',
    color: 'pink'
  },
  coro: {
    nombre: 'Coro',
    descripcion: 'Práctica vocal en conjunto, trabajando afinación, empaste y expresión coral.',
    color: 'teal'
  },
  piano_complementario: {
    nombre: 'Piano Complementario',
    descripcion: 'Formación básica en piano como herramienta complementaria al instrumento principal.',
    color: 'cyan'
  },
  camara: {
    nombre: 'Música de Cámara',
    descripcion: 'Formación en pequeño grupo con énfasis en la escucha mutua, el equilibrio sonoro y la interpretación conjunta.',
    color: 'purple'
  },
  banda: {
    nombre: 'Banda',
    descripcion: 'Formación en conjunto de viento y percusión, trabajando la coordinación, el balance entre secciones y la adaptación.',
    color: 'blue'
  },
  orquesta: {
    nombre: 'Orquesta',
    descripcion: 'Formación en la gran formación sinfónica, con énfasis en la lectura de partitura, la dirección y la integración en el tutti.',
    color: 'emerald'
  }
};

// ============================================================
// RÚBRICAS — MÚSICA DE CÁMARA
// ============================================================

export const RUBRICAS_CAMARA: RubricaCompleta[] = [
  // 4º Curso
  {
    criterio: 'CO-01',
    curso: 4,
    descriptores: {
      L1: 'No prepara el repertorio asignado. Acude a los ensayos sin haber estudiado su parte.',
      L2: 'Prepara parcialmente el repertorio, pero requiere recordatorios frecuentes del profesor.',
      L3: 'Prepara el repertorio asignado de forma regular y acude a los ensayos con un nivel de dominio aceptable.',
      L4: 'Anticipa la preparación del repertorio, investiga el contexto de la obra y propone ideas interpretativas propias.'
    }
  },
  {
    criterio: 'CO-02',
    curso: 4,
    descriptores: {
      L1: 'No mantiene el pulso de forma consistente. Se desincroniza frecuentemente del grupo.',
      L2: 'Mantiene el pulso en pasajes sencillos, pero pierde la coordinación en secciones con mayor complejidad rítmica.',
      L3: 'Mantiene el pulso y se coordina con el grupo en la mayoría de las secciones del repertorio trabajado.',
      L4: 'Mantiene el pulso con seguridad, anticipa entradas y facilita la coordinación del grupo en pasajes rítmicamente complejos.'
    }
  },
  {
    criterio: 'CO-03',
    curso: 4,
    descriptores: {
      L1: 'No escucha a los compañeros durante la interpretación. Se centra exclusivamente en su propia parte.',
      L2: 'Escucha al grupo de forma intermitente, pero no logra ajustar su interpretación en consecuencia.',
      L3: 'Escucha activamente a los compañeros y ajusta su afinación, dinámica y fraseo al conjunto.',
      L4: 'Escucha de forma integral, identifica desequilibrios en tiempo real y propone ajustes que enriquecen la interpretación colectiva.'
    }
  },
  {
    criterio: 'CO-04',
    curso: 4,
    descriptores: {
      L1: 'La afinación es imprecisa de forma habitual. No controla la calidad del sonido en el contexto camerístico.',
      L2: 'Logra una afinación aceptable en pasajes sencillos, pero presenta desajustes en intervalos o tonalidades complejas.',
      L3: 'Mantiene una afinación correcta en la mayoría del repertorio y produce un sonido adecuado al contexto camerístico.',
      L4: 'Controla la afinación con precisión en todo momento, adapta el color sonoro a las exigencias estilísticas y contribuye a la cohesión tímbrica del grupo.'
    }
  },
  {
    criterio: 'CO-05',
    curso: 4,
    descriptores: {
      L1: 'No diferencia las articulaciones indicadas. Las dinámicas son monótonas o no se corresponden con la partitura.',
      L2: 'Ejecuta las articulaciones básicas y dinámicas principales, pero con falta de contraste o precisión.',
      L3: 'Ejecuta correctamente las articulaciones y dinámicas indicadas, aportando contraste y coherencia al discurso.',
      L4: 'Domina las articulaciones y dinámicas con sensibilidad estilística, aportando matices expresivos que enriquecen la interpretación del conjunto.'
    }
  },
  {
    criterio: 'CO-06',
    curso: 4,
    descriptores: {
      L1: 'No es consciente de su rol en el conjunto. Toca siempre al mismo volumen sin considerar el equilibrio.',
      L2: 'Comienza a ser consciente de los planos sonoros, pero no logra ajustarse de forma consistente.',
      L3: 'Comprende su función en el tejido musical y ajusta su volumen para mantener el equilibrio con los compañeros.',
      L4: 'Gestiona con autonomía los planos sonoros, asumiendo roles de protagonista o acompañamiento según la estructura de la obra.'
    }
  },
  {
    criterio: 'CO-07',
    curso: 4,
    descriptores: {
      L1: 'La interpretación es mecánica, sin fraseo ni intención expresiva. No hay discurso musical.',
      L2: 'Muestra intención expresiva básica, pero el fraseo es irregular y el discurso carece de dirección.',
      L3: 'Construye un discurso musical coherente con fraseo, agógica y dinámica adecuados al estilo de la obra.',
      L4: 'Ofrece una interpretación personal y convincente, con un discurso musical estructurado, flexible y estilísticamente fundamentado.'
    }
  },
  {
    criterio: 'CO-08',
    curso: 4,
    descriptores: {
      L1: 'Se bloquea ante cualquier cambio de tempo, dinámica o indicación del compañero que dirige.',
      L2: 'Se adapta con dificultad a los cambios, necesitando que el grupo se detenga para reorganizarse.',
      L3: 'Se adapta a los cambios de tempo y dinámica propuestos por el grupo o el compañero que lidera el ensayo.',
      L4: 'Anticipa y facilita los cambios, mostrando flexibilidad y contribuyendo a la cohesión del grupo ante situaciones nuevas.'
    }
  },
  {
    criterio: 'CO-09',
    curso: 4,
    descriptores: {
      L1: 'Se detiene ante cualquier error o dificultad. No logra mantener el flujo musical.',
      L2: 'Logra continuar en pasajes conocidos, pero se interrumpe en las secciones de mayor dificultad.',
      L3: 'Mantiene la continuidad musical en la mayoría de las situaciones, superando dificultades sin interrumpir el discurso.',
      L4: 'Mantiene la continuidad musical con total naturalidad, convirtiendo las incidencias en oportunidades expresivas sin que el público perciba la dificultad.'
    }
  },
  {
    criterio: 'CO-10',
    curso: 4,
    descriptores: {
      L1: 'No identifica los problemas musicales. Depende del profesor para cualquier corrección.',
      L2: 'Identifica problemas evidentes con ayuda del profesor, pero no propone soluciones.',
      L3: 'Identifica y resuelve problemas musicales habituales de forma autónoma durante el ensayo.',
      L4: 'Anticipa problemas potenciales, propone soluciones creativas y guía al grupo en la resolución de incidencias complejas.'
    }
  },
  {
    criterio: 'CO-11',
    curso: 4,
    descriptores: {
      L1: 'Muestra falta de responsabilidad con el grupo. No organiza su tiempo de estudio ni asume compromisos.',
      L2: 'Asume responsabilidades básicas pero requiere supervisión constante para mantener la organización del trabajo.',
      L3: 'Organiza su trabajo de forma autónoma, asume responsabilidades con el grupo y cumple los compromisos de ensayo.',
      L4: 'Lidera la organización del trabajo del grupo, propone objetivos de mejora y fomenta la responsabilidad colectiva.'
    }
  },
  {
    criterio: 'CO-12',
    curso: 4,
    descriptores: {
      L1: 'No reflexiona sobre su interpretación. No identifica aspectos mejorables ni los transfiere a otras situaciones.',
      L2: 'Identifica aspectos mejorables con ayuda del profesor, pero no los transfiere a nuevos contextos.',
      L3: 'Se autoevalúa de forma crítica y transfiere los aprendizajes a repertorios y contextos similares.',
      L4: 'Realiza una autoevaluación rigurosa, identifica patrones de mejora y transfiere estrategias a contextos musicales diversos con autonomía.'
    }
  }
];

// ============================================================
// RÚBRICAS — BANDA
// ============================================================

export const RUBRICAS_BANDA: RubricaCompleta[] = [
  // 1º Curso
  {
    criterio: 'CO-01',
    curso: 1,
    descriptores: {
      L1: 'No prepara las partituras asignadas. Acude a los ensayos sin haber trabajado su parte.',
      L2: 'Prepara parcialmente las partituras, pero comete errores por falta de estudio.',
      L3: 'Prepara las partituras asignadas y acude a los ensayos con un nivel de preparación adecuado.',
      L4: 'Prepara las partituras con anticipación, estudia el contexto de la obra y muestra iniciativa en su preparación.'
    }
  },
  {
    criterio: 'CO-02',
    curso: 1,
    descriptores: {
      L1: 'No mantiene el pulso. Se desincroniza constantemente del grupo y la dirección.',
      L2: 'Mantiene el pulso en fragmentos sencillos, pero pierde la coordinación en pasajes con mayor dificultad.',
      L3: 'Mantiene el pulso y sigue la dirección del director en la mayoría de las secciones.',
      L4: 'Mantiene el pulso con seguridad, sigue la dirección con atención y facilita la coordinación de su sección.'
    }
  },
  {
    criterio: 'CO-03',
    curso: 1,
    descriptores: {
      L1: 'No escucha al conjunto. Se centra exclusivamente en su propia parte sin considerar el grupo.',
      L2: 'Escucha al conjunto de forma intermitente, pero no realiza ajustes significativos.',
      L3: 'Escucha al conjunto y ajusta su interpretación a las indicaciones del director y al sonido global.',
      L4: 'Escucha activamente al conjunto, anticipa las intenciones del director y ajusta su interpretación con sensibilidad.'
    }
  },
  {
    criterio: 'CO-04',
    curso: 1,
    descriptores: {
      L1: 'La afinación es imprecisa de forma habitual. No controla la calidad del sonido.',
      L2: 'Logra una afinación aceptable en pasajes sencillos, pero presenta desajustes frecuentes.',
      L3: 'Mantiene una afinación correcta en la mayoría del repertorio y produce un sonido adecuado al contexto de banda.',
      L4: 'Controla la afinación con precisión, adapta el sonido al contexto acústico y contribuye a la afinación colectiva de su sección.'
    }
  },
  {
    criterio: 'CO-05',
    curso: 1,
    descriptores: {
      L1: 'No diferencia las articulaciones ni dinámicas indicadas en la partitura.',
      L2: 'Ejecuta articulaciones y dinámicas básicas, pero con falta de contraste o precisión.',
      L3: 'Ejecuta correctamente las articulaciones y dinámicas indicadas por el director.',
      L4: 'Ejecuta articulaciones y dinámicas con precisión y sensibilidad, aportando contraste y coherencia al conjunto.'
    }
  },
  {
    criterio: 'CO-06',
    curso: 1,
    descriptores: {
      L1: 'No es consciente de su rol en la banda. Toca siempre al mismo volumen.',
      L2: 'Comienza a ser consciente de los planos sonoros, pero no se ajusta de forma consistente.',
      L3: 'Comprende su función en la banda y ajusta su volumen según las indicaciones del director.',
      L4: 'Comprende su función en la estructura de la banda y gestiona su volumen con autonomía para mantener el equilibrio entre secciones.'
    }
  },
  {
    criterio: 'CO-07',
    curso: 1,
    descriptores: {
      L1: 'La interpretación es mecánica, sin fraseo ni intención expresiva.',
      L2: 'Muestra intención expresiva básica, pero el fraseo es irregular.',
      L3: 'Construye un discurso musical coherente con fraseo y dinámica adecuados a las indicaciones del director.',
      L4: 'Ofrece una interpretación expresiva y comprometida, aportando ideas musicales que enriquecen el resultado colectivo.'
    }
  },
  {
    criterio: 'CO-08',
    curso: 1,
    descriptores: {
      L1: 'Se bloquea ante cualquier cambio de tempo o indicación del director.',
      L2: 'Se adapta con dificultad a los cambios, necesitando repeticiones para ajustarse.',
      L3: 'Se adapta a los cambios de tempo y dinámica indicados por el director.',
      L4: 'Se adapta con fluidez a los cambios y anticipa las intenciones del director, facilitando la respuesta del conjunto.'
    }
  },
  {
    criterio: 'CO-09',
    curso: 1,
    descriptores: {
      L1: 'Se detiene ante cualquier error. No logra mantener la continuidad musical.',
      L2: 'Logra continuar en pasajes conocidos, pero se interrumpe ante dificultades.',
      L3: 'Mantiene la continuidad musical en la mayoría de las situaciones, superando dificultades sin detenerse.',
      L4: 'Mantiene la continuidad musical con naturalidad, recuperándose rápidamente de las incidencias sin que se perciba la interrupción.'
    }
  },
  {
    criterio: 'CO-10',
    curso: 1,
    descriptores: {
      L1: 'No identifica problemas musicales. Depende totalmente del director para las correcciones.',
      L2: 'Identifica problemas evidentes con ayuda, pero no propone soluciones.',
      L3: 'Identifica y resuelve problemas musicales habituales de forma autónoma.',
      L4: 'Anticipa problemas potenciales y propone soluciones que benefician al conjunto.'
    }
  },
  {
    criterio: 'CO-11',
    curso: 1,
    descriptores: {
      L1: 'Muestra falta de responsabilidad con el grupo. No organiza su tiempo de estudio.',
      L2: 'Asume responsabilidades básicas pero requiere supervisión.',
      L3: 'Organiza su trabajo de forma autónoma y cumple los compromisos con el grupo.',
      L4: 'Muestra iniciativa en la organización del trabajo y fomenta la responsabilidad en su sección.'
    }
  },
  {
    criterio: 'CO-12',
    curso: 1,
    descriptores: {
      L1: 'No reflexiona sobre su interpretación ni identifica aspectos mejorables.',
      L2: 'Identifica aspectos mejorables con ayuda del director.',
      L3: 'Se autoevalúa de forma crítica y aplica mejoras en sucesivas interpretaciones.',
      L4: 'Realiza una autoevaluación rigurosa, establece objetivos de mejora y transfiere aprendizajes a nuevos repertorios.'
    }
  }
];

// ============================================================
// RÚBRICAS — ORQUESTA
// ============================================================

export const RUBRICAS_ORQUESTA: RubricaCompleta[] = [
  // 1º Curso
  {
    criterio: 'CO-01',
    curso: 1,
    descriptores: {
      L1: 'No prepara las partituras asignadas. Acude a los ensayos sin haber trabajado su parte.',
      L2: 'Prepara parcialmente las partituras, pero comete errores por falta de estudio.',
      L3: 'Prepara las partituras asignadas y acude a los ensayos con un nivel de preparación adecuado al primer curso.',
      L4: 'Prepara las partituras con anticipación, estudia la obra en su conjunto y muestra iniciativa en su preparación.'
    }
  },
  {
    criterio: 'CO-02',
    curso: 1,
    descriptores: {
      L1: 'No mantiene el pulso. Se desincroniza constantemente de la dirección y el grupo.',
      L2: 'Mantiene el pulso en fragmentos sencillos, pero pierde la coordinación en pasajes con mayor dificultad.',
      L3: 'Mantiene el pulso y sigue la dirección del director en la mayoría de las secciones.',
      L4: 'Mantiene el pulso con seguridad, sigue la batuta con atención y facilita la coordinación de su atril.'
    }
  },
  {
    criterio: 'CO-03',
    curso: 1,
    descriptores: {
      L1: 'No escucha al conjunto. Se centra exclusivamente en su propia parte.',
      L2: 'Escucha al conjunto de forma intermitente, pero no realiza ajustes significativos.',
      L3: 'Escucha al conjunto y ajusta su interpretación a las indicaciones del director y al sonido de la orquesta.',
      L4: 'Escucha activamente al conjunto, anticipa las intenciones del director y ajusta su interpretación con sensibilidad al contexto orquestal.'
    }
  },
  {
    criterio: 'CO-04',
    curso: 1,
    descriptores: {
      L1: 'La afinación es imprecisa de forma habitual. No controla la calidad del sonido.',
      L2: 'Logra una afinación aceptable en pasajes sencillos, pero presenta desajustes frecuentes.',
      L3: 'Mantiene una afinación correcta en la mayoría del repertorio y produce un sonido adecuado al contexto orquestal.',
      L4: 'Controla la afinación con precisión, adapta el sonido a la acústica y contribuye a la afinación colectiva de su sección.'
    }
  },
  {
    criterio: 'CO-05',
    curso: 1,
    descriptores: {
      L1: 'No diferencia las articulaciones ni dinámicas indicadas en la partitura.',
      L2: 'Ejecuta articulaciones y dinámicas básicas, pero con falta de contraste.',
      L3: 'Ejecuta correctamente las articulaciones y dinámicas indicadas por el director.',
      L4: 'Ejecuta articulaciones y dinámicas con precisión y sensibilidad, aportando coherencia al sonido de su sección.'
    }
  },
  {
    criterio: 'CO-06',
    curso: 1,
    descriptores: {
      L1: 'No es consciente de su rol en la orquesta. Toca siempre al mismo volumen.',
      L2: 'Comienza a ser consciente de los planos sonoros, pero no se ajusta de forma consistente.',
      L3: 'Comprende su función en la orquesta y ajusta su volumen según las indicaciones del director.',
      L4: 'Comprende su función en la estructura orquestal y gestiona su volumen con autonomía para mantener el equilibrio entre secciones.'
    }
  },
  {
    criterio: 'CO-07',
    curso: 1,
    descriptores: {
      L1: 'La interpretación es mecánica, sin fraseo ni intención expresiva.',
      L2: 'Muestra intención expresiva básica, pero el fraseo es irregular.',
      L3: 'Construye un discurso musical coherente con fraseo adecuado a las indicaciones del director.',
      L4: 'Ofrece una interpretación expresiva y comprometida, aportando ideas musicales al resultado colectivo.'
    }
  },
  {
    criterio: 'CO-08',
    curso: 1,
    descriptores: {
      L1: 'Se bloquea ante cualquier cambio de tempo o indicación del director.',
      L2: 'Se adapta con dificultad a los cambios, necesitando repeticiones.',
      L3: 'Se adapta a los cambios de tempo y dinámica indicados por el director.',
      L4: 'Se adapta con fluidez a los cambios y anticipa las intenciones del director.'
    }
  },
  {
    criterio: 'CO-09',
    curso: 1,
    descriptores: {
      L1: 'Se detiene ante cualquier error. No logra mantener la continuidad musical.',
      L2: 'Logra continuar en pasajes conocidos, pero se interrumpe ante dificultades.',
      L3: 'Mantiene la continuidad musical en la mayoría de las situaciones.',
      L4: 'Mantiene la continuidad musical con naturalidad, recuperándose rápidamente de las incidencias.'
    }
  },
  {
    criterio: 'CO-10',
    curso: 1,
    descriptores: {
      L1: 'No identifica problemas musicales. Depende totalmente del director.',
      L2: 'Identifica problemas evidentes con ayuda, pero no propone soluciones.',
      L3: 'Identifica y resuelve problemas musicales habituales de forma autónoma.',
      L4: 'Anticipa problemas potenciales y propone soluciones que benefician al conjunto.'
    }
  },
  {
    criterio: 'CO-11',
    curso: 1,
    descriptores: {
      L1: 'Muestra falta de responsabilidad con el grupo. No organiza su tiempo de estudio.',
      L2: 'Asume responsabilidades básicas pero requiere supervisión.',
      L3: 'Organiza su trabajo de forma autónoma y cumple los compromisos con la orquesta.',
      L4: 'Muestra iniciativa en la organización del trabajo y fomenta la responsabilidad en su sección.'
    }
  },
  {
    criterio: 'CO-12',
    curso: 1,
    descriptores: {
      L1: 'No reflexiona sobre su interpretación.',
      L2: 'Identifica aspectos mejorables con ayuda del director.',
      L3: 'Se autoevalúa de forma crítica y aplica mejoras en sucesivas interpretaciones.',
      L4: 'Realiza una autoevaluación rigurosa, establece objetivos y transfiere aprendizajes a nuevos repertorios.'
    }
  }
];

// ============================================================
// FUNCIONES AUXILIARES
// ============================================================

export function getRubricasByAsignatura(asignatura: AsignaturaColectiva): RubricaCompleta[] {
  switch (asignatura) {
    case 'camara':
      return RUBRICAS_CAMARA;
    case 'banda':
      return RUBRICAS_BANDA;
    case 'orquesta':
      return RUBRICAS_ORQUESTA;
    case 'lenguaje':
    case 'armonia':
    case 'analisis':
    case 'historia':
    case 'literatura':
    case 'coro':
    case 'piano_complementario':
      return []; // Rúbricas pendientes de implementar
  }
}

export function getCursosDisponibles(asignatura: AsignaturaColectiva): CursoColectivo[] {
  return CURSOS_VALIDOS[asignatura];
}

export function getRubrica(asignatura: AsignaturaColectiva, curso: CursoColectivo, criterio: string): RubricaCompleta | undefined {
  const rubricas = getRubricasByAsignatura(asignatura);
  return rubricas.find(r => r.curso === curso && r.criterio === criterio);
}
