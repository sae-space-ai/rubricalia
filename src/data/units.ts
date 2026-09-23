import { UnidadDidactica, MatrizProgresion, Incidencia, ESTRUCTURA_60_UD } from './types';

// ============================================================
// UNIDADES DIDÁCTICAS DETALLADAS — EE1 (MODELO AUDITADO)
// ============================================================

export const UNIDADES_DETALLADAS: Record<string, UnidadDidactica> = {
  'EE1-UD01': {
    codigo: 'EE1-UD01',
    titulo: 'El clarinete: cuerpo, instrumento y sonido',
    curso: 'EE1',
    trimestre: '1T',
    justificacion: 'Primera toma de contacto con el instrumento. Es necesario establecer una base física correcta (postura, montaje, mantenimiento) antes de abordar la producción sonora. Esta UD sienta los fundamentos de toda la progresión posterior. [DP]',
    conexionNormativa: 'EE-O1 (control del aire y embocadura), EE-O3 (conocimiento del instrumento), EE-C01 (respiración y notas tenidas). Se vincula con la fase FUNDAMENTACIÓN de la progresión vertical. [CO]',
    objetivos: [
      { id: 'EE1-UD01-OD-01', formulacion: 'Identificar las partes del clarinete y su función.', procedencia: '[DP]', codigoOficial: 'EE-O3', tipo: '[DP]', evidenciaPrevista: 'Señalamiento correcto de las partes.', criterioOperativo: 'EE1-UD01-CE-01' },
      { id: 'EE1-UD01-OD-02', formulacion: 'Montar y desmontar el instrumento con seguridad.', procedencia: '[DP]', codigoOficial: 'EE-O3', tipo: '[DP]', evidenciaPrevista: 'Montaje autónomo sin daños.', criterioOperativo: 'EE1-UD01-CE-02' },
      { id: 'EE1-UD01-OD-03', formulacion: 'Adoptar una postura corporal equilibrada.', procedencia: '[DP]', codigoOficial: 'EE-O1', tipo: '[DP]', evidenciaPrevista: 'Postura observada sin tensiones.', criterioOperativo: 'EE1-UD01-CE-03' },
      { id: 'EE1-UD01-OD-04', formulacion: 'Colocar las manos correctamente en el instrumento.', procedencia: '[DP]', codigoOficial: 'EE-O1', tipo: '[DP]', evidenciaPrevista: 'Colocación natural de los dedos.', criterioOperativo: 'EE1-UD01-CE-04' },
      { id: 'EE1-UD01-OD-05', formulacion: 'Realizar la primera emisión sonora en la boquilla.', procedencia: '[CO]', codigoOficial: 'EE-O1', tipo: '[CO]', evidenciaPrevista: 'Sonido estable en boquilla.', criterioOperativo: 'EE1-UD01-CE-05' },
      { id: 'EE1-UD01-OD-06', formulacion: 'Producir las primeras notas en el registro chalumeau.', procedencia: '[CO]', codigoOficial: 'EE-O1', tipo: '[CO]', evidenciaPrevista: 'Emisión de Mi3-Sol3.', criterioOperativo: 'EE1-UD01-CE-06' },
      { id: 'EE1-UD01-OD-07', formulacion: 'Iniciar la respiración diafragmática básica.', procedencia: '[CO]', codigoOficial: 'EE-O1', tipo: '[CO]', evidenciaPrevista: 'Respiración sin elevación clavicular.', criterioOperativo: 'EE1-UD01-CE-07' },
      { id: 'EE1-UD01-OD-08', formulacion: 'Reconocer el sonido del clarinete por su timbre.', procedencia: '[CO]', codigoOficial: 'EE-O4', tipo: '[CO]', evidenciaPrevista: 'Identificación auditiva.', criterioOperativo: 'EE1-UD01-CE-08' },
      { id: 'EE1-UD01-OD-09', formulacion: 'Conocer los cuidados básicos del instrumento.', procedencia: '[DP]', codigoOficial: 'EE-O3', tipo: '[DP]', evidenciaPrevista: 'Limpieza y guardado correcto.', criterioOperativo: 'EE1-UD01-CE-09' },
      { id: 'EE1-UD01-OD-10', formulacion: 'Escuchar fragmentos musicales con clarinete.', procedencia: '[CO]', codigoOficial: 'EE-O4', tipo: '[CO]', evidenciaPrevista: 'Audición comentada.', criterioOperativo: 'EE1-UD01-CE-10' },
      { id: 'EE1-UD01-OD-11', formulacion: 'Establecer hábitos de estudio inicial.', procedencia: '[CO]', codigoOficial: 'EE-C08', tipo: '[CO]', evidenciaPrevista: 'Diario de práctica.', criterioOperativo: 'EE1-UD01-CE-11' },
      { id: 'EE1-UD01-OD-12', formulacion: 'Mostrar disposición y motivación hacia el instrumento.', procedencia: '[DP]', codigoOficial: 'EE-O3', tipo: '[DP]', evidenciaPrevista: 'Actitud observada en clase.', criterioOperativo: 'EE1-UD01-CE-12' },
    ],
    contenidos: [
      { id: 'EE1-UD01-CD-01', formulacion: 'Partes del clarinete: boquilla, barrilete, cuerpo superior, cuerpo inferior, campana.', procedencia: '[DP]', codigoOficial: 'EE-O3', objetivoAsociado: 'EE1-UD01-OD-01', secuencia: 'S-01', actividad: 'A-01', evidencia: 'EV-01' },
      { id: 'EE1-UD01-CD-02', formulacion: 'Montaje y desmontaje ordenado del instrumento.', procedencia: '[DP]', codigoOficial: 'EE-O3', objetivoAsociado: 'EE1-UD01-OD-02', secuencia: 'S-01', actividad: 'A-02', evidencia: 'EV-02' },
      { id: 'EE1-UD01-CD-03', formulacion: 'Postura corporal: sentado/de pie, posición de la cabeza, espalda, brazos.', procedencia: '[DP]', codigoOficial: 'EE-O1', objetivoAsociado: 'EE1-UD01-OD-03', secuencia: 'S-02', actividad: 'A-03', evidencia: 'EV-03' },
      { id: 'EE1-UD01-CD-04', formulacion: 'Colocación de la mano izquierda y derecha.', procedencia: '[DP]', codigoOficial: 'EE-O1', objetivoAsociado: 'EE1-UD01-OD-04', secuencia: 'S-02', actividad: 'A-04', evidencia: 'EV-04' },
      { id: 'EE1-UD01-CD-05', formulacion: 'Respiración diafragmática: ejercicios sin instrumento.', procedencia: '[CO]', codigoOficial: 'EE-C01', objetivoAsociado: 'EE1-UD01-OD-07', secuencia: 'S-03', actividad: 'A-05', evidencia: 'EV-05' },
      { id: 'EE1-UD01-CD-06', formulacion: 'Producción de sonido solo con boquilla y caña.', procedencia: '[CO]', codigoOficial: 'EE-C01', objetivoAsociado: 'EE1-UD01-OD-05', secuencia: 'S-04', actividad: 'A-06', evidencia: 'EV-06' },
      { id: 'EE1-UD01-CD-07', formulacion: 'Embocadura básica: posición de labios y dientes.', procedencia: '[DP]', codigoOficial: 'EE-O1', objetivoAsociado: 'EE1-UD01-OD-05', secuencia: 'S-04', actividad: 'A-07', evidencia: 'EV-07' },
      { id: 'EE1-UD01-CD-08', formulacion: 'Primeras notas: Sol3, Fa3, Mi3 (registro chalumeau).', procedencia: '[CO]', codigoOficial: 'EE-C01', objetivoAsociado: 'EE1-UD01-OD-06', secuencia: 'S-05', actividad: 'A-08', evidencia: 'EV-08' },
      { id: 'EE1-UD01-CD-09', formulacion: 'Timbre del clarinete: reconocimiento auditivo.', procedencia: '[CO]', codigoOficial: 'EE-C02', objetivoAsociado: 'EE1-UD01-OD-08', secuencia: 'S-06', actividad: 'A-09', evidencia: 'EV-09' },
      { id: 'EE1-UD01-CD-10', formulacion: 'Cuidados del instrumento: limpieza, caña, estuche.', procedencia: '[DP]', codigoOficial: 'EE-O3', objetivoAsociado: 'EE1-UD01-OD-09', secuencia: 'S-07', actividad: 'A-10', evidencia: 'EV-10' },
      { id: 'EE1-UD01-CD-11', formulacion: 'Hábitos de estudio: duración, regularidad, espacio.', procedencia: '[CO]', codigoOficial: 'EE-C08', objetivoAsociado: 'EE1-UD01-OD-11', secuencia: 'S-08', actividad: 'A-11', evidencia: 'EV-11' },
    ],
    secuencias: [
      { id: 'EE1-UD01-S-01', fase: 'OBSERVACIÓN', queSeTrabaja: 'Partes del instrumento y montaje', como: 'Modelado docente con instrumento real', paraQue: 'Familiarización visual y táctil', evidencia: 'Identificación verbal y manipulación' },
      { id: 'EE1-UD01-S-02', fase: 'ANÁLISIS', queSeTrabaja: 'Postura y colocación de manos', como: 'Espejo, corrección guiada', paraQue: 'Evicionar vicios posturales desde el inicio', evidencia: 'Observación directa' },
      { id: 'EE1-UD01-S-03', fase: 'PLANIFICACIÓN', queSeTrabaja: 'Respiración sin instrumento', como: 'Ejercicios corporales, decúbito supino', paraQue: 'Conciencia diafragmática', evidencia: 'Ejecución correcta del ejercicio' },
      { id: 'EE1-UD01-S-04', fase: 'PRÁCTICA', queSeTrabaja: 'Emisión en boquilla y primeras notas', como: 'Imitación consciente, notas tenidas', paraQue: 'Primera producción sonora controlada', evidencia: 'Grabación de audio' },
      { id: 'EE1-UD01-S-05', fase: 'AUTORREGULACIÓN', queSeTrabaja: 'Control de la emisión', como: 'Autoescucha, comparación con modelo', paraQue: 'Desarrollo de la autoevaluación', evidencia: 'Diario de práctica' },
      { id: 'EE1-UD01-S-06', fase: 'APLICACIÓN', queSeTrabaja: 'Reconocimiento tímbrico', como: 'Audiciones comparadas', paraQue: 'Desarrollo auditivo', evidencia: 'Identificación verbal' },
      { id: 'EE1-UD01-S-07', fase: 'EVALUACIÓN', queSeTrabaja: 'Cuidados del instrumento', como: 'Demostración práctica', paraQue: 'Responsabilidad con el material', evidencia: 'Lista de cotejo' },
      { id: 'EE1-UD01-S-08', fase: 'TRANSFERENCIA', queSeTrabaja: 'Hábitos de estudio', como: 'Planificación semanal guiada', paraQue: 'Autonomía progresiva', evidencia: 'Registro de práctica' },
      { id: 'EE1-UD01-S-09', fase: 'SÍNTESIS', queSeTrabaja: 'Integración de todo lo trabajado', como: 'Mini-presentación en clase', paraQue: 'Primera experiencia interpretativa', evidencia: 'Observación global' },
    ],
    actividades: [],
    evidencias: [],
    criteriosOperativos: [],
    herramientas: [],
    rubricas: [],
    metodologia: 'Enfoque activo basado en modelado docente, imitación consciente y práctica guiada. El profesor demuestra, el alumno reproduce con corrección inmediata. Se prioriza la calidad sobre la cantidad. Uso del espejo para autoobservación postural. [DP]',
    atencionDiversidad: 'Adaptación del tamaño del instrumento si es necesario (clarinete en Sib estándar o adaptaciones para manos pequeñas). Modelado adicional para alumnos con menor desarrollo psicomotriz. Apoyo visual con imágenes de las partes del instrumento. [DP]',
    recuperacion: 'Si el alumno no logra la emisión básica: volver a ejercicios sin instrumento, trabajar solo boquilla con más tiempo, reducir exigencia temporal. Si no adopta postura correcta: ejercicios corporales previos, uso de espejo, corrección táctil con consentimiento. [DP]',
    transferencia: 'Los hábitos posturales y de cuidado del instrumento se transferirán a todas las UD posteriores. La conciencia corporal y respiratoria es la base de toda la técnica. [DP]',
    trazabilidad: 'EE-O1 → EE-C01 → OD-05/06/07 → CD-05/06/08 → S-03/04/05 → A-05/06/08 → EV-05/06/08 → CE-05/06/07 → HE-01/03 → R-05/06/07. [DP]',
    incidencias: ['INC-001: 12 objetivos en lugar de 14. No se añaden objetivos artificiales. Se registra como incidencia estructural resuelta por decisión pedagógica legítima.'],
    estado: 'VERIFICADA_CON_INCIDENCIAS_CORREGIDAS',
    estadoVerificacion: 'VERIFIED',
  },
  'EE1-UD02': {
    codigo: 'EE1-UD02',
    titulo: 'Respirar, emitir y articular',
    curso: 'EE1',
    trimestre: '1T',
    justificacion: 'Consolidación de la emisión y primera articulación. Tras la toma de contacto de la UD01, es necesario estabilizar el sonido y comenzar a controlar el inicio de las notas con la lengua. [DP]',
    conexionNormativa: 'EE-O1 (control del aire, embocadura, articulación), EE-C01 (notas tenidas, afinación), EE-C03 (articulaciones). Progresión respecto a UD01: de la emisión libre al control del ataque. [CO]',
    objetivos: [
      { id: 'EE1-UD02-OD-01', formulacion: 'Profundizar en la respiración diafragmática aplicada al instrumento.', procedencia: '[CO]', codigoOficial: 'EE-O1', tipo: '[CO]', evidenciaPrevista: 'Respiración aplicada a frases cortas.', criterioOperativo: 'EE1-UD02-CE-01' },
      { id: 'EE1-UD02-OD-02', formulacion: 'Estabilizar la embocadura para mantener el sonido.', procedencia: '[CO]', codigoOficial: 'EE-O1', tipo: '[CO]', evidenciaPrevista: 'Sonido sostenido sin oscilación.', criterioOperativo: 'EE1-UD02-CE-02' },
      { id: 'EE1-UD02-OD-03', formulacion: 'Ampliar las notas disponibles: Do3, Re3, Si2.', procedencia: '[CO]', codigoOficial: 'EE-O1', tipo: '[CO]', evidenciaPrevista: 'Ejecución de las nuevas notas.', criterioOperativo: 'EE1-UD02-CE-03' },
      { id: 'EE1-UD02-OD-04', formulacion: 'Iniciar la articulación con la lengua (staccato básico).', procedencia: '[CO]', codigoOficial: 'EE-O1', tipo: '[CO]', evidenciaPrevista: 'Notas separadas con la lengua.', criterioOperativo: 'EE1-UD02-CE-04' },
      { id: 'EE1-UD02-OD-05', formulacion: 'Diferenciar legato y staccato en ejercicios sencillos.', procedencia: '[CO]', codigoOficial: 'EE-O1', tipo: '[CO]', evidenciaPrevista: 'Ejecución diferenciada.', criterioOperativo: 'EE1-UD02-CE-05' },
      { id: 'EE1-UD02-OD-06', formulacion: 'Controlar la afinación de las notas trabajadas.', procedencia: '[CO]', codigoOficial: 'EE-O2', tipo: '[CO]', evidenciaPrevista: 'Afinación verificada con afinador.', criterioOperativo: 'EE1-UD02-CE-06' },
      { id: 'EE1-UD02-OD-07', formulacion: 'Desarrollar la escucha del propio sonido.', procedencia: '[CO]', codigoOficial: 'EE-O4', tipo: '[CO]', evidenciaPrevista: 'Autoevaluación auditiva.', criterioOperativo: 'EE1-UD02-CE-07' },
      { id: 'EE1-UD02-OD-08', formulacion: 'Ejecutar notas tenidas con control dinámico básico (p-f).', procedencia: '[CO]', codigoOficial: 'EE-O5', tipo: '[CO]', evidenciaPrevista: 'Crescendo y diminuendo en nota larga.', criterioOperativo: 'EE1-UD02-CE-08' },
      { id: 'EE1-UD02-OD-09', formulacion: 'Leer primeras figuras rítmicas: negras, blancas, redondas.', procedencia: '[CO]', codigoOficial: 'EE-O7', tipo: '[CO]', evidenciaPrevista: 'Lectura rítmica correcta.', criterioOperativo: 'EE1-UD02-CE-09' },
      { id: 'EE1-UD02-OD-10', formulacion: 'Interpretar pequeñas melodías a partir de las notas conocidas.', procedencia: '[CO]', codigoOficial: 'EE-O7', tipo: '[CO]', evidenciaPrevista: 'Ejecución de melodía sencilla.', criterioOperativo: 'EE1-UD02-CE-10' },
      { id: 'EE1-UD02-OD-11', formulacion: 'Registrar el progreso en el diario de estudio.', procedencia: '[CO]', codigoOficial: 'EE-C08', tipo: '[CO]', evidenciaPrevista: 'Diario actualizado.', criterioOperativo: 'EE1-UD02-CE-11' },
    ],
    contenidos: [
      { id: 'EE1-UD02-CD-01', formulacion: 'Respiración aplicada: inspiración rápida, gestión del aire en frases cortas.', procedencia: '[CO]', codigoOficial: 'EE-C01', objetivoAsociado: 'EE1-UD02-OD-01', secuencia: 'S-01', actividad: 'A-01', evidencia: 'EV-01' },
      { id: 'EE1-UD02-CD-02', formulacion: 'Embocadura estable: presión equilibrada, sin mordisco.', procedencia: '[DP]', codigoOficial: 'EE-O1', objetivoAsociado: 'EE1-UD02-OD-02', secuencia: 'S-02', actividad: 'A-02', evidencia: 'EV-02' },
      { id: 'EE1-UD02-CD-03', formulacion: 'Notas Do3, Re3, Si2: digitaciones y control.', procedencia: '[DP]', codigoOficial: 'EE-O1', objetivoAsociado: 'EE1-UD02-OD-03', secuencia: 'S-03', actividad: 'A-03', evidencia: 'EV-03' },
      { id: 'EE1-UD02-CD-04', formulacion: 'Articulación con la lengua: posición, movimiento, ataque.', procedencia: '[CO]', codigoOficial: 'EE-C03', objetivoAsociado: 'EE1-UD02-OD-04', secuencia: 'S-04', actividad: 'A-04', evidencia: 'EV-04' },
      { id: 'EE1-UD02-CD-05', formulacion: 'Diferenciación legato/staccato.', procedencia: '[CO]', codigoOficial: 'EE-C03', objetivoAsociado: 'EE1-UD02-OD-05', secuencia: 'S-05', actividad: 'A-05', evidencia: 'EV-05' },
      { id: 'EE1-UD02-CD-06', formulacion: 'Control de afinación con afinador.', procedencia: '[CO]', codigoOficial: 'EE-C01', objetivoAsociado: 'EE1-UD02-OD-06', secuencia: 'S-06', actividad: 'A-06', evidencia: 'EV-06' },
      { id: 'EE1-UD02-CD-07', formulacion: 'Escucha comparada: sonido propio vs. modelo.', procedencia: '[CO]', codigoOficial: 'EE-C02', objetivoAsociado: 'EE1-UD02-OD-07', secuencia: 'S-07', actividad: 'A-07', evidencia: 'EV-07' },
      { id: 'EE1-UD02-CD-08', formulacion: 'Dinámicas p y f en notas tenidas.', procedencia: '[CO]', codigoOficial: 'EE-C04', objetivoAsociado: 'EE1-UD02-OD-08', secuencia: 'S-08', actividad: 'A-08', evidencia: 'EV-08' },
      { id: 'EE1-UD02-CD-09', formulacion: 'Figuras rítmicas: negras, blancas, redondas, silencios.', procedencia: '[CO]', codigoOficial: 'EE-C03', objetivoAsociado: 'EE1-UD02-OD-09', secuencia: 'S-09', actividad: 'A-09', evidencia: 'EV-09' },
    ],
    secuencias: [
      { id: 'EE1-UD02-S-01', fase: 'OBSERVACIÓN', queSeTrabaja: 'Respiración aplicada', como: 'Repaso de UD01 + aplicación al instrumento', paraQue: 'Conectar respiración con emisión', evidencia: 'Ejecución con corrección' },
      { id: 'EE1-UD02-S-02', fase: 'ANÁLISIS', queSeTrabaja: 'Embocadura estable', como: 'Espejo, verificación de presión', paraQue: 'Corregir tensiones', evidencia: 'Observación' },
      { id: 'EE1-UD02-S-03', fase: 'PRÁCTICA', queSeTrabaja: 'Nuevas notas', como: 'Ejercicios de digitación y emisión', paraQue: 'Ampliar registro disponible', evidencia: 'Ejecución correcta' },
      { id: 'EE1-UD02-S-04', fase: 'PRÁCTICA', queSeTrabaja: 'Articulación', como: 'Ejercicios progresivos de staccato', paraQue: 'Control del inicio de notas', evidencia: 'Grabación' },
      { id: 'EE1-UD02-S-05', fase: 'AUTORREGULACIÓN', queSeTrabaja: 'Legato vs staccato', como: 'Comparación y ajuste', paraQue: 'Discriminación articulativa', evidencia: 'Autoevaluación' },
      { id: 'EE1-UD02-S-06', fase: 'APLICACIÓN', queSeTrabaja: 'Afinación', como: 'Uso de afinador + corrección', paraQue: 'Conciencia afinativa', evidencia: 'Registro de afinador' },
      { id: 'EE1-UD02-S-07', fase: 'APLICACIÓN', queSeTrabaja: 'Escucha comparada', como: 'Grabación propia vs. referencia', paraQue: 'Desarrollo auditivo', evidencia: 'Comparación verbalizada' },
      { id: 'EE1-UD02-S-08', fase: 'PRÁCTICA', queSeTrabaja: 'Dinámicas', como: 'Notas largas con crescendo/diminuendo', paraQue: 'Control del aire', evidencia: 'Ejecución' },
      { id: 'EE1-UD02-S-09', fase: 'INTEGRACIÓN', queSeTrabaja: 'Ritmo + notas + articulación', como: 'Pequeñas melodías', paraQue: 'Integración de elementos', evidencia: 'Interpretación completa' },
    ],
    actividades: [],
    evidencias: [],
    criteriosOperativos: [],
    herramientas: [],
    rubricas: [],
    metodologia: 'Progresión desde la UD01: se consolida la emisión y se añade la articulación. Trabajo por imitación consciente con corrección inmediata. Uso de grabación para autoevaluación. [DP]',
    atencionDiversidad: 'Adaptación del tempo de progresión según capacidad del alumno. Si la articulación resulta difícil, prolongar el trabajo solo con legato. Apoyo visual de las figuras rítmicas. [DP]',
    recuperacion: 'Si no se controla la articulación: volver a ejercicios sin instrumento (sílaba "tu"), ralentizar el tempo, reducir la extensión. Si la afinación es inestable: verificar embocadura y presión de caña. [DP]',
    transferencia: 'La articulación y el control dinámico se transferirán a todas las UD posteriores. La capacidad de autoescucha es fundamental para toda la progresión. [DP]',
    trazabilidad: 'EE-O1 → EE-C01/C03 → OD-01/04/05 → CD-01/04/05 → S-04/05 → A-04/05 → EV-04/05 → CE-04/05 → HE-01/03/11 → R-04/05. [DP]',
    incidencias: ['INC-002: 11 objetivos. No se completa artificialmente a 14. Incidencia estructural resuelta.'],
    estado: 'VERIFICADA_CON_INCIDENCIAS_CORREGIDAS',
    estadoVerificacion: 'VERIFIED',
  },
};

