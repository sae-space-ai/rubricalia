// ============================================================
// PROGRAMACIÓN DIDÁCTICA DE CLARINETE 2026/2027
// BLOQUE 01 — Apartados 1-3
// ============================================================

export interface Section {
  id: string;
  number: string;
  title: string;
  subsections: Subsection[];
}

export interface Subsection {
  id: string;
  number: string;
  title: string;
  content: ContentBlock[];
}

export interface ContentBlock {
  type: 'paragraph' | 'list' | 'table' | 'hold' | 'norma' | 'desarrollo' | 'heading' | 'evidence';
  text?: string;
  items?: string[];
  rows?: string[][];
  headers?: string[];
  category?: string;
  level?: string;
}

export const BLOCK_01_SECTIONS: Section[] = [
  {
    id: 's1',
    number: '1',
    title: 'IDENTIFICACIÓN Y CONTEXTUALIZACIÓN',
    subsections: [
      {
        id: 's1-1',
        number: '1.1',
        title: 'Denominación',
        content: [
          { type: 'heading', level: 'h4', text: 'Denominación oficial' },
          { type: 'paragraph', text: 'Programación Didáctica de Clarinete para el curso académico 2026/2027.' },
          { type: 'heading', level: 'h4', text: 'Instrumento' },
          { type: 'paragraph', text: 'Clarinete (sistema Boehm). [DESARROLLO PROPIO]' },
          { type: 'heading', level: 'h4', text: 'Enseñanzas' },
          { type: 'list', items: [
            'Enseñanzas Elementales de Música.',
            'Enseñanzas Profesionales de Música.'
          ]},
          { type: 'heading', level: 'h4', text: 'Etapas' },
          { type: 'paragraph', text: 'Este documento integra la programación de ambas etapas, manteniendo diferenciados los elementos curriculares, objetivos, contenidos, criterios de evaluación, repertorios y niveles de exigencia propios de cada una.' },
          { type: 'heading', level: 'h4', text: 'Cursos' },
          { type: 'table', headers: ['Etapa', 'Cursos', 'Duración'], rows: [
            ['Enseñanzas Elementales', '1.º a 4.º (o 1.º a 6.º según organización del centro)', '[HOLD — PENDIENTE DE VERIFICACIÓN: organización concreta del centro]'],
            ['Enseñanzas Profesionales', '1.º a 6.º', '6 cursos']
          ]},
          { type: 'heading', level: 'h4', text: 'Curso académico' },
          { type: 'paragraph', text: '2026/2027.' },
          { type: 'heading', level: 'h4', text: 'Territorio' },
          { type: 'paragraph', text: 'Comunidad Autónoma de Extremadura. [NORMA VIGENTE]' },
          { type: 'heading', level: 'h4', text: 'Naturaleza del documento' },
          { type: 'paragraph', text: 'Documento curricular, pedagógico, didáctico, evaluativo y organizativo. Instrumento de planificación, coordinación, evaluación y mejora. [DESARROLLO PROPIO]' },
          { type: 'heading', level: 'h4', text: 'Destinatarios' },
          { type: 'list', items: [
            'Profesorado del Departamento de Viento.',
            'Equipo directivo del centro.',
            'Inspección educativa.',
            'Alumnado y familias (en su vertiente informativa).'
          ]},
          { type: 'heading', level: 'h4', text: 'Finalidad' },
          { type: 'paragraph', text: 'Establecer el marco curricular, pedagógico y evaluativo para la enseñanza del Clarinete en ambas etapas, garantizando la coherencia, la progresión, la trazabilidad normativa y la calidad educativa.' }
        ]
      },
      {
        id: 's1-2',
        number: '1.2',
        title: 'Enseñanzas, cursos y estructura',
        content: [
          { type: 'paragraph', text: 'A continuación se presenta la estructura de las enseñanzas de Clarinete en ambas etapas. [NORMA VIGENTE — Decreto 54/2022 para Elementales; Decreto 111/2007 para Profesionales]' },
          { type: 'heading', level: 'h4', text: 'A) Enseñanzas Elementales de Clarinete' },
          { type: 'table', headers: ['Curso', 'Características principales', 'Duración'], rows: [
            ['1.º', 'Iniciación instrumental. Postura, respiración, embocadura básica, primeras digitaciones, sonido inicial.', '[HOLD — PENDIENTE DE VERIFICACIÓN]'],
            ['2.º', 'Consolidación de hábitos. Registro chalumeau. Articulación básica. Lectura rítmica.', '[HOLD — PENDIENTE DE VERIFICACIÓN]'],
            ['3.º', 'Ampliación técnica. Registro clarion. Escalas básicas. Primeras obras de repertorio.', '[HOLD — PENDIENTE DE VERIFICACIÓN]'],
            ['4.º', 'Consolidación. Extensión completa. Lectura fluida. Preparación para acceso a Profesionales.', '[HOLD — PENDIENTE DE VERIFICACIÓN]']
          ]},
          { type: 'hold', text: 'HOLD — La duración exacta de las Enseñanzas Elementales (4 o 6 cursos) depende de la organización específica del centro y de la normativa autonómica vigente. Se requiere verificación del Decreto 54/2022 y de las instrucciones anuales.' },
          { type: 'heading', level: 'h4', text: 'B) Enseñanzas Profesionales de Clarinete' },
          { type: 'table', headers: ['Curso', 'Características principales', 'Duración'], rows: [
            ['1.º', 'Acceso a Profesionales. Consolidación técnica inicial. Escalas, arpegios, primeros estudios.', '1 año'],
            ['2.º', 'Desarrollo técnico. Registros, articulación avanzada, repertorio gradual.', '1 año'],
            ['3.º', 'Consolidación intermedia. Repertorio más exigente. Análisis, memoria.', '1 año'],
            ['4.º', 'Avanzado. Técnica ampliada. Repertorio de diferentes estilos.', '1 año'],
            ['5.º', 'Preprofesional. Repertorio de concierto. Preparación de audiciones.', '1 año'],
            ['6.º', 'Nivel preprofesional completo. Preparación para acceso a enseñanzas superiores.', '1 año']
          ]},
          { type: 'paragraph', text: '[NORMA VIGENTE — Decreto 111/2007, art. 3: las enseñanzas profesionales de música se organizarán en un grado de seis cursos de duración.]' }
        ]
      },
      {
        id: 's1-3',
        number: '1.3',
        title: 'Curso académico 2026/2027',
        content: [
          { type: 'paragraph', text: 'El presente documento corresponde al curso académico 2026/2027.' },
          { type: 'heading', level: 'h4', text: 'Calendario escolar' },
          { type: 'hold', text: 'HOLD — PENDIENTE DE VERIFICACIÓN: Las fechas exactas de inicio y fin del curso, periodos de evaluación y calendario de exámenes se determinan anualmente mediante Resolución de la Secretaría General de Educación. Se requiere consultar la resolución correspondiente al curso 2026/2027.' },
          { type: 'heading', level: 'h4', text: 'Periodización' },
          { type: 'paragraph', text: 'El curso académico se estructura generalmente en tres trimestres, si bien la organización concreta depende de la resolución anual. [HOLD — PENDIENTE DE VERIFICACIÓN]' },
          { type: 'heading', level: 'h4', text: 'Revisión del documento' },
          { type: 'paragraph', text: 'Esta programación será revisada al final del curso académico para incorporar las mejoras derivadas de la evaluación de la práctica docente y, en su caso, de las modificaciones normativas que pudieran producirse. [DESARROLLO PROPIO]' }
        ]
      },
      {
        id: 's1-4',
        number: '1.4',
        title: 'Centro, departamento y profesorado',
        content: [
          { type: 'hold', text: 'HOLD — PENDIENTE DE VERIFICACIÓN: No se consignarán datos específicos del centro (denominación, dirección, número de aulas, ratio de alumnado, nombre del profesorado) por no disponer de información verificada. Estos datos se incorporarán en el momento de la adaptación al centro concreto.' },
          { type: 'heading', level: 'h4', text: 'Estructura institucional (marco general)' },
          { type: 'paragraph', text: 'La asignatura de Clarinete se imparte en el marco del Departamento de Viento (o denominación equivalente según el centro). La programación es elaborada por el profesorado especialista y aprobada por el departamento y el equipo directivo.' },
          { type: 'paragraph', text: '[DESARROLLO PROPIO — Marco general sin datos específicos inventados]' }
        ]
      },
      {
        id: 's1-5',
        number: '1.5',
        title: 'Naturaleza y finalidad',
        content: [
          { type: 'paragraph', text: 'Esta programación didáctica constituye:' },
          { type: 'list', items: [
            'Instrumento de planificación: establece los objetivos, contenidos, metodología y temporalización.',
            'Instrumento de programación: concreta el currículo para el contexto del centro.',
            'Documento curricular: desarrolla los elementos del currículo oficial.',
            'Instrumento de coordinación: garantiza la coherencia entre profesorado, departamentos y etapas.',
            'Instrumento de evaluación: define criterios, instrumentos y procedimientos.',
            'Instrumento de mejora: incorpora mecanismos de revisión y actualización.'
          ]},
          { type: 'paragraph', text: '[DESARROLLO PROPIO]' }
        ]
      },
      {
        id: 's1-6',
        number: '1.6',
        title: 'Criterios de elaboración y depuración',
        content: [
          { type: 'paragraph', text: 'El presente documento se ha elaborado siguiendo los siguientes criterios:' },
          { type: 'list', items: [
            'Recuperación: se ha partido del corpus documental existente, sin eliminar elementos previamente validados salvo evidencia en contrario.',
            'Depuración: se han eliminado duplicidades, contradicciones y elementos no trazables.',
            'Revisión: cada apartado ha sido verificado en cuanto a su coherencia interna y con la normativa.',
            'Control de versiones: el documento identifica claramente su versión y fecha.',
            'Clasificación: toda información se clasifica según las categorías documentales establecidas.',
            'Trazabilidad: se mantiene la cadena normativa → elemento curricular → objetivo → contenido → actividad → evidencia → evaluación.',
            'HOLD: cualquier dato no verificado se marca como PENDIENTE DE VERIFICACIÓN.'
          ]},
          { type: 'paragraph', text: '[DESARROLLO PROPIO]' }
        ]
      },
      {
        id: 's1-7',
        number: '1.7',
        title: 'Categorías documentales',
        content: [
          { type: 'paragraph', text: 'Toda la información del documento se clasifica en las siguientes categorías:' },
          { type: 'table', headers: ['Categoría', 'Significado', 'Ejemplo'], rows: [
            ['[NORMA VIGENTE]', 'Información extraída directamente de normativa con identificación completa.', 'Decreto 111/2007, art. 5'],
            ['[TEXTO OFICIAL]', 'Transcripción o parafraseo de textos oficiales.', 'Objetivos del currículo oficial'],
            ['[DESARROLLO PROPIO]', 'Elaboración pedagógica del equipo docente sin rango normativo.', 'Propuesta metodológica, actividades'],
            ['[EVIDENCIA]', 'Dato contrastado con fuentes verificables.', 'Resultados de evaluaciones anteriores'],
            ['[HOLD — PENDIENTE DE VERIFICACIÓN]', 'Información no verificada que requiere confirmación.', 'Fechas, porcentajes, datos de centro']
          ]},
          { type: 'paragraph', text: 'Queda prohibido presentar desarrollo propio como normativa, hipótesis como hecho, o propuesta pedagógica como obligación administrativa.' }
        ]
      },
      {
        id: 's1-8',
        number: '1.8',
        title: 'Contexto institucional',
        content: [
          { type: 'hold', text: 'HOLD — PENDIENTE DE VERIFICACIÓN: Los datos específicos del contexto institucional (organización del centro, aulas disponibles, recursos materiales, actividades institucionales concretas) no se consignarán sin información verificada.' },
          { type: 'heading', level: 'h4', text: 'Marco general aplicable' },
          { type: 'paragraph', text: 'La enseñanza del Clarinete se desarrolla en el marco de los conservatorios de música de Extremadura, centros que imparten Enseñanzas Elementales y/o Profesionales de Música. La organización concreta (horarios, agrupamientos, recursos) depende de cada centro y se regula por su proyecto educativo y normas de organización y funcionamiento. [DESARROLLO PROPIO]' }
        ]
      },
      {
        id: 's1-9',
        number: '1.9',
        title: 'Características de las Enseñanzas Elementales',
        content: [
          { type: 'paragraph', text: 'Las Enseñanzas Elementales de Música constituyen una etapa de iniciación y formación básica. En el caso del Clarinete, se caracterizan por:' },
          { type: 'list', items: [
            'Iniciación al instrumento: conocimiento del clarinete, montaje, mantenimiento básico.',
            'Adquisición de hábitos: postura corporal, colocación de las manos, posición de la caña.',
            'Técnica inicial: respiración diafragmática, embocadura básica, emisión del sonido, primeras digitaciones.',
            'Sonido inicial: producción de un sonido estable en el registro chalumeau.',
            'Articulación básica: ataque sencillo, legato, staccato elemental.',
            'Lectura: iniciación a la lectura de partituras en clave de Sol.',
            'Ritmo: figuras rítmicas básicas, pulso, compases simples.',
            'Afinación inicial: noción de afinación, primeras referencias auditivas.',
            'Escucha: desarrollo de la atención auditiva.',
            'Interpretación: primeras experiencias interpretativas sencillas.',
            'Autonomía inicial: hábitos de estudio individual, organización del tiempo.',
            'Motivación: mantenimiento del interés y disfrute con la música.'
          ]},
          { type: 'paragraph', text: '[DESARROLLO PROPIO — Basado en las características generales de la etapa]' }
        ]
      },
      {
        id: 's1-10',
        number: '1.10',
        title: 'Características de las Enseñanzas Profesionales',
        content: [
          { type: 'paragraph', text: 'Las Enseñanzas Profesionales de Música constituyen una etapa de consolidación, especialización y madurez instrumental. Para el Clarinete:' },
          { type: 'list', items: [
            'Consolidación técnica: dominio progresivo de todos los registros, escalas, arpegios, mecanismos.',
            'Control avanzado: precisión rítmica, control dinámico, estabilidad de afinación.',
            'Sonido: desarrollo de un sonido personal, proyectado y con variedad de colores.',
            'Afinación: control consciente y sistemático de la afinación en todas las tessituras.',
            'Articulación: dominio de articulaciones simples y dobles, legato, staccato, acentos.',
            'Flexibilidad: capacidad de adaptación a diferentes contextos musicales.',
            'Registros: dominio completo del chalumeau, clarion y altissimo (según nivel).',
            'Repertorio: estudio de obras de diferentes épocas y estilos.',
            'Estilos: comprensión y diferenciación de estilos musicales.',
            'Análisis: capacidad de análisis formal, armónico y estructural.',
            'Interpretación: construcción de un discurso musical coherente y expresivo.',
            'Memoria: interpretación de memoria como recurso artístico.',
            'Lectura: lectura a primera vista con fluidez.',
            'Autonomía: capacidad de trabajo independiente y autocrítica.',
            'Criterio artístico: desarrollo de una personalidad interpretativa.',
            'Preparación de recitales: experiencia en interpretación pública.',
            'Continuidad académica y profesional: preparación para acceso a enseñanzas superiores.'
          ]},
          { type: 'paragraph', text: '[DESARROLLO PROPIO — Basado en las características generales de la etapa]' }
        ]
      },
      {
        id: 's1-11',
        number: '1.11',
        title: 'Características del alumnado',
        content: [
          { type: 'paragraph', text: 'El alumnado de Clarinete presenta características diversas que deben ser atendidas desde la programación:' },
          { type: 'heading', level: 'h4', text: 'Diversidad' },
          { type: 'paragraph', text: 'El alumnado presenta ritmos de aprendizaje diferentes, experiencias previas diversas y motivaciones variadas. La programación debe contemplar esta diversidad sin inventar diagnósticos ni necesidades individuales concretas. [DESARROLLO PROPIO]' },
          { type: 'heading', level: 'h4', text: 'Edades' },
          { type: 'paragraph', text: 'Enseñanzas Elementales: generalmente entre 8-12 años de inicio. Enseñanzas Profesionales: generalmente entre 12-18 años. [HOLD — PENDIENTE DE VERIFICACIÓN: las edades concretas pueden variar según el centro.]' },
          { type: 'heading', level: 'h4', text: 'Experiencia previa' },
          { type: 'paragraph', text: 'El alumnado que accede a Enseñanzas Profesionales procede de las Enseñanzas Elementales, con un nivel de partida que puede variar significativamente. [DESARROLLO PROPIO]' },
          { type: 'heading', level: 'h4', text: 'Necesidades educativas' },
          { type: 'hold', text: 'HOLD — No se consignarán diagnósticos ni necesidades individuales. La atención a la diversidad se aborda en el apartado 20 de esta programación.' }
        ]
      },
      {
        id: 's1-12',
        number: '1.12',
        title: 'Recursos y contexto',
        content: [
          { type: 'heading', level: 'h4', text: 'Recursos necesarios' },
          { type: 'list', items: [
            'Aula individual de instrumento con condiciones acústicas adecuadas.',
            'Clarinete en Si bemol (sistema Boehm) en condiciones de uso.',
            'Atril, soporte de partituras.',
            'Afinador electrónico o aplicación.',
            'Metrónomo.',
            'Material de grabación (para evidencias audiovisuales).',
            'Acceso a partituras (físicas o digitales).',
            'Piano para acompañamiento del profesor.'
          ]},
          { type: 'heading', level: 'h4', text: 'Recursos disponibles' },
          { type: 'hold', text: 'HOLD — PENDIENTE DE VERIFICACIÓN: La disponibilidad concreta de recursos (número de aulas, instrumentos del centro, equipamiento tecnológico) depende de cada centro y no se consignará sin verificación.' },
          { type: 'paragraph', text: '[DESARROLLO PROPIO]' }
        ]
      }
    ]
  },
  {
    id: 's2',
    number: '2',
    title: 'MARCO NORMATIVO',
    subsections: [
      {
        id: 's2-1',
        number: '2.1',
        title: 'Normativa estatal',
        content: [
          { type: 'paragraph', text: 'La enseñanza del Clarinete en las Enseñanzas Elementales y Profesionales de Música se enmarca en la siguiente normativa estatal:' },
          { type: 'table', headers: ['Norma', 'Fecha', 'Contenido', 'Estado'], rows: [
            ['Ley Orgánica 2/2006, de 3 de mayo, de Educación (LOE)', '03/05/2006', 'Ley fundamental del sistema educativo.', '[NORMA VIGENTE — modificada por LOMLOE]'],
            ['Ley Orgánica 3/2020, de 29 de diciembre (LOMLOE)', '29/12/2020', 'Modificación de la LOE. Nuevo marco competencial.', '[NORMA VIGENTE]'],
            ['Real Decreto 1577/2006, de 22 de diciembre', '22/12/2006', 'Aspectos básicos del currículo de las Enseñanzas Profesionales de Música.', '[NORMA VIGENTE — modificada por RD 628/2022]'],
            ['Real Decreto 628/2022, de 26 de julio', '26/07/2022', 'Modificación de varios RD para aplicación de la LOMLOE en enseñanzas artísticas.', '[NORMA VIGENTE]']
          ]},
          { type: 'paragraph', text: '[NORMA VIGENTE — Verificado en BOE]' }
        ]
      },
      {
        id: 's2-2',
        number: '2.2',
        title: 'Normativa de Enseñanzas Elementales (Extremadura)',
        content: [
          { type: 'paragraph', text: 'Para las Enseñanzas Elementales de Música en Extremadura:' },
          { type: 'table', headers: ['Norma', 'Fecha', 'Contenido', 'Estado'], rows: [
            ['Decreto 110/2007, de 22 de mayo', '22/05/2007', 'Currículo de las Enseñanzas Elementales de Música en Extremadura.', '[NORMA VIGENTE — modificado]'],
            ['Decreto 54/2022, de 18 de mayo', '18/05/2007', 'Modificación del Decreto 110/2007 para adaptación a la LOMLOE.', '[NORMA VIGENTE]']
          ]},
          { type: 'norma', category: 'NORMA VIGENTE', text: 'El Decreto 54/2022 modifica el Decreto 110/2007 adaptando el currículo de las Enseñanzas Elementales de Música a la LOMLOE. El Clarinete figura como especialidad en las Enseñanzas Elementales.' },
          { type: 'paragraph', text: '[NORMA VIGENTE — Publicado en DOE nº 98, de 24 de mayo de 2022]' }
        ]
      },
      {
        id: 's2-3',
        number: '2.3',
        title: 'Normativa de Enseñanzas Profesionales (Extremadura)',
        content: [
          { type: 'paragraph', text: 'Para las Enseñanzas Profesionales de Música en Extremadura:' },
          { type: 'table', headers: ['Norma', 'Fecha', 'Contenido', 'Estado'], rows: [
            ['Decreto 111/2007, de 22 de mayo', '22/05/2007', 'Currículo de las Enseñanzas Profesionales de Música en Extremadura.', '[NORMA VIGENTE — pendiente de modificación LOMLOE]']
          ]},
          { type: 'hold', text: 'HOLD — PENDIENTE DE VERIFICACIÓN: A fecha de elaboración de este documento, se encuentra en fase de consulta pública el proyecto de Decreto que modificará el Decreto 111/2007 para su adaptación a la LOMLOE. Hasta la publicación del nuevo decreto, el Decreto 111/2007 mantiene su vigencia con las modificaciones introducidas por el RD 628/2022 estatal.' },
          { type: 'paragraph', text: '[NORMA VIGENTE — Publicado en DOE]' }
        ]
      },
      {
        id: 's2-4',
        number: '2.4',
        title: 'Normativa autonómica complementaria',
        content: [
          { type: 'table', headers: ['Norma', 'Fecha', 'Contenido', 'Aplicación a Clarinete'], rows: [
            ['Decreto 110/2007', '22/05/2007', 'Currículo Enseñanzas Elementales', 'Directa — Elementales'],
            ['Decreto 111/2007', '22/05/2007', 'Currículo Enseñanzas Profesionales', 'Directa — Profesionales'],
            ['Decreto 54/2022', '18/05/2022', 'Modificación EE.MM. LOMLOE', 'Directa — Elementales'],
            ['Orden de 28/04/2009', '28/04/2009', 'Evaluación y otros aspectos', 'Directa — Ambas etapas'],
            ['Ley 4/2011, de 24 de marzo', '24/03/2011', 'Música y Danza en Extremadura', 'Directa — Ambas etapas'],
            ['Decreto 228/2014', '07/10/2014', 'Inclusión educativa', 'Transversal'],
            ['Ley 11/2014', '2014', 'Igualdad de trato', 'Transversal']
          ]},
          { type: 'paragraph', text: '[NORMA VIGENTE — Verificado]' }
        ]
      },
      {
        id: 's2-5',
        number: '2.5',
        title: 'Normativa de evaluación',
        content: [
          { type: 'paragraph', text: 'La evaluación en las enseñanzas de música se regula por:' },
          { type: 'list', items: [
            'Decreto 110/2007 (Elementales) — disposiciones sobre evaluación, promoción y titulación.',
            'Decreto 111/2007 (Profesionales) — disposiciones sobre evaluación, promoción y titulación.',
            'Orden de 28/04/2009 — desarrollo de aspectos específicos de evaluación.',
            'Instrucciones anuales de la Secretaría General de Educación.'
          ]},
          { type: 'paragraph', text: 'Los tipos de evaluación aplicables son:' },
          { type: 'list', items: [
            'Evaluación inicial: al inicio del curso, para conocer el punto de partida.',
            'Evaluación continua: a lo largo del proceso de aprendizaje.',
            'Evaluación final: al final de cada trimestre y del curso.',
            'Evaluación formativa: integrada en el proceso de enseñanza-aprendizaje.'
          ]},
          { type: 'hold', text: 'HOLD — PENDIENTE DE VERIFICACIÓN: Los procedimientos concretos de recuperación, las condiciones de promoción y los porcentajes de calificación se determinan por la normativa vigente y las instrucciones del centro. No se inventarán porcentajes ni condiciones.' }
        ]
      },
      {
        id: 's2-6',
        number: '2.6',
        title: 'Normativa de inclusión',
        content: [
          { type: 'paragraph', text: 'La atención a la diversidad y la inclusión se rigen por:' },
          { type: 'list', items: [
            'Decreto 228/2014, de 7 de octubre, de inclusión educativa en Extremadura.',
            'Ley 11/2014, para la igualdad de trato y no discriminación.',
            'LOE/LOMLOE — principios de inclusión y equidad.'
          ]},
          { type: 'paragraph', text: 'Aplicación al Clarinete: Las medidas de inclusión se aplicarán en el aula de instrumento mediante adaptaciones metodológicas, ajustes en la temporalización, selección de repertorio adaptado y, en su caso, modificaciones en los instrumentos de evaluación. [DESARROLLO PROPIO]' }
        ]
      },
      {
        id: 's2-7',
        number: '2.7',
        title: 'Organización de centros',
        content: [
          { type: 'paragraph', text: 'La organización de los conservatorios de música se rige por la normativa vigente sobre organización y funcionamiento de centros docentes no universitarios. [NORMA VIGENTE]' },
          { type: 'hold', text: 'HOLD — PENDIENTE DE VERIFICACIÓN: La normativa organizativa concreta puede incluir decretos de organización y funcionamiento, instrucciones anuales y normativa específica de régimen especial.' }
        ]
      },
      {
        id: 's2-8',
        number: '2.8',
        title: 'Aplicación 2026/2027',
        content: [
          { type: 'paragraph', text: 'Para el curso 2026/2027, se distinguen:' },
          { type: 'list', items: [
            'Normativa permanente: leyes, decretos y órdenes con vigencia continuada.',
            'Normativa anual: resoluciones de calendario escolar, instrucciones de evaluación, instrucciones de inicio de curso.',
            'Instrucciones específicas: aquellas que puedan dictarse para el curso 2026/2027.'
          ]},
          { type: 'hold', text: 'HOLD — PENDIENTE DE VERIFICACIÓN: Las instrucciones anuales para el curso 2026/2027 no están disponibles en el momento de elaboración de este documento.' }
        ]
      },
      {
        id: 's2-9',
        number: '2.9',
        title: 'Jerarquía y vigencia',
        content: [
          { type: 'paragraph', text: 'Protocolo de comprobación de la vigencia normativa:' },
          { type: 'list', items: [
            '1. Verificar en el DOE/BOE la publicación de la norma.',
            '2. Comprobar si ha sido modificada o derogada.',
            '3. Identificar las disposiciones transitorias aplicables.',
            '4. Consultar instrucciones anuales vigentes.',
            '5. En caso de duda, marcar como HOLD.'
          ]},
          { type: 'paragraph', text: '[DESARROLLO PROPIO]' }
        ]
      },
      {
        id: 's2-10',
        number: '2.10',
        title: 'Matriz normativa',
        content: [
          { type: 'paragraph', text: 'Matriz completa de normativa aplicable:' },
          { type: 'table', headers: ['ID', 'Norma', 'Fecha', 'Rango', 'Ámbito', 'Etapa', 'Vigencia', 'Estado'], rows: [
            ['NORMA-001', 'LOE (Ley Orgánica 2/2006)', '03/05/2006', 'Ley Orgánica', 'Estatal', 'Ambas', 'Vigente (modificada)', 'Verificado'],
            ['NORMA-002', 'LOMLOE (Ley Orgánica 3/2020)', '29/12/2020', 'Ley Orgánica', 'Estatal', 'Ambas', 'Vigente', 'Verificado'],
            ['NORMA-003', 'RD 1577/2006', '22/12/2006', 'Real Decreto', 'Estatal', 'Profesionales', 'Vigente (modificado)', 'Verificado'],
            ['NORMA-004', 'RD 628/2022', '26/07/2022', 'Real Decreto', 'Estatal', 'Ambas', 'Vigente', 'Verificado'],
            ['NORMA-005', 'Decreto 110/2007', '22/05/2007', 'Decreto', 'Autonómico', 'Elementales', 'Vigente (modificado)', 'Verificado'],
            ['NORMA-006', 'Decreto 111/2007', '22/05/2007', 'Decreto', 'Autonómico', 'Profesionales', 'Vigente', 'Verificado'],
            ['NORMA-007', 'Decreto 54/2022', '18/05/2022', 'Decreto', 'Autonómico', 'Elementales', 'Vigente', 'Verificado'],
            ['NORMA-008', 'Orden 28/04/2009', '28/04/2009', 'Orden', 'Autonómico', 'Ambas', 'Vigente', 'Verificado'],
            ['NORMA-009', 'Ley 4/2011', '24/03/2011', 'Ley', 'Autonómico', 'Ambas', 'Vigente', 'Verificado'],
            ['NORMA-010', 'Decreto 228/2014', '07/10/2014', 'Decreto', 'Autonómico', 'Ambas', 'Vigente', 'Verificado']
          ]}
        ]
      },
      {
        id: 's2-11',
        number: '2.11',
        title: 'Fichas normativas',
        content: [
          { type: 'heading', level: 'h4', text: 'NORMA-006 — Decreto 111/2007' },
          { type: 'table', headers: ['Campo', 'Contenido'], rows: [
            ['Denominación', 'Decreto 111/2007, de 22 de mayo, por el que se establece el currículo de las enseñanzas profesionales de música de régimen especial en la Comunidad Autónoma de Extremadura.'],
            ['Fecha', '22 de mayo de 2007'],
            ['Publicación', 'DOE'],
            ['Rango', 'Decreto autonómico'],
            ['Ámbito', 'Comunidad Autónoma de Extremadura'],
            ['Etapa', 'Enseñanzas Profesionales de Música'],
            ['Contenido relevante', 'Objetivos, contenidos, criterios de evaluación de todas las especialidades instrumentales, incluido el Clarinete.'],
            ['Vigencia', 'Vigente (pendiente de modificación LOMLOE)'],
            ['Modificaciones', 'RD 628/2022 (estatal)'],
            ['Estado', 'Verificado']
          ]},
          { type: 'heading', level: 'h4', text: 'NORMA-007 — Decreto 54/2022' },
          { type: 'table', headers: ['Campo', 'Contenido'], rows: [
            ['Denominación', 'Decreto 54/2022, de 18 de mayo, por el que se regula el currículo de las enseñanzas elementales de música de régimen especial en Extremadura.'],
            ['Fecha', '18 de mayo de 2022'],
            ['Publicación', 'DOE nº 98, de 24 de mayo de 2022'],
            ['Rango', 'Decreto autonómico'],
            ['Ámbito', 'Comunidad Autónoma de Extremadura'],
            ['Etapa', 'Enseñanzas Elementales de Música'],
            ['Contenido relevante', 'Currículo adaptado a LOMLOE para todas las especialidades, incluido Clarinete.'],
            ['Vigencia', 'Vigente'],
            ['Estado', 'Verificado']
          ]}
        ]
      }
    ]
  },
  {
    id: 's3',
    number: '3',
    title: 'FINALIDADES EDUCATIVAS',
    subsections: [
      {
        id: 's3-1',
        number: '3.1',
        title: 'Finalidad formativa',
        content: [
          { type: 'paragraph', text: 'La enseñanza del Clarinete contribuye a la formación integral del alumnado a través de:' },
          { type: 'list', items: [
            'Desarrollo de la sensibilidad artística y estética.',
            'Formación de hábitos de trabajo, disciplina y constancia.',
            'Desarrollo de la capacidad de esfuerzo y superación.',
            'Fomento de la creatividad y la expresión personal.',
            'Contribución al desarrollo cognitivo y emocional.',
            'Educación en valores a través de la práctica musical colectiva e individual.'
          ]},
          { type: 'paragraph', text: '[DESARROLLO PROPIO]' }
        ]
      },
      {
        id: 's3-2',
        number: '3.2',
        title: 'Finalidad instrumental',
        content: [
          { type: 'paragraph', text: 'La finalidad instrumental de la enseñanza del Clarinete es el desarrollo progresivo del dominio técnico del instrumento, entendido como medio para la expresión musical. Esto incluye:' },
          { type: 'list', items: [
            'Dominio de la postura y relajación corporal.',
            'Control de la respiración diafragmática.',
            'Formación y mantenimiento de una embocadura correcta.',
            'Producción de un sonido estable, proyectado y con calidad.',
            'Control de la afinación en todas las tessituras.',
            'Dominio de las digitaciones y mecanismos.',
            'Control de las articulaciones.',
            'Desarrollo de la agilidad y precisión digital.'
          ]},
          { type: 'paragraph', text: 'Enseñanzas Elementales: iniciación y adquisición de los fundamentos técnicos básicos. [DESARROLLO PROPIO]' },
          { type: 'paragraph', text: 'Enseñanzas Profesionales: consolidación, ampliación y perfeccionamiento técnico. [DESARROLLO PROPIO]' }
        ]
      },
      {
        id: 's3-3',
        number: '3.3',
        title: 'Finalidad musical',
        content: [
          { type: 'paragraph', text: 'La técnica instrumental está al servicio de la música. La finalidad musical comprende:' },
          { type: 'list', items: [
            'Desarrollo de la escucha activa y la percepción musical.',
            'Comprensión de los elementos del lenguaje musical (ritmo, melodía, armonía, forma).',
            'Capacidad de fraseo y construcción del discurso musical.',
            'Comprensión de los diferentes estilos musicales.',
            'Capacidad de análisis musical.',
            'Desarrollo de la memoria musical.',
            'Capacidad de lectura musical.'
          ]},
          { type: 'paragraph', text: '[DESARROLLO PROPIO]' }
        ]
      },
      {
        id: 's3-4',
        number: '3.4',
        title: 'Finalidad artística',
        content: [
          { type: 'paragraph', text: 'La finalidad artística se orienta al desarrollo del criterio interpretativo personal:' },
          { type: 'list', items: [
            'Desarrollo de la expresividad musical.',
            'Toma de decisiones interpretativas fundamentadas.',
            'Construcción de una identidad artística.',
            'Capacidad de comunicación a través de la música.',
            'Comprensión de la obra musical como hecho artístico.'
          ]},
          { type: 'paragraph', text: 'Enseñanzas Elementales: iniciación a la expresividad y las primeras decisiones interpretativas. [DESARROLLO PROPIO]' },
          { type: 'paragraph', text: 'Enseñanzas Profesionales: desarrollo progresivo de un criterio artístico personal y fundamentado. [DESARROLLO PROPIO]' }
        ]
      },
      {
        id: 's3-5',
        number: '3.5',
        title: 'Finalidad personal',
        content: [
          { type: 'paragraph', text: 'La práctica instrumental contribuye al desarrollo personal mediante:' },
          { type: 'list', items: [
            'Autonomía: capacidad de trabajo independiente.',
            'Responsabilidad: compromiso con el propio aprendizaje.',
            'Constancia: hábito de práctica regular.',
            'Autorregulación: capacidad de autoevaluación y ajuste.',
            'Autoconocimiento: conciencia de las propias capacidades y límites.',
            'Superación: capacidad de afrontar y resolver dificultades.'
          ]},
          { type: 'paragraph', text: '[DESARROLLO PROPIO]' }
        ]
      },
      {
        id: 's3-6',
        number: '3.6',
        title: 'Finalidad competencial',
        content: [
          { type: 'paragraph', text: 'La enseñanza del Clarinete integra diversas competencias que se desarrollan de forma interrelacionada:' },
          { type: 'list', items: [
            'Competencia técnica instrumental.',
            'Competencia musical (escucha, comprensión, análisis).',
            'Competencia interpretativa (expresión, comunicación).',
            'Competencia lectora.',
            'Competencia auditiva.',
            'Competencia de autonomía y autorregulación.',
            'Competencia social y ciudadana (trabajo en ensemble, respeto, colaboración).'
          ]},
          { type: 'paragraph', text: '[DESARROLLO PROPIO]' }
        ]
      },
      {
        id: 's3-7',
        number: '3.7',
        title: 'Finalidad preparatoria',
        content: [
          { type: 'heading', level: 'h4', text: 'Enseñanzas Elementales' },
          { type: 'paragraph', text: 'Preparar al alumnado para:' },
          { type: 'list', items: [
            'Continuar los estudios en Enseñanzas Profesionales (si es su deseo).',
            'Disfrutar de la música como actividad formativa y de ocio.',
            'Participar en agrupaciones del centro.',
            'Poseer una base técnica y musical suficiente.'
          ]},
          { type: 'heading', level: 'h4', text: 'Enseñanzas Profesionales' },
          { type: 'paragraph', text: 'Preparar al alumnado para:' },
          { type: 'list', items: [
            'Acceso a las Enseñanzas Superiores de Música.',
            'Interpretación pública con solvencia.',
            'Participación en agrupaciones orquestales y camerísticas.',
            'Desarrollo de una carrera musical profesional.'
          ]},
          { type: 'paragraph', text: '[DESARROLLO PROPIO]' }
        ]
      },
      {
        id: 's3-8',
        number: '3.8',
        title: 'Finalidad escénica',
        content: [
          { type: 'paragraph', text: 'La preparación para la interpretación pública es un elemento fundamental:' },
          { type: 'list', items: [
            'Audiciones internas del centro.',
            'Conciertos y audiciones del departamento.',
            'Recitales individuales o de grupo.',
            'Participación en encuentros y festivales.',
            'Preparación de pruebas de acceso.'
          ]},
          { type: 'paragraph', text: 'Enseñanzas Elementales: primeras experiencias en audiciones internas. [DESARROLLO PROPIO]' },
          { type: 'paragraph', text: 'Enseñanzas Profesionales: preparación progresiva de recitales y audiciones públicas. [DESARROLLO PROPIO]' }
        ]
      },
      {
        id: 's3-9',
        number: '3.9',
        title: 'Finalidad cultural',
        content: [
          { type: 'paragraph', text: 'El estudio del Clarinete permite al alumnado:' },
          { type: 'list', items: [
            'Conocer la literatura específica del instrumento.',
            'Comprender el papel del Clarinete en la historia de la música.',
            'Valorar el patrimonio musical.',
            'Contextualizar las obras en su época y estilo.',
            'Apreciar la diversidad cultural a través de la música.'
          ]},
          { type: 'paragraph', text: '[DESARROLLO PROPIO]' }
        ]
      },
      {
        id: 's3-10',
        number: '3.10',
        title: 'Matriz y síntesis',
        content: [
          { type: 'paragraph', text: 'Síntesis de la cadena de finalidad:' },
          { type: 'table', headers: ['Finalidad', '→ Objetivo', '→ Contenido', '→ Actividad', '→ Evidencia', '→ Evaluación'], rows: [
            ['Formativa', 'Desarrollo integral', 'Hábitos, valores', 'Práctica reflexiva', 'Registro de hábitos', 'Observación'],
            ['Instrumental', 'Dominio técnico', 'Técnica, mecanismos', 'Ejercicios, estudios', 'Grabación técnica', 'Rúbrica técnica'],
            ['Musical', 'Comprensión musical', 'Elementos musicales', 'Análisis, escucha', 'Ejercicio de análisis', 'Rúbrica musical'],
            ['Artística', 'Criterio interpretativo', 'Repertorio, estilo', 'Interpretación', 'Audición pública', 'Rúbrica interpretativa'],
            ['Personal', 'Autonomía', 'Organización, reflexión', 'Práctica autónoma', 'Diario de práctica', 'Autoevaluación']
          ]},
          { type: 'paragraph', text: '[DESARROLLO PROPIO]' }
        ]
      }
    ]
  }
];
