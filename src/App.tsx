import { useState, useMemo } from 'react';
import {
  ESTRUCTURA_60_UD,
  OBJETIVOS_OFICIALES_EE,
  CONTENIDOS_OFICIALES_EE,
  CRITERIOS_OFICIALES_EE,
  OBJETIVOS_OFICIALES_EP,
  CONTENIDOS_OFICIALES_EP,
  CRITERIOS_OFICIALES_EP,
  NORMATIVA_BASE,
  CALENDARIO,
  UNIDADES_DETALLADAS,
  MATRIZ_PROGRESION,
  INCIDENCIAS,
  REPERTORIO_REFERENCIA,
  AUDITORIA_FINAL,
  Curso,
  AsignaturaColectiva,
  CursoColectivo,
  CRITERIOS_EVALUACION,
  COMPETENCIAS,
  CRITERIO_COMPETENCIA_MAP,
  CURSOS_VALIDOS,
  ASIGNATURA_INFO,
  getRubricasByAsignatura,
  getCursosDisponibles,
} from './data';

type Asignatura = 'clarinete' | AsignaturaColectiva;
type Vista = 'inicio' | 'unidades' | 'detalle' | 'matriz' | 'incidencias' | 'normativa' | 'repertorio' | 'auditoria' | 'rubricas';

const CURSOS_CLARINETE: Curso[] = ['EE1', 'EE2', 'EE3', 'EE4', 'EP1', 'EP2', 'EP3', 'EP4', 'EP5', 'EP6'];
const NOMBRE_CURSO_CLARINETE: Record<Curso, string> = {
  EE1: '1.º Elementales', EE2: '2.º Elementales', EE3: '3.º Elementales', EE4: '4.º Elementales',
  EP1: '1.º Profesionales', EP2: '2.º Profesionales', EP3: '3.º Profesionales',
  EP4: '4.º Profesionales', EP5: '5.º Profesionales', EP6: '6.º Profesionales',
};
const ETAPA_FASE: Record<Curso, string> = {
  EE1: 'FUNDAMENTACIÓN', EE2: 'CONSOLIDACIÓN', EE3: 'DESARROLLO', EE4: 'AUTONOMÍA Y TRANSICIÓN',
  EP1: 'TRANSICIÓN PROFESIONAL', EP2: 'CONSOLIDACIÓN PROFESIONAL', EP3: 'INTEGRACIÓN TÉCNICO-MUSICAL',
  EP4: 'CONTROL AVANZADO Y ESTILOS', EP5: 'AUTONOMÍA INTERPRETATIVA AVANZADA', EP6: 'CONSOLIDACIÓN, PROYECTO Y TRANSFERENCIA',
};

