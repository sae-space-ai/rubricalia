import { useState } from 'react';
import { exportDocument, ExportFormat } from '../services/exportService';
import { ASIGNATURA_INFO, AsignaturaColectiva } from '../data';

export default function ExportModule() {
  const [isOpen, setIsOpen] = useState(false);
  const [format, setFormat] = useState<ExportFormat>('pdf');
  const [includeDocument, setIncludeDocument] = useState(true);
  const [includeUnits, setIncludeUnits] = useState(true);
  const [includeRubrics, setIncludeRubrics] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<AsignaturaColectiva>('camara');
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportDocument({
        format,
        includeDocument,
        includeUnits,
        includeRubrics,
        subject: includeRubrics ? selectedSubject : undefined
      });
    } catch (error) {
      console.error('Error exporting:', error);
      alert('Error al exportar. Por favor, inténtalo de nuevo.');
    }
    setExporting(false);
  };

  const formatOptions: { value: ExportFormat; label: string; icon: string; description: string }[] = [
    { value: 'pdf', label: 'PDF', icon: '📄', description: 'Documento portable, ideal para impresión' },
    { value: 'xlsx', label: 'Excel', icon: '📊', description: 'Hojas de cálculo con múltiples pestañas' },
    { value: 'docx', label: 'Word', icon: '📝', description: 'Documento editable de Microsoft Word' },
    { value: 'odt', label: 'ODT', icon: '📃', description: 'OpenDocument para LibreOffice' },
    { value: 'html', label: 'HTML', icon: '🌐', description: 'Página web con estilos' }
  ];

  const subjectOptions = Object.entries(ASIGNATURA_INFO).map(([key, info]) => ({
    value: key as AsignaturaColectiva,
    label: info.nombre
  }));

  return (
    <>
      {/* Botón de exportación */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 z-40 print:hidden"
      >
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span className="font-semibold">Exportar</span>
        </span>
      </button>

      {/* Modal de exportación */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 print:hidden">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Exportar Documentación</h2>
                  <p className="text-blue-100 text-sm mt-1">Selecciona el formato y contenido a exportar</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Selección de formato */}
              <div>
                <h3 className="font-bold text-slate-800 mb-3">Formato de Exportación</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {formatOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setFormat(option.value)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        format === option.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <div className="font-semibold text-slate-800">{option.label}</div>
                      <div className="text-xs text-slate-600 mt-1">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contenido a exportar */}
              <div>
                <h3 className="font-bold text-slate-800 mb-3">Contenido a Incluir</h3>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                    <input
                      type="checkbox"
                      checked={includeDocument}
                      onChange={(e) => setIncludeDocument(e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 rounded"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800">Documento Completo (30 Apartados)</div>
                      <div className="text-xs text-slate-600 mt-1">
                        Identificación, Marco Normativo, Finalidades, Principios, Competencias, Objetivos, Contenidos, Metodología, Actividades, Unidades, Secuenciación, Repertorio, Evaluación, Criterios, Instrumentos, Evidencias, Calificación, Recuperación, Atención a Diversidad, Recursos, Coordinación, Actividades Complementarias, Evaluación Programación, Trazabilidad, Rúbricas, Anexos, Control Calidad, Fuentes, Pendientes
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                    <input
                      type="checkbox"
                      checked={includeUnits}
                      onChange={(e) => setIncludeUnits(e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 rounded"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800">60 Unidades Didácticas</div>
                      <div className="text-xs text-slate-600 mt-1">
                        Tabla con todas las unidades: EE1-EE4 (24 UD) y EP1-EP6 (36 UD)
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                    <input
                      type="checkbox"
                      checked={includeRubrics}
                      onChange={(e) => setIncludeRubrics(e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 rounded"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800">Rúbricas de Evaluación</div>
                      <div className="text-xs text-slate-600 mt-1">
                        Rúbricas completas con 4 niveles para asignaturas colectivas
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Selección de asignatura para rúbricas */}
              {includeRubrics && (
                <div>
                  <h3 className="font-bold text-slate-800 mb-3">Asignatura para Rúbricas</h3>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value as AsignaturaColectiva)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {subjectOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Resumen */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Resumen de Exportación</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>✓ Formato: <strong>{formatOptions.find(f => f.value === format)?.label}</strong></li>
                  {includeDocument && <li>✓ Documento completo (30 apartados)</li>}
                  {includeUnits && <li>✓ 60 Unidades Didácticas</li>}
                  {includeRubrics && <li>✓ Rúbricas de {ASIGNATURA_INFO[selectedSubject].nombre}</li>}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 p-6 rounded-b-2xl">
              <div className="flex gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleExport}
                  disabled={exporting || (!includeDocument && !includeUnits && !includeRubrics)}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {exporting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Exportando...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Exportar
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
