# Documentación Técnica - APIs Integradas

## 🌐 APIs Gratuitas Utilizadas

### 1. MusicBrainz API

**Documentación oficial**: https://musicbrainz.org/doc/MusicBrainz_API

#### Endpoints Utilizados

##### Búsqueda de Artistas
```
GET https://musicbrainz.org/ws/2/artist?query={nombre}&fmt=json&limit=10
```

**Parámetros**:
- `query`: Nombre del compositor a buscar
- `fmt`: Formato de respuesta (json)
- `limit`: Número máximo de resultados

**Respuesta**:
```json
{
  "artists": [
    {
      "id": "uuid",
      "name": "Wolfgang Amadeus Mozart",
      "sort-name": "Mozart, Wolfgang Amadeus",
      "life-span": {
        "begin": "1756-01-27",
        "end": "1791-12-05"
      },
      "country": "AT",
      "disambiguation": "classical composer"
    }
  ]
}
```

##### Búsqueda de Obras
```
GET https://musicbrainz.org/ws/2/work?query=artist:{nombre}&fmt=json&limit=20
```

**Respuesta**:
```json
{
  "works": [
    {
      "id": "uuid",
      "title": "Symphony No. 40 in G minor, K. 550",
      "type": "Symphony",
      "first-release-date": "1788"
    }
  ]
}
```

#### Implementación en el Proyecto

**Archivo**: `src/services/api.ts`

```typescript
export async function searchComposer(name: string): Promise<Composer | null> {
  const response = await fetch(
    `https://musicbrainz.org/ws/2/artist?query=${encodeURIComponent(name)}&fmt=json&limit=10`
  );
  const data = await response.json();
  return data.artists[0] || null;
}
```

---

### 2. Wikipedia API

**Documentación oficial**: https://www.mediawiki.org/wiki/API:Main_page

#### Endpoints Utilizados

##### Búsqueda de Páginas
```
GET https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch={termino}&format=json
```

**Parámetros**:
- `action`: Tipo de acción (query)
- `list`: Lista a consultar (search)
- `srsearch`: Término de búsqueda
- `format`: Formato de respuesta (json)

##### Obtener Resumen de Página
```
GET https://es.wikipedia.org/api/rest_v1/page/summary/{titulo}
```

**Respuesta**:
```json
{
  "title": "Wolfgang Amadeus Mozart",
  "extract": "Wolfgang Amadeus Mozart fue un compositor...",
  "thumbnail": {
    "source": "https://upload.wikimedia.org/..."
  },
  "content_urls": {
    "desktop": {
      "page": "https://es.wikipedia.org/wiki/Wolfgang_Amadeus_Mozart"
    }
  }
}
```

#### Implementación en el Proyecto

**Archivo**: `src/services/api.ts`

```typescript
export async function getComposerInfo(name: string): Promise<ComposerInfo | null> {
  const searchUrl = `https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(name)}&format=json&origin=*`;
  const searchResponse = await fetch(searchUrl);
  const searchData = await searchResponse.json();
  
  if (searchData.query?.search?.length > 0) {
    const title = searchData.query.search[0].title;
    const summaryUrl = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const summaryResponse = await fetch(summaryUrl);
    return await summaryResponse.json();
  }
  
  return null;
}
```

---

## 🎨 Componentes de Integración

### ComposerInfo Component

**Archivo**: `src/components/ComposerInfo.tsx`

Este componente muestra información enriquecida de compositores obtenida de las APIs.

**Props**:
```typescript
interface ComposerInfoProps {
  composerName: string;
}
```

**Uso**:
```tsx
<ComposerInfo composerName="Wolfgang Amadeus Mozart" />
```

**Funcionalidades**:
- Muestra biografía del compositor
- Lista de obras principales
- Enlaces a Wikipedia
- Período histórico
- Nacionalidad

---

### ComposerSearch Component

**Archivo**: `src/App.tsx` (integrado)

Componente de búsqueda interactiva de compositores.

**Funcionalidades**:
- Campo de búsqueda con autocompletado
- Resultados en tiempo real
- Información detallada al hacer clic
- Enlaces externos a Wikipedia

---

## 📚 Materias Teóricas con Contenido Completo

### 1. Lenguaje Musical

**Archivo**: `src/data/materias/lenguaje.ts`

**Contenido**:
- 4 cursos (1º a 4º)
- Objetivos específicos por curso
- Contenidos detallados
- Metodología
- Criterios de evaluación

**Ejemplo de contenido**:
```typescript
contenidosPorCurso: {
  1: {
    titulo: 'Fundamentos del Lenguaje Musical',
    contenidos: [
      'Lectura rítmica: figuras básicas',
      'Compases simples: 2/4, 3/4, 4/4',
      'Lectura melódica en clave de Sol y Fa',
      // ...
    ]
  }
}
```

### 2. Armonía

**Archivo**: `src/data/materias/armonia.ts`

**Contenido**:
- 2 cursos (1º y 2º)
- Progresión desde armonía básica a avanzada
- Ejercicios prácticos
- Análisis de obras

### 3. Análisis Musical

**Archivo**: `src/data/materias/analisis.ts`

**Contenido**:
- 4 cursos (1º a 4º)
- Análisis formal y estructural
- Períodos históricos
- Metodología analítica

### 4. Historia de la Música

**Archivo**: `src/data/materias/historia.ts`

**Contenido**:
- 4 cursos (1º a 4º)
- Cronología completa
- Compositores principales
- Contexto histórico y cultural

---

## 🔧 Configuración y Uso

### Instalación de Dependencias

No se requieren dependencias adicionales. Las APIs son accesibles directamente mediante `fetch`.

### Configuración de CORS

Las APIs utilizadas permiten CORS:
- **MusicBrainz**: Permite solicitudes desde cualquier origen
- **Wikipedia**: Configurado con `origin=*` para CORS

### Límites de Uso

#### MusicBrainz
- **Límite**: 1 solicitud por segundo
- **Recomendación**: Implementar cache para resultados frecuentes
- **User-Agent**: Incluir en headers (opcional pero recomendado)

#### Wikipedia
- **Límite**: No especificado, pero se recomienda uso razonable
- **Recomendación**: Cache de resúmenes de páginas

---

## 🚀 Mejoras Futuras

### APIs Adicionales a Integrar

1. **IMSLP API** (International Music Score Library Project)
   - Partituras de dominio público
   - Endpoint: `https://imslp.org/imslpscripts/API.ISCR/getfileinfo.php`

