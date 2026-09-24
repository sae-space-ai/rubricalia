/**
 * PROGRAMACIONES VIGENTES Y VERACES
 * Consolidación de toda la información curricular verificada
 */

import { OBJETIVOS_OFICIALES_EE, OBJETIVOS_OFICIALES_EP, CONTENIDOS_OFICIALES_EE, CONTENIDOS_OFICIALES_EP, CRITERIOS_OFICIALES_EE, CRITERIOS_OFICIALES_EP, ESTRUCTURA_60_UD } from './types';
import { CRITERIOS_EVALUACION, COMPETENCIAS, ASIGNATURA_INFO, CURSOS_VALIDOS } from './collective';
import { 
  LENGUAJE_MUSICAL, 
  ARMONIA, 
  ANALISIS, 
  HISTORIA,
  LITERATURA_INSTRUMENTO,
  CORO,
  PIANO_COMPLEMENTARIO,
  MUSICA_CONJUNTO,
  FUNDAMENTOS_COMPOSICION,
  MUSICA_TECNOLOGIAS
} from './materias';

export interface ProgramacionMateria {
  id: string;
  nombre: string;
  tipo: 'instrumento' | 'colectiva' | 'teorica' | 'complementaria' | 'optativa';
  etapa: 'EE' | 'EP' | 'ambas';
  cursos: string[];
  icono: string;
  color: string;
  descripcion: string;
  objetivos: string[];
  contenidos: { [curso: string]: string[] };
  criterios?: string[];
  metodologia: string[];
  evaluacion: {
    instrumentos: string[];
    criterios: string[];
  };
  normativa: string[];
  estado: 'VERIFIED' | 'PARTIAL' | 'HOLD';
}

