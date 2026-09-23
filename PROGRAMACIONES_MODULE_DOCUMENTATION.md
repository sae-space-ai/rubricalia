# Módulo de Programaciones Vigentes y Veraces

## 📚 Descripción

El módulo de programaciones vigentes y veraces es una funcionalidad que expone de forma organizada y navegable toda la información curricular verificada de cada especialidad y materia de las Enseñanzas Profesionales de Música.

## 🎯 Objetivo

Proporcionar a profesores, departamentos e inspección educativa un acceso rápido y estructurado a:
- Objetivos de aprendizaje verificados
- Contenidos por curso
- Metodología aplicada
- Instrumentos y criterios de evaluación
- Marco normativo aplicable

## 📋 Materias Incluidas

### 1. **Clarinete** 🎵
- **Tipo:** Instrumento
- **Etapa:** Ambas (EE + EP)
- **Cursos:** 10 cursos (EE1-EE4, EP1-EP6)
- **Estado:** ✓ Verificada
- **Objetivos:** 14 objetivos oficiales
- **Unidades Didácticas:** 60 UD completas

### 2. **Música de Cámara** 🎻
- **Tipo:** Colectiva
- **Etapa:** Profesionales
- **Cursos:** 3 cursos (EP4, EP5, EP6)
- **Estado:** ✓ Verificada
- **Objetivos:** 9 objetivos específicos
- **Criterios:** 12 criterios de evaluación

### 3. **Banda** 🎺
- **Tipo:** Colectiva
- **Etapa:** Profesionales
- **Cursos:** 6 cursos (EP1-EP6)
- **Estado:** ✓ Verificada
- **Objetivos:** 9 objetivos específicos
- **Criterios:** 12 criterios de evaluación

### 4. **Orquesta** 🎼
- **Tipo:** Colectiva
- **Etapa:** Profesionales
- **Cursos:** 6 cursos (EP1-EP6)
- **Estado:** ✓ Verificada
- **Objetivos:** 9 objetivos específicos
- **Criterios:** 12 criterios de evaluación

### 5. **Lenguaje Musical** 📖
- **Tipo:** Teórica
- **Etapa:** Profesionales
- **Cursos:** 4 cursos (EP1-EP4)
- **Estado:** ✓ Verificada
- **Objetivos:** 7 objetivos específicos
- **Contenidos:** Detallados por curso

### 6. **Armonía** 🎼
- **Tipo:** Teórica
- **Etapa:** Profesionales
- **Cursos:** 2 cursos (EP1-EP2)
- **Estado:** ✓ Verificada
- **Objetivos:** 7 objetivos específicos
- **Contenidos:** Detallados por curso

### 7. **Análisis Musical** 🔍
- **Tipo:** Teórica
- **Etapa:** Profesionales
- **Cursos:** 4 cursos (EP3-EP6)
- **Estado:** ✓ Verificada
- **Objetivos:** 7 objetivos específicos
- **Contenidos:** Detallados por curso

### 8. **Historia de la Música** 📚
- **Tipo:** Teórica
- **Etapa:** Profesionales
- **Cursos:** 4 cursos (EP3-EP6)
- **Estado:** ✓ Verificada
- **Objetivos:** 7 objetivos específicos
- **Contenidos:** Detallados por curso

## 🎨 Interfaz de Usuario

### Vista General

La vista principal muestra:
- **Header** con estadísticas globales (número de materias, verificadas, cursos)
- **Filtros** por tipo de materia y etapa educativa
- **Tarjetas** de cada materia con información resumida
- **Indicadores** de estado de verificación

### Filtros Disponibles

#### Por Tipo de Materia
- 📋 **Todas**: Muestra todas las programaciones
- 🎵 **Instrumento**: Solo Clarinete
- 🎻 **Colectivas**: Cámara, Banda, Orquesta
- 📖 **Teóricas**: Lenguaje, Armonía, Análisis, Historia
- 🎤 **Complementarias**: Coro, Piano Complementario

#### Por Etapa Educativa
- **Todas las etapas**: Incluye todas las materias
- **Enseñanzas Elementales**: Solo materias de EE
- **Enseñanzas Profesionales**: Solo materias de EP

### Vista de Detalle

Al hacer clic en una materia, se abre una vista detallada con pestañas:

#### 🎯 Pestaña Objetivos
- Lista numerada de todos los objetivos de aprendizaje
- Cada objetivo con su descripción completa
- Diseño visual con iconos y colores

#### 📚 Pestaña Contenidos
- Contenidos organizados por curso
- Cada curso en una tarjeta independiente
- Lista de contenidos específicos por curso

