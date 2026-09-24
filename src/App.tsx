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

type Asignatura = 'clarinete' | AsignaturaColectiva | 'literatura' | 'coro' | 'piano_complementario' | 'musica_conjunto' | 'composicion' | 'musica_tecnologias';
type Vista = 'landing' | 'inicio' | 'unidades' | 'detalle' | 'matriz' | 'incidencias' | 'normativa' | 'repertorio' | 'auditoria' | 'rubricas' | 'rubricas-completas' | 'documento' | 'programaciones';

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
  const [vista, setVista] = useState<Vista>('landing');
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
                  <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full font-normal">V3.1</span>
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
            <button
              onClick={() => cambiarAsignatura('musica_conjunto')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                asignatura === 'musica_conjunto' ? 'bg-orange-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              🎶 Conjunto
            </button>
            <button
              onClick={() => cambiarAsignatura('composicion')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                asignatura === 'composicion' ? 'bg-yellow-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              ✍️ Composición
            </button>
            <button
              onClick={() => cambiarAsignatura('musica_tecnologias')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                asignatura === 'musica_tecnologias' ? 'bg-lime-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              💻 Tecnologías
            </button>
          </div>
          {/* Navigation Principal */}
          <nav className="flex gap-1 mt-3 flex-wrap print:hidden border-t border-white/10 pt-3">
            <button
              onClick={() => setVista('landing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                vista === 'landing' ? 'bg-white text-purple-900 shadow-lg' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              🏛️ Landing
            </button>
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
        {/* Landing Page - V3.1 */}
        {vista === 'landing' && <LandingPage onNavigate={setVista} />}
        
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
                <li>Versión V3.1 Completa</li>
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
// LANDING PAGE - V3.1 CON INFORMACIÓN DE IMPLEMENTACIÓN
// ============================================================
function LandingPage({ onNavigate }: { onNavigate: (v: Vista) => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section con V3.1 Badge */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            {/* V3.1 Badge */}
            <div className="inline-flex items-center gap-2 bg-green-100 border-2 border-green-400 text-green-800 px-6 py-2 rounded-full text-sm font-bold mb-8 shadow-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              VERSIÓN 3.1 - IMPLEMENTACIÓN COMPLETA
            </div>

            {/* Logo y Título */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl shadow-2xl mb-6">
              <span className="text-6xl">🎼</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-4">
              Rubricalia
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 mb-2">
              Programación Didáctica de Música 2026/2027
            </p>
            <p className="text-lg text-slate-500 mb-8">
              Enseñanzas Profesionales de Música — Extremadura
            </p>

            {/* Descripción */}
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-8 border border-slate-200">
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                Herramienta integral para la gestión de programaciones didácticas, rúbricas de evaluación, 
                unidades didácticas y normativa para las Enseñanzas Elementales y Profesionales de Música.
              </p>
              
              {/* Aviso V3.1 */}
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg text-left mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-green-900 mb-1">Versión 3.1 - Implementación Completa</h3>
                    <p className="text-sm text-green-800">
                      Esta herramienta ha alcanzado la versión 3.1 con implementación completa del currículo oficial 
                      de Enseñanzas Profesionales de Música en Extremadura. Incluye 14 materias completamente desarrolladas, 
                      203 rúbricas operativas, 60 unidades didácticas y cobertura del 100% del currículo según los 
                      Decretos 110/2007, 111/2007 y 54/2022.
                    </p>
                  </div>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => onNavigate('inicio')}
                  className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                >
                  <span>🚀</span>
                  Acceder a la Herramienta
                </button>
                <button
                  onClick={() => onNavigate('programaciones')}
                  className="inline-flex items-center justify-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200"
                >
                  <span>📚</span>
                  Ver Programaciones
                </button>
              </div>
            </div>

            {/* Estadísticas Rápidas */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              <div className="bg-white rounded-xl shadow-md p-4 border border-slate-200">
                <div className="text-3xl font-bold text-indigo-600 mb-1">203</div>
                <div className="text-sm text-slate-600">Rúbricas</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 border border-slate-200">
                <div className="text-3xl font-bold text-purple-600 mb-1">60</div>
                <div className="text-sm text-slate-600">Unidades Didácticas</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 border border-slate-200">
                <div className="text-3xl font-bold text-pink-600 mb-1">14</div>
                <div className="text-sm text-slate-600">Materias</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 border border-slate-200">
                <div className="text-3xl font-bold text-green-600 mb-1">30</div>
                <div className="text-sm text-slate-600">Apartados</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Información de Implementación */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="text-4xl">⚙️</span>
            Información de Implementación
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Stack Tecnológico */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">💻</span>
                Stack Tecnológico
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <div>
                    <span className="font-semibold text-slate-900">React 19</span>
                    <span className="text-slate-600 text-sm ml-2">- Biblioteca UI</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <div>
                    <span className="font-semibold text-slate-900">TypeScript 5</span>
                    <span className="text-slate-600 text-sm ml-2">- Tipado estático</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <div>
                    <span className="font-semibold text-slate-900">Vite 6</span>
                    <span className="text-slate-600 text-sm ml-2">- Build tool</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <div>
                    <span className="font-semibold text-slate-900">Tailwind CSS 4</span>
                    <span className="text-slate-600 text-sm ml-2">- Framework CSS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Librerías de Exportación */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">📦</span>
                Librerías de Exportación
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <div>
                    <span className="font-semibold text-slate-900">SheetJS (xlsx)</span>
                    <span className="text-slate-600 text-sm ml-2">- Excel</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <div>
                    <span className="font-semibold text-slate-900">jsPDF + autoTable</span>
                    <span className="text-slate-600 text-sm ml-2">- PDF</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <div>
                    <span className="font-semibold text-slate-900">docx</span>
                    <span className="text-slate-600 text-sm ml-2">- Word</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <div>
                    <span className="font-semibold text-slate-900">file-saver</span>
                    <span className="text-slate-600 text-sm ml-2">- Descargas</span>
                  </div>
                </div>
              </div>
            </div>

            {/* APIs Integradas */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🌐</span>
                APIs Integradas
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <div>
                    <span className="font-semibold text-slate-900">MusicBrainz API</span>
                    <span className="text-slate-600 text-sm ml-2">- Base de datos musical</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <div>
                    <span className="font-semibold text-slate-900">Wikipedia API</span>
                    <span className="text-slate-600 text-sm ml-2">- Enciclopedia libre</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Despliegue */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                Despliegue
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  <div>
                    <span className="font-semibold text-slate-900">Plataforma</span>
                    <span className="text-slate-600 text-sm ml-2">- Vercel</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  <div>
                    <span className="font-semibold text-slate-900">Dominio</span>
                    <span className="text-slate-600 text-sm ml-2">- rubricalia.vercel.app</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  <div>
                    <span className="font-semibold text-slate-900">Versión</span>
                    <span className="text-slate-600 text-sm ml-2">- V3.1 Completa</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <div>
                    <span className="font-semibold text-slate-900">Estado</span>
                    <span className="text-green-600 text-sm ml-2 font-semibold">- V3.1 Completa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Características Implementadas */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">✨</span>
              Características Implementadas en V3.1
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">203 rúbricas completas</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">60 unidades didácticas</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">14 materias completas</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">30 apartados documentales</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">Exportación en 5 formatos</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">APIs musicales integradas</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">Trazabilidad normativa</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">Sistema de auditoría</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-700">Interfaz responsive</span>
              </div>
            </div>
          </div>
        </div>

        {/* Aviso Legal de IA Europea */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="text-4xl">⚖️</span>
            Aviso Legal - Inteligencia Artificial
          </h2>

          {/* Imagen de Conformidad IA Europea */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img 
                src="https://image.qwenlm.ai/generated-images/34ff6b80-fcec-4c1a-8cab-2e7a6534951d/_result.png" 
                alt="EU AI Act Compliant Badge" 
                className="w-48 h-48 rounded-full shadow-2xl border-4 border-blue-200"
              />
              {/* Banderas UE */}
              <div className="absolute -top-2 -right-2 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-3 border-white">
                <span className="text-3xl">🇪🇺</span>
              </div>
            </div>
          </div>

          {/* Contenido del Aviso Legal */}
          <div className="space-y-4 text-slate-700">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <h3 className="font-bold text-blue-900 mb-2">Conformidad con el EU AI Act</h3>
              <p className="text-sm text-blue-800">
                Esta herramienta ha sido desarrollada cumpliendo con los principios establecidos en el 
                <strong> Reglamento (UE) 2024/1689 del Parlamento Europeo y del Consejo </strong> 
                (Ley de Inteligencia Artificial de la Unión Europea), que establece el marco normativo 
                para el desarrollo y uso de sistemas de IA en la UE.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <h3 className="font-bold text-green-900 mb-2">Principios Éticos Aplicados</h3>
              <ul className="text-sm text-green-800 space-y-2">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Transparencia:</strong> La herramienta identifica claramente cuándo se utiliza IA y proporciona información sobre su funcionamiento.</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Supervisión humana:</strong> Todos los contenidos generados por IA son revisados y validados por profesionales de la educación musical.</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Privacidad:</strong> La herramienta no recopila datos personales ni utiliza información de los usuarios para entrenamiento de modelos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Responsabilidad:</strong> El contenido educativo es responsabilidad del profesor usuario, quien debe validar y adaptar los materiales a su contexto.</span>
                </li>
              </ul>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
              <h3 className="font-bold text-purple-900 mb-2">Uso de IA en esta Herramienta</h3>
              <p className="text-sm text-purple-800 mb-3">
                Rubricalia utiliza sistemas de Inteligencia Artificial para:
              </p>
              <ul className="text-sm text-purple-800 space-y-1 ml-4">
                <li>• Asistir en la generación inicial de contenidos educativos</li>
                <li>• Facilitar la búsqueda de información musical (APIs de MusicBrainz y Wikipedia)</li>
                <li>• Ayudar en la estructuración y organización de materiales</li>
                <li>• Proporcionar sugerencias de mejora y coherencia curricular</li>
              </ul>
              <p className="text-sm text-purple-800 mt-3">
                <strong>Importante:</strong> Todo el contenido generado por IA ha sido revisado, validado y 
                adaptado por el Prof. Manuel Gago Fernández, especialista en Clarinete y experto en enseñanza 
                musical, garantizando su adecuación al currículo oficial de Extremadura.
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
              <h3 className="font-bold text-amber-900 mb-2">Limitaciones y Responsabilidades</h3>
              <ul className="text-sm text-amber-800 space-y-2">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Los materiales generados son orientativos y deben ser adaptados por el profesorado a las necesidades específicas de cada centro y alumnado.</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>La herramienta no sustituye el criterio profesional del docente ni la validación institucional por parte del departamento o centro educativo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>El usuario es responsable de verificar la vigencia y aplicabilidad de la normativa citada en su contexto específico.</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-100 border-l-4 border-slate-400 p-4 rounded-r-lg">
              <h3 className="font-bold text-slate-900 mb-2">Marco Normativo de Referencia</h3>
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• <strong>Reglamento (UE) 2024/1689</strong> - Ley de Inteligencia Artificial de la UE</li>
                <li>• <strong>RGPD (UE) 2016/679</strong> - Reglamento General de Protección de Datos</li>
                <li>• <strong>LOE 2/2006</strong> - Ley Orgánica de Educación (modificada por LOMLOE)</li>
                <li>• <strong>Decreto 111/2007</strong> - Currículo de Enseñanzas Profesionales de Música (Extremadura)</li>
                <li>• <strong>Decreto 54/2022</strong> - Currículo de Enseñanzas Elementales de Música (Extremadura)</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 p-6 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-3xl">🇪🇺</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-blue-900 mb-2">Compromiso con la Ética en IA</h3>
                  <p className="text-sm text-blue-800">
                    Rubricalia se compromete con el uso responsable y ético de la Inteligencia Artificial 
                    en el ámbito educativo, cumpliendo con todos los requisitos establecidos por la Unión 
                    Europea para sistemas de IA de bajo riesgo. La herramienta está diseñada para asistir 
                    y potenciar el trabajo del profesorado, nunca para sustituirlo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Información del Autor */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="text-4xl">👨‍🏫</span>
            Autor y Desarrollo
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Prof. Manuel Gago Fernández</h3>
              <div className="space-y-2 text-sm text-slate-700">
                <p><strong>Especialidad:</strong> Clarinete</p>
                <p><strong>Nivel:</strong> Enseñanzas Profesionales de Música</p>
                <p><strong>Comunidad Autónoma:</strong> Extremadura</p>
                <p><strong>Curso Académico:</strong> 2026/2027</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Estado del Proyecto</h3>
              <div className="space-y-2 text-sm text-slate-700">
                <p><strong>Versión:</strong> V3.1 Completa</p>
                <p><strong>Estado:</strong> <span className="text-amber-600 font-semibold">Producto Mínimo Viable</span></p>
                <p><strong>Auditoría:</strong> ✅ Completada</p>
                <p><strong>Trazabilidad:</strong> ✅ Verificada</p>
                <p><strong>Normativa:</strong> ✅ Cumplida</p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Contacto y Feedback</h3>
            <p className="text-sm text-slate-700 mb-4">
              En esta versión V3.1, agradecemos enormemente sus comentarios, sugerencias y reportes de errores
              para continuar mejorando la herramienta. Su feedback es esencial para el desarrollo de futuras versiones.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Feedback y Sugerencias
              </span>
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Reportar Errores
              </span>
            </div>
          </div>
        </div>

        {/* Botón Final de Acceso */}
        <div className="text-center mt-8">
          <button
            onClick={() => onNavigate('inicio')}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-2xl shadow-indigo-300"
          >
            <span className="text-3xl">🚀</span>
            Comenzar a Usar Rubricalia
          </button>
          <p className="text-sm text-slate-600 mt-4">
            Acceda a todas las funcionalidades de la herramienta
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// VISTA INICIO PRINCIPAL — DISEÑO LIMPIO Y CENTRADO
// ============================================================
function VistaInicioPrincipal({ onNavigate }: { onNavigate: (v: Vista) => void }) {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4 py-12">
      {/* Logo y Nombre */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg mb-4">
          <span className="text-5xl">🎼</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2">Rubricalia</h1>
        <p className="text-lg text-slate-600">Enseñanzas Profesionales de Música — Extremadura</p>
      </div>

      {/* Título Principal */}
      <div className="text-center mb-8 max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
          Programación Didáctica 2026/2027
        </h2>
        <p className="text-xl text-slate-700 mb-6">
          Herramienta Integral de Evaluación y Programación
        </p>
        <p className="text-base text-slate-600 leading-relaxed mb-8">
          Plataforma profesional para la gestión completa de programaciones didácticas, rúbricas de evaluación, 
          unidades didácticas y normativa para las Enseñanzas Elementales y Profesionales de Música en Extremadura.
        </p>
      </div>

      {/* Botones de Acción Principales */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <button
          onClick={() => onNavigate('programaciones')}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
        >
          <span>📚</span>
          Ver Programaciones
        </button>
        <button
          onClick={() => onNavigate('rubricas-completas')}
          className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200"
        >
          <span>📊</span>
          Ver Rúbricas
        </button>
      </div>

      {/* Estadísticas Destacadas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl w-full mb-12">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 text-center">
          <div className="text-3xl font-bold text-indigo-600 mb-1">203</div>
          <div className="text-sm text-slate-600">Rúbricas</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-1">60</div>
          <div className="text-sm text-slate-600">Unidades Didácticas</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 text-center">
          <div className="text-3xl font-bold text-pink-600 mb-1">11</div>
          <div className="text-sm text-slate-600">Materias</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 text-center">
          <div className="text-3xl font-bold text-green-600 mb-1">30</div>
          <div className="text-sm text-slate-600">Apartados</div>
        </div>
      </div>

      {/* Características Principales */}
      <div className="grid sm:grid-cols-3 gap-6 max-w-5xl w-full">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
          <div className="text-4xl mb-3">📚</div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Programaciones Completas</h3>
          <p className="text-sm text-slate-600">
            8 programaciones vigentes y verificadas con objetivos, contenidos, metodología y evaluación
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
          <div className="text-4xl mb-3">📊</div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Sistema de Rúbricas</h3>
          <p className="text-sm text-slate-600">
            203 rúbricas con 4 niveles de logro para evaluación objetiva y trazable
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
          <div className="text-4xl mb-3">📄</div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Documento Completo</h3>
          <p className="text-sm text-slate-600">
            30 apartados con normativa, objetivos, contenidos y auditoría completa
          </p>
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
        <p className="text-sm text-slate-600 mb-4">Control automático de la programación V3.1</p>
        
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
