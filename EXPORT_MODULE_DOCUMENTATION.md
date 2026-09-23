# Documentación del Módulo de Exportación

## 📥 Overview

El módulo de exportación permite descargar la Programación Didáctica en múltiples formatos, facilitando su distribución, impresión y edición.

## 🎯 Características

### Formatos Soportados

1. **PDF** - Documento portable con estilos profesionales
2. **Excel (XLSX)** - Hojas de cálculo con múltiples pestañas
3. **Word (DOCX)** - Documento editable de Microsoft Word
4. **ODT** - OpenDocument para LibreOffice/OpenOffice
5. **HTML** - Página web con estilos CSS integrados

### Contenido Exportable

- ✅ **Documento Completo** (30 apartados)
- ✅ **60 Unidades Didácticas** (tabla resumen)
- ✅ **Rúbricas de Evaluación** (por asignatura)

## 🏗️ Arquitectura

### Archivos Principales

```
src/
├── services/
│   └── exportService.ts       # Lógica de exportación
└── components/
    └── ExportModule.tsx        # Componente UI
```

### Dependencias

```json
{
  "xlsx": "^0.18.5",              // Excel
  "jspdf": "^2.5.1",              // PDF
  "jspdf-autotable": "^3.8.0",    // Tablas PDF
  "docx": "^8.5.0",               // Word
  "file-saver": "^2.0.5",         // Descargas
  "@types/file-saver": "^2.0.7"   // Tipos TypeScript
}
```

## 🔧 Implementación

### exportService.ts

Servicio que maneja la lógica de exportación para cada formato.

#### Función Principal

```typescript
export async function exportDocument(options: ExportOptions): Promise<void>
```

**Parámetros:**
- `format`: Formato de exportación ('xlsx' | 'pdf' | 'docx' | 'odt' | 'html')
- `includeDocument`: Incluir documento completo (30 apartados)
- `includeUnits`: Incluir unidades didácticas
- `includeRubrics`: Incluir rúbricas
- `subject`: Asignatura para rúbricas (opcional)

#### Funciones por Formato

##### exportToXLSX()
- Crea un archivo Excel con múltiples hojas
- Cada apartado del documento en una hoja separada
- Tabla de unidades didácticas
- Tabla de rúbricas (si se selecciona)
- Columnas con anchos optimizados

##### exportToPDF()
- Genera documento PDF con jsPDF
- Estilos profesionales con colores
- Tablas formateadas con autoTable
- Paginación automática
- Jerarquía de títulos

##### exportToDOCX()
- Crea documento Word con la librería docx
- Estilos de títulos y subtítulos
- Tablas formateadas
- Compatible con todas las versiones de Word

##### exportToODT()
- Genera archivo HTML compatible con ODT
- Se puede abrir en LibreOffice/OpenOffice
- Mantiene formato y estilos

##### exportToHTML()
- Página web completa con CSS inline
- Responsive y accesible
- Fácil de compartir y publicar

### ExportModule.tsx

Componente React que proporciona la interfaz de usuario.

#### Estado

```typescript
{
  isOpen: boolean;              // Modal abierto/cerrado
  format: ExportFormat;         // Formato seleccionado
  includeDocument: boolean;     // Incluir documento
  includeUnits: boolean;        // Incluir unidades
  includeRubrics: boolean;      // Incluir rúbricas
  selectedSubject: string;      // Asignatura para rúbricas
  exporting: boolean;           // Estado de exportación
}
```

#### UI

- **Botón flotante** en esquina inferior derecha
- **Modal** con opciones de configuración
- **Selector de formato** con iconos y descripciones
- **Checkboxes** para contenido a incluir
- **Selector de asignatura** para rúbricas
- **Resumen** de exportación
- **Indicador de progreso** durante exportación

## 📋 Ejemplos de Uso

### Exportar Documento Completo en PDF

```typescript
await exportDocument({
  format: 'pdf',
  includeDocument: true,
  includeUnits: false,
  includeRubrics: false
});
```

### Exportar Rúbricas en Excel

```typescript
await exportDocument({
  format: 'xlsx',
  includeDocument: false,
  includeUnits: false,
  includeRubrics: true,
  subject: 'camara'
});
```

### Exportar Todo en Word

```typescript
await exportDocument({
  format: 'docx',
  includeDocument: true,
  includeUnits: true,
  includeRubrics: true,
  subject: 'orquesta'
});
```

## 🎨 Personalización

### Colores PDF

```typescript
// Títulos principales
doc.setTextColor(30, 64, 175); // Azul oscuro

// Encabezados de tabla
headStyles: { fillColor: [59, 130, 246] } // Azul

// Rúbricas
headStyles: { fillColor: [16, 185, 129] } // Verde
```

### Estilos Word

```typescript
// Títulos
heading: HeadingLevel.HEADING_1
heading: HeadingLevel.HEADING_2

// Alineación
alignment: 'center'
```

### Estilos HTML

```css
h1 { color: #1e40af; border-bottom: 3px solid #1e40af; }
h2 { color: #1e3a8a; border-bottom: 2px solid #3b82f6; }
th { background-color: #dbeafe; }
```

## ⚡ Optimizaciones

### Manejo de Errores

```typescript
try {
  await exportDocument(options);
} catch (error) {
  console.error('Error exporting:', error);
  alert('Error al exportar. Por favor, inténtalo de nuevo.');
}
```

### Generación Asíncrona

- Todas las funciones de exportación son `async`
- No bloquean la interfaz de usuario
- Indicador de progreso durante la exportación

### Optimización de Memoria

- Generación por partes para documentos grandes
- Limpieza de referencias después de la exportación
- Uso de streams cuando es posible

## 🔍 Troubleshooting

### Problema: PDF muy grande

**Solución:**
- Reducir el contenido a exportar
- Exportar solo secciones específicas
- Comprimir imágenes si las hay

### Problema: Excel lento al abrir

**Solución:**
- Reducir número de hojas
- Simplificar formato de celdas
- Exportar solo datos necesarios

### Problema: Word sin estilos

**Solución:**
- Verificar que la librería docx esté instalada
- Revisar configuración de estilos
- Actualizar a la última versión de la librería

## 🚀 Mejoras Futuras

### Funcionalidades Planificadas

1. **Exportación Selectiva**
   - Seleccionar apartados específicos
   - Exportar solo unidades de un curso
   - Filtrar rúbricas por criterio

2. **Personalización de Estilos**
   - Selector de colores
   - Configuración de fuentes
   - Plantillas predefinidas

3. **Exportación por Lotes**
   - Generar múltiples archivos
   - Combinar formatos
   - Programación automática

4. **Integración con Nube**
   - Guardar en Google Drive
   - Subir a Dropbox
   - Compartir por email

5. **Vista Previa**
   - Preview antes de exportar
   - Edición de contenido
   - Ajuste de formato

## 📚 Recursos

### Documentación de Librerías

- **SheetJS (XLSX)**: https://docs.sheetjs.com/
- **jsPDF**: https://rawgit.com/MrRio/jsPDF/master/docs/
- **docx**: https://docx.js.org/
- **file-saver**: https://github.com/eligrey/FileSaver.js/

### Ejemplos de Código

- **jsPDF + autoTable**: https://simonbengtsson.github.io/jsPDF-AutoTable/
- **docx examples**: https://github.com/dolanmiu/docx/tree/master/demo

## 📞 Soporte

Para problemas o sugerencias:
- Revisar la documentación de las librerías
- Consultar los ejemplos de código
- Verificar la consola del navegador para errores

---

**Versión**: 1.0.0  
**Última actualización**: 2024  
**Autor**: Prof. Manuel Gago Fernández
