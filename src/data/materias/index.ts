/**
 * Índice de todas las materias teóricas
 */

export { LENGUAJE_MUSICAL } from './lenguaje';
export { ARMONIA } from './armonia';
export { ANALISIS } from './analisis';
export { HISTORIA } from './historia';

import { LENGUAJE_MUSICAL } from './lenguaje';
import { ARMONIA } from './armonia';
import { ANALISIS } from './analisis';
import { HISTORIA } from './historia';

export const MATERIAS_TEORICAS = {
  lenguaje: LENGUAJE_MUSICAL,
  armonia: ARMONIA,
  analisis: ANALISIS,
  historia: HISTORIA
};

export type MateriaTeoricaKey = keyof typeof MATERIAS_TEORICAS;
