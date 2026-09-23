import { useState } from 'react';
import { RUBRICAS_TECNICAS, getRubricasAsignaturaConsolidadas, getNombreCriterio, getEstadisticasRubricas } from '../data/rubricas-completas';

export default function RubricasModule() {
  const [vista, setVista] = useState<'tecnicas' | 'asignaturas'>('tecnicas');
  const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState<string>('camara');
  const [rubricaExpandida, setRubricaExpandida] = useState<string | null>(null);
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');

  const estadisticas = getEstadisticasRubricas();

  const rubricasAsignatura = getRubricasAsignaturaConsolidadas(asignaturaSeleccionada);

  const rubricasTecnicasFiltradas = filtroCategoria === 'todas'
    ? RUBRICAS_TECNICAS
    : RUBRICAS_TECNICAS.filter(r => r.categoria === filtroCategoria);

  const categorias = [
    { id: 'todas', nombre: 'Todas', icono: '📋' },
    { id: 'tecnica', nombre: 'Técnica', icono: '🎯' },
    { id: 'musical', nombre: 'Musical', icono: '🎵' },
    { id: 'interpretativa', nombre: 'Interpretativa', icono: '🎭' },
    { id: 'autonomia', nombre: 'Autonomía', icono: '🚀' }
  ];

  const asignaturas = [
    { id: 'camara', nombre: 'Música de Cámara', icono: '🎻', color: 'purple' },
    { id: 'banda', nombre: 'Banda', icono: '🎺', color: 'blue' },
    { id: 'orquesta', nombre: 'Orquesta', icono: '🎼', color: 'emerald' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-2">📊 Módulo de Rúbricas</h2>
        <p className="text-purple-100">
          Sistema completo de rúbricas de evaluación con 4 niveles de logro
        </p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-2xl font-bold">{estadisticas.totalGeneral}</div>
            <div className="text-xs">Total Rúbricas</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-2xl font-bold">{estadisticas.totalRubricasTecnicas}</div>
            <div className="text-xs">Técnicas</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-2xl font-bold">{estadisticas.totalRubricasCamara}</div>
            <div className="text-xs">Cámara</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-2xl font-bold">{estadisticas.totalRubricasBanda}</div>
            <div className="text-xs">Banda</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-2xl font-bold">{estadisticas.totalRubricasOrquesta}</div>
            <div className="text-xs">Orquesta</div>
          </div>
        </div>
      </div>

      {/* Selector de Vista */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="flex gap-3">
          <button
            onClick={() => setVista('tecnicas')}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
              vista === 'tecnicas'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🎯 Rúbricas Técnicas (19)
          </button>
          <button
            onClick={() => setVista('asignaturas')}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
              vista === 'asignaturas'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            🎼 Rúbricas por Asignatura
          </button>
        </div>
      </div>

      {/* Vista: Rúbricas Técnicas */}
      {vista === 'tecnicas' && (
        <div className="space-y-4">
          {/* Filtros por categoría */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Filtrar por Categoría</h3>
            <div className="flex flex-wrap gap-2">
              {categorias.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFiltroCategoria(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filtroCategoria === cat.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.icono} {cat.nombre}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de Rúbricas Técnicas */}
          <div className="space-y-3">
            {rubricasTecnicasFiltradas.map(rubrica => (
              <div
                key={rubrica.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setRubricaExpandida(rubricaExpandida === rubrica.id ? null : rubrica.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">
                      {rubrica.categoria === 'tecnica' ? '🎯' :
                       rubrica.categoria === 'musical' ? '🎵' :
                       rubrica.categoria === 'interpretativa' ? '🎭' : '🚀'}
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-slate-900">{rubrica.dimension}</h3>
                      <p className="text-sm text-slate-600">{rubrica.descripcion}</p>
                      <p className="text-xs text-slate-500 mt-1">{rubrica.codigo}</p>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      rubricaExpandida === rubrica.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {rubricaExpandida === rubrica.id && (
                  <div className="px-6 pb-6 border-t border-slate-100">
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      {/* Nivel 1 - Inicial */}
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">🔴</span>
                          <h4 className="font-bold text-red-800">Nivel 1: Inicial</h4>
                        </div>
                        <p className="text-sm text-red-700">{rubrica.L1}</p>
                      </div>

                      {/* Nivel 2 - En desarrollo */}
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">🟡</span>
                          <h4 className="font-bold text-amber-800">Nivel 2: En desarrollo</h4>
                        </div>
                        <p className="text-sm text-amber-700">{rubrica.L2}</p>
                      </div>

                      {/* Nivel 3 - Adecuado */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">🔵</span>
                          <h4 className="font-bold text-blue-800">Nivel 3: Adecuado</h4>
                        </div>
                        <p className="text-sm text-blue-700">{rubrica.L3}</p>
                      </div>

                      {/* Nivel 4 - Consolidado */}
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">🟢</span>
                          <h4 className="font-bold text-green-800">Nivel 4: Consolidado</h4>
                        </div>
                        <p className="text-sm text-green-700">{rubrica.L4}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vista: Rúbricas por Asignatura */}
      {vista === 'asignaturas' && (
        <div className="space-y-4">
          {/* Selector de Asignatura */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Seleccionar Asignatura</h3>
            <div className="grid md:grid-cols-3 gap-3">
              {asignaturas.map(asig => (
                <button
                  key={asig.id}
                  onClick={() => setAsignaturaSeleccionada(asig.id)}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    asignaturaSeleccionada === asig.id
                      ? `bg-${asig.color}-600 text-white`
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {asig.icono} {asig.nombre}
                </button>
              ))}
            </div>
          </div>

          {/* Rúbricas de la Asignatura */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="font-bold text-slate-900">
                {asignaturas.find(a => a.id === asignaturaSeleccionada)?.nombre} - Rúbricas por Criterio y Curso
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                {rubricasAsignatura.length} rúbricas disponibles
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-100 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Criterio</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Curso</th>
                    <th className="px-4 py-3 text-left font-semibold text-red-700">Nivel 1</th>
                    <th className="px-4 py-3 text-left font-semibold text-amber-700">Nivel 2</th>
                    <th className="px-4 py-3 text-left font-semibold text-blue-700">Nivel 3</th>
                    <th className="px-4 py-3 text-left font-semibold text-green-700">Nivel 4</th>
                  </tr>
                </thead>
                <tbody>
                  {rubricasAsignatura.map((rubrica, index) => (
                    <tr key={rubrica.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-4 py-3 border-t border-slate-100">
                        <div className="font-semibold text-slate-900">{rubrica.criterio}</div>
                        <div className="text-xs text-slate-600">{getNombreCriterio(rubrica.criterio)}</div>
                      </td>
                      <td className="px-4 py-3 border-t border-slate-100">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">
                          {rubrica.curso}º
                        </span>
                      </td>
                      <td className="px-4 py-3 border-t border-slate-100 text-xs text-slate-700 max-w-xs">
                        {rubrica.L1}
                      </td>
                      <td className="px-4 py-3 border-t border-slate-100 text-xs text-slate-700 max-w-xs">
                        {rubrica.L2}
                      </td>
                      <td className="px-4 py-3 border-t border-slate-100 text-xs text-slate-700 max-w-xs">
                        {rubrica.L3}
                      </td>
                      <td className="px-4 py-3 border-t border-slate-100 text-xs text-slate-700 max-w-xs">
                        {rubrica.L4}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Información del Sistema de Niveles */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-bold text-slate-900 mb-4">📊 Sistema de Niveles de Logro</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🔴</span>
              <h4 className="font-bold text-red-800">Nivel 1: Inicial</h4>
            </div>
            <p className="text-sm text-red-700">
              El estudiante no alcanza los requisitos mínimos. Requiere intervención constante y apoyo significativo.
            </p>
            <p className="text-xs text-red-600 mt-2 font-medium">Calificación: Insuficiente (1-4)</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🟡</span>
              <h4 className="font-bold text-amber-800">Nivel 2: En desarrollo</h4>
            </div>
            <p className="text-sm text-amber-700">
              El estudiante muestra progreso pero necesita apoyo frecuente. Alcanza parcialmente los requisitos.
            </p>
            <p className="text-xs text-amber-600 mt-2 font-medium">Calificación: Suficiente (5-6)</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🔵</span>
              <h4 className="font-bold text-blue-800">Nivel 3: Adecuado</h4>
            </div>
            <p className="text-sm text-blue-700">
              El estudiante cumple con los requisitos de forma autónoma en situaciones habituales.
            </p>
            <p className="text-xs text-blue-600 mt-2 font-medium">Calificación: Notable (7-8)</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🟢</span>
              <h4 className="font-bold text-green-800">Nivel 4: Consolidado</h4>
            </div>
            <p className="text-sm text-green-700">
              El estudiante domina los requisitos con excelencia y los aplica de forma creativa en contextos diversos.
            </p>
            <p className="text-xs text-green-600 mt-2 font-medium">Calificación: Sobresaliente (9-10)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