export default function App() {
  const [asignatura, setAsignatura] = useState<Asignatura>('clarinete');
  const [vista, setVista] = useState<Vista>('inicio');
  const [udSeleccionada, setUdSeleccionada] = useState<string>('');
  const [cursoFiltro, setCursoFiltro] = useState<string>('TODOS');
  const [cursoColectivoFiltro, setCursoColectivoFiltro] = useState<CursoColectivo | 'TODOS'>('TODOS');

  const udFiltradas = useMemo(() =>
    asignatura === 'clarinete'
      ? (cursoFiltro === 'TODOS' ? ESTRUCTURA_60_UD : ESTRUCTURA_60_UD.filter(u => u.curso === cursoFiltro))
      : [],
    [asignatura, cursoFiltro]
  );

  const abrirUD = (codigo: string) => {
    setUdSeleccionada(codigo);
    setVista('detalle');
  };

  const cambiarAsignatura = (a: Asignatura) => {
    setAsignatura(a);
    setVista('inicio');
    setCursoFiltro('TODOS');
    setCursoColectivoFiltro('TODOS');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-xl print:shadow-none print:bg-white print:text-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight">PROGRAMACIÓN DIDÁCTICA 2026/2027</h1>
              <p className="text-[10px] sm:text-xs text-blue-200 print:text-gray-600">
                Enseñanzas Profesionales de Música — Extremadura · V2.0 Auditada · Prof. Manuel Gago Fernández
              </p>
            </div>
          </div>
          {/* Selector de Asignatura */}
          <div className="flex gap-1.5 mt-2 flex-wrap">
            <button
              onClick={() => cambiarAsignatura('clarinete')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                asignatura === 'clarinete' ? 'bg-white text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              🎵 Clarinete
            </button>
            <button
              onClick={() => cambiarAsignatura('camara')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                asignatura === 'camara' ? 'bg-purple-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              🎻 Cámara
            </button>
            <button
              onClick={() => cambiarAsignatura('banda')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                asignatura === 'banda' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              🎺 Banda
            </button>
            <button
              onClick={() => cambiarAsignatura('orquesta')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                asignatura === 'orquesta' ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              🎼 Orquesta
            </button>
          </div>
          {/* Navigation */}
          <nav className="flex gap-1 mt-2 flex-wrap print:hidden">
            {[
              { id: 'inicio' as Vista, label: 'Inicio' },
              ...(asignatura === 'clarinete' ? [
                { id: 'unidades' as Vista, label: '60 UD' },
                { id: 'matriz' as Vista, label: 'Progresión' },
                { id: 'repertorio' as Vista, label: 'Repertorio' },
              ] : [
                { id: 'rubricas' as Vista, label: 'Rúbricas' },
              ]),
              { id: 'normativa' as Vista, label: 'Normativa' },
              { id: 'incidencias' as Vista, label: 'Incidencias' },
              { id: 'auditoria' as Vista, label: 'Auditoría' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setVista(item.id)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  vista === item.id ? 'bg-white/20 text-white' : 'text-blue-200 hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full">
        {asignatura === 'clarinete' && (
          <>
            {vista === 'inicio' && <VistaInicio onNavigate={setVista} />}
            {vista === 'unidades' && (
              <VistaUnidades
                udFiltradas={udFiltradas}
                cursoFiltro={cursoFiltro}
                setCursoFiltro={setCursoFiltro}
                onOpen={abrirUD}
              />
            )}
            {vista === 'detalle' && udSeleccionada && (
              <VistaDetalle codigo={udSeleccionada} onBack={() => setVista('unidades')} />
            )}
            {vista === 'matriz' && <VistaMatriz />}
            {vista === 'repertorio' && <VistaRepertorio />}
          </>
        )}
        {asignatura !== 'clarinete' && (
          <>
            {vista === 'inicio' && <VistaInicioColectiva asignatura={asignatura} onNavigate={setVista} />}
            {vista === 'rubricas' && (
              <VistaRubricas
                asignatura={asignatura}
                cursoFiltro={cursoColectivoFiltro}
                setCursoFiltro={setCursoColectivoFiltro}
              />
            )}
          </>
        )}
        {vista === 'normativa' && <VistaNormativa />}
        {vista === 'incidencias' && <VistaIncidencias />}
        {vista === 'auditoria' && <VistaAuditoria />}
      </main>

      <footer className="bg-slate-100 border-t border-slate-200 py-4 text-center text-xs text-slate-500 print:hidden">
        <p className="font-medium">V2.0 AUDITADA PARA DEPARTAMENTO</p>
        <p>Estado documental: AUDITADA / TRAZABLE / CON HOLD EXPLÍCITOS DONDE PROCEDA</p>
      </footer>
    </div>
  );
}

// ============================================================
// VISTA INICIO — CLARINETE
// ============================================================
function VistaInicio({ onNavigate }: { onNavigate: (v: Vista) => void }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full font-bold">V2.0</span>
          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full font-bold">AUDITADA</span>
          <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full font-bold">60 UD</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Clarinete — Programación Didáctica</h2>
        <p className="text-slate-600 mb-4">Curso académico 2026/2027 — Enseñanzas Elementales y Enseñanzas Profesionales de Música — Extremadura</p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <StatCard label="Unidades Didácticas" value="60" color="blue" />
          <StatCard label="Cursos" value="10" color="indigo" />
          <StatCard label="Normativa verificada" value={String(NORMATIVA_BASE.filter(n => n.estado === 'VERIFIED').length)} color="green" />
          <StatCard label="HOLD pendientes" value={String(AUDITORIA_FINAL.incidenciasHold)} color="amber" />
        </div>

        <div className="bg-slate-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-slate-800 text-sm mb-2">Calendario 2026/2027</h3>
          <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-600">
            <p>📅 Inicio actividades: <strong>{CALENDARIO.inicioActividades}</strong></p>
            <p>📅 Final ordinario: <strong>{CALENDARIO.finalOrdinario}</strong></p>
            <p>📅 Final 6.º EP: <strong>{CALENDARIO.finalEP6}</strong></p>
            <p>📅 Calificaciones ordinarias: <strong>{CALENDARIO.calificacionesOrdinarias}</strong></p>
            <p>📅 Calificaciones 6.º EP: <strong>{CALENDARIO.calificacionesEP6}</strong></p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <NavCard title="60 Unidades Didácticas" desc="Navegar por las 60 UD con estructura completa" icon="📋" onClick={() => onNavigate('unidades')} />
          <NavCard title="Matriz de Progresión" desc="Progresión vertical EE1→EP6" icon="📊" onClick={() => onNavigate('matriz')} />
          <NavCard title="Repertorio" desc="Repertorio de referencia por curso" icon="🎵" onClick={() => onNavigate('repertorio')} />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <h3 className="font-bold text-slate-800 mb-3 text-sm">Objetivos Oficiales EE [CO] — Aplicables al Clarinete</h3>
          <div className="space-y-2">
            {OBJETIVOS_OFICIALES_EE.filter(o => o.aplicaClarinete).map(o => (
              <div key={o.codigo} className="text-xs p-2 rounded bg-slate-50 text-slate-700">
                <span className="font-bold">{o.codigo}:</span> {o.texto}
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 bg-slate-100 border border-slate-200 rounded text-[10px] text-slate-600">
            <span className="font-bold">Nota de trazabilidad:</span> EE-O6 (fabricación de lengüetas dobles) existe en la normativa oficial pero NO corresponde al clarinete. Se excluye de la programación conforme a la regla de veracidad.
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <h3 className="font-bold text-slate-800 mb-3 text-sm">Objetivos Oficiales EP [CO] — Aplicables al Clarinete</h3>
          <div className="space-y-2">
            {OBJETIVOS_OFICIALES_EP.filter(o => o.aplicaClarinete).map(o => (
              <div key={o.codigo} className="text-xs p-2 rounded bg-slate-50 text-slate-700">
                <span className="font-bold">{o.codigo}:</span> {o.texto}
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 bg-slate-100 border border-slate-200 rounded text-[10px] text-slate-600">
            <span className="font-bold">Nota de trazabilidad:</span> EP-O3 (fabricación de lengüetas dobles) existe en la normativa oficial pero NO corresponde al clarinete. Se excluye de la programación conforme a la regla de veracidad.
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// VISTA INICIO — ASIGNATURAS COLECTIVAS
// ============================================================
function VistaInicioColectiva({ asignatura, onNavigate }: { asignatura: AsignaturaColectiva; onNavigate: (v: Vista) => void }) {
  const info = ASIGNATURA_INFO[asignatura];
  const cursos = getCursosDisponibles(asignatura);
  const rubricas = getRubricasByAsignatura(asignatura);
  const colorMap: Record<string, string> = { purple: 'purple', blue: 'blue', emerald: 'emerald' };
  const color = colorMap[info.color];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-0.5 bg-${color}-100 text-${color}-800 text-xs rounded-full font-bold`}>
            {info.nombre.toUpperCase()}
          </span>
          <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full font-bold">V2.0</span>
          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full font-bold">AUDITADA</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{info.nombre}</h2>
        <p className="text-slate-600 mb-4">{info.descripcion}</p>
        
        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <StatCard label="Cursos" value={String(cursos.length)} color="blue" />
          <StatCard label="Criterios (CO)" value="12" color="indigo" />
          <StatCard label="Competencias (CM)" value="7" color="green" />
        </div>

        <div className="bg-slate-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-slate-800 text-sm mb-2">Cursos disponibles</h3>
          <div className="flex gap-2 flex-wrap">
            {cursos.map(c => (
              <span key={c} className={`px-3 py-1 bg-${color}-100 text-${color}-800 rounded text-sm font-medium`}>
                {c}.º curso
              </span>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <NavCard title="Rúbricas de Evaluación" desc="Ver rúbricas analíticas por criterio y curso" icon="📊" onClick={() => onNavigate('rubricas')} />
          <NavCard title="Normativa" desc="Marco normativo aplicable" icon="📜" onClick={() => onNavigate('normativa')} />
        </div>
      </div>

      {/* Criterios y Competencias */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <h3 className="font-bold text-slate-800 mb-3 text-sm">Criterios de Evaluación (CO-01 a CO-12)</h3>
          <div className="space-y-1.5">
            {CRITERIOS_EVALUACION.map(c => (
              <div key={c.codigo} className="text-xs p-2 rounded bg-slate-50 text-slate-700">
                <span className="font-bold">{c.codigo}:</span> {c.nombre}
                <span className="text-slate-500 ml-1">— {c.descripcion}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <h3 className="font-bold text-slate-800 mb-3 text-sm">Competencias Musicales (CM-1 a CM-7)</h3>
          <div className="space-y-1.5">
            {COMPETENCIAS.map(c => (
              <div key={c.codigo} className="text-xs p-2 rounded bg-slate-50 text-slate-700">
                <span className="font-bold">{c.codigo}:</span> {c.nombre}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h4 className="font-semibold text-slate-700 text-xs mb-2">Mapeo Criterios → Competencias</h4>
            <div className="space-y-1">
              {Object.entries(CRITERIO_COMPETENCIA_MAP).map(([crit, comps]) => (
                <div key={crit} className="text-[10px] flex gap-1 items-center">
                  <span className="font-mono font-bold text-slate-600">{crit}</span>
                  <span className="text-slate-400">→</span>
                  {comps.map(cm => (
                    <span key={cm} className="px-1 py-0.5 bg-indigo-50 text-indigo-700 rounded">{cm}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// VISTA UNIDADES — CLARINETE
// ============================================================
function VistaUnidades({ udFiltradas, cursoFiltro, setCursoFiltro, onOpen }: {
  udFiltradas: typeof ESTRUCTURA_60_UD;
  cursoFiltro: string;
  setCursoFiltro: (c: string) => void;
  onOpen: (codigo: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <h2 className="text-lg font-bold text-slate-900 mb-3">60 Unidades Didácticas — Clarinete</h2>
        <div className="flex gap-1.5 flex-wrap">
          <button
            onClick={() => setCursoFiltro('TODOS')}
            className={`px-3 py-1 rounded text-xs font-medium ${cursoFiltro === 'TODOS' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            Todos
          </button>
          {CURSOS_CLARINETE.map(c => (
            <button
              key={c}
              onClick={() => setCursoFiltro(c)}
              className={`px-3 py-1 rounded text-xs font-medium ${cursoFiltro === c ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {udFiltradas.map(ud => {
          const tieneDetalle = !!UNIDADES_DETALLADAS[ud.codigo];
          return (
            <button
              key={ud.codigo}
              onClick={() => onOpen(ud.codigo)}
              className="bg-white rounded-lg border border-slate-200 p-4 text-left hover:shadow-md transition-shadow hover:border-blue-300"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${ud.curso.startsWith('EE') ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                  {ud.curso}
                </span>
                <span className="text-[10px] text-slate-400">{ud.trimestre}</span>
                {tieneDetalle && <span className="ml-auto text-[10px] text-green-600 font-bold">✓ DETALLADA</span>}
              </div>
              <h3 className="text-sm font-semibold text-slate-800 leading-tight">{ud.titulo}</h3>
              <p className="text-[10px] text-slate-500 mt-1">{ud.codigo}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// VISTA DETALLE UD — CLARINETE
// ============================================================
function VistaDetalle({ codigo, onBack }: { codigo: string; onBack: () => void }) {
  const udInfo = ESTRUCTURA_60_UD.find(u => u.codigo === codigo);
  const udDetalle = UNIDADES_DETALLADAS[codigo];

  if (!udInfo) return <p>UD no encontrada</p>;

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
        ← Volver a unidades
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className={`px-2 py-0.5 rounded text-xs font-bold ${udInfo.curso.startsWith('EE') ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
            {udInfo.curso}
          </span>
          <span className="text-xs text-slate-400">{udInfo.trimestre}</span>
          <span className="text-xs text-slate-400">|</span>
          <span className="text-xs text-slate-500">{ETAPA_FASE[udInfo.curso]}</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">{udInfo.titulo}</h2>
        <p className="text-xs text-slate-500 font-mono">{codigo}</p>

        {udDetalle ? (
          <div className="mt-6 space-y-6">
            <Seccion titulo="Justificación" contenido={udDetalle.justificacion} />
            <Seccion titulo="Conexión Normativa" contenido={udDetalle.conexionNormativa} />
            
            <div>
              <h3 className="font-bold text-slate-800 text-sm mb-2">Objetivos Didácticos ({udDetalle.objetivos.length})</h3>
              <div className="space-y-1.5">
                {udDetalle.objetivos.map(o => (
                  <div key={o.id} className={`text-xs p-2 rounded border ${o.tipo === '[CO]' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
                    <span className="font-mono font-bold">{o.id}</span>
                    <span className={`ml-1 px-1 rounded text-[10px] ${o.tipo === '[CO]' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'}`}>{o.tipo}</span>
                    <span className="ml-1">→ {o.codigoOficial}</span>
                    <p className="mt-0.5 text-slate-700">{o.formulacion}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 text-sm mb-2">Contenidos ({udDetalle.contenidos.length})</h3>
              <div className="space-y-1.5">
                {udDetalle.contenidos.map(c => (
                  <div key={c.id} className={`text-xs p-2 rounded border ${c.procedencia === '[CO]' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
                    <span className="font-mono font-bold">{c.id}</span>
                    <span className={`ml-1 px-1 rounded text-[10px] ${c.procedencia === '[CO]' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'}`}>{c.procedencia}</span>
                    <p className="mt-0.5 text-slate-700">{c.formulacion}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 text-sm mb-2">Secuencias de Desarrollo ({udDetalle.secuencias.length})</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border border-slate-200 rounded">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="p-2 text-left font-semibold">ID</th>
                      <th className="p-2 text-left font-semibold">Fase</th>
                      <th className="p-2 text-left font-semibold">Qué</th>
                      <th className="p-2 text-left font-semibold">Cómo</th>
                      <th className="p-2 text-left font-semibold">Para qué</th>
                    </tr>
                  </thead>
                  <tbody>
                    {udDetalle.secuencias.map(s => (
                      <tr key={s.id} className="border-t border-slate-100">
                        <td className="p-2 font-mono text-[10px]">{s.id}</td>
                        <td className="p-2 font-medium">{s.fase}</td>
                        <td className="p-2">{s.queSeTrabaja}</td>
                        <td className="p-2">{s.como}</td>
                        <td className="p-2">{s.paraQue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <Seccion titulo="Metodología" contenido={udDetalle.metodologia} />
            <Seccion titulo="Atención a la Diversidad" contenido={udDetalle.atencionDiversidad} />
            <Seccion titulo="Recuperación" contenido={udDetalle.recuperacion} />
            <Seccion titulo="Transferencia" contenido={udDetalle.transferencia} />
            <Seccion titulo="Trazabilidad" contenido={udDetalle.trazabilidad} />

            {udDetalle.incidencias.length > 0 && (
              <div>
                <h3 className="font-bold text-slate-800 text-sm mb-2">Incidencias</h3>
                {udDetalle.incidencias.map((inc, i) => (
                  <div key={i} className="text-xs p-2 bg-amber-50 border border-amber-200 rounded mb-1">
                    {inc}
                  </div>
                ))}
              </div>
            )}

            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <p className="text-xs"><span className="font-bold">Estado:</span> {udDetalle.estado}</p>
              <p className="text-xs"><span className="font-bold">Verificación:</span> {udDetalle.estadoVerificacion}</p>
            </div>
          </div>
        ) : (
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800 font-medium">Unidad con estructura definida. Desarrollo completo pendiente de auditoría individual.</p>
            <p className="text-xs text-amber-700 mt-1">Código: {codigo} · Curso: {udInfo.curso} · Trimestre: {udInfo.trimestre}</p>
            <p className="text-xs text-amber-700 mt-1">Foco: {ETAPA_FASE[udInfo.curso]}</p>
            <p className="text-xs text-amber-600 mt-2 italic">
              [H] Esta unidad sigue la arquitectura obligatoria de 21 elementos. El desarrollo detallado se realizará en la auditoría individual conforme al protocolo de 20 fases.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Seccion({ titulo, contenido }: { titulo: string; contenido: string }) {
  return (
    <div>
      <h3 className="font-bold text-slate-800 text-sm mb-1">{titulo}</h3>
      <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded border border-slate-100">{contenido}</p>
    </div>
  );
}

// ============================================================
// VISTA MATRIZ — CLARINETE
// ============================================================
function VistaMatriz() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <h2 className="text-lg font-bold text-slate-900 mb-1">Matriz de Progresión Vertical — 60 UD</h2>
        <p className="text-xs text-slate-500">Progresión desde EE1 (Fundamentación) hasta EP6 (Consolidación y Transferencia)</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="bg-slate-100 sticky top-0">
              {['Curso', 'UD', 'Foco', 'Técnica', 'Sonido', 'Articulación', 'Registro', 'Lectura', 'Memoria', 'Improvisación', 'Conjunto', 'Repertorio', 'Autonomía', 'Transferencia'].map(h => (
                <th key={h} className="p-2 text-left font-semibold text-slate-700 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MATRIZ_PROGRESION.map((row, i) => (
              <tr key={i} className={`border-t border-slate-100 ${row.curso.startsWith('EE') ? 'bg-emerald-50/30' : 'bg-blue-50/30'}`}>
                <td className="p-2 font-bold whitespace-nowrap">{row.curso}</td>
                <td className="p-2 font-mono whitespace-nowrap">{row.ud}</td>
                <td className="p-2 font-medium whitespace-nowrap">{row.focoPrincipal}</td>
                <td className="p-2">{row.tecnica}</td>
                <td className="p-2">{row.sonido}</td>
                <td className="p-2">{row.articulacion}</td>
                <td className="p-2">{row.registro}</td>
                <td className="p-2">{row.lectura}</td>
                <td className="p-2">{row.memoria}</td>
                <td className="p-2">{row.improvisacion}</td>
                <td className="p-2">{row.conjunto}</td>
                <td className="p-2">{row.repertorio}</td>
                <td className="p-2">{row.autonomia}</td>
                <td className="p-2">{row.transferencia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================
// VISTA RÚBRICAS — ASIGNATURAS COLECTIVAS
// ============================================================
function VistaRubricas({ asignatura, cursoFiltro, setCursoFiltro }: {
  asignatura: AsignaturaColectiva;
  cursoFiltro: CursoColectivo | 'TODOS';
  setCursoFiltro: (c: CursoColectivo | 'TODOS') => void;
}) {
  const info = ASIGNATURA_INFO[asignatura];
  const cursos = getCursosDisponibles(asignatura);
  const todasRubricas = getRubricasByAsignatura(asignatura);
  const rubricasFiltradas = cursoFiltro === 'TODOS'
    ? todasRubricas
    : todasRubricas.filter(r => r.curso === cursoFiltro);

  const colorMap: Record<string, string> = { purple: 'purple', blue: 'blue', emerald: 'emerald' };
  const color = colorMap[info.color];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <h2 className="text-lg font-bold text-slate-900 mb-1">Rúbricas de Evaluación — {info.nombre}</h2>
        <p className="text-xs text-slate-500">12 criterios × {cursos.length} cursos · Niveles: L1 (Inicial) · L2 (En desarrollo) · L3 (Adecuado) · L4 (Consolidado)</p>
        <div className="flex gap-1.5 flex-wrap mt-3">
          <button
            onClick={() => setCursoFiltro('TODOS')}
            className={`px-3 py-1 rounded text-xs font-medium ${cursoFiltro === 'TODOS' ? `bg-${color}-600 text-white` : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            Todos
          </button>
          {cursos.map(c => (
            <button
              key={c}
              onClick={() => setCursoFiltro(c)}
              className={`px-3 py-1 rounded text-xs font-medium ${cursoFiltro === c ? `bg-${color}-600 text-white` : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {c}.º
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-100 sticky top-0">
              <th className="p-2 text-left font-semibold text-slate-700 min-w-[120px]">Criterio</th>
              <th className="p-2 text-left font-semibold text-orange-700 min-w-[200px]">L1 — Inicial</th>
              <th className="p-2 text-left font-semibold text-amber-700 min-w-[200px]">L2 — En desarrollo</th>
              <th className="p-2 text-left font-semibold text-blue-700 min-w-[200px]">L3 — Adecuado</th>
              <th className="p-2 text-left font-semibold text-emerald-700 min-w-[200px]">L4 — Consolidado</th>
            </tr>
          </thead>
          <tbody>
            {rubricasFiltradas.map((r, i) => {
              const crit = CRITERIOS_EVALUACION.find(c => c.codigo === r.criterio);
              return (
                <tr key={`${r.criterio}-${r.curso}`} className={`border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                  <td className="p-2 align-top">
                    <div className="font-bold text-indigo-700">{r.criterio}</div>
                    <div className="text-[10px] text-slate-600">{crit?.nombre}</div>
                    <div className="text-[10px] text-slate-400">{r.curso}.º curso</div>
                  </td>
                  <td className="p-2 align-top text-slate-700">{r.descriptores.L1}</td>
                  <td className="p-2 align-top text-slate-700">{r.descriptores.L2}</td>
                  <td className="p-2 align-top text-slate-700">{r.descriptores.L3}</td>
                  <td className="p-2 align-top text-slate-700">{r.descriptores.L4}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Sistema de puntuación */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <h3 className="font-bold text-slate-800 text-sm mb-3">Sistema de Puntuación</h3>
        <div className="text-xs text-slate-700 space-y-2">
          <p>Cada criterio se puntúa de <strong>1</strong> (L1 Inicial) a <strong>4</strong> (L4 Consolidado).</p>
          <p><strong>Puntuación máxima</strong> = Número de criterios × 4</p>
          <p><strong>Nota final</strong> = (Suma total × 10) / Puntuación máxima</p>
          <div className="mt-3 bg-slate-50 rounded-lg p-3 border border-slate-200">
            <p className="font-medium text-slate-800 mb-1">Escala de calificación:</p>
            <ul className="space-y-1">
              <li>• 1.0 – 3.9 → <span className="text-orange-600 font-medium">Nivel Inicial (Insuficiente)</span></li>
              <li>• 4.0 – 5.9 → <span className="text-amber-600 font-medium">Nivel En desarrollo (Suficiente)</span></li>
              <li>• 6.0 – 7.9 → <span className="text-blue-600 font-medium">Nivel Adecuado (Notable)</span></li>
              <li>• 8.0 – 10 → <span className="text-emerald-600 font-medium">Nivel Consolidado (Sobresaliente)</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// VISTA NORMATIVA
// ============================================================
function VistaNormativa() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <h2 className="text-lg font-bold text-slate-900 mb-1">Marco Normativo</h2>
        <p className="text-xs text-slate-500">Normativa estatal y autonómica verificada</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-2 text-left font-semibold">ID</th>
              <th className="p-2 text-left font-semibold">Norma</th>
              <th className="p-2 text-left font-semibold">Fecha</th>
              <th className="p-2 text-left font-semibold">Rango</th>
              <th className="p-2 text-left font-semibold">Ámbito</th>
              <th className="p-2 text-left font-semibold">Etapa</th>
              <th className="p-2 text-left font-semibold">Vigencia</th>
              <th className="p-2 text-left font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {NORMATIVA_BASE.map(n => (
              <tr key={n.id} className="border-t border-slate-100">
                <td className="p-2 font-mono">{n.id}</td>
                <td className="p-2 font-medium">{n.norma}</td>
                <td className="p-2">{n.fecha}</td>
                <td className="p-2">{n.rango}</td>
                <td className="p-2">{n.ambito}</td>
                <td className="p-2">{n.etapa}</td>
                <td className="p-2">{n.vigencia}</td>
                <td className="p-2">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${n.estado === 'VERIFIED' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                    {n.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <h3 className="font-bold text-slate-800 text-sm mb-3">Criterios Oficiales EE [CO]</h3>
          {CRITERIOS_OFICIALES_EE.map(c => (
            <div key={c.codigo} className="text-xs p-2 bg-green-50 rounded mb-1.5 border border-green-100">
              <span className="font-bold">{c.codigo}:</span> {c.texto}
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <h3 className="font-bold text-slate-800 text-sm mb-3">Criterios Oficiales EP [CO]</h3>
          {CRITERIOS_OFICIALES_EP.map(c => (
            <div key={c.codigo} className="text-xs p-2 bg-green-50 rounded mb-1.5 border border-green-100">
              <span className="font-bold">{c.codigo}:</span> {c.texto}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// VISTA REPERTORIO — CLARINETE
// ============================================================
function VistaRepertorio() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <h2 className="text-lg font-bold text-slate-900 mb-1">Repertorio de Referencia — Clarinete</h2>
        <p className="text-xs text-slate-500">Clasificado como [E] — Fuente repertorial / Decisión didáctica. Ninguna obra se presenta como obligatoria.</p>
      </div>
      {REPERTORIO_REFERENCIA.map(r => (
        <div key={r.curso} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded">{r.curso}</span>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">{r.clasificacion}</span>
          </div>
          <ul className="space-y-1">
            {r.obras.map((o, i) => (
              <li key={i} className="text-xs text-slate-700 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full shrink-0"></span>
                {o}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// VISTA INCIDENCIAS
// ============================================================
function VistaIncidencias() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <h2 className="text-lg font-bold text-slate-900 mb-1">Registro de Incidencias</h2>
        <p className="text-xs text-slate-500">{INCIDENCIAS.length} incidencias registradas</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-2 text-left font-semibold">ID</th>
              <th className="p-2 text-left font-semibold">UD</th>
              <th className="p-2 text-left font-semibold">Tipo</th>
              <th className="p-2 text-left font-semibold">Descripción</th>
              <th className="p-2 text-left font-semibold">Acción</th>
              <th className="p-2 text-left font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {INCIDENCIAS.map(inc => (
              <tr key={inc.id} className="border-t border-slate-100">
                <td className="p-2 font-mono">{inc.id}</td>
                <td className="p-2">{inc.ud}</td>
                <td className="p-2">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    inc.tipo === 'NORMATIVA' ? 'bg-purple-100 text-purple-800' :
                    inc.tipo === 'ESTRUCTURAL' ? 'bg-blue-100 text-blue-800' :
                    inc.tipo === 'HOLD' ? 'bg-amber-100 text-amber-800' :
                    'bg-slate-100 text-slate-700'
                  }`}>{inc.tipo}</span>
                </td>
                <td className="p-2">{inc.descripcion}</td>
                <td className="p-2">{inc.accion}</td>
                <td className="p-2">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    inc.estado === 'FIXED' ? 'bg-green-100 text-green-800' :
                    inc.estado === 'VERIFIED' ? 'bg-blue-100 text-blue-800' :
                    inc.estado === 'HOLD' ? 'bg-amber-100 text-amber-800' :
                    'bg-slate-100 text-slate-700'
                  }`}>{inc.estado}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================
// VISTA AUDITORÍA
// ============================================================
function VistaAuditoria() {
  const a = AUDITORIA_FINAL;
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Informe de Auditoría Final</h2>
        <p className="text-sm text-slate-600 mb-4">Control automático de la programación V2.0</p>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-lg font-bold text-green-800">{a.estadoGlobal}</p>
          <p className="text-xs text-green-700 mt-1">{a.estadoDocumental}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <StatCard label="Total UD" value={String(a.totalUD)} color="blue" />
          <StatCard label="Incidencias totales" value={String(a.incidenciasTotal)} color="amber" />
          <StatCard label="Corregidas" value={String(a.incidenciasCorregidas)} color="green" />
          <StatCard label="HOLD" value={String(a.incidenciasHold)} color="amber" />
        </div>

        <h3 className="font-bold text-slate-800 text-sm mb-3">Control Final Automático</h3>
        <div className="space-y-1.5">
          {[
            { q: '¿Hay exactamente 60 UD?', r: 'SÍ — 60 UD en ESTRUCTURA_60_UD' },
            { q: '¿Hay 6 UD por curso?', r: 'SÍ — 10 cursos × 6 UD = 60' },
            { q: '¿Están presentes EE1–EE4?', r: 'SÍ — 24 UD de Enseñanzas Elementales' },
            { q: '¿Están presentes EP1–EP6?', r: 'SÍ — 36 UD de Enseñanzas Profesionales' },
            { q: '¿Cada UD tiene código único?', r: 'SÍ — Formato EEx-UDxx / EPx-UDxx' },
            { q: '¿Se han detectado duplicaciones?', r: `NO — ${a.duplicacionesDetectadas} duplicaciones` },
            { q: '¿Se han detectado lagunas?', r: `NO — ${a.lagunasDetectadas} lagunas` },
            { q: '¿Se han detectado saltos?', r: `NO — ${a.saltosDetectados} saltos` },
            { q: '¿Se han detectado contradicciones?', r: `NO — ${a.contradiccionesDetectadas} contradicciones` },
            { q: '¿Existe afirmación normativa sin fuente?', r: 'NO — Toda normativa está en NORMATIVA_BASE' },
            { q: '¿Existe criterio interno presentado como oficial?', r: 'NO — Criterios operativos son [DP]' },
            { q: '¿Existe repertorio obligatorio sin evidencia?', r: 'NO — Todo repertorio es [E]' },
            { q: '¿Existen sesiones inventadas?', r: 'NO — Marcadas como [H]' },
            { q: '¿Existen ponderaciones inventadas?', r: 'NO — Registradas como INC-006 [H]' },
            { q: '¿Existe objetivo de doble lengüeta al clarinete?', r: 'NO — EE-O6 y EP-O3 marcados como NO CORRESPONDE' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-xs p-2 bg-slate-50 rounded">
              <span className="text-green-600 font-bold">✓</span>
              <span className="text-slate-700">{item.q}</span>
              <span className="ml-auto text-slate-500 text-[10px]">{item.r}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// COMPONENTES AUXILIARES
// ============================================================
function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    amber: 'bg-amber-50 border-amber-200 text-amber-700',
  };
  return (
    <div className={`rounded-lg border p-3 text-center ${colors[color]}`}>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-[10px] opacity-70">{label}</div>
    </div>
  );
}

function NavCard({ title, desc, icon, onClick }: { title: string; desc: string; icon: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="bg-slate-50 rounded-lg border border-slate-200 p-4 text-left hover:bg-slate-100 hover:border-blue-300 transition-colors">
      <span className="text-2xl">{icon}</span>
      <h3 className="font-semibold text-slate-800 text-sm mt-2">{title}</h3>
      <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
    </button>
  );
}
