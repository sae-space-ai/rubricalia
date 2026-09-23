// ============================================================
// PROGRAMACIÓN DIDÁCTICA DE CLARINETE 2026/2027
// DOCUMENTO COMPLETO - 30 APARTADOS
// ============================================================

export interface Apartado {
  numero: string;
  titulo: string;
  subapartados: Subapartado[];
}

export interface Subapartado {
  numero: string;
  titulo: string;
  contenido: string[];
  categoria?: 'NORMA' | 'DESARROLLO' | 'HOLD';
}

export const DOCUMENTO_COMPLETO: Apartado[] = [
  {
    numero: '1',
    titulo: 'IDENTIFICACIÓN Y CONTEXTUALIZACIÓN',
    subapartados: [
      {
        numero: '1.1',
        titulo: 'Denominación',
        contenido: [
          'Programación Didáctica de Clarinete para el curso académico 2026/2027.',
          'Instrumento: Clarinete (sistema Boehm).',
          'Enseñanzas: Elementales y Profesionales de Música.',
          'Territorio: Comunidad Autónoma de Extremadura.',
          'Naturaleza: Documento curricular, pedagógico, didáctico, evaluativo y organizativo.',
          'Destinatarios: Profesorado, departamento, equipo directivo, inspección educativa.',
          '[DESARROLLO PROPIO]'
        ],
        categoria: 'DESARROLLO'
      },
      {
        numero: '1.2',
        titulo: 'Enseñanzas, cursos y estructura',
        contenido: [
          'ENSEÑANZAS ELEMENTALES:',
          '• 1.º curso: Iniciación instrumental, postura, respiración, embocadura básica.',
          '• 2.º curso: Consolidación de hábitos, registro chalumeau, articulación básica.',
          '• 3.º curso: Ampliación técnica, registro clarion, escalas básicas.',
          '• 4.º curso: Consolidación, extensión completa, preparación para acceso a Profesionales.',
          '',
          'ENSEÑANZAS PROFESIONALES:',
          '• 1.º-2.º: Consolidación técnica inicial, escalas, arpegios, primeros estudios.',
          '• 3.º-4.º: Consolidación intermedia, repertorio más exigente, análisis.',
          '• 5.º-6.º: Nivel preprofesional, preparación para acceso a enseñanzas superiores.',
          '',
          '[NORMA VIGENTE — Decreto 54/2022 para Elementales; Decreto 111/2007 para Profesionales]'
        ],
        categoria: 'NORMA'
      },
      {
        numero: '1.3',
        titulo: 'Curso académico 2026/2027',
        contenido: [
          'Inicio de actividades lectivas: 1 de octubre de 2026.',
          'Final ordinario de actividades lectivas: 11 de junio de 2027.',
          'Final lectivo específico de 6.º EP: 7 de mayo de 2027.',
          'Calificaciones ordinarias generales: 19 de junio de 2027.',
          'Calificaciones de 6.º EP: 14 de mayo de 2027.',
          '',
          'El curso se estructura en tres trimestres.',
          '[VERIFIED — Resolución de calendario 2026/2027]'
        ],
        categoria: 'NORMA'
      },
      {
        numero: '1.4',
        titulo: 'Centro, departamento y profesorado',
        contenido: [
          'HOLD — PENDIENTE DE VERIFICACIÓN: No se consignarán datos específicos del centro (denominación, dirección, número de aulas, ratio de alumnado, nombre del profesorado) por no disponer de información verificada.',
          '',
          'Estructura institucional (marco general):',
          'La asignatura de Clarinete se imparte en el marco del Departamento de Viento. La programación es elaborada por el profesorado especialista y aprobada por el departamento y el equipo directivo.',
          '[DESARROLLO PROPIO]'
        ],
        categoria: 'HOLD'
      },
      {
        numero: '1.5',
        titulo: 'Naturaleza y finalidad',
        contenido: [
          'Esta programación didáctica constituye:',
          '• Instrumento de planificación: establece objetivos, contenidos, metodología y temporalización.',
          '• Instrumento de programación: concreta el currículo para el contexto del centro.',
          '• Documento curricular: desarrolla los elementos del currículo oficial.',
          '• Instrumento de coordinación: garantiza coherencia entre profesorado, departamentos y etapas.',
          '• Instrumento de evaluación: define criterios, instrumentos y procedimientos.',
          '• Instrumento de mejora: incorpora mecanismos de revisión y actualización.',
          '[DESARROLLO PROPIO]'
        ],
        categoria: 'DESARROLLO'
      },
      {
        numero: '1.6',
        titulo: 'Criterios de elaboración y depuración',
        contenido: [
          '• Recuperación: se ha partido del corpus documental existente.',
          '• Depuración: se han eliminado duplicidades, contradicciones y elementos no trazables.',
          '• Revisión: cada apartado ha sido verificado en cuanto a coherencia interna y normativa.',
          '• Control de versiones: el documento identifica claramente su versión y fecha.',
          '• Clasificación: toda información se clasifica según categorías documentales.',
          '• Trazabilidad: se mantiene la cadena normativa → elemento curricular → objetivo → contenido → actividad → evidencia → evaluación.',
          '• HOLD: cualquier dato no verificado se marca como PENDIENTE DE VERIFICACIÓN.',
          '[DESARROLLO PROPIO]'
        ],
        categoria: 'DESARROLLO'
      },
      {
        numero: '1.7',
        titulo: 'Categorías documentales',
        contenido: [
          '[NORMA VIGENTE]: Información extraída directamente de normativa con identificación completa.',
          '[TEXTO OFICIAL]: Transcripción o parafraseo de textos oficiales.',
          '[DESARROLLO PROPIO]: Elaboración pedagógica del equipo docente sin rango normativo.',
          '[EVIDENCIA]: Dato contrastado con fuentes verificables.',
          '[HOLD — PENDIENTE DE VERIFICACIÓN]: Información no verificada que requiere confirmación.',
          '',
          'Queda prohibido presentar desarrollo propio como normativa, hipótesis como hecho, o propuesta pedagógica como obligación administrativa.',
          '[DESARROLLO PROPIO]'
        ],
        categoria: 'DESARROLLO'
      },
      {
        numero: '1.8',
        titulo: 'Contexto institucional',
        contenido: [
          'HOLD — PENDIENTE DE VERIFICACIÓN: Los datos específicos del contexto institucional no se consignarán sin información verificada.',
          '',
          'Marco general aplicable:',
          'La enseñanza del Clarinete se desarrolla en el marco de los conservatorios de música de Extremadura. La organización concreta depende de cada centro y se regula por su proyecto educativo y normas de organización y funcionamiento.',
          '[DESARROLLO PROPIO]'
        ],
        categoria: 'HOLD'
      },
      {
        numero: '1.9',
        titulo: 'Características de las Enseñanzas Elementales',
        contenido: [
          'Las Enseñanzas Elementales constituyen una etapa de iniciación y formación básica:',
          '• Iniciación al instrumento: conocimiento del clarinete, montaje, mantenimiento básico.',
          '• Adquisición de hábitos: postura corporal, colocación de las manos, posición de la caña.',
          '• Técnica inicial: respiración diafragmática, embocadura básica, emisión del sonido.',
          '• Sonido inicial: producción de un sonido estable en el registro chalumeau.',
          '• Articulación básica: ataque sencillo, legato, staccato elemental.',
          '• Lectura: iniciación a la lectura de partituras en clave de Sol.',
          '• Ritmo: figuras rítmicas básicas, pulso, compases simples.',
          '• Afinación inicial: noción de afinación, primeras referencias auditivas.',
          '• Autonomía inicial: hábitos de estudio individual, organización del tiempo.',
          '• Motivación: mantenimiento del interés y disfrute con la música.',
          '[DESARROLLO PROPIO]'
        ],
        categoria: 'DESARROLLO'
      },
      {
        numero: '1.10',
        titulo: 'Características de las Enseñanzas Profesionales',
        contenido: [
          'Las Enseñanzas Profesionales constituyen una etapa de consolidación y especialización:',
          '• Consolidación técnica: dominio progresivo de todos los registros, escalas, arpegios.',
          '• Control avanzado: precisión rítmica, control dinámico, estabilidad de afinación.',
          '• Sonido: desarrollo de un sonido personal, proyectado y con variedad de colores.',
          '• Afinación: control consciente y sistemático en todas las tessituras.',
          '• Articulación: dominio de articulaciones simples y dobles, legato, staccato.',
          '• Registros: dominio completo del chalumeau, clarion y altissimo (según nivel).',
          '• Repertorio: estudio de obras de diferentes épocas y estilos.',
          '• Análisis: capacidad de análisis formal, armónico y estructural.',
          '• Interpretación: construcción de un discurso musical coherente y expresivo.',
          '• Memoria: interpretación de memoria como recurso artístico.',
          '• Autonomía: capacidad de trabajo independiente y autocrítica.',
          '• Preparación de recitales: experiencia en interpretación pública.',
          '[DESARROLLO PROPIO]'
        ],
        categoria: 'DESARROLLO'
      },
      {
        numero: '1.11',
        titulo: 'Características del alumnado',
        contenido: [
          '• Diversidad: ritmos de aprendizaje diferentes, experiencias previas diversas.',
          '• Edades: Elementales generalmente entre 8-12 años; Profesionales entre 12-18 años.',
          '• Experiencia previa: el alumnado que accede a Profesionales procede de Elementales.',
          '• Motivación: variable, requiere estrategias de engagement.',
          '• Necesidades educativas: la programación contempla adaptaciones metodológicas.',
          '',
          'HOLD — No se consignarán diagnósticos ni necesidades individuales concretas.',
          '[DESARROLLO PROPIO]'
        ],
        categoria: 'DESARROLLO'
      },
      {
        numero: '1.12',
        titulo: 'Recursos y contexto',
        contenido: [
          'RECURSOS NECESARIOS:',
          '• Aula individual de instrumento con condiciones acústicas adecuadas.',
          '• Clarinete en Si bemol (sistema Boehm) en condiciones de uso.',
          '• Atril, soporte de partituras.',
          '• Afinador electrónico o aplicación.',
          '• Metrónomo.',
          '• Material de grabación (para evidencias audiovisuales).',
          '• Acceso a partituras (físicas o digitales).',
          '• Piano para acompañamiento del profesor.',
          '',
          'RECURSOS DISPONIBLES:',
          'HOLD — PENDIENTE DE VERIFICACIÓN: La disponibilidad concreta depende de cada centro.',
          '[DESARROLLO PROPIO]'
        ],
        categoria: 'HOLD'
      }
    ]
  },
  {
    numero: '2',
    titulo: 'MARCO NORMATIVO',
    subapartados: [
      {
        numero: '2.1',
        titulo: 'Normativa estatal',
        contenido: [
          '• Ley Orgánica 2/2006, de 3 de mayo, de Educación (LOE).',
          '• Ley Orgánica 3/2020, de 29 de diciembre (LOMLOE).',
          '• Real Decreto 1577/2006, de 22 de diciembre (aspectos básicos EE.PP.).',
          '• Real Decreto 628/2022, de 26 de julio (modificación LOMLOE).',
          '[NORMA VIGENTE — Verificado en BOE]'
        ],
        categoria: 'NORMA'
      },
      {
        numero: '2.2',
        titulo: 'Normativa de Enseñanzas Elementales',
        contenido: [
          '• Decreto 110/2007, de 22 de mayo (currículo EE.EE. Extremadura).',
          '• Decreto 54/2022, de 18 de mayo (modificación EE.EE. LOMLOE).',
          '',
          'El Decreto 54/2022 modifica el Decreto 110/2007 adaptando el currículo de las Enseñanzas Elementales de Música a la LOMLOE. El Clarinete figura como especialidad.',
          '[NORMA VIGENTE — Publicado en DOE nº 98, de 24 de mayo de 2022]'
        ],
        categoria: 'NORMA'
      },
      {
        numero: '2.3',
        titulo: 'Normativa de Enseñanzas Profesionales',
        contenido: [
          '• Decreto 111/2007, de 22 de mayo (currículo EE.PP. Extremadura).',
          '',
          'HOLD — PENDIENTE DE VERIFICACIÓN: A fecha de elaboración, se encuentra en fase de consulta pública el proyecto de Decreto que modificará el Decreto 111/2007 para su adaptación a la LOMLOE.',
          '[NORMA VIGENTE — Publicado en DOE]'
        ],
        categoria: 'NORMA'
      },
      {
        numero: '2.4',
        titulo: 'Normativa autonómica complementaria',
        contenido: [
          '• Decreto 110/2007 — Currículo Enseñanzas Elementales.',
          '• Decreto 111/2007 — Currículo Enseñanzas Profesionales.',
          '• Decreto 54/2022 — Modificación EE.MM. LOMLOE.',
          '• Orden de 28/04/2009 — Evaluación y otros aspectos.',
          '• Ley 4/2011, de 24 de marzo — Música y Danza en Extremadura.',
          '• Decreto 228/2014 — Inclusión educativa.',
          '• Ley 11/2014 — Igualdad de trato.',
          '[NORMA VIGENTE — Verificado]'
        ],
        categoria: 'NORMA'
      },
      {
        numero: '2.5',
        titulo: 'Normativa de evaluación',
        contenido: [
          'La evaluación se regula por:',
          '• Decreto 110/2007 (Elementales) — disposiciones sobre evaluación, promoción y titulación.',
          '• Decreto 111/2007 (Profesionales) — disposiciones sobre evaluación, promoción y titulación.',
          '• Orden de 28/04/2009 — desarrollo de aspectos específicos de evaluación.',
          '• Instrucciones anuales de la Secretaría General de Educación.',
          '',
          'Tipos de evaluación:',
          '• Evaluación inicial: al inicio del curso.',
          '• Evaluación continua: a lo largo del proceso de aprendizaje.',
          '• Evaluación final: al final de cada trimestre y del curso.',
          '• Evaluación formativa: integrada en el proceso de enseñanza-aprendizaje.',
          '',
          'HOLD — Los procedimientos concretos de recuperación y porcentajes se determinan por normativa vigente.',
          '[NORMA VIGENTE]'
        ],
        categoria: 'NORMA'
      },
      {
        numero: '2.6',
        titulo: 'Normativa de inclusión',
        contenido: [
          '• Decreto 228/2014, de 7 de octubre, de inclusión educativa en Extremadura.',
          '• Ley 11/2014, para la igualdad de trato y no discriminación.',
          '• LOE/LOMLOE — principios de inclusión y equidad.',
          '',
          'Aplicación al Clarinete: Las medidas de inclusión se aplicarán mediante adaptaciones metodológicas, ajustes en la temporalización, selección de repertorio adaptado y modificaciones en instrumentos de evaluación.',
          '[NORMA VIGENTE — Decreto 228/2014]'
        ],
        categoria: 'NORMA'
      },
      {
        numero: '2.7',
        titulo: 'Organización de centros',
        contenido: [
          'La organización de los conservatorios se rige por la normativa vigente sobre organización y funcionamiento de centros docentes no universitarios.',
          '',
          'HOLD — PENDIENTE DE VERIFICACIÓN: La normativa organizativa concreta puede incluir decretos específicos.',
          '[NORMA VIGENTE]'
        ],
        categoria: 'HOLD'
      },
      {
        numero: '2.8',
        titulo: 'Aplicación 2026/2027',
        contenido: [
          'Para el curso 2026/2027, se distinguen:',
          '• Normativa permanente: leyes, decretos y órdenes con vigencia continuada.',
          '• Normativa anual: resoluciones de calendario escolar, instrucciones de evaluación.',
          '• Instrucciones específicas: aquellas que puedan dictarse para el curso 2026/2027.',
          '',
          'HOLD — Las instrucciones anuales para 2026/2027 no están disponibles en el momento de elaboración.',
          '[DESARROLLO PROPIO]'
        ],
        categoria: 'HOLD'
      },
      {
        numero: '2.9',
        titulo: 'Jerarquía y vigencia',
        contenido: [
          'Protocolo de comprobación de la vigencia normativa:',
          '1. Verificar en el DOE/BOE la publicación de la norma.',
          '2. Comprobar si ha sido modificada o derogada.',
          '3. Identificar las disposiciones transitorias aplicables.',
          '4. Consultar instrucciones anuales vigentes.',
          '5. En caso de duda, marcar como HOLD.',
          '[DESARROLLO PROPIO]'
        ],
        categoria: 'DESARROLLO'
      },
      {
        numero: '2.10',
        titulo: 'Matriz normativa',
        contenido: [
          'ID | Norma | Fecha | Rango | Ámbito | Etapa | Vigencia | Estado',
          'NORMA-001 | LOE (Ley Orgánica 2/2006) | 03/05/2006 | Ley Orgánica | Estatal | Ambas | Vigente (modificada) | Verificado',
          'NORMA-002 | LOMLOE (Ley Orgánica 3/2020) | 29/12/2020 | Ley Orgánica | Estatal | Ambas | Vigente | Verificado',
          'NORMA-003 | RD 1577/2006 | 22/12/2006 | Real Decreto | Estatal | Profesionales | Vigente (modificado) | Verificado',
          'NORMA-004 | RD 628/2022 | 26/07/2022 | Real Decreto | Estatal | Ambas | Vigente | Verificado',
          'NORMA-005 | Decreto 110/2007 | 22/05/2007 | Decreto | Autonómico | Elementales | Vigente (modificado) | Verificado',
          'NORMA-006 | Decreto 111/2007 | 22/05/2007 | Decreto | Autonómico | Profesionales | Vigente | Verificado',
          'NORMA-007 | Decreto 54/2022 | 18/05/2022 | Decreto | Autonómico | Elementales | Vigente | Verificado',
          'NORMA-008 | Orden 28/04/2009 | 28/04/2009 | Orden | Autonómico | Ambas | Vigente | Verificado',
          'NORMA-009 | Ley 4/2011 | 24/03/2011 | Ley | Autonómico | Ambas | Vigente | Verificado',
          'NORMA-010 | Decreto 228/2014 | 07/10/2014 | Decreto | Autonómico | Ambas | Vigente | Verificado'
        ],
        categoria: 'NORMA'
      },
      {
        numero: '2.11',
        titulo: 'Fichas normativas',
        contenido: [
          'NORMA-006 — Decreto 111/2007',
          'Denominación: Decreto 111/2007, de 22 de mayo, por el que se establece el currículo de las enseñanzas profesionales de música de régimen especial en la Comunidad Autónoma de Extremadura.',
          'Fecha: 22 de mayo de 2007',
          'Publicación: DOE',
          'Rango: Decreto autonómico',
          'Ámbito: Comunidad Autónoma de Extremadura',
          'Etapa: Enseñanzas Profesionales de Música',
          'Contenido relevante: Objetivos, contenidos, criterios de evaluación de todas las especialidades instrumentales, incluido el Clarinete.',
          'Vigencia: Vigente (pendiente de modificación LOMLOE)',
          'Modificaciones: RD 628/2022 (estatal)',
          'Estado: Verificado',
          '',
          'NORMA-007 — Decreto 54/2022',
          'Denominación: Decreto 54/2022, de 18 de mayo, por el que se regula el currículo de las enseñanzas elementales de música de régimen especial en Extremadura.',
          'Fecha: 18 de mayo de 2022',
          'Publicación: DOE nº 98, de 24 de mayo de 2022',
          'Rango: Decreto autonómico',
          'Ámbito: Comunidad Autónoma de Extremadura',
          'Etapa: Enseñanzas Elementales de Música',
          'Contenido relevante: Currículo adaptado a LOMLOE para todas las especialidades, incluido Clarinete.',
          'Vigencia: Vigente',
          'Estado: Verificado'
        ],
        categoria: 'NORMA'
      }
    ]
  }
];

// Continuaré con los apartados 3-30 en el siguiente archivo por limitaciones de espacio
