import { useState, useRef } from 'react';
import { ALL_SECTIONS, PROGRESION_MATRIX, Section, Subsection, ContentBlock } from './data';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('s1');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['s1']));
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-lg print:shadow-none print:bg-white print:text-black print:border-b">
        <div className="max-w-full mx-auto px-4 py-4 print:px-0 print:py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-white/10 print:hidden"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-lg sm:text-xl font-bold leading-tight">
                  Programación Didáctica de Clarinete 2026/2027
                </h1>
                <p className="text-xs sm:text-sm text-blue-200 print:text-gray-600">
                  Enseñanzas Elementales y Enseñanzas Profesionales de Música — Extremadura
                </p>
              </div>
            </div>
            <div className="flex gap-2 print:hidden">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Imprimir
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} transition-all duration-300 bg-white border-r border-gray-200 overflow-y-auto overflow-x-hidden print:hidden shrink-0`}>
          <nav className="p-3">
            <div className="mb-3">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2 mb-2">Índice</h3>
            </div>
            {ALL_SECTIONS.map(section => (
              <div key={section.id} className="mb-0.5">
                <button
                  onClick={() => { toggleSection(section.id); scrollToSection(section.id); }}
                  className={`w-full text-left px-2 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                    activeSection === section.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <svg className={`w-3 h-3 transition-transform ${expandedSections.has(section.id) ? 'rotate-90' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-600 font-bold mr-1">{section.number}.</span>
                  <span className="truncate">{section.title}</span>
                </button>
                {expandedSections.has(section.id) && (
                  <div className="ml-5 border-l border-gray-100 pl-2 mt-0.5">
                    {section.subsections.map(sub => (
                      <button
                        key={sub.id}
                        onClick={() => scrollToSection(sub.id)}
                        className="w-full text-left px-2 py-1 rounded text-xs text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors truncate block"
                      >
                        <span className="text-gray-400 mr-1">{sub.number}</span>
                        {sub.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Matriz de Progresión */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => scrollToSection('matriz-progresion')}
                className="w-full text-left px-2 py-1.5 rounded-lg text-sm font-medium text-indigo-700 hover:bg-indigo-50 transition-colors"
              >
                📊 Matriz Maestra de Progresión
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main ref={contentRef} className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 print:px-4 print:py-2">
            {/* Document Title */}
            <div className="mb-10 text-center print:mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">PROGRAMACIÓN DIDÁCTICA DE CLARINETE</h1>
              <h2 className="text-xl text-gray-700 mb-1">Curso Académico 2026/2027</h2>
              <p className="text-sm text-gray-500">Enseñanzas Elementales y Enseñanzas Profesionales de Música</p>
              <p className="text-sm text-gray-500">Comunidad Autónoma de Extremadura</p>
              <div className="mt-4 flex justify-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full font-medium">NORMA VIGENTE</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">DESARROLLO PROPIO</span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full font-medium">HOLD — PENDIENTE</span>
              </div>
            </div>

            {/* Sections */}
            {ALL_SECTIONS.map(section => (
              <SectionRenderer key={section.id} section={section} />
            ))}

            {/* Matriz Maestra de Progresión */}
            <div id="matriz-progresion" className="mt-16 mb-8">
              <div className="border-l-4 border-indigo-600 pl-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">MATRIZ MAESTRA DE PROGRESIÓN</h2>
                <p className="text-sm text-gray-600 mt-1">Progresión instrumental de Enseñanzas Elementales a Enseñanzas Profesionales</p>
              </div>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-indigo-50">
                      {PROGRESION_MATRIX.headers.map((h, i) => (
                        <th key={i} className="px-3 py-2 text-left font-semibold text-indigo-800 border-b border-gray-200">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PROGRESION_MATRIX.rows.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        {row.map((cell, j) => (
                          <td key={j} className={`px-3 py-2 border-b border-gray-100 ${j === 0 ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-xs text-gray-500 print:mt-8">
              <p>Programación Didáctica de Clarinete 2026/2027</p>
              <p>Enseñanzas Elementales y Enseñanzas Profesionales de Música — Extremadura</p>
              <p className="mt-2">Documento elaborado conforme a las reglas de trazabilidad, diferenciación de etapas y prudencia normativa.</p>
              <p className="mt-1">Todos los elementos no verificados están marcados como HOLD.</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

// ============================================================
// SECTION RENDERER
// ============================================================
function SectionRenderer({ section }: { section: Section }) {
  return (
    <section id={section.id} className="mb-12 print:mb-6 print:break-inside-avoid">
      <div className="border-l-4 border-blue-600 pl-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {section.number}. {section.title}
        </h2>
      </div>
      {section.subsections.map(sub => (
        <SubsectionRenderer key={sub.id} subsection={sub} />
      ))}
    </section>
  );
}

function SubsectionRenderer({ subsection }: { subsection: Subsection }) {
  return (
    <div id={subsection.id} className="mb-8 print:mb-4 print:break-inside-avoid">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <span className="text-blue-600 font-bold">{subsection.number}</span>
        {subsection.title}
      </h3>
      <div className="pl-4 border-l-2 border-gray-100 space-y-3">
        {subsection.content.map((block, i) => (
          <ContentBlockRenderer key={i} block={block} />
        ))}
      </div>
    </div>
  );
}

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'heading':
      if (block.level === 'h4') {
        return <h4 className="font-semibold text-gray-700 text-sm mt-2">{block.text}</h4>;
      }
      return <p className="font-medium text-gray-700">{block.text}</p>;

    case 'paragraph':
      return <p className="text-sm text-gray-700 leading-relaxed">{block.text}</p>;

    case 'list':
      return (
        <ul className="list-disc pl-5 space-y-1">
          {block.items?.map((item, i) => (
            <li key={i} className="text-sm text-gray-700">{item}</li>
          ))}
        </ul>
      );

    case 'table':
      return (
        <div className="overflow-x-auto rounded border border-gray-200 my-3">
          <table className="w-full text-xs">
            {block.headers && (
              <thead>
                <tr className="bg-gray-50">
                  {block.headers.map((h, i) => (
                    <th key={i} className="px-3 py-2 text-left font-semibold text-gray-700 border-b border-gray-200">{h}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {block.rows?.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-3 py-2 border-b border-gray-100 text-gray-700">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'hold':
      return (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 my-2">
          <div className="flex items-start gap-2">
            <span className="text-amber-600 font-bold text-xs shrink-0 mt-0.5">⚠️ HOLD</span>
            <p className="text-xs text-amber-800 leading-relaxed">{block.text}</p>
          </div>
        </div>
      );

    case 'norma':
      return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 my-2">
          <div className="flex items-start gap-2">
            <span className="text-green-600 font-bold text-xs shrink-0 mt-0.5">📜 {block.category}</span>
            <p className="text-xs text-green-800 leading-relaxed">{block.text}</p>
          </div>
        </div>
      );

    case 'desarrollo':
      return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 my-2">
          <div className="flex items-start gap-2">
            <span className="text-blue-600 font-bold text-xs shrink-0 mt-0.5">📝 DESARROLLO PROPIO</span>
            <p className="text-xs text-blue-800 leading-relaxed">{block.text}</p>
          </div>
        </div>
      );

    case 'evidence':
      return (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 my-2">
          <div className="flex items-start gap-2">
            <span className="text-purple-600 font-bold text-xs shrink-0 mt-0.5">🔍 EVIDENCIA</span>
            <p className="text-xs text-purple-800 leading-relaxed">{block.text}</p>
          </div>
        </div>
      );

    default:
      return null;
  }
}
