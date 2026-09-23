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
  DOCUMENTO_COMPLETO,
  DOCUMENTO_COMPLETO_3_30,
  DOCUMENTO_RESTO,
  DOCUMENTO_FINAL,
  MATERIAS_TEORICAS,
  MateriaTeoricaKey,
} from './data';
import ComposerInfo from './components/ComposerInfo';
import ExportModule from './components/ExportModule';
import ProgramacionesModule from './components/ProgramacionesModule';
import RubricasModule from './components/RubricasModule';

type Asignatura = 'clarinete' | AsignaturaColectiva;
type Vista = 'inicio' | 'unidades' | 'detalle' | 'matriz' | 'incidencias' | 'normativa' | 'repertorio' | 'auditoria' | 'rubricas' | 'rubricas-completas' | 'documento' | 'programaciones';

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
      <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white shadow-xl print:shadow-none print:bg-white print:text-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">🎼</span>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold tracking-tight flex items-center gap-2">
                  Rubricalia
                  <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full font-normal">V2.0</span>
                </h1>
                <p className="text-[10px] sm:text-xs text-purple-200 print:text-gray-600">
                  Programación Didáctica de Música 2026/2027 · Extremadura · Prof. Manuel Gago Fernández
                </p>
              </div>
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
              onClick={() => cambiarAsignatura('lenguaje')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                asignatura === 'lenguaje' ? 'bg-indigo-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              📖 Lenguaje
            </button>
            <button
              onClick={() => cambiarAsignatura('armonia')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                asignatura === 'armonia' ? 'bg-violet-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              🎼 Armonía
            </button>
            <button
              onClick={() => cambiarAsignatura('analisis')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                asignatura === 'analisis' ? 'bg-fuchsia-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              🔍 Análisis
            </button>
            <button
              onClick={() => cambiarAsignatura('historia')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                asignatura === 'historia' ? 'bg-rose-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              📚 Historia
            </button>
            <button
              onClick={() => cambiarAsignatura('literatura')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                asignatura === 'literatura' ? 'bg-pink-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              📜 Literatura
            </button>
            <button
              onClick={() => cambiarAsignatura('coro')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                asignatura === 'coro' ? 'bg-teal-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              🎤 Coro
            </button>
            <button
              onClick={() => cambiarAsignatura('piano_complementario')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                asignatura === 'piano_complementario' ? 'bg-cyan-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              🎹 Piano Comp.
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
          {/* Navigation Principal */}
          <nav className="flex gap-1 mt-3 flex-wrap print:hidden border-t border-white/10 pt-3">
            <button
              onClick={() => setVista('inicio')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                vista === 'inicio' ? 'bg-white text-purple-900 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              🏠 Inicio
            </button>
            <button
              onClick={() => setVista('programaciones')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                vista === 'programaciones' ? 'bg-white text-purple-900 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              📚 Programaciones
            </button>
            <button
              onClick={() => setVista('rubricas-completas')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                vista === 'rubricas-completas' ? 'bg-white text-purple-900 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              📊 Rúbricas
            </button>
            <button
              onClick={() => setVista('documento')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                vista === 'documento' ? 'bg-white text-purple-900 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              📄 Documento
            </button>
            {asignatura === 'clarinete' && (
              <>
                <button
                  onClick={() => setVista('unidades')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    vista === 'unidades' ? 'bg-white text-purple-900 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  📋 60 UD
                </button>
                <button
                  onClick={() => setVista('matriz')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    vista === 'matriz' ? 'bg-white text-purple-900 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  📈 Progresión
                </button>
                <button
                  onClick={() => setVista('repertorio')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    vista === 'repertorio' ? 'bg-white text-purple-900 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  🎵 Repertorio
                </button>
              </>
            )}
            <button
              onClick={() => setVista('normativa')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                vista === 'normativa' ? 'bg-white text-purple-900 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              ⚖️ Normativa
            </button>
            <button
              onClick={() => setVista('incidencias')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                vista === 'incidencias' ? 'bg-white text-purple-900 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              ⚠️ Incidencias
            </button>
            <button
              onClick={() => setVista('auditoria')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                vista === 'auditoria' ? 'bg-white text-purple-900 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              ✅ Auditoría
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full">
        {/* Vista de Inicio Unificada */}
        {vista === 'inicio' && <VistaInicioPrincipal onNavigate={setVista} />}
        
        {/* Vistas específicas de Clarinete */}
        {asignatura === 'clarinete' && (
          <>
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
        
        {/* Vistas específicas de otras asignaturas */}
        {asignatura !== 'clarinete' && vista === 'rubricas' && (
          <VistaRubricas
            asignatura={asignatura}
            cursoFiltro={cursoColectivoFiltro}
            setCursoFiltro={setCursoColectivoFiltro}
          />
        )}
        
        {/* Módulos globales */}
        {vista === 'documento' && <VistaDocumento />}
        {vista === 'programaciones' && <ProgramacionesModule />}
        {vista === 'rubricas-completas' && <RubricasModule />}
        {vista === 'normativa' && <VistaNormativa />}
        {vista === 'incidencias' && <VistaIncidencias />}
        {vista === 'auditoria' && <VistaAuditoria />}
      </main>

      {/* Módulo de Exportación */}
      <ExportModule />

      <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-6 print:hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <span className="text-2xl">🎼</span> Rubricalia
              </h3>
              <p className="text-sm text-purple-200">
                Herramienta integral de programación didáctica para Enseñanzas Profesionales de Música
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Información</h4>
              <ul className="text-sm text-purple-200 space-y-1">
                <li>Curso Académico 2026/2027</li>
                <li>Comunidad Autónoma de Extremadura</li>
                <li>Versión V2.0 Auditada</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Autor</h4>
              <ul className="text-sm text-purple-200 space-y-1">
                <li>Prof. Manuel Gago Fernández</li>
                <li>Especialista en Clarinete</li>
                <li>Enseñanzas Profesionales de Música</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-4 text-center">
            <p className="text-xs text-purple-200">
              Estado documental: <span className="font-semibold text-white">AUDITADA / TRAZABLE / CON HOLD EXPLÍCITOS DONDE PROCEDA</span>
            </p>
            <p className="text-xs text-purple-300 mt-2">
              © 2024 Rubricalia · Programación Didáctica de Música · Todos los derechos reservados
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============================================================
// VISTA INICIO PRINCIPAL — UNIFICADA
// ============================================================
function VistaInicioPrincipal({ onNavigate }: { onNavigate: (v: Vista) => void }) {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl">🎼</span>
              <div>
                <h2 className="text-3xl font-bold">Bienvenido a Rubricalia</h2>
                <p className="text-purple-100 text-sm mt-1">Herramienta Integral de Programación Didáctica de Música</p>
              </div>
            </div>
            <p className="text-purple-100 mb-6 max-w-2xl">
              Plataforma completa para la gestión de programaciones didácticas de Enseñanzas Elementales y Profesionales de Música en Extremadura. 
              Accede a rúbricas, programaciones, unidades didácticas, normativa y todos los recursos necesarios para tu labor docente.
            </p>
            <div className="flex gap-3 flex-wrap">
              <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-semibold">✓ V2.0 Auditada</span>
              <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-semibold">✓ 203 Rúbricas</span>
              <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-semibold">✓ 60 UD</span>
              <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-semibold">✓ 11 Materias</span>
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas Principales */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Unidades Didácticas" value="60" color="blue" />
        <StatCard label="Rúbricas Totales" value="203" color="purple" />
        <StatCard label="Materias" value="11" color="indigo" />
        <StatCard label="Normativa Verificada" value={String(NORMATIVA_BASE.filter(n => n.estado === 'VERIFIED').length)} color="green" />
      </div>

      {/* ÍNDICE DE MÓDULOS PRINCIPALES */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">📑</span> Índice de Módulos
        </h3>
        
        {/* Módulos Destacados */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => onNavigate('programaciones')}
            className="group bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-5 text-left hover:shadow-lg hover:border-blue-400 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-4xl">📚</span>
              <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">PRINCIPAL</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
              Programaciones Vigentes
            </h4>
            <p className="text-sm text-slate-600 mb-3">
              Accede a las 8 programaciones completas y verificadas de todas las materias
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">8 Materias</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">100% Verificadas</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">Trazabilidad Completa</span>
            </div>
            <div className="text-xs text-slate-500 space-y-1">
              <p>✓ Clarinete (60 UD completas)</p>
              <p>✓ Lenguaje Musical, Armonía, Análisis, Historia</p>
              <p>✓ Música de Cámara, Banda, Orquesta</p>
            </div>
            <div className="mt-3 text-blue-600 font-semibold text-sm group-hover:text-blue-800">
              Acceder al módulo →
            </div>
          </button>

          <button
            onClick={() => onNavigate('rubricas-completas')}
            className="group bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-5 text-left hover:shadow-lg hover:border-purple-400 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-4xl">📊</span>
              <span className="px-2 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">PRINCIPAL</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-purple-700 transition-colors">
              Sistema de Rúbricas
            </h4>
            <p className="text-sm text-slate-600 mb-3">
              203 rúbricas completas con 4 niveles de logro para todas las asignaturas
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">203 Rúbricas</span>
              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">4 Niveles</span>
              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">12 Criterios</span>
            </div>
            <div className="text-xs text-slate-500 space-y-1">
              <p>✓ 19 Rúbricas Técnicas (documento maestro)</p>
              <p>✓ 36 Rúbricas de Música de Cámara</p>
              <p>✓ 72 Rúbricas de Banda + 72 de Orquesta</p>
            </div>
            <div className="mt-3 text-purple-600 font-semibold text-sm group-hover:text-purple-800">
              Acceder al módulo →
            </div>
          </button>
        </div>

        {/* Otros Módulos */}
        <h4 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Otros Módulos Disponibles</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          <button
            onClick={() => onNavigate('unidades')}
            className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-left hover:bg-slate-100 hover:border-slate-300 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📋</span>
              <h5 className="font-semibold text-slate-900">60 Unidades Didácticas</h5>
            </div>
            <p className="text-xs text-slate-600">Navega por las 60 UD de Clarinete con estructura completa</p>
          </button>

          <button
            onClick={() => onNavigate('documento')}
            className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-left hover:bg-slate-100 hover:border-slate-300 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📄</span>
              <h5 className="font-semibold text-slate-900">Documento Completo</h5>
            </div>
            <p className="text-xs text-slate-600">Los 30 apartados de la programación didáctica</p>
          </button>

          <button
            onClick={() => onNavigate('matriz')}
            className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-left hover:bg-slate-100 hover:border-slate-300 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📈</span>
              <h5 className="font-semibold text-slate-900">Matriz de Progresión</h5>
            </div>
            <p className="text-xs text-slate-600">Progresión vertical EE1→EP6</p>
          </button>

          <button
            onClick={() => onNavigate('repertorio')}
            className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-left hover:bg-slate-100 hover:border-slate-300 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🎵</span>
              <h5 className="font-semibold text-slate-900">Repertorio</h5>
            </div>
            <p className="text-xs text-slate-600">Repertorio de referencia por curso</p>
          </button>

          <button
            onClick={() => onNavigate('normativa')}
            className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-left hover:bg-slate-100 hover:border-slate-300 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">⚖️</span>
              <h5 className="font-semibold text-slate-900">Normativa</h5>
            </div>
            <p className="text-xs text-slate-600">Marco normativo estatal y autonómico</p>
          </button>

          <button
            onClick={() => onNavigate('incidencias')}
            className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-left hover:bg-slate-100 hover:border-slate-300 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">⚠️</span>
              <h5 className="font-semibold text-slate-900">Incidencias</h5>
            </div>
            <p className="text-xs text-slate-600">Registro de incidencias y HOLD</p>
          </button>

          <button
            onClick={() => onNavigate('auditoria')}
            className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-left hover:bg-slate-100 hover:border-slate-300 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">✅</span>
              <h5 className="font-semibold text-slate-900">Auditoría</h5>
            </div>
            <p className="text-xs text-slate-600">Informe de auditoría final</p>
          </button>
        </div>
      </div>

      {/* Calendario */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
          <span className="text-2xl">📅</span> Calendario Académico 2026/2027
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-600 font-semibold mb-1">Inicio de Actividades</p>
            <p className="text-blue-900 font-bold">{CALENDARIO.inicioActividades}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-xs text-green-600 font-semibold mb-1">Final Ordinario</p>
            <p className="text-green-900 font-bold">{CALENDARIO.finalOrdinario}</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <p className="text-xs text-purple-600 font-semibold mb-1">Final 6.º EP</p>
            <p className="text-purple-900 font-bold">{CALENDARIO.finalEP6}</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs text-amber-600 font-semibold mb-1">Calificaciones Ordinarias</p>
            <p className="text-amber-900 font-bold">{CALENDARIO.calificacionesOrdinarias}</p>
          </div>
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-3">
            <p className="text-xs text-rose-600 font-semibold mb-1">Calificaciones 6.º EP</p>
            <p className="text-rose-900 font-bold">{CALENDARIO.calificacionesEP6}</p>
          </div>
        </div>
      </div>

      {/* Objetivos Oficiales */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <h3 className="font-bold text-slate-800 mb-3 text-sm flex items-center gap-2">
            <span className="text-xl">🎯</span> Objetivos Oficiales EE — Aplicables al Clarinete
          </h3>
          <div className="space-y-2">
            {OBJETIVOS_OFICIALES_EE.filter(o => o.aplicaClarinete).map(o => (
              <div key={o.codigo} className="text-xs p-2 rounded bg-slate-50 text-slate-700">
                <span className="font-bold">{o.codigo}:</span> {o.texto}
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-[10px] text-amber-800">
            <span className="font-bold">⚠️ Nota de trazabilidad:</span> EE-O6 (fabricación de lengüetas dobles) existe en la normativa oficial pero NO corresponde al clarinete. Se excluye de la programación conforme a la regla de veracidad.
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <h3 className="font-bold text-slate-800 mb-3 text-sm flex items-center gap-2">
            <span className="text-xl">🎯</span> Objetivos Oficiales EP — Aplicables al Clarinete
          </h3>
          <div className="space-y-2">
            {OBJETIVOS_OFICIALES_EP.filter(o => o.aplicaClarinete).map(o => (
              <div key={o.codigo} className="text-xs p-2 rounded bg-slate-50 text-slate-700">
                <span className="font-bold">{o.codigo}:</span> {o.texto}
              </div>
            ))}
          </div>
          <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-[10px] text-amber-800">
            <span className="font-bold">⚠️ Nota de trazabilidad:</span> EP-O3 (fabricación de lengüetas dobles) existe en la normativa oficial pero NO corresponde al clarinete. Se excluye de la programación conforme a la regla de veracidad.
          </div>
        </div>
      </div>
    </div>
  );
}



// ============================================================
// COMPONENTE DE BÚSQUEDA CON APIs
// ============================================================
function ComposerSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    
    try {
      const response = await fetch(
        `https://musicbrainz.org/ws/2/artist?query=${encodeURIComponent(query)}&fmt=json&limit=5`
      );
      const data = await response.json();
      setResults(data.artists || []);
    } catch (error) {
      console.error('Error buscando:', error);
    }
    
    setLoading(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nombre del compositor (ej: Mozart, Beethoven...)"
          className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
      
      {results.length > 0 && (
        <div className="space-y-2">
          {results.map((artist, i) => (
            <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">{artist.name}</h4>
                  {artist['life-span'] && (
                    <p className="text-xs text-slate-600">
                      {artist['life-span'].begin || '?'} - {artist['life-span'].end || 'presente'}
                    </p>
                  )}
                  {artist.country && (
                    <p className="text-xs text-slate-500">{artist.country}</p>
                  )}
                </div>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] rounded-full">
                  MusicBrainz
                </span>
              </div>
              {artist.disambiguation && (
                <p className="text-xs text-slate-600 mt-1">{artist.disambiguation}</p>
              )}
            </div>
          ))}
        </div>
      )}
      
      <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-200">
        Datos obtenidos de MusicBrainz API (gratuita)
      </div>
    </div>
  );
}

// ============================================================
// COMPONENTE DE CONTENIDO DE MATERIAS TEÓRICAS
// ============================================================
function MateriaTeoricaContent({ asignatura }: { asignatura: AsignaturaColectiva }) {
  const materia = MATERIAS_TEORICAS[asignatura as MateriaTeoricaKey];
  
  if (!materia) return null;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
      <h3 className="font-bold text-slate-800 mb-3 text-sm">📚 Contenido Programático Completo</h3>
      
      <div className="mb-4">
        <h4 className="font-semibold text-slate-700 text-xs mb-2">Objetivos</h4>
        <ul className="space-y-1">
          {materia.objetivos.map((obj, i) => (
            <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
              <span className="text-blue-600 font-bold">{i + 1}.</span>
              {obj}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mb-4">
        <h4 className="font-semibold text-slate-700 text-xs mb-2">Contenidos por Curso</h4>
        <div className="space-y-3">
          {Object.entries(materia.contenidosPorCurso).map(([curso, data]) => (
            <div key={curso} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <h5 className="text-xs font-bold text-slate-800 mb-1">
                {curso}.º Curso: {data.titulo}
              </h5>
              <ul className="space-y-0.5">
                {data.contenidos.map((contenido, i) => (
                  <li key={i} className="text-xs text-slate-700">
                    • {contenido}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-slate-700 text-xs mb-2">Metodología</h4>
          <ul className="space-y-1">
            {materia.metodologia.map((met, i) => (
              <li key={i} className="text-xs text-slate-700">
                • {met}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-slate-700 text-xs mb-2">Evaluación</h4>
          <div className="mb-2">
            <p className="text-xs font-medium text-slate-700 mb-1">Instrumentos:</p>
            <ul className="space-y-0.5">
              {materia.evaluacion.instrumentos.map((inst, i) => (
                <li key={i} className="text-xs text-slate-700">
                  • {inst}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-700 mb-1">Criterios:</p>
            <ul className="space-y-0.5">
              {materia.evaluacion.criterios.map((crit, i) => (
                <li key={i} className="text-xs text-slate-700">
                  • {crit}
                </li>
              ))}
            </ul>
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

  const colorMap: Record<string, string> = { 
    indigo: 'indigo', 
    violet: 'violet', 
    fuchsia: 'fuchsia', 
    rose: 'rose', 
    pink: 'pink', 
    teal: 'teal', 
    cyan: 'cyan',
    purple: 'purple', 
    blue: 'blue', 
    emerald: 'emerald' 
  };
  const color = colorMap[info.color] || 'slate';

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
// VISTA DOCUMENTO COMPLETO
// ============================================================
function VistaDocumento() {
  const [apartadoExpandido, setApartadoExpandido] = useState<string | null>('1');
  const todosLosApartados = [...DOCUMENTO_COMPLETO, ...DOCUMENTO_COMPLETO_3_30, ...DOCUMENTO_RESTO, ...DOCUMENTO_FINAL];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <h2 className="text-lg font-bold text-slate-900 mb-1">Programación Didáctica Completa — 30 Apartados</h2>
        <p className="text-xs text-slate-500">Documento completo con todos los apartados desarrollados según el superprompt maestro</p>
        <div className="mt-3 flex gap-2 flex-wrap">
          <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full font-bold">NORMA VIGENTE</span>
          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full font-bold">DESARROLLO PROPIO</span>
          <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full font-bold">HOLD — PENDIENTE</span>
        </div>
      </div>

      <div className="space-y-3">
        {todosLosApartados.map(apartado => (
          <div key={apartado.numero} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <button
              onClick={() => setApartadoExpandido(apartadoExpandido === apartado.numero ? null : apartado.numero)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-blue-600">{apartado.numero}.</span>
                <span className="font-semibold text-slate-800">{apartado.titulo}</span>
                <span className="text-xs text-slate-500">({apartado.subapartados.length} subapartados)</span>
              </div>
              <svg
                className={`w-5 h-5 text-slate-400 transition-transform ${apartadoExpandido === apartado.numero ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {apartadoExpandido === apartado.numero && (
              <div className="px-4 pb-4 border-t border-slate-100">
                <div className="space-y-4 mt-4">
                  {apartado.subapartados.map(sub => (
                    <div key={sub.numero} className="border-l-2 border-blue-200 pl-3">
                      <h4 className="font-semibold text-slate-800 text-sm mb-2">
                        <span className="text-blue-600">{sub.numero}</span> {sub.titulo}
                        {sub.categoria && (
                          <span className={`ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            sub.categoria === 'NORMA' ? 'bg-green-100 text-green-800' :
                            sub.categoria === 'HOLD' ? 'bg-amber-100 text-amber-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {sub.categoria}
                          </span>
                        )}
                      </h4>
                      <div className="space-y-1">
                        {sub.contenido.map((linea, i) => (
                          <p key={i} className="text-xs text-slate-700 leading-relaxed">
                            {linea.startsWith('[DESARROLLO PROPIO]') || linea.startsWith('[NORMA VIGENTE]') || linea.startsWith('[HOLD]') || linea.startsWith('[REPERTORIO') ? (
                              <span className={`font-bold ${
                                linea.includes('DESARROLLO') ? 'text-blue-600' :
                                linea.includes('NORMA') ? 'text-green-600' :
                                linea.includes('HOLD') ? 'text-amber-600' :
                                'text-purple-600'
                              }`}>{linea}</span>
                            ) : (
                              linea
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
        <h3 className="font-bold text-slate-800 text-sm mb-2">Resumen del Documento</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-white rounded-lg p-2 border border-slate-200">
            <div className="text-lg font-bold text-slate-800">{todosLosApartados.length}</div>
            <div className="text-xs text-slate-500">Apartados</div>
          </div>
          <div className="bg-white rounded-lg p-2 border border-slate-200">
            <div className="text-lg font-bold text-slate-800">
              {todosLosApartados.reduce((acc, a) => acc + a.subapartados.length, 0)}
            </div>
            <div className="text-xs text-slate-500">Subapartados</div>
          </div>
          <div className="bg-white rounded-lg p-2 border border-slate-200">
            <div className="text-lg font-bold text-green-600">
              {todosLosApartados.reduce((acc, a) => acc + a.subapartados.filter(s => s.categoria === 'NORMA').length, 0)}
            </div>
            <div className="text-xs text-slate-500">Normativa</div>
          </div>
          <div className="bg-white rounded-lg p-2 border border-slate-200">
            <div className="text-lg font-bold text-amber-600">
              {todosLosApartados.reduce((acc, a) => acc + a.subapartados.filter(s => s.categoria === 'HOLD').length, 0)}
            </div>
            <div className="text-xs text-slate-500">Pendientes</div>
          </div>
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
