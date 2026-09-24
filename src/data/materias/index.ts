/**
 * Índice de todas las materias
 * V3.0 - Implementación completa del currículo
 */

export { LENGUAJE_MUSICAL } from './lenguaje';
export { ARMONIA } from './armonia';
export { ANALISIS } from './analisis';
export { HISTORIA } from './historia';
export { LITERATURA_INSTRUMENTO } from './literatura';
export { CORO } from './coro';
export { PIANO_COMPLEMENTARIO } from './piano-complementario';
export { MUSICA_CONJUNTO } from './musica-conjunto';
export { FUNDAMENTOS_COMPOSICION } from './composicion';
export { MUSICA_TECNOLOGIAS } from './musica-tecnologias';

import { LENGUAJE_MUSICAL } from './lenguaje';
import { ARMONIA } from './armonia';
import { ANALISIS } from './analisis';
import { HISTORIA } from './historia';
import { LITERATURA_INSTRUMENTO } from './literatura';
import { CORO } from './coro';
import { PIANO_COMPLEMENTARIO } from './piano-complementario';
import { MUSICA_CONJUNTO } from './musica-conjunto';
import { FUNDAMENTOS_COMPOSICION } from './composicion';
import { MUSICA_TECNOLOGIAS } from './musica-tecnologias';

export const MATERIAS_TEORICAS = {
  lenguaje: LENGUAJE_MUSICAL,
  armonia: ARMONIA,
  analisis: ANALISIS,
  historia: HISTORIA,
  literatura: LITERATURA_INSTRUMENTO,
  coro: CORO,
  piano_complementario: PIANO_COMPLEMENTARIO,
  musica_conjunto: MUSICA_CONJUNTO,
  composicion: FUNDAMENTOS_COMPOSICION,
  musica_tecnologias: MUSICA_TECNOLOGIAS
};

export type MateriaTeoricaKey = keyof typeof MATERIAS_TEORICAS;