export const PROGRAMACIONES_VIGENTES: ProgramacionMateria[] = [
  // CLARINETE
  {
    id: 'clarinete',
    nombre: 'Clarinete',
    tipo: 'instrumento',
    etapa: 'ambas',
    cursos: ['EE1', 'EE2', 'EE3', 'EE4', 'EP1', 'EP2', 'EP3', 'EP4', 'EP5', 'EP6'],
    icono: '🎵',
    color: 'blue',
    descripcion: 'Enseñanza instrumental del clarinete en Enseñanzas Elementales y Profesionales',
    objetivos: [
      ...OBJETIVOS_OFICIALES_EE.filter(o => o.aplicaClarinete).map(o => o.texto),
      ...OBJETIVOS_OFICIALES_EP.filter(o => o.aplicaClarinete).map(o => o.texto)
    ],
    contenidos: {
      'EE1': ['Postura y montaje', 'Respiración básica', 'Embocadura inicial', 'Primeras notas (Sol3, Fa3, Mi3)', 'Articulación básica', 'Lectura rítmica simple'],
      'EE2': ['Consolidación del sonido', 'Articulación legato/staccato', 'Escalas básicas', 'Lectura melódica', 'Primeros estudios'],
      'EE3': ['Ampliación del registro', 'Control del aire', 'Mecanismo y articulación', 'Fraseo y color', 'Repertorio variado'],
      'EE4': ['Técnica integrada', 'Escalas y arpegios completos', 'Velocidad y precisión', 'Repertorio de transición', 'Autonomía en el estudio'],
      'EP1': ['Transición al nivel profesional', 'Articulación avanzada', 'Escalas y arpegios en todas las tonalidades', 'Fraseo y repertorio clásico'],
      'EP2': ['Consolidación técnica', 'Velocidad y articulación', 'Mecanismo avanzado', 'Repertorio clásico-romántico'],
      'EP3': ['Integración técnico-musical', 'Mecanismo y articulación avanzada', 'Fraseo, color y expresión', 'Repertorio clásico-romántico avanzado'],
      'EP4': ['Técnica avanzada aplicada', 'Sonido, registro y color', 'Convenciones estilísticas', 'Iniciación a lenguajes contemporáneos'],
      'EP5': ['Técnica avanzada aplicada al repertorio', 'Registro, articulación y color', 'Repertorio avanzado', 'Solo, cámara y estilo'],
      'EP6': ['Diagnóstico y proyecto final', 'Técnica integrada', 'Construcción interpretativa', 'Repertorio avanzado y escucha', 'Programa final']
    },
    criterios: CRITERIOS_OFICIALES_EE.map(c => c.texto).concat(CRITERIOS_OFICIALES_EP.map(c => c.texto)),
    metodologia: [
      'Metodología instrumental activa',
      'Modelado docente',
      'Imitación consciente',
      'Práctica guiada y autónoma',
      'Práctica deliberada',
      'Resolución de problemas técnicos y musicales',
      'Escucha y retroalimentación',
      'Grabación educativa',
      'Autoevaluación'
    ],
    evaluacion: {
      instrumentos: [
        'Observación sistemática',
        'Registro docente',
        'Lista de cotejo',
        'Escala de valoración',
        'Rúbrica analítica',
        'Prueba técnica',
        'Prueba de repertorio',
        'Lectura a primera vista',
        'Grabación audiovisual',
        'Autoevaluación'
      ],
      criterios: [
        'Control del aire y embocadura',
        'Calidad sonora y afinación',
        'Dominio técnico del instrumento',
        'Lectura e interpretación',
        'Memoria y autonomía',
        'Comprensión estilística'
      ]
    },
    normativa: [
      'LOE (Ley Orgánica 2/2006) modificada por LOMLOE',
      'RD 1577/2006 (aspectos básicos EE.PP.)',
      'RD 628/2022 (modificación LOMLOE)',
      'Decreto 110/2007 (currículo EE.EE. Extremadura)',
      'Decreto 111/2007 (currículo EE.PP. Extremadura)',
      'Decreto 54/2022 (modificación EE.EE. LOMLOE)'
    ],
    estado: 'VERIFIED'
  },

  // MÚSICA DE CÁMARA
  {
    id: 'camara',
    nombre: 'Música de Cámara',
    tipo: 'colectiva',
    etapa: 'EP',
    cursos: ['EP4', 'EP5', 'EP6'],
    icono: '🎻',
    color: 'purple',
    descripcion: 'Formación en pequeño grupo con énfasis en la escucha mutua y la interpretación conjunta',
    objetivos: [
      'Desarrollar la capacidad de escucha activa en el conjunto',
      'Ajustar la interpretación al grupo',
      'Controlar el equilibrio sonoro entre las voces',
      'Construir un discurso musical coherente en conjunto',
      'Adaptarse a cambios de tempo y dinámica',
      'Mantener la continuidad musical ante dificultades',
      'Resolver problemas musicales de forma colaborativa',
      'Asumir responsabilidades con el grupo',
      'Autoevaluarse y transferir aprendizajes'
    ],
    contenidos: {
      'EP4': ['Escucha activa y ajuste', 'Equilibrio sonoro', 'Roles en el conjunto', 'Repertorio camerístico clásico'],
      'EP5': ['Interpretación conjunta avanzada', 'Análisis de partituras camerísticas', 'Repertorio romántico y contemporáneo', 'Toma de decisiones interpretativas'],
      'EP6': ['Proyecto camerístico completo', 'Preparación de conciertos', 'Repertorio exigente', 'Autonomía interpretativa en grupo']
    },
    criterios: CRITERIOS_EVALUACION.map(c => `${c.codigo}: ${c.nombre}`),
    metodologia: [
      'Ensayo colectivo guiado',
      'Análisis conjunto de partituras',
      'Toma de decisiones interpretativas colaborativas',
      'Grabación y autoevaluación',
      'Preparación de audiciones públicas'
    ],
    evaluacion: {
      instrumentos: [
        'Observación de ensayos',
        'Rúbricas de evaluación grupal',
        'Grabaciones de ensayos y conciertos',
        'Autoevaluación y coevaluación',
        'Audiciones públicas'
      ],
      criterios: [
        'Preparación del repertorio',
        'Ritmo y coordinación',
        'Escucha y ajuste',
        'Afinación y sonido',
        'Balance y función',
        'Interpretación y discurso',
        'Adaptación y continuidad',
        'Autonomía y responsabilidad'
      ]
    },
    normativa: [
      'Decreto 111/2007 (currículo EE.PP. Extremadura)',
      'Programación Didáctica 2026/2027'
    ],
    estado: 'VERIFIED'
  },

  // BANDA
  {
    id: 'banda',
    nombre: 'Banda',
    tipo: 'colectiva',
    etapa: 'EP',
    cursos: ['EP1', 'EP2', 'EP3', 'EP4', 'EP5', 'EP6'],
    icono: '🎺',
    color: 'blue',
    descripcion: 'Formación en conjunto de viento y percusión',
    objetivos: [
      'Seguir la dirección del director',
      'Mantener el pulso y la coordinación rítmica',
      'Escuchar al conjunto y ajustar la interpretación',
      'Controlar la afinación en el contexto de banda',
      'Ejecutar articulaciones y dinámicas indicadas',
      'Comprender el rol en la estructura de la banda',
      'Adaptarse a cambios de tempo y dinámica',
      'Mantener la continuidad musical',
      'Trabajar en sección y en tutti'
    ],
    contenidos: {
      'EP1': ['Lectura de partituras de banda', 'Seguimiento de la dirección', 'Repertorio básico'],
      'EP2': ['Consolidación en la sección', 'Repertorio variado', 'Control dinámico'],
      'EP3': ['Repertorio de dificultad media', 'Equilibrio entre secciones', 'Interpretación estilística'],
      'EP4': ['Repertorio avanzado', 'Solos en la banda', 'Análisis de partituras'],
      'EP5': ['Repertorio exigente', 'Liderazgo en sección', 'Preparación de conciertos'],
      'EP6': ['Proyecto completo de banda', 'Repertorio de concurso', 'Autonomía interpretativa']
    },
    criterios: CRITERIOS_EVALUACION.map(c => `${c.codigo}: ${c.nombre}`),
    metodologia: [
      'Ensayo por secciones',
      'Ensayo general con toda la banda',
      'Seguimiento de la batuta del director',
      'Trabajo de afinación por secciones',
      'Preparación de audiciones y conciertos'
    ],
    evaluacion: {
      instrumentos: [
        'Observación de ensayos',
        'Rúbricas de evaluación',
        'Grabaciones de conciertos',
        'Evaluación del director',
        'Autoevaluación'
      ],
      criterios: [
        'Preparación individual',
        'Seguimiento de la dirección',
        'Coordinación rítmica',
        'Afinación en el conjunto',
        'Equilibrio sonoro',
        'Interpretación musical',
        'Responsabilidad con el grupo'
      ]
    },
    normativa: [
      'Decreto 111/2007 (currículo EE.PP. Extremadura)',
      'Programación Didáctica 2026/2027'
    ],
    estado: 'VERIFIED'
  },

  // ORQUESTA
  {
    id: 'orquesta',
    nombre: 'Orquesta',
    tipo: 'colectiva',
    etapa: 'EP',
    cursos: ['EP1', 'EP2', 'EP3', 'EP4', 'EP5', 'EP6'],
    icono: '🎼',
    color: 'emerald',
    descripcion: 'Formación en la gran formación sinfónica',
    objetivos: [
      'Seguir la dirección del director con atención',
      'Mantener el pulso y la coordinación en el tutti',
      'Escuchar al conjunto y ajustar la interpretación',
      'Controlar la afinación en el contexto orquestal',
      'Ejecutar articulaciones y dinámicas indicadas',
      'Comprender el rol en la estructura orquestal',
      'Adaptarse a cambios de tempo y dinámica',
      'Mantener la continuidad musical',
      'Interpretar repertorio sinfónico variado'
    ],
    contenidos: {
      'EP1': ['Lectura de partituras orquestales', 'Seguimiento de la batuta', 'Repertorio sinfónico básico'],
      'EP2': ['Consolidación en la sección', 'Repertorio clásico y romántico', 'Control dinámico'],
      'EP3': ['Repertorio sinfónico de dificultad media', 'Equilibrio en el tutti', 'Interpretación estilística'],
      'EP4': ['Repertorio avanzado', 'Solos orquestales', 'Análisis de partituras sinfónicas'],
      'EP5': ['Repertorio exigente', 'Liderazgo en sección', 'Preparación de conciertos sinfónicos'],
      'EP6': ['Proyecto sinfónico completo', 'Repertorio de concurso', 'Autonomía interpretativa']
    },
    criterios: CRITERIOS_EVALUACION.map(c => `${c.codigo}: ${c.nombre}`),
    metodologia: [
      'Ensayo por secciones',
      'Ensayo general con toda la orquesta',
      'Seguimiento de la batuta del director',
      'Trabajo de afinación por secciones',
      'Preparación de conciertos sinfónicos'
    ],
    evaluacion: {
      instrumentos: [
        'Observación de ensayos',
        'Rúbricas de evaluación',
        'Grabaciones de conciertos',
        'Evaluación del director',
        'Autoevaluación'
      ],
      criterios: [
        'Preparación individual',
        'Seguimiento de la dirección',
        'Coordinación rítmica',
        'Afinación en el conjunto',
        'Equilibrio sonoro',
        'Interpretación musical',
        'Responsabilidad con el grupo'
      ]
    },
    normativa: [
      'Decreto 111/2007 (currículo EE.PP. Extremadura)',
      'Programación Didáctica 2026/2027'
    ],
    estado: 'VERIFIED'
  },

  // LENGUAJE MUSICAL
  {
    id: 'lenguaje',
    nombre: 'Lenguaje Musical',
    tipo: 'teorica',
    etapa: 'EP',
    cursos: ['EP1', 'EP2', 'EP3', 'EP4'],
    icono: '📖',
    color: 'indigo',
    descripcion: 'Formación teórica en lectura, escritura, ritmo, entonación y percepción auditiva',
    objetivos: LENGUAJE_MUSICAL.objetivos,
    contenidos: Object.fromEntries(
      Object.entries(LENGUAJE_MUSICAL.contenidosPorCurso).map(([curso, data]) => [curso, data.contenidos])
    ),
    metodologia: LENGUAJE_MUSICAL.metodologia,
    evaluacion: LENGUAJE_MUSICAL.evaluacion,
    normativa: [
      'Decreto 110/2007 (currículo EE.EE. Extremadura)',
      'Decreto 54/2022 (modificación EE.EE. LOMLOE)',
      'Decreto 111/2007 (currículo EE.PP. Extremadura)'
    ],
    estado: 'VERIFIED'
  },

  // ARMONÍA
  {
    id: 'armonia',
    nombre: 'Armonía',
    tipo: 'teorica',
    etapa: 'EP',
    cursos: ['EP1', 'EP2'],
    icono: '🎼',
    color: 'violet',
    descripcion: 'Estudio de la construcción de acordes, progresiones armónicas y su análisis',
    objetivos: ARMONIA.objetivos,
    contenidos: Object.fromEntries(
      Object.entries(ARMONIA.contenidosPorCurso).map(([curso, data]) => [curso, data.contenidos])
    ),
    metodologia: ARMONIA.metodologia,
    evaluacion: ARMONIA.evaluacion,
    normativa: [
      'Decreto 111/2007 (currículo EE.PP. Extremadura)'
    ],
    estado: 'VERIFIED'
  },

  // ANÁLISIS MUSICAL
  {
    id: 'analisis',
    nombre: 'Análisis Musical',
    tipo: 'teorica',
    etapa: 'EP',
    cursos: ['EP3', 'EP4', 'EP5', 'EP6'],
    icono: '🔍',
    color: 'fuchsia',
    descripcion: 'Estudio de la estructura, forma y organización de las obras musicales',
    objetivos: ANALISIS.objetivos,
    contenidos: Object.fromEntries(
      Object.entries(ANALISIS.contenidosPorCurso).map(([curso, data]) => [curso, data.contenidos])
    ),
    metodologia: ANALISIS.metodologia,
    evaluacion: ANALISIS.evaluacion,
    normativa: [
      'Decreto 111/2007 (currículo EE.PP. Extremadura)'
    ],
    estado: 'VERIFIED'
  },

  // HISTORIA DE LA MÚSICA
  {
    id: 'historia',
    nombre: 'Historia de la Música',
    tipo: 'teorica',
    etapa: 'EP',
    cursos: ['EP3', 'EP4', 'EP5', 'EP6'],
    icono: '📚',
    color: 'rose',
    descripcion: 'Estudio de la evolución histórica de la música y sus contextos culturales',
    objetivos: HISTORIA.objetivos,
    contenidos: Object.fromEntries(
      Object.entries(HISTORIA.contenidosPorCurso).map(([curso, data]) => [curso, data.contenidos])
    ),
    metodologia: HISTORIA.metodologia,
    evaluacion: HISTORIA.evaluacion,
    normativa: [
      'Decreto 111/2007 (currículo EE.PP. Extremadura)'
    ],
    estado: 'VERIFIED'
  },

  // LITERATURA DEL INSTRUMENTO
  {
    id: 'literatura',
    nombre: 'Literatura del Instrumento',
    tipo: 'teorica',
    etapa: 'EP',
    cursos: ['EP1', 'EP2', 'EP3', 'EP4', 'EP5', 'EP6'],
    icono: '📜',
    color: 'pink',
    descripcion: 'Estudio del repertorio, compositores y evolución histórica del instrumento',
    objetivos: LITERATURA_INSTRUMENTO.objetivos,
    contenidos: Object.fromEntries(
      Object.entries(LITERATURA_INSTRUMENTO.contenidosPorCurso).map(([curso, data]) => [curso, data.contenidos])
    ),
    metodologia: LITERATURA_INSTRUMENTO.metodologia,
    evaluacion: LITERATURA_INSTRUMENTO.evaluacion,
    normativa: [
      'Decreto 111/2007 (currículo EE.PP. Extremadura)'
    ],
    estado: 'VERIFIED'
  },

  // CORO
  {
    id: 'coro',
    nombre: 'Coro',
    tipo: 'complementaria',
    etapa: 'EP',
    cursos: ['EP1', 'EP2', 'EP3', 'EP4', 'EP5', 'EP6'],
    icono: '🎤',
    color: 'teal',
    descripcion: 'Práctica vocal en conjunto, trabajando afinación, empaste y expresión coral',
    objetivos: CORO.objetivos,
    contenidos: Object.fromEntries(
      Object.entries(CORO.contenidosPorCurso).map(([curso, data]) => [curso, data.contenidos])
    ),
    metodologia: CORO.metodologia,
    evaluacion: CORO.evaluacion,
    normativa: [
      'Decreto 111/2007 (currículo EE.PP. Extremadura)'
    ],
    estado: 'VERIFIED'
  },

  // PIANO COMPLEMENTARIO
  {
    id: 'piano_complementario',
    nombre: 'Piano Complementario',
    tipo: 'complementaria',
    etapa: 'EP',
    cursos: ['EP1', 'EP2'],
    icono: '🎹',
    color: 'cyan',
    descripcion: 'Formación básica en piano como herramienta complementaria al instrumento principal',
    objetivos: PIANO_COMPLEMENTARIO.objetivos,
    contenidos: Object.fromEntries(
      Object.entries(PIANO_COMPLEMENTARIO.contenidosPorCurso).map(([curso, data]) => [curso, data.contenidos])
    ),
    metodologia: PIANO_COMPLEMENTARIO.metodologia,
    evaluacion: PIANO_COMPLEMENTARIO.evaluacion,
    normativa: [
      'Decreto 111/2007 (currículo EE.PP. Extremadura)'
    ],
    estado: 'VERIFIED'
  },

  // MÚSICA DE CONJUNTO
  {
    id: 'musica_conjunto',
    nombre: 'Música de Conjunto',
    tipo: 'colectiva',
    etapa: 'EP',
    cursos: ['EP1', 'EP2', 'EP3', 'EP4', 'EP5', 'EP6'],
    icono: '🎶',
    color: 'orange',
    descripcion: 'Práctica instrumental en formaciones diversas, desarrollando la escucha y la interpretación colectiva',
    objetivos: MUSICA_CONJUNTO.objetivos,
    contenidos: Object.fromEntries(
      Object.entries(MUSICA_CONJUNTO.contenidosPorCurso).map(([curso, data]) => [curso, data.contenidos])
    ),
    metodologia: MUSICA_CONJUNTO.metodologia,
    evaluacion: MUSICA_CONJUNTO.evaluacion,
    normativa: [
      'Decreto 111/2007 (currículo EE.PP. Extremadura)'
    ],
    estado: 'VERIFIED'
  },

  // FUNDAMENTOS DE COMPOSICIÓN
  {
    id: 'composicion',
    nombre: 'Fundamentos de Composición',
    tipo: 'optativa',
    etapa: 'EP',
    cursos: ['EP3', 'EP4', 'EP5', 'EP6'],
    icono: '✍️',
    color: 'yellow',
    descripcion: 'Introducción a la creación musical, desarrollando la capacidad compositiva y la creatividad',
    objetivos: FUNDAMENTOS_COMPOSICION.objetivos,
    contenidos: Object.fromEntries(
      Object.entries(FUNDAMENTOS_COMPOSICION.contenidosPorCurso).map(([curso, data]) => [curso, data.contenidos])
    ),
    metodologia: FUNDAMENTOS_COMPOSICION.metodologia,
    evaluacion: FUNDAMENTOS_COMPOSICION.evaluacion,
    normativa: [
      'Decreto 111/2007 (currículo EE.PP. Extremadura)'
    ],
    estado: 'VERIFIED'
  },

  // MÚSICA Y NUEVAS TECNOLOGÍAS
  {
    id: 'musica_tecnologias',
    nombre: 'Música y Nuevas Tecnologías',
    tipo: 'optativa',
    etapa: 'EP',
    cursos: ['EP3', 'EP4', 'EP5', 'EP6'],
    icono: '💻',
    color: 'lime',
    descripcion: 'Introducción a las tecnologías aplicadas a la música: producción, edición, grabación y creación musical digital',
    objetivos: MUSICA_TECNOLOGIAS.objetivos,
    contenidos: Object.fromEntries(
      Object.entries(MUSICA_TECNOLOGIAS.contenidosPorCurso).map(([curso, data]) => [curso, data.contenidos])
    ),
    metodologia: MUSICA_TECNOLOGIAS.metodologia,
    evaluacion: MUSICA_TECNOLOGIAS.evaluacion,
    normativa: [
      'Decreto 111/2007 (currículo EE.PP. Extremadura)'
    ],
    estado: 'VERIFIED'
  }
];

export function getProgramacionById(id: string): ProgramacionMateria | undefined {
  return PROGRAMACIONES_VIGENTES.find(p => p.id === id);
}

export function getProgramacionesByTipo(tipo: string): ProgramacionMateria[] {
  return PROGRAMACIONES_VIGENTES.filter(p => p.tipo === tipo);
}

export function getProgramacionesByEtapa(etapa: string): ProgramacionMateria[] {
  return PROGRAMACIONES_VIGENTES.filter(p => p.etapa === etapa || p.etapa === 'ambas');
}