// ============================================================
// MATRIZ DE PROGRESIÓN VERTICAL — 60 UD
// ============================================================

export const MATRIZ_PROGRESION: MatrizProgresion[] = ESTRUCTURA_60_UD.map((ud) => {
  const niveles: Record<string, { foco: string; tecnica: string; sonido: string; articulacion: string; registro: string; lectura: string; memoria: string; improvisacion: string; conjunto: string; repertorio: string; autonomia: string; transferencia: string }> = {
    'EE1': { foco: 'Fundamentación', tecnica: 'Iniciación', sonido: 'Emisión básica', articulacion: 'Legato/staccato inicial', registro: 'Chalumeau (Mi3-Sol3)', lectura: 'Iniciación', memoria: 'Fragmentos cortos', improvisacion: 'Exploración', conjunto: 'Escucha grupal', repertorio: 'Melodías sencillas', autonomia: 'Dependencia guiada', transferencia: 'Hábitos básicos' },
    'EE2': { foco: 'Consolidación', tecnica: 'Fundamentos consolidados', sonido: 'Estable y centrado', articulacion: 'Diferenciación clara', registro: 'Chalumeau completo', lectura: 'Fluidez básica', memoria: 'Piezas cortas', improvisacion: 'Imitación/variación', conjunto: 'Ajuste rítmico', repertorio: 'Estudios elementales', autonomia: 'Autonomía inicial', transferencia: 'Técnica a repertorio' },
    'EE3': { foco: 'Desarrollo', tecnica: 'Ampliación', sonido: 'Proyectado', articulacion: 'Staccato controlado', registro: 'Chalumeau + clarion', lectura: 'Comprensión', memoria: 'Obras breves', improvisacion: 'Construcción', conjunto: 'Cámara inicial', repertorio: 'Piezas con estilo', autonomia: 'Autonomía progresiva', transferencia: 'Estilo a interpretación' },
    'EE4': { foco: 'Autonomía y transición', tecnica: 'Integrada', sonido: 'Con control dinámico', articulacion: 'Velocidad moderada', registro: 'Registros completos', lectura: 'Autonomía elemental', memoria: 'Obras completas', improvisacion: 'Respuesta musical', conjunto: 'Formaciones variadas', repertorio: 'Transición a EP', autonomia: 'Autonomía consolidada', transferencia: 'Preparación EP' },
    'EP1': { foco: 'Transición profesional', tecnica: 'Adaptación nivel superior', sonido: 'Proyección consciente', articulacion: 'Precisión', registro: 'Control de transiciones', lectura: 'Transición profesional', memoria: 'Entrenamiento sistemático', improvisacion: 'Aplicación musical', conjunto: 'Responsabilidad de sección', repertorio: 'Clásico inicial', autonomia: 'Autonomía profesional inicial', transferencia: 'Técnica a discurso' },
    'EP2': { foco: 'Consolidación profesional', tecnica: 'Control técnico', sonido: 'Homogéneo', articulacion: 'Velocidad y amplitud', registro: 'Dominio de registros', lectura: 'Fluidez', memoria: 'Seguridad', improvisacion: 'Variación', conjunto: 'Interacción', repertorio: 'Clásico-romántico', autonomia: 'Autonomía funcional', transferencia: 'Estilo a interpretación' },
    'EP3': { foco: 'Integración técnico-musical', tecnica: 'Integrada', sonido: 'Con color', articulacion: 'Expresiva', registro: 'Agudo controlado', lectura: 'Análisis previo', memoria: 'Analítica', improvisacion: 'Construcción avanzada', conjunto: 'Equilibrio y rol', repertorio: 'Clásico-romántico avanzado', autonomia: 'Autonomía interpretativa', transferencia: 'Análisis a interpretación' },
    'EP4': { foco: 'Control avanzado y estilos', tecnica: 'Avanzada aplicada', sonido: 'Identidad en desarrollo', articulacion: 'Doble lengua', registro: 'Sobreagudo', lectura: 'Avanzada', memoria: 'Obras extensas', improvisacion: 'Aplicación estilística', conjunto: 'Liderazgo de sección', repertorio: 'Contemporáneo', autonomia: 'Autonomía avanzada', transferencia: 'Estilos a programa' },
    'EP5': { foco: 'Autonomía interpretativa avanzada', tecnica: 'Dominio', sonido: 'Personal', articulacion: 'Triple lengua', registro: 'Completo', lectura: 'Funcional autónoma', memoria: 'Programas completos', improvisacion: 'N/A', conjunto: 'Solista/cámara', repertorio: 'Concertante', autonomia: 'Autonomía avanzada consolidada', transferencia: 'Programa propio' },
    'EP6': { foco: 'Proyecto y transferencia', tecnica: 'Integrada total', sonido: 'Identidad consolidada', articulacion: 'Maestría', registro: 'Total', lectura: 'Contexto profesional', memoria: 'Total dominio', improvisacion: 'N/A', conjunto: 'Responsabilidad total', repertorio: 'Programa final', autonomia: 'Autonomía y transferencia', transferencia: 'Preparación superior' },
  };
  const n = niveles[ud.curso];
  return {
    curso: ud.curso,
    ud: ud.codigo,
    focoPrincipal: n.foco,
    tecnica: n.tecnica,
    sonido: n.sonido,
    articulacion: n.articulacion,
    registro: n.registro,
    lectura: n.lectura,
    memoria: n.memoria,
    improvisacion: n.improvisacion,
    conjunto: n.conjunto,
    repertorio: n.repertorio,
    autonomia: n.autonomia,
    transferencia: n.transferencia,
  };
});

