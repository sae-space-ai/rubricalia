// ============================================================
// PROGRAMACIÓN DIDÁCTICA DE CLARINETE 2026/2027 — V2.0
// TIPOS Y ESTRUCTURA
// Prof. Manuel Gago Fernández
// ============================================================

export type Estado = 'VERIFIED' | 'DOCUMENTED' | 'ESTIMATED' | 'HOLD';
export type Procedencia = '[CO]' | '[DC]' | '[DP]' | '[E]' | '[E-HIST]' | '[H]';
export type Curso = 'EE1' | 'EE2' | 'EE3' | 'EE4' | 'EP1' | 'EP2' | 'EP3' | 'EP4' | 'EP5' | 'EP6';
export type Trimestre = '1T' | '2T' | '3T';
export type NivelRubrica = 'L1' | 'L2' | 'L3' | 'L4';
export type IncidenciaTipo = 'NORMATIVA' | 'ESTRUCTURAL' | 'PEDAGÓGICA' | 'TRAZABILIDAD' | 'DUPLICACIÓN' | 'LAGUNA' | 'SALTO' | 'CONTRADICCIÓN' | 'HOLD';
export type IncidenciaEstado = 'OPEN' | 'FIXED' | 'HOLD' | 'VERIFIED';
export type EstadoUD = 'VERIFICADA' | 'VERIFICADA_CON_INCIDENCIAS_CORREGIDAS' | 'VERIFICADA_CON_HOLD' | 'PENDIENTE';

export interface ObjetivoDidactico {
  id: string;
  formulacion: string;
  procedencia: Procedencia;
  codigoOficial: string;
  tipo: '[CO]' | '[DP]';
  evidenciaPrevista: string;
  criterioOperativo: string;
}

export interface Contenido {
  id: string;
  formulacion: string;
  procedencia: Procedencia;
  codigoOficial: string;
  objetivoAsociado: string;
  secuencia: string;
  actividad: string;
  evidencia: string;
}

export interface Secuencia {
  id: string;
  fase: string;
  queSeTrabaja: string;
  como: string;
  paraQue: string;
  evidencia: string;
}

export interface Actividad {
  id: string;
  descripcion: string;
  objetivo: string;
  contenido: string;
  secuencia: string;
  evidencia: string;
  criterio: string;
  herramienta: string;
  tipo: 'individual' | 'guiada' | 'autónoma' | 'integrada' | 'interpretativa' | 'transferencia';
}

export interface Evidencia {
  id: string;
  tipo: string;
  queDemuestra: string;
  criterio: string;
  herramienta: string;
  decision: string;
}

export interface CriterioOperativo {
  id: string;
  conducta: string;
  condicion: string;
  evidencia: string;
  criterioOficial: string;
  herramienta: string;
  rubrica: string;
}

export interface Herramienta {
  id: string;
  nombre: string;
  descripcion: string;
  momento: string;
  evidencia: string;
}

export interface Rubrica {
  id: string;
  dimension: string;
  L1: string;
  L2: string;
  L3: string;
  L4: string;
}

export interface Incidencia {
  id: string;
  ud: string;
  elemento: string;
  tipo: IncidenciaTipo;
  descripcion: string;
  evidencia: string;
  accion: string;
  estado: IncidenciaEstado;
}

export interface UnidadDidactica {
  codigo: string;
  titulo: string;
  curso: Curso;
  trimestre: Trimestre;
  justificacion: string;
  conexionNormativa: string;
  objetivos: ObjetivoDidactico[];
  contenidos: Contenido[];
  secuencias: Secuencia[];
  actividades: Actividad[];
  evidencias: Evidencia[];
  criteriosOperativos: CriterioOperativo[];
  herramientas: Herramienta[];
  rubricas: Rubrica[];
  metodologia: string;
  atencionDiversidad: string;
  recuperacion: string;
  transferencia: string;
  trazabilidad: string;
  incidencias: string[];
  estado: EstadoUD;
  estadoVerificacion: Estado;
}

export interface MatrizProgresion {
  curso: Curso;
  ud: string;
  focoPrincipal: string;
  tecnica: string;
  sonido: string;
  articulacion: string;
  registro: string;
  lectura: string;
  memoria: string;
  improvisacion: string;
  conjunto: string;
  repertorio: string;
  autonomia: string;
  transferencia: string;
}