2. **Spotify Web API**
   - Grabaciones de obras
   - Requiere autenticación OAuth
   - Endpoint: `https://api.spotify.com/v1/`

3. **YouTube Data API**
   - Videos de interpretaciones
   - Requiere API key
   - Endpoint: `https://www.googleapis.com/youtube/v3/`

4. **Open Sheet Music Display**
   - Renderizado de partituras MusicXML
   - Librería JavaScript: `https://github.com/opensheetmusicdisplay/opensheetmusicdisplay`

### Funcionalidades Adicionales

1. **Sistema de Cache**
   - Almacenar resultados de APIs
   - Reducir llamadas repetidas
   - Mejorar rendimiento

2. **Búsqueda Avanzada**
   - Búsqueda por período histórico
   - Búsqueda por instrumento
   - Búsqueda por forma musical

3. **Integración con Partituras**
   - Visualización de partituras
   - Descarga de PDFs
   - Reproducción MIDI

4. **Sistema de Recomendaciones**
   - Sugerir obras basadas en nivel
   - Recomendaciones por período
   - Obras relacionadas

---

## 📝 Notas Técnicas

### Manejo de Errores

Todas las llamadas a APIs incluyen manejo de errores:

```typescript
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
} catch (error) {
  console.error('Error fetching data:', error);
  return null;
}
```

### Optimización de Rendimiento

1. **Lazy Loading**: Los componentes de APIs solo se cargan cuando se necesitan
2. **Debounce**: Búsquedas con debounce para evitar llamadas excesivas
3. **Cache**: Resultados cacheados en memoria para búsquedas repetidas

### Seguridad

- No se almacenan API keys (todas las APIs son públicas)
- Validación de inputs para prevenir inyección
- Sanitización de datos recibidos

---

## 📞 Soporte

Para más información sobre las APIs:
- **MusicBrainz**: https://musicbrainz.org/doc/Development
- **Wikipedia**: https://www.mediawiki.org/wiki/API:Main_page

Para problemas técnicos del proyecto, consultar la documentación de React y TypeScript.