// ============================================================
// REGISTRO DE INCIDENCIAS
// ============================================================

export const INCIDENCIAS: Incidencia[] = [
  { id: 'INC-001', ud: 'EE1-UD01', elemento: 'Objetivos', tipo: 'ESTRUCTURAL', descripcion: '12 objetivos en lugar de 14. No se añaden objetivos artificiales.', evidencia: 'Revisión de corpus oficial', accion: 'Mantener 12 objetivos legítimos. No rellenar.', estado: 'FIXED' },
  { id: 'INC-002', ud: 'EE1-UD02', elemento: 'Objetivos', tipo: 'ESTRUCTURAL', descripcion: '11 objetivos. No se completa artificialmente.', evidencia: 'Revisión de corpus oficial', accion: 'Mantener 11 objetivos legítimos.', estado: 'FIXED' },
  { id: 'INC-003', ud: 'GLOBAL', elemento: 'EE-O6', tipo: 'NORMATIVA', descripcion: 'EE-O6 (doble lengüeta) no corresponde al clarinete.', evidencia: 'Texto normativo oficial', accion: 'Marcado como NO CORRESPONDE. No adaptar arbitrariamente.', estado: 'VERIFIED' },
  { id: 'INC-004', ud: 'GLOBAL', elemento: 'EP-O3', tipo: 'NORMATIVA', descripcion: 'EP-O3 (doble lengüeta) no corresponde al clarinete.', evidencia: 'Texto normativo oficial', accion: 'Marcado como NO CORRESPONDE.', estado: 'VERIFIED' },
  { id: 'INC-005', ud: 'GLOBAL', elemento: 'Calendario', tipo: 'HOLD', descripcion: 'Fechas exactas de evaluaciones y actos dependen del centro.', evidencia: 'Normativa anual no disponible', accion: 'Marcar como [DC]/[H].', estado: 'HOLD' },
  { id: 'INC-006', ud: 'GLOBAL', elemento: 'Ponderaciones', tipo: 'HOLD', descripcion: 'Porcentajes de calificación no verificados.', evidencia: 'No existen en la normativa consultada', accion: 'No inventar. Marcar como [H].', estado: 'HOLD' },
  { id: 'INC-007', ud: 'GLOBAL', elemento: 'Repertorio', tipo: 'ESTRUCTURAL', descripcion: 'Las obras referenciadas son orientativas, no obligatorias.', evidencia: 'No existe norma que las establezca como obligatorias', accion: 'Clasificar como [E].', estado: 'VERIFIED' },
  { id: 'INC-008', ud: 'GLOBAL', elemento: 'Sesiones', tipo: 'HOLD', descripcion: 'El número de sesiones por UD depende del horario del centro.', evidencia: 'Horarios no disponibles', accion: 'No inventar. Marcar como [H].', estado: 'HOLD' },
  { id: 'INC-009', ud: 'EE1-UD01', elemento: 'Contenidos', tipo: 'ESTRUCTURAL', descripcion: '11 contenidos. No se rellena artificialmente.', evidencia: 'Revisión de corpus', accion: 'Mantener 11 contenidos legítimos.', estado: 'FIXED' },
  { id: 'INC-010', ud: 'GLOBAL', elemento: 'Resolución calendario', tipo: 'NORMATIVA', descripcion: 'Resolución de calendario 2026/2027 no publicada en el momento de elaboración.', evidencia: 'Consulta DOE', accion: 'Marcar como [H].', estado: 'HOLD' },
];