// Estructura de las 60 UD
export interface UDInfo {
  codigo: string;
  titulo: string;
  curso: Curso;
  trimestre: Trimestre;
}

export const ESTRUCTURA_60_UD: UDInfo[] = [
  // EE1
  { codigo: 'EE1-UD01', titulo: 'El clarinete: cuerpo, instrumento y sonido', curso: 'EE1', trimestre: '1T' },
  { codigo: 'EE1-UD02', titulo: 'Respirar, emitir y articular', curso: 'EE1', trimestre: '1T' },
  { codigo: 'EE1-UD03', titulo: 'Primeras escalas y primera lectura', curso: 'EE1', trimestre: '2T' },
  { codigo: 'EE1-UD04', titulo: 'Fraseo, dinámica y expresión', curso: 'EE1', trimestre: '2T' },
  { codigo: 'EE1-UD05', titulo: 'Memoria, lectura y conjunto', curso: 'EE1', trimestre: '3T' },
  { codigo: 'EE1-UD06', titulo: 'Primera presentación musical', curso: 'EE1', trimestre: '3T' },
  // EE2
  { codigo: 'EE2-UD01', titulo: 'Consolidación del sonido y la respiración', curso: 'EE2', trimestre: '1T' },
  { codigo: 'EE2-UD02', titulo: 'Articulación y mecanismo', curso: 'EE2', trimestre: '1T' },
  { codigo: 'EE2-UD03', titulo: 'Escalas, arpegios y lectura', curso: 'EE2', trimestre: '2T' },
  { codigo: 'EE2-UD04', titulo: 'Iniciación al estilo y al repertorio', curso: 'EE2', trimestre: '2T' },
  { codigo: 'EE2-UD05', titulo: 'Memoria, improvisación y conjunto', curso: 'EE2', trimestre: '3T' },
  { codigo: 'EE2-UD06', titulo: 'Programa de fin de curso', curso: 'EE2', trimestre: '3T' },
  // EE3
  { codigo: 'EE3-UD01', titulo: 'Ampliación del registro y control del aire', curso: 'EE3', trimestre: '1T' },
  { codigo: 'EE3-UD02', titulo: 'Mecanismo y articulación', curso: 'EE3', trimestre: '1T' },
  { codigo: 'EE3-UD03', titulo: 'Fraseo, color y escucha', curso: 'EE3', trimestre: '2T' },
  { codigo: 'EE3-UD04', titulo: 'Repertorio y estilos', curso: 'EE3', trimestre: '2T' },
  { codigo: 'EE3-UD05', titulo: 'Lectura, memoria, improvisación y cámara', curso: 'EE3', trimestre: '3T' },
  { codigo: 'EE3-UD06', titulo: 'Síntesis y actuación', curso: 'EE3', trimestre: '3T' },
  // EE4
  { codigo: 'EE4-UD01', titulo: 'Técnica integrada', curso: 'EE4', trimestre: '1T' },
  { codigo: 'EE4-UD02', titulo: 'Escalas, registro y velocidad', curso: 'EE4', trimestre: '1T' },
  { codigo: 'EE4-UD03', titulo: 'Repertorio de transición', curso: 'EE4', trimestre: '2T' },
  { codigo: 'EE4-UD04', titulo: 'Autonomía y estudio', curso: 'EE4', trimestre: '2T' },
  { codigo: 'EE4-UD05', titulo: 'Conjunto, improvisación y lectura', curso: 'EE4', trimestre: '3T' },
  { codigo: 'EE4-UD06', titulo: 'Cierre de EE y transición a Profesionales', curso: 'EE4', trimestre: '3T' },
  // EP1
  { codigo: 'EP1-UD01', titulo: 'Transición al nivel profesional', curso: 'EP1', trimestre: '1T' },
  { codigo: 'EP1-UD02', titulo: 'Articulación y control técnico', curso: 'EP1', trimestre: '1T' },
  { codigo: 'EP1-UD03', titulo: 'Escalas, arpegios y registro', curso: 'EP1', trimestre: '2T' },
  { codigo: 'EP1-UD04', titulo: 'Fraseo y repertorio', curso: 'EP1', trimestre: '2T' },
  { codigo: 'EP1-UD05', titulo: 'Memoria, lectura y cámara', curso: 'EP1', trimestre: '3T' },
  { codigo: 'EP1-UD06', titulo: 'Presentación y evaluación integrada', curso: 'EP1', trimestre: '3T' },
  // EP2
  { codigo: 'EP2-UD01', titulo: 'Consolidación técnica y sonora', curso: 'EP2', trimestre: '1T' },
  { codigo: 'EP2-UD02', titulo: 'Velocidad y articulación', curso: 'EP2', trimestre: '1T' },
  { codigo: 'EP2-UD03', titulo: 'Escalas, arpegios y mecanismo', curso: 'EP2', trimestre: '2T' },
  { codigo: 'EP2-UD04', titulo: 'Repertorio clásico-romántico inicial', curso: 'EP2', trimestre: '2T' },
  { codigo: 'EP2-UD05', titulo: 'Memoria, lectura e improvisación', curso: 'EP2', trimestre: '3T' },
  { codigo: 'EP2-UD06', titulo: 'Actuación y síntesis', curso: 'EP2', trimestre: '3T' },
  // EP3
  { codigo: 'EP3-UD01', titulo: 'Integración técnico-musical', curso: 'EP3', trimestre: '1T' },
  { codigo: 'EP3-UD02', titulo: 'Mecanismo y articulación', curso: 'EP3', trimestre: '1T' },
  { codigo: 'EP3-UD03', titulo: 'Fraseo, color y expresión', curso: 'EP3', trimestre: '2T' },
  { codigo: 'EP3-UD04', titulo: 'Repertorio clásico-romántico', curso: 'EP3', trimestre: '2T' },
  { codigo: 'EP3-UD05', titulo: 'Autonomía, memoria y lectura', curso: 'EP3', trimestre: '3T' },
  { codigo: 'EP3-UD06', titulo: 'Interpretación en conjunto y actuación', curso: 'EP3', trimestre: '3T' },
  // EP4
  { codigo: 'EP4-UD01', titulo: 'Técnica avanzada aplicada', curso: 'EP4', trimestre: '1T' },
  { codigo: 'EP4-UD02', titulo: 'Sonido, registro y color', curso: 'EP4', trimestre: '1T' },
  { codigo: 'EP4-UD03', titulo: 'Convenciones estilísticas', curso: 'EP4', trimestre: '2T' },
  { codigo: 'EP4-UD04', titulo: 'Iniciación sistemática a lenguajes contemporáneos', curso: 'EP4', trimestre: '2T' },
  { codigo: 'EP4-UD05', titulo: 'Lectura y autonomía', curso: 'EP4', trimestre: '3T' },
  { codigo: 'EP4-UD06', titulo: 'Programa de nivel medio-alto', curso: 'EP4', trimestre: '3T' },
  // EP5
  { codigo: 'EP5-UD01', titulo: 'Técnica avanzada aplicada al repertorio', curso: 'EP5', trimestre: '1T' },
  { codigo: 'EP5-UD02', titulo: 'Registro, articulación y color', curso: 'EP5', trimestre: '1T' },
  { codigo: 'EP5-UD03', titulo: 'Repertorio avanzado', curso: 'EP5', trimestre: '2T' },
  { codigo: 'EP5-UD04', titulo: 'Solo, cámara y estilo', curso: 'EP5', trimestre: '2T' },
  { codigo: 'EP5-UD05', titulo: 'Autonomía avanzada', curso: 'EP5', trimestre: '3T' },
  { codigo: 'EP5-UD06', titulo: 'Construcción de programa', curso: 'EP5', trimestre: '3T' },
  // EP6
  { codigo: 'EP6-UD01', titulo: 'Diagnóstico y proyecto final', curso: 'EP6', trimestre: '1T' },
  { codigo: 'EP6-UD02', titulo: 'Técnica integrada', curso: 'EP6', trimestre: '1T' },
  { codigo: 'EP6-UD03', titulo: 'Construcción interpretativa', curso: 'EP6', trimestre: '2T' },
  { codigo: 'EP6-UD04', titulo: 'Repertorio avanzado y escucha', curso: 'EP6', trimestre: '2T' },
  { codigo: 'EP6-UD05', titulo: 'Memoria, lectura, improvisación y cámara', curso: 'EP6', trimestre: '3T' },
  { codigo: 'EP6-UD06', titulo: 'Programa final y comunicación artística', curso: 'EP6', trimestre: '3T' },
];

