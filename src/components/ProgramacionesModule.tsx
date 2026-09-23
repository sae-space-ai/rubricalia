import { useState } from 'react';
import { PROGRAMACIONES_VIGENTES, ProgramacionMateria } from '../data/programaciones';

export default function ProgramacionesModule() {
  const [filtroTipo, setFiltroTipo] = useState<string>('todas');
  const [filtroEtapa, setFiltroEtapa] = useState<string>('todas');
  const [materiaSeleccionada, setMateriaSeleccionada] = useState<ProgramacionMateria | null>(null);

  const programacionesFiltradas = PROGRAMACIONES_VIGENTES.filter(prog => {
    const coincideTipo = filtroTipo === 'todas' || prog.tipo === filtroTipo;
    const coincideEtapa = filtroEtapa === 'todas' || prog.etapa === filtroEtapa || prog.etapa === 'ambas';
    return coincideTipo && coincideEtapa;
  });

  const tipos = [
    { id: 'todas', nombre: 'Todas', icono: '📋' },
    { id: 'instrumento', nombre: 'Instrumento', icono: '🎵' },
    { id: 'colectiva', nombre: 'Colectivas', icono: '🎻' },
    { id: 'teorica', nombre: 'Teóricas', icono: '📖' },
    { id: 'complementaria', nombre: 'Complementarias', icono: '🎤' }
  ];

  const etapas = [
    { id: 'todas', nombre: 'Todas las etapas' },
    { id: 'EE', nombre: 'Enseñanzas Elementales' },
    { id: 'EP', nombre: 'Enseñanzas Profesionales' }
  ];

  if (materiaSeleccionada) {
    return (
      <DetalleProgramacion
        programacion={materiaSeleccionada}
        onVolver={() => setMateriaSeleccionada(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-2">📚 Programaciones Vigentes y Veraces</h2>
        <p className="text-blue-100">
          Explora todas las programaciones didácticas de las especialidades y materias
        </p>
        <div className="mt-4 flex gap-4 text-sm">
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <div className="text-2xl font-bold">{PROGRAMACIONES_VIGENTES.length}</div>
            <div className="text-xs">Materias</div>
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <div className="text-2xl font-bold">
              {PROGRAMACIONES_VIGENTES.filter(p => p.estado === 'VERIFIED').length}
            </div>
            <div className="text-xs">Verificadas</div>
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <div className="text-2xl font-bold">
              {new Set(PROGRAMACIONES_VIGENTES.flatMap(p => p.cursos)).size}
            </div>
            <div className="text-xs">Cursos</div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Filtro por tipo */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Tipo de Materia
            </label>
            <div className="flex flex-wrap gap-2">
              {tipos.map(tipo => (
                <button
                  key={tipo.id}
                  onClick={() => setFiltroTipo(tipo.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filtroTipo === tipo.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tipo.icono} {tipo.nombre}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro por etapa */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Etapa Educativa
            </label>
            <div className="flex flex-wrap gap-2">
              {etapas.map(etapa => (
                <button
                  key={etapa.id}
                  onClick={() => setFiltroEtapa(etapa.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filtroEtapa === etapa.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {etapa.nombre}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Programaciones */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {programacionesFiltradas.map(prog => (
          <button
            key={prog.id}
            onClick={() => setMateriaSeleccionada(prog)}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 text-left hover:shadow-lg hover:border-blue-300 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-4xl">{prog.icono}</div>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                prog.estado === 'VERIFIED' ? 'bg-green-100 text-green-800' :
                prog.estado === 'PARTIAL' ? 'bg-amber-100 text-amber-800' :
                'bg-slate-100 text-slate-800'
              }`}>
                {prog.estado === 'VERIFIED' ? '✓ Verificada' :
                 prog.estado === 'PARTIAL' ? '⚠ Parcial' : '⏳ Pendiente'}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 mb-2">{prog.nombre}</h3>
            <p className="text-sm text-slate-600 mb-3 line-clamp-2">{prog.descripcion}</p>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Tipo:</span>
                <span className="text-slate-600 capitalize">{prog.tipo}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Etapa:</span>
                <span className="text-slate-600">
                  {prog.etapa === 'EE' ? 'Elementales' :
                   prog.etapa === 'EP' ? 'Profesionales' : 'Ambas'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Cursos:</span>
                <span className="text-slate-600">{prog.cursos.length} cursos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Objetivos:</span>
                <span className="text-slate-600">{prog.objetivos.length}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <span className="text-blue-600 text-sm font-medium hover:text-blue-700">
                Ver programación completa →
              </span>
            </div>
          </button>
        ))}
      </div>

      {programacionesFiltradas.length === 0 && (
        <div className="bg-slate-50 rounded-xl p-8 text-center">
          <p className="text-slate-500">No hay programaciones que coincidan con los filtros seleccionados</p>
        </div>
      )}
    </div>
  );
}

// Componente para mostrar el detalle de una programación
function DetalleProgramacion({ programacion, onVolver }: { programacion: ProgramacionMateria; onVolver: () => void }) {
  const [tabActiva, setTabActiva] = useState<'objetivos' | 'contenidos' | 'metodologia' | 'evaluacion' | 'normativa'>('objetivos');

  const tabs = [
    { id: 'objetivos', nombre: 'Objetivos', icono: '🎯' },
    { id: 'contenidos', nombre: 'Contenidos', icono: '📚' },
    { id: 'metodologia', nombre: 'Metodología', icono: '📝' },
    { id: 'evaluacion', nombre: 'Evaluación', icono: '✅' },
    { id: 'normativa', nombre: 'Normativa', icono: '📜' }
  ];

  return (
    <div className="space-y-6">
      {/* Botón volver */}
      <button
        onClick={onVolver}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
      >
        ← Volver a todas las programaciones
      </button>

      {/* Header de la materia */}
      <div className={`bg-gradient-to-r from-${programacion.color}-600 to-${programacion.color}-700 text-white rounded-xl p-6`}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-5xl">{programacion.icono}</span>
              <div>
                <h2 className="text-3xl font-bold">{programacion.nombre}</h2>
                <p className="text-white/80 capitalize">{programacion.tipo} • {
                  programacion.etapa === 'EE' ? 'Enseñanzas Elementales' :
                  programacion.etapa === 'EP' ? 'Enseñanzas Profesionales' : 'Ambas etapas'
                }</p>
              </div>
            </div>
            <p className="text-white/90 mt-2">{programacion.descripcion}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
            programacion.estado === 'VERIFIED' ? 'bg-green-500 text-white' :
            programacion.estado === 'PARTIAL' ? 'bg-amber-500 text-white' :
            'bg-slate-500 text-white'
          }`}>
            {programacion.estado === 'VERIFIED' ? '✓ Verificada' :
             programacion.estado === 'PARTIAL' ? '⚠ Parcial' : '⏳ Pendiente'}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-2xl font-bold">{programacion.cursos.length}</div>
            <div className="text-xs">Cursos</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-2xl font-bold">{programacion.objetivos.length}</div>
            <div className="text-xs">Objetivos</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-2xl font-bold">{programacion.metodologia.length}</div>
            <div className="text-xs">Métodos</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-2xl font-bold">{programacion.normativa.length}</div>
            <div className="text-xs">Normas</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="border-b border-slate-200">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setTabActiva(tab.id as any)}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  tabActiva === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.icono} {tab.nombre}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Tab: Objetivos */}
          {tabActiva === 'objetivos' && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Objetivos de Aprendizaje</h3>
              <div className="space-y-2">
                {programacion.objetivos.map((obj, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </span>
                    <p className="text-slate-700 text-sm pt-1">{obj}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Contenidos */}
          {tabActiva === 'contenidos' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Contenidos por Curso</h3>
              {Object.entries(programacion.contenidos).map(([curso, contenidos]) => (
                <div key={curso} className="border border-slate-200 rounded-lg p-4">
                  <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-sm">{curso}</span>
                  </h4>
                  <ul className="space-y-2">
                    {contenidos.map((contenido, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span>{contenido}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Tab: Metodología */}
          {tabActiva === 'metodologia' && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Metodología</h3>
              <div className="space-y-2">
                {programacion.metodologia.map((metodo, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </span>
                    <p className="text-slate-700 text-sm pt-1">{metodo}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Evaluación */}
          {tabActiva === 'evaluacion' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Instrumentos de Evaluación</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {programacion.evaluacion.instrumentos.map((inst, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <span className="text-blue-600">✓</span>
                      <span className="text-sm text-slate-700">{inst}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Criterios de Evaluación</h3>
                <div className="space-y-2">
                  {programacion.evaluacion.criterios.map((crit, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                      <span className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold text-sm">
                        {i + 1}
                      </span>
                      <p className="text-slate-700 text-sm pt-1">{crit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab: Normativa */}
          {tabActiva === 'normativa' && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Marco Normativo</h3>
              <div className="space-y-2">
                {programacion.normativa.map((norma, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <span className="text-amber-600 text-lg">📜</span>
                    <p className="text-slate-700 text-sm pt-0.5">{norma}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