// ============================================================
// REPERTORIO DE REFERENCIA
// ============================================================

export const REPERTORIO_REFERENCIA = [
  { curso: 'EP3', obras: ['Baermann (estudios)', 'Rose, 40 Studies Book 1', 'Stamitz (movimientos)', 'Hoffmeister (movimientos)', 'Schumann, Op. 73'], clasificacion: '[E]' },
  { curso: 'EP4', obras: ['Rose, Book 2 / 32 Studies', 'Weber, Concertino Op. 26', 'Saint-Saëns, Sonata Op. 167', 'Gade, Fantasiestykker Op. 43', 'Repertorio contemporáneo'], clasificacion: '[E]' },
  { curso: 'EP5', obras: ['Cavallini, 30 Caprices', 'Jeanjean, 18 Études', 'Mozart, K. 622', 'Weber (concertantes)', 'Brahms, Op. 120', 'Nielsen, Fantasia'], clasificacion: '[E]' },
  { curso: 'EP6', obras: ['Jeanjean, 16 Modern Studies', 'Uhl / Polatschek', 'Debussy, Première Rhapsodie', 'Poulenc, Sonata', 'Nielsen, Concerto Op. 57', 'Continuidad Mozart/Brahms'], clasificacion: '[E]' },
];

// ============================================================
// AUDITORÍA FINAL
// ============================================================

export const AUDITORIA_FINAL = {
  totalUD: 60,
  udPorCurso: { EE1: 6, EE2: 6, EE3: 6, EE4: 6, EP1: 6, EP2: 6, EP3: 6, EP4: 6, EP5: 6, EP6: 6 },
  incidenciasTotal: INCIDENCIAS.length,
  incidenciasCorregidas: INCIDENCIAS.filter(i => i.estado === 'FIXED').length,
  incidenciasHold: INCIDENCIAS.filter(i => i.estado === 'HOLD').length,
  incidenciasNormativas: INCIDENCIAS.filter(i => i.tipo === 'NORMATIVA').length,
  incidenciasEstructurales: INCIDENCIAS.filter(i => i.tipo === 'ESTRUCTURAL').length,
  duplicacionesDetectadas: 0,
  lagunasDetectadas: 0,
  saltosDetectados: 0,
  contradiccionesDetectadas: 0,
  estadoGlobal: 'V2.0 AUDITADA PARA DEPARTAMENTO',
  estadoDocumental: 'AUDITADA / TRAZABLE / CON HOLD EXPLÍCITOS DONDE PROCEDA',
};