// Objetivos oficiales EE
export const OBJETIVOS_OFICIALES_EE = [
  { codigo: 'EE-O1', texto: 'Controlar el aire mediante respiración diafragmática y la embocadura para conseguir emisión, afinación, articulación y flexibilidad.', procedencia: '[CO]' as Procedencia, aplicaClarinete: true },
  { codigo: 'EE-O2', texto: 'Desarrollar reflejos de precisión necesarios para corregir afinación y calidad sonora.', procedencia: '[CO]' as Procedencia, aplicaClarinete: true },
  { codigo: 'EE-O3', texto: 'Conocer las características y posibilidades sonoras del instrumento, tanto individualmente como en conjunto.', procedencia: '[CO]' as Procedencia, aplicaClarinete: true },
  { codigo: 'EE-O4', texto: 'Desarrollar sensibilidad auditiva para controlar afinación y mejorar calidad sonora.', procedencia: '[CO]' as Procedencia, aplicaClarinete: true },
  { codigo: 'EE-O5', texto: 'Conseguir estabilidad sonora en toda la extensión, utilizando vibrato y matices para desarrollar color y expresión.', procedencia: '[CO]' as Procedencia, aplicaClarinete: true },
  { codigo: 'EE-O6', texto: 'Objetivo relativo a fabricación y rebajado de lengüetas para instrumentos de doble lengüeta.', procedencia: '[CO]' as Procedencia, aplicaClarinete: false, nota: 'NO CORRESPONDE AL CLARINETE. Excluido de la programación por no ser aplicable a instrumentos de lengüeta simple.' },
  { codigo: 'EE-O7', texto: 'Elementos relativos a lectura, memoria, interpretación y práctica musical.', procedencia: '[CO]' as Procedencia, aplicaClarinete: true },
];

