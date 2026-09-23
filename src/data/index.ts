import { Section } from './blocks01-03';
import { BLOCK_01_SECTIONS } from './blocks01-03';
import { BLOCKS_04_30 } from './blocks04-30';

export type { Section, Subsection, ContentBlock } from './blocks01-03';

export const ALL_SECTIONS: Section[] = [...BLOCK_01_SECTIONS, ...BLOCKS_04_30];

// Matriz Maestra de Progresión
export const PROGRESION_MATRIX = {
  headers: ['Dimensión', 'EE Inicial', 'EE Final', 'EP 1.º-2.º', 'EP 3.º-4.º', 'EP 5.º-6.º'],
  rows: [
    ['Postura', 'Iniciación', 'Correcta y relajada', 'Refinada', 'Adaptable', 'Óptima y natural'],
    ['Respiración', 'Noción básica', 'Diafragmática consciente', 'Controlada', 'Gestionada con precisión', 'Dominio total'],
    ['Embocadura', 'Formación inicial', 'Correcta y estable', 'Firme y adaptable', 'Control fino', 'Excelencia'],
    ['Emisión', 'Primeros sonidos', 'Ataque controlado', 'Variedad de ataques', 'Precisión estilística', 'Maestría'],
    ['Sonido', 'Emisión básica', 'Estable y centrado', 'Proyectado', 'Con colores', 'Identidad personal'],
    ['Afinación', 'Noción inicial', 'Referencias auditivas', 'Control consciente', 'Sistemático', 'Excelencia'],
    ['Digitación', 'Posiciones básicas', 'Digitaciones fundamentales', 'Alternativas', 'Agilidad', 'Virtuosismo'],
    ['Articulación', 'Legato/staccato básico', 'Diferenciación', 'Dominio simple', 'Articulación doble', 'Expresividad total'],
    ['Escalas', 'Mayores básicas', 'Mayores y menores', 'Todas las tonalidades', '2-3 octavas', 'Todas articulaciones'],
    ['Arpegios', 'Tónica 1 octava', 'Tríadas básicas', 'Tríadas y séptimas', 'Extensión completa', 'Fluidez total'],
    ['Flexibilidad', 'Intervalos sencillos', 'Saltos pequeños', 'Saltos amplios', 'Cambios de registro', 'Total'],
    ['Registro', 'Chalumeau', 'Chalumeau + clarion', 'Registros completos', 'Control dinámico', 'Altissimo incluido'],
    ['Lectura', 'Iniciación', 'Fluidez básica', 'Seguridad', 'Primera vista', 'Maestría'],
    ['Primera vista', '—', 'Iniciación', 'Materiales graduados', 'Fluidez', 'Comprensión inmediata'],
    ['Memoria', 'Fragmentos', 'Piezas cortas', 'Obras breves', 'Obras completas', 'Dominio total'],
    ['Análisis', '—', 'Forma básica', 'Estructura', 'Armónico y formal', 'Estilístico completo'],
    ['Fraseo', 'Noción de frase', 'Respiración entre frases', 'Construcción', 'Dirección', 'Discurso maduro'],
    ['Expresión', 'Intención básica', 'Dinámica contrastada', 'Carácter', 'Personalidad', 'Comunicación artística'],
    ['Repertorio', 'Piezas sencillas', 'Obras elementales', 'Estudios y obras', 'Diversos estilos', 'Repertorio de concierto'],
    ['Autonomía', 'Dependiente', 'Hábitos iniciales', 'Trabajo guiado', 'Autónomo', 'Autogestión plena'],
    ['Interpretación pública', '—', 'Audiciones internas', 'Audiciones', 'Recitales', 'Nivel preprofesional']
  ]
};