#### 📝 Pestaña Metodología
- Métodos de enseñanza utilizados
- Lista numerada de estrategias metodológicas
- Enfoques pedagógicos específicos

#### ✅ Pestaña Evaluación
- **Instrumentos de evaluación**: Lista de herramientas evaluativas
- **Criterios de evaluación**: Criterios específicos con numeración
- Diseño visual con iconos diferenciados

#### 📜 Pestaña Normativa
- Marco normativo aplicable
- Leyes, decretos y órdenes relevantes
- Diseño con iconos de documento

## 🔍 Características Técnicas

### Estructura de Datos

```typescript
interface ProgramacionMateria {
  id: string;                    // Identificador único
  nombre: string;                // Nombre de la materia
  tipo: string;                  // instrumento, colectiva, teorica, complementaria
  etapa: string;                 // EE, EP, ambas
  cursos: string[];              // Array de cursos
  icono: string;                 // Icono emoji
  color: string;                 // Color del tema
  descripcion: string;           // Descripción breve
  objetivos: string[];           // Array de objetivos
  contenidos: { [curso: string]: string[] };  // Contenidos por curso
  criterios?: string[];          // Criterios de evaluación (opcional)
  metodologia: string[];         // Métodos de enseñanza
  evaluacion: {
    instrumentos: string[];      // Instrumentos de evaluación
    criterios: string[];         // Criterios específicos
  };
  normativa: string[];           // Marco normativo
  estado: string;                // VERIFIED, PARTIAL, HOLD
}
```

### Funciones de Filtrado

```typescript
// Obtener programación por ID
getProgramacionById(id: string): ProgramacionMateria | undefined

// Filtrar por tipo de materia
getProgramacionesByTipo(tipo: string): ProgramacionMateria[]

// Filtrar por etapa educativa
getProgramacionesByEtapa(etapa: string): ProgramacionMateria[]
```

## 📊 Estadísticas

El módulo muestra estadísticas en tiempo real:
- **Total de materias**: 8 programaciones completas
- **Materias verificadas**: 8 (100%)
- **Total de cursos**: 10 cursos diferentes
- **Total de objetivos**: 70+ objetivos de aprendizaje
- **Total de contenidos**: 200+ contenidos específicos

## 🎯 Casos de Uso

### Para Profesores
- Consulta rápida de objetivos y contenidos
- Verificación de la progresión por cursos
- Revisión de metodología y evaluación
- Acceso al marco normativo

### Para Departamentos
- Coordinación entre materias
- Verificación de coherencia curricular
- Planificación de actividades conjuntas
- Revisión de programaciones

### Para Inspección Educativa
- Auditoría de programaciones
- Verificación de cumplimiento normativo
- Revisión de objetivos y contenidos
- Evaluación de la calidad curricular

## 🔗 Integración con Otros Módulos

### Con Módulo de Exportación
- Exportar programaciones en PDF, Excel, Word
- Generar informes por materia
- Crear documentos para inspección

### Con APIs Musicales
- Enriquecer contenido con información de compositores
- Añadir contexto histórico
- Incluir ejemplos de repertorio

### Con Documento Completo
- Navegación cruzada entre programaciones
- Acceso a los 30 apartados del documento maestro
- Trazabilidad completa

## 📝 Notas de Veracidad

Todas las programaciones incluidas en este módulo cumplen con:

✅ **Verificación normativa**: Basadas en decretos oficiales
✅ **Trazabilidad completa**: Cada elemento vinculado a su base legal
✅ **Sin invenciones**: Solo contenido verificado o marcado como HOLD
✅ **Actualización 2026/2027**: Curso académico vigente
✅ **Extremadura**: Normativa autonómica aplicada

## 🚀 Mejoras Futuras

### Planificadas
1. **Búsqueda avanzada**: Búsqueda por palabras clave en contenidos
2. **Comparador de materias**: Comparar objetivos y contenidos entre materias
3. **Exportación selectiva**: Exportar solo secciones específicas
4. **Integración con calendario**: Vincular contenidos con temporalización
5. **Sistema de notas**: Añadir notas personales a cada programación

### En Evaluación
- Integración con plataformas educativas
- Sincronización con servicios en la nube
- Versión móvil optimizada
- Modo offline

## 📞 Soporte

Para consultas sobre las programaciones:
- Revisar la documentación de cada materia
- Consultar el documento maestro (30 apartados)
- Verificar el marco normativo en la sección correspondiente

---

**Versión**: 1.0.0  
**Última actualización**: 2024  
**Autor**: Prof. Manuel Gago Fernández  
**Estado**: ✓ Verificado y Auditado