// Contenidos oficiales EE
export const CONTENIDOS_OFICIALES_EE = [
  { codigo: 'EE-C01', texto: 'Respiración con y sin instrumento, notas tenidas, afinación, calidad sonora y dosificación del aire.', procedencia: '[CO]' as Procedencia },
  { codigo: 'EE-C02', texto: 'Sensibilidad auditiva y calidad del sonido.', procedencia: '[CO]' as Procedencia },
  { codigo: 'EE-C03', texto: 'Escalas e intervalos y control de la emisión mediante diferentes articulaciones.', procedencia: '[CO]' as Procedencia },
  { codigo: 'EE-C04', texto: 'Emisión relacionada con dinámicas y alturas.', procedencia: '[CO]' as Procedencia },
  { codigo: 'EE-C05', texto: 'Flexibilidad, saltos, articulaciones y trinos.', procedencia: '[CO]' as Procedencia },
  { codigo: 'EE-C06', texto: 'Práctica de conjunto: afinación, ajuste y precisión rítmica.', procedencia: '[CO]' as Procedencia },
  { codigo: 'EE-C07', texto: 'Memoria.', procedencia: '[CO]' as Procedencia },
  { codigo: 'EE-C08', texto: 'Hábitos de estudio correctos y eficaces.', procedencia: '[CO]' as Procedencia },
  { codigo: 'EE-C09', texto: 'Lectura a vista de obras y fragmentos sencillos.', procedencia: '[CO]' as Procedencia },
  { codigo: 'EE-C10', texto: 'Comprensión inicial de estructuras musicales: motivos, temas, períodos, frases y secciones.', procedencia: '[CO]' as Procedencia },
  { codigo: 'EE-C11', texto: 'Interpretación consciente frente a la actuación puramente intuitiva.', procedencia: '[CO]' as Procedencia },
  { codigo: 'EE-C12', texto: 'Selección progresiva de ejercicios, estudios y obras conforme a dificultad y desarrollo musical/técnico.', procedencia: '[CO]' as Procedencia },
];

