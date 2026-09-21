import { useState, useRef } from 'react';
import {
  Subject,
  Course,
  CRITERIA,
  COMPETENCIES,
  CRITERIA_COMPETENCY_MAP,
  SUBJECT_NAMES,
  COURSE_NAMES,
  VALID_COURSES,
  ASSESSMENT_INSTRUMENTS,
  PEDAGOGICAL_NOTES,
  getRubricDescriptor,
} from './data';
import { exportRubricToXLSX } from './excelExport';

type View = 'home' | 'generator' | 'about';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [subject, setSubject] = useState<Subject | ''>('');
  const [course, setCourse] = useState<Course | ''>('');
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);
  const [instrument, setInstrument] = useState<string>('rubrica');
  const [generated, setGenerated] = useState(false);
  const [error, setError] = useState<string>('');
  const printRef = useRef<HTMLDivElement>(null);

  const handleSubjectChange = (s: Subject) => {
    setSubject(s);
    setCourse('');
    setSelectedCriteria([]);
    setGenerated(false);
    setError('');
  };

  const handleCourseChange = (c: Course) => {
    setCourse(c);
    setGenerated(false);
    setError('');
  };

  const toggleCriterion = (code: string) => {
    setSelectedCriteria(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
    setGenerated(false);
  };

  const selectAllCriteria = () => {
    if (selectedCriteria.length === CRITERIA.length) {
      setSelectedCriteria([]);
    } else {
      setSelectedCriteria(CRITERIA.map(c => c.code));
    }
    setGenerated(false);
  };

  const handleGenerate = () => {
    if (!subject) {
      setError('Debe seleccionar una materia.');
      return;
    }
    if (!course) {
      setError('Debe seleccionar un curso.');
      return;
    }
    if (selectedCriteria.length === 0) {
      setError('Debe seleccionar al menos un criterio de evaluación.');
      return;
    }
    setError('');
    setGenerated(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setSubject('');
    setCourse('');
    setSelectedCriteria([]);
    setInstrument('rubrica');
    setGenerated(false);
    setError('');
  };

  const getCompetenciesForCriteria = (criteria: string[]) => {
    const comps = new Set<string>();
    criteria.forEach(c => {
      CRITERIA_COMPETENCY_MAP[c]?.forEach(cm => comps.add(cm));
    });
    return Array.from(comps).sort();
  };

  const getRubricTitle = () => {
    if (!subject || !course) return '';
    const subjectName = SUBJECT_NAMES[subject];
    const courseName = COURSE_NAMES[course];
    const criteriaNames = selectedCriteria.map(c => CRITERIA.find(cr => cr.code === c)?.name).join(', ');
    return `Rúbrica de Evaluación — ${subjectName} — ${courseName}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-slate-200 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800 leading-tight">Arquitecto de Rúbricas</h1>
                <p className="text-xs text-slate-500">Enseñanzas Profesionales de Música — Extremadura</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setView('home')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === 'home' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Inicio
              </button>
              <button
                onClick={() => setView('generator')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === 'generator' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Generador
              </button>
              <button
                onClick={() => setView('about')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === 'about' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Información
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'home' && <HomeView onNavigate={() => setView('generator')} />}
        {view === 'generator' && (
          <GeneratorView
            subject={subject}
            course={course}
            selectedCriteria={selectedCriteria}
            instrument={instrument}
            generated={generated}
            error={error}
            printRef={printRef}
            onSubjectChange={handleSubjectChange}
            onCourseChange={handleCourseChange}
            onToggleCriterion={toggleCriterion}
            onSelectAll={selectAllCriteria}
            onInstrumentChange={setInstrument}
            onGenerate={handleGenerate}
            onPrint={handlePrint}
            onReset={handleReset}
            getRubricTitle={getRubricTitle}
            getCompetenciesForCriteria={getCompetenciesForCriteria}
          />
        )}
        {view === 'about' && <AboutView />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-slate-500">
            Basado en la Programación Didáctica 2026/2027 — Enseñanzas Profesionales de Música — Extremadura
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Instrumento de apoyo para la evaluación por competencias en Música de Cámara, Banda y Orquesta
          </p>
        </div>
      </footer>
    </div>
  );
}

// ============================================================
// HOME VIEW
// ============================================================
function HomeView({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="text-center py-12">
        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Programación Didáctica 2026/2027
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
          Generador de Rúbricas de Evaluación
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
          Herramienta profesional para la creación de rúbricas analíticas, listas de cotejo e instrumentos de evaluación
          para las Enseñanzas Profesionales de Música en Extremadura.
        </p>
        <button
          onClick={onNavigate}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
        >
          Crear Rúbrica
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          }
          title="12 Criterios de Evaluación"
          description="Desde CO-01 (Preparación) hasta CO-12 (Revisión y transferencia), con descriptores progresivos adaptados a cada curso."
        />
        <FeatureCard
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          }
          title="4 Niveles de Logro"
          description="Inicial, En desarrollo, Adecuado y Consolidado, conforme al Bloque XVII de la Programación Didáctica."
        />
        <FeatureCard
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
          title="3 Materias, 6 Cursos"
          description="Música de Cámara (4.º-6.º), Banda (1.º-6.º) y Orquesta (1.º-6.º) con descriptores específicos por nivel."
        />
      </div>

      {/* Subjects overview */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Materias Disponibles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <SubjectCard
            name="Música de Cámara"
            courses="4.º, 5.º y 6.º curso"
            description="Formación en pequeño grupo con énfasis en la escucha mutua, el equilibrio sonoro y la interpretación conjunta."
            color="purple"
          />
          <SubjectCard
            name="Banda"
            courses="1.º a 6.º curso"
            description="Formación en conjunto de viento y percusión, trabajando la coordinación, el balance entre secciones y la adaptación."
            color="blue"
          />
          <SubjectCard
            name="Orquesta"
            courses="1.º a 6.º curso"
            description="Formación en la gran formación sinfónica, con énfasis en la lectura de partitura, la dirección y la integración en el tutti."
            color="emerald"
          />
        </div>
      </div>

      {/* Competencies */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Competencias Musicales (Bloque V)</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPETENCIES.map(comp => (
            <div key={comp.code} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 text-xs font-bold shrink-0">
                {comp.code}
              </span>
              <span className="text-sm text-slate-700 font-medium">{comp.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
}

function SubjectCard({ name, courses, description, color }: { name: string; courses: string; description: string; color: string }) {
  const colorClasses: Record<string, string> = {
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  };
  return (
    <div className={`rounded-xl border p-5 ${colorClasses[color]}`}>
      <h3 className="text-lg font-bold mb-1">{name}</h3>
      <p className="text-sm font-medium opacity-80 mb-3">{courses}</p>
      <p className="text-sm opacity-70">{description}</p>
    </div>
  );
}

// ============================================================
// GENERATOR VIEW
// ============================================================
interface GeneratorViewProps {
  subject: Subject | '';
  course: Course | '';
  selectedCriteria: string[];
  instrument: string;
  generated: boolean;
  error: string;
  printRef: React.RefObject<HTMLDivElement>;
  onSubjectChange: (s: Subject) => void;
  onCourseChange: (c: Course) => void;
  onToggleCriterion: (code: string) => void;
  onSelectAll: () => void;
  onInstrumentChange: (i: string) => void;
  onGenerate: () => void;
  onPrint: () => void;
  onReset: () => void;
  getRubricTitle: () => string;
  getCompetenciesForCriteria: (criteria: string[]) => string[];
}

function GeneratorView({
  subject,
  course,
  selectedCriteria,
  instrument,
  generated,
  error,
  printRef,
  onSubjectChange,
  onCourseChange,
  onToggleCriterion,
  onSelectAll,
  onInstrumentChange,
  onGenerate,
  onPrint,
  onReset,
  getRubricTitle,
  getCompetenciesForCriteria,
}: GeneratorViewProps) {
  return (
    <div className="space-y-8">
      {/* Configuration Panel */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 print:hidden">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Configuración de la Rúbrica
        </h2>

        {/* Subject Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-3">1. Seleccione la materia</label>
          <div className="grid sm:grid-cols-3 gap-3">
            {(['camara', 'banda', 'orquesta'] as Subject[]).map(s => (
              <button
                key={s}
                onClick={() => onSubjectChange(s)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  subject === s
                    ? 'border-indigo-500 bg-indigo-50 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className={`text-sm font-bold ${subject === s ? 'text-indigo-700' : 'text-slate-800'}`}>
                  {SUBJECT_NAMES[s]}
                </div>
                <div className={`text-xs mt-1 ${subject === s ? 'text-indigo-600' : 'text-slate-500'}`}>
                  {s === 'camara' ? '4.º, 5.º y 6.º' : '1.º a 6.º curso'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Course Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-3">2. Seleccione el curso</label>
          {subject ? (
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {VALID_COURSES[subject].map(c => (
                <button
                  key={c}
                  onClick={() => onCourseChange(c)}
                  className={`p-3 rounded-lg border-2 text-center transition-all ${
                    course === c
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className={`text-sm font-semibold ${course === c ? 'text-indigo-700' : 'text-slate-700'}`}>
                    {c}.º
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 italic">Seleccione primero una materia.</p>
          )}
        </div>

        {/* Criteria Selection */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-semibold text-slate-700">3. Seleccione los criterios de evaluación</label>
            {subject && course && (
              <button
                onClick={onSelectAll}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
              >
                {selectedCriteria.length === CRITERIA.length ? 'Deseleccionar todos' : 'Seleccionar todos'}
              </button>
            )}
          </div>
          {subject && course ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {CRITERIA.map(c => (
                <button
                  key={c.code}
                  onClick={() => onToggleCriterion(c.code)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedCriteria.includes(c.code)
                      ? 'border-indigo-400 bg-indigo-50'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${
                      selectedCriteria.includes(c.code) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'
                    }`}>
                      {selectedCriteria.includes(c.code) && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <span className={`text-xs font-bold ${selectedCriteria.includes(c.code) ? 'text-indigo-700' : 'text-slate-600'}`}>
                        {c.code}
                      </span>
                      <span className={`text-xs ml-1.5 ${selectedCriteria.includes(c.code) ? 'text-indigo-600' : 'text-slate-500'}`}>
                        {c.name}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 italic">Seleccione materia y curso para ver los criterios.</p>
          )}
        </div>

        {/* Instrument Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-3">4. Instrumento de evaluación</label>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {ASSESSMENT_INSTRUMENTS.map(i => (
              <button
                key={i.id}
                onClick={() => onInstrumentChange(i.id)}
                className={`p-3 rounded-lg border text-left transition-all ${
                  instrument === i.id
                    ? 'border-indigo-400 bg-indigo-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className={`text-sm font-medium ${instrument === i.id ? 'text-indigo-700' : 'text-slate-700'}`}>
                  {i.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-slate-200">
          <button
            onClick={onGenerate}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Generar Rúbrica
          </button>
          <button
            onClick={onReset}
            className="inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-700 px-5 py-3 rounded-xl font-medium hover:bg-slate-50 transition-colors"
          >
            Limpiar
          </button>
        </div>
      </div>

      {/* Generated Rubric */}
      {generated && subject && course && (
        <div ref={printRef} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Export buttons */}
          <div className="flex justify-end gap-3 p-4 border-b border-slate-200 print:hidden">
            <button
              onClick={() => {
                if (subject && course) {
                  exportRubricToXLSX(subject, course, selectedCriteria, instrument);
                }
              }}
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Exportar a Excel (XLSX)
            </button>
            <button
              onClick={onPrint}
              className="inline-flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Imprimir / Exportar PDF
            </button>
          </div>

          {/* Rubric Header */}
          <div className="p-6 sm:p-8 border-b border-slate-200">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">{getRubricTitle()}</h2>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-50 rounded-lg p-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Nivel y Materia</span>
                <p className="text-sm font-medium text-slate-800 mt-1">
                  {COURSE_NAMES[course]} — {SUBJECT_NAMES[subject]}
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Instrumento</span>
                <p className="text-sm font-medium text-slate-800 mt-1">
                  {ASSESSMENT_INSTRUMENTS.find(i => i.id === instrument)?.name}
                </p>
              </div>
            </div>

            {/* Criteria */}
            <div className="mb-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Criterios de Evaluación</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedCriteria.map(code => {
                  const criterion = CRITERIA.find(c => c.code === code);
                  return (
                    <span key={code} className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-md text-xs font-medium">
                      {code}: {criterion?.name}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Competencies */}
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Competencias Abordadas</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {getCompetenciesForCriteria(selectedCriteria).map(code => {
                  const comp = COMPETENCIES.find(c => c.code === code);
                  return (
                    <span key={code} className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-md text-xs font-medium">
                      {code}: {comp?.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Rubric Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200 min-w-[150px]">
                    Criterio (CO)
                  </th>
                  <th className="text-left p-3 font-semibold text-red-700 border-b border-slate-200 min-w-[200px]">
                    Nivel 1: Inicial
                  </th>
                  <th className="text-left p-3 font-semibold text-amber-700 border-b border-slate-200 min-w-[200px]">
                    Nivel 2: En desarrollo
                  </th>
                  <th className="text-left p-3 font-semibold text-blue-700 border-b border-slate-200 min-w-[200px]">
                    Nivel 3: Adecuado
                  </th>
                  <th className="text-left p-3 font-semibold text-emerald-700 border-b border-slate-200 min-w-[200px]">
                    Nivel 4: Consolidado
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedCriteria.map((code, idx) => {
                  const criterion = CRITERIA.find(c => c.code === code);
                  const descriptors = getRubricDescriptor(subject, course, code);
                  return (
                    <tr key={code} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="p-3 border-b border-slate-100 align-top">
                        <div className="font-bold text-indigo-700 text-xs">{code}</div>
                        <div className="font-medium text-slate-800 text-xs mt-0.5">{criterion?.name}</div>
                      </td>
                      <td className="p-3 border-b border-slate-100 align-top text-xs text-slate-700 leading-relaxed">
                        {descriptors.nivel1}
                      </td>
                      <td className="p-3 border-b border-slate-100 align-top text-xs text-slate-700 leading-relaxed">
                        {descriptors.nivel2}
                      </td>
                      <td className="p-3 border-b border-slate-100 align-top text-xs text-slate-700 leading-relaxed">
                        {descriptors.nivel3}
                      </td>
                      <td className="p-3 border-b border-slate-100 align-top text-xs text-slate-700 leading-relaxed">
                        {descriptors.nivel4}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Scoring System */}
          <div className="p-6 sm:p-8 border-t border-slate-200 bg-slate-50">
            <h3 className="text-sm font-bold text-slate-800 mb-3">Sistema de Puntuación</h3>
            <div className="text-xs text-slate-700 space-y-2">
              <p>Cada criterio se puntúa de <strong>1</strong> (Inicial) a <strong>4</strong> (Consolidado).</p>
              <p><strong>Puntuación máxima</strong> = {selectedCriteria.length} criterios × 4 = <strong>{selectedCriteria.length * 4} puntos</strong></p>
              <p><strong>Nota final</strong> = (Suma total × 10) / {selectedCriteria.length * 4}</p>
              <div className="mt-3 bg-white rounded-lg p-3 border border-slate-200">
                <p className="font-medium text-slate-800 mb-1">Escala de calificación:</p>
                <ul className="space-y-1">
                  <li>• 1.0 – 3.9 → <span className="text-red-600 font-medium">Nivel Inicial (Insuficiente)</span></li>
                  <li>• 4.0 – 5.9 → <span className="text-amber-600 font-medium">Nivel En desarrollo (Suficiente)</span></li>
                  <li>• 6.0 – 7.9 → <span className="text-blue-600 font-medium">Nivel Adecuado (Notable)</span></li>
                  <li>• 8.0 – 10 → <span className="text-emerald-600 font-medium">Nivel Consolidado (Sobresaliente)</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pedagogical Notes */}
          <div className="p-6 sm:p-8 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 mb-3">Observaciones y Notas Pedagógicas</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              {PEDAGOGICAL_NOTES[subject]}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// ABOUT VIEW
// ============================================================
function AboutView() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Sobre esta Herramienta</h2>
        <div className="prose prose-slate text-sm space-y-4">
          <p>
            El <strong>Arquitecto de Rúbricas de Música</strong> es una herramienta profesional diseñada para facilitar
            la creación de instrumentos de evaluación por competencias en el contexto de las Enseñanzas Profesionales
            de Música en Extremadura.
          </p>
          <p>
            Esta herramienta se basa exclusivamente en la <strong>Programación Didáctica 2026/2027</strong> para las
            asignaturas de Música de Cámara, Banda y Orquesta, extrayendo los criterios de evaluación (CO-01 a CO-12),
            las competencias musicales (CM-1 a CM-7) y los niveles de logro establecidos en el Bloque XVII.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Marco Normativo</h2>
        <div className="text-sm text-slate-700 space-y-3">
          <p>Los instrumentos generados se fundamentan en:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Bloque V:</strong> Competencias específicas de la materia (CM-1 a CM-7).</li>
            <li><strong>Bloque X:</strong> Criterios de evaluación e instrumentos de evaluación (rúbricas, listas de cotejo, registros de aula, autoevaluación, coevaluación, evidencias audiovisuales).</li>
            <li><strong>Bloque XVII:</strong> Criterios de evaluación detallados (CO-01 a CO-12) y niveles de logro (Inicial, En desarrollo, Adecuado, Consolidado).</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Niveles de Logro</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <LevelCard
            level="Nivel 1: Inicial"
            color="red"
            description="Refleja dependencia, errores frecuentes y falta de autonomía. El estudiante necesita apoyo constante."
          />
          <LevelCard
            level="Nivel 2: En desarrollo"
            color="amber"
            description="Refleja comprensión básica con apoyo puntual. El estudiante muestra progreso pero necesita consolidación."
          />
          <LevelCard
            level="Nivel 3: Adecuado"
            color="blue"
            description="Refleja acción autónoma en situaciones habituales. El estudiante demuestra competencia en contextos conocidos."
          />
          <LevelCard
            level="Nivel 4: Consolidado"
            color="emerald"
            description="Refleja anticipación, flexibilidad, resolución de situaciones nuevas y transferibilidad de aprendizajes."
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Matriz de Materias y Cursos</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th className="p-3 text-left font-semibold text-slate-700">Materia</th>
                <th className="p-3 text-center font-semibold text-slate-700">1.º</th>
                <th className="p-3 text-center font-semibold text-slate-700">2.º</th>
                <th className="p-3 text-center font-semibold text-slate-700">3.º</th>
                <th className="p-3 text-center font-semibold text-slate-700">4.º</th>
                <th className="p-3 text-center font-semibold text-slate-700">5.º</th>
                <th className="p-3 text-center font-semibold text-slate-700">6.º</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="p-3 font-medium text-slate-800">Música de Cámara</td>
                <td className="p-3 text-center text-slate-400">—</td>
                <td className="p-3 text-center text-slate-400">—</td>
                <td className="p-3 text-center text-slate-400">—</td>
                <td className="p-3 text-center text-indigo-600 font-bold">✓</td>
                <td className="p-3 text-center text-indigo-600 font-bold">✓</td>
                <td className="p-3 text-center text-indigo-600 font-bold">✓</td>
              </tr>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <td className="p-3 font-medium text-slate-800">Banda</td>
                <td className="p-3 text-center text-emerald-600 font-bold">✓</td>
                <td className="p-3 text-center text-emerald-600 font-bold">✓</td>
                <td className="p-3 text-center text-emerald-600 font-bold">✓</td>
                <td className="p-3 text-center text-emerald-600 font-bold">✓</td>
                <td className="p-3 text-center text-emerald-600 font-bold">✓</td>
                <td className="p-3 text-center text-emerald-600 font-bold">✓</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-slate-800">Orquesta</td>
                <td className="p-3 text-center text-emerald-600 font-bold">✓</td>
                <td className="p-3 text-center text-emerald-600 font-bold">✓</td>
                <td className="p-3 text-center text-emerald-600 font-bold">✓</td>
                <td className="p-3 text-center text-emerald-600 font-bold">✓</td>
                <td className="p-3 text-center text-emerald-600 font-bold">✓</td>
                <td className="p-3 text-center text-emerald-600 font-bold">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-indigo-50 rounded-2xl border border-indigo-200 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-indigo-900 mb-3">Principios Pedagógicos</h2>
        <ul className="text-sm text-indigo-800 space-y-2">
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span><strong>Evaluación continua y formativa:</strong> Los instrumentos están diseñados para acompañar el proceso de aprendizaje, no solo para certificar resultados.</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span><strong>Descriptores observables:</strong> Cada nivel describe lo que el estudiante hace o demuestra, utilizando verbos de acción.</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span><strong>Progresión por cursos:</strong> Las expectativas se adaptan al nivel de madurez musical esperado en cada curso.</span>
          </li>
          <li className="flex items-start gap-2">
            <svg className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span><strong>Participación del estudiante:</strong> Se fomenta la autoevaluación y coevaluación como herramientas de reflexión metacognitiva.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function LevelCard({ level, color, description }: { level: string; color: string; description: string }) {
  const colorClasses: Record<string, string> = {
    red: 'bg-red-50 border-red-200',
    amber: 'bg-amber-50 border-amber-200',
    blue: 'bg-blue-50 border-blue-200',
    emerald: 'bg-emerald-50 border-emerald-200',
  };
  const textClasses: Record<string, string> = {
    red: 'text-red-800',
    amber: 'text-amber-800',
    blue: 'text-blue-800',
    emerald: 'text-emerald-800',
  };
  return (
    <div className={`rounded-lg border p-4 ${colorClasses[color]}`}>
      <h4 className={`font-bold text-sm mb-2 ${textClasses[color]}`}>{level}</h4>
      <p className="text-xs text-slate-700">{description}</p>
    </div>
  );
}