// Criterios oficiales EE
export const CRITERIOS_OFICIALES_EE = [
  { codigo: 'EE-CE1', texto: 'Lectura a primera vista con fluidez y comprensión.' },
  { codigo: 'EE-CE2', texto: 'Memorización e interpretación aplicando medida, afinación, articulación y fraseo.' },
  { codigo: 'EE-CE3', texto: 'Interpretación conforme al estilo.' },
  { codigo: 'EE-CE4', texto: 'Descripción posterior a la audición de rasgos característicos.' },
  { codigo: 'EE-CE5', texto: 'Evidencia de aprendizaje progresivo individual.' },
  { codigo: 'EE-CE6', texto: 'Interpretación pública como solista y de memoria con seguridad y control.' },
  { codigo: 'EE-CE7', texto: 'Actuación en grupo, escucha y adaptación.' },
];

// Objetivos oficiales EP
export const OBJETIVOS_OFICIALES_EP = [
  { codigo: 'EP-O1', texto: 'Desarrollar sensibilidad auditiva para perfeccionar progresivamente la calidad sonora.', procedencia: '[CO]' as Procedencia, aplicaClarinete: true },
  { codigo: 'EP-O2', texto: 'Conocer e interpretar repertorio representativo de diferentes épocas y estilos adecuado al nivel.', procedencia: '[CO]' as Procedencia, aplicaClarinete: true },
  { codigo: 'EP-O3', texto: 'Fabricación de lengüetas para instrumentos de doble lengüeta.', procedencia: '[CO]' as Procedencia, aplicaClarinete: false, nota: 'NO CORRESPONDE AL CLARINETE. Excluido de la programación por no ser aplicable a instrumentos de lengüeta simple.' },
  { codigo: 'EP-O4', texto: 'Desarrollar autonomía progresiva para resolver problemas de digitación, articulación, fraseo, etc.', procedencia: '[CO]' as Procedencia, aplicaClarinete: true },
  { codigo: 'EP-O5', texto: 'Conocer convenciones interpretativas de diferentes períodos, especialmente escritura rítmica y ornamentación.', procedencia: '[CO]' as Procedencia, aplicaClarinete: true },
  { codigo: 'EP-O6', texto: 'Desarrollar herramientas y competencias para la memoria.', procedencia: '[CO]' as Procedencia, aplicaClarinete: true },
  { codigo: 'EP-O7', texto: 'Desarrollar lectura a vista e improvisación mediante conocimientos musicales aplicados al instrumento.', procedencia: '[CO]' as Procedencia, aplicaClarinete: true },
  { codigo: 'EP-O8', texto: 'Desarrollar práctica de conjunto, formaciones camerísticas y papel solista con orquesta en obras de dificultad media.', procedencia: '[CO]' as Procedencia, aplicaClarinete: true },
];

// Contenidos oficiales EP
export const CONTENIDOS_OFICIALES_EP = [
  { codigo: 'EP-C01', texto: 'Desarrollo profundo de velocidad y amplitud de articulaciones.', procedencia: '[CO]' as Procedencia },
  { codigo: 'EP-C02', texto: 'Vibrato conforme a demandas estilísticas.', procedencia: '[CO]' as Procedencia },
  { codigo: 'EP-C03', texto: 'Frase: línea, color y expresión según estilo, especialmente en tempos lentos.', procedencia: '[CO]' as Procedencia },
  { codigo: 'EP-C04', texto: 'Registro agudo/sobreagudo en los instrumentos que lo utilicen.', procedencia: '[CO]' as Procedencia },
  { codigo: 'EP-C05', texto: 'Práctica de conjunto para armonía, afinación, ritmo, etc.', procedencia: '[CO]' as Procedencia },
  { codigo: 'EP-C06', texto: 'Repertorio solista con orquesta de diferentes épocas.', procedencia: '[CO]' as Procedencia },
  { codigo: 'EP-C07', texto: 'Instrumentos relacionados.', procedencia: '[CO]' as Procedencia },
  { codigo: 'EP-C08', texto: 'Introducción a la música contemporánea, notación y efectos.', procedencia: '[CO]' as Procedencia },
  { codigo: 'EP-C09', texto: 'Entrenamiento progresivo de memoria.', procedencia: '[CO]' as Procedencia },
  { codigo: 'EP-C10', texto: 'Lectura a vista.', procedencia: '[CO]' as Procedencia },
  { codigo: 'EP-C11', texto: 'Escucha comparada de grandes intérpretes y análisis crítico de versiones.', procedencia: '[CO]' as Procedencia },
];

// Criterios oficiales EP
export const CRITERIOS_OFICIALES_EP = [
  { codigo: 'EP-CE1', texto: 'Esfuerzo muscular, respiración y relajación.' },
  { codigo: 'EP-CE2', texto: 'Dominio de estudios y obras integrando aspectos técnicos y musicales.' },
  { codigo: 'EP-CE3', texto: 'Sensibilidad auditiva en afinación y posibilidades sonoras.' },
  { codigo: 'EP-CE4', texto: 'Capacidad para estudiar repertorio de forma independiente.' },
  { codigo: 'EP-CE5', texto: 'Lectura a vista e improvisación progresiva.' },
  { codigo: 'EP-CE6', texto: 'Interpretación de diferentes épocas y estilos en solitario y grupo.' },
  { codigo: 'EP-CE7', texto: 'Interpretación de memoria conforme al estilo.' },
  { codigo: 'EP-CE8', texto: 'Autonomía interpretativa dentro de la flexibilidad del texto.' },
  { codigo: 'EP-CE9', texto: 'Autonomía progresiva para resolver problemas técnicos e interpretativos.' },
  { codigo: 'EP-CE10', texto: 'Presentación pública de un programa adecuado al nivel con calidad comunicativa y artística.' },
];

// Normativa base
export const NORMATIVA_BASE = [
  { id: 'N-01', norma: 'LOE 2/2006 (modificada por LOMLOE 3/2020)', fecha: '2006/2020', rango: 'Ley Orgánica', ambito: 'Estatal', etapa: 'Ambas', vigencia: 'Vigente', estado: 'VERIFIED' as Estado },
  { id: 'N-02', norma: 'RD 1577/2006', fecha: '22/12/2006', rango: 'Real Decreto', ambito: 'Estatal', etapa: 'Profesionales', vigencia: 'Vigente', estado: 'VERIFIED' as Estado },
  { id: 'N-03', norma: 'RD 628/2022', fecha: '26/07/2022', rango: 'Real Decreto', ambito: 'Estatal', etapa: 'Elementales', vigencia: 'Vigente', estado: 'VERIFIED' as Estado },
  { id: 'N-04', norma: 'Decreto 110/2007', fecha: '22/05/2007', rango: 'Decreto', ambito: 'Extremadura', etapa: 'Elementales', vigencia: 'Vigente (modificado)', estado: 'VERIFIED' as Estado },
  { id: 'N-05', norma: 'Decreto 111/2007', fecha: '22/05/2007', rango: 'Decreto', ambito: 'Extremadura', etapa: 'Profesionales', vigencia: 'Vigente', estado: 'VERIFIED' as Estado },
  { id: 'N-06', norma: 'Decreto 54/2022', fecha: '18/05/2022', rango: 'Decreto', ambito: 'Extremadura', etapa: 'Elementales', vigencia: 'Vigente', estado: 'VERIFIED' as Estado },
  { id: 'N-07', norma: 'Orden 28/04/2009', fecha: '28/04/2009', rango: 'Orden', ambito: 'Extremadura', etapa: 'Ambas', vigencia: 'Vigente', estado: 'VERIFIED' as Estado },
  { id: 'N-08', norma: 'Ley 4/2011', fecha: '24/03/2011', rango: 'Ley', ambito: 'Extremadura', etapa: 'Ambas', vigencia: 'Vigente', estado: 'VERIFIED' as Estado },
  { id: 'N-09', norma: 'Decreto 228/2014', fecha: '07/10/2014', rango: 'Decreto', ambito: 'Extremadura', etapa: 'Ambas', vigencia: 'Vigente', estado: 'VERIFIED' as Estado },
  { id: 'N-10', norma: 'Resolución calendario 2026/2027', fecha: '2026', rango: 'Resolución', ambito: 'Extremadura', etapa: 'Ambas', vigencia: 'Anual', estado: 'HOLD' as Estado },
];

// Calendario 2026/2027
export const CALENDARIO = {
  inicioActividades: '1 de octubre de 2026',
  finalOrdinario: '11 de junio de 2027',
  finalEP6: '7 de mayo de 2027',
  calificacionesOrdinarias: '19 de junio de 2027',
  calificacionesEP6: '14 de mayo de 2027',
};
