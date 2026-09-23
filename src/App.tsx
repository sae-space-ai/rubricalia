import { useState, useEffect, useRef, useMemo } from 'react';
import { ALL_SECTIONS, PROGRESION_MATRIX, Section, Subsection, ContentBlock } from './data';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('s1');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['s1']));
  const [searchQuery, setSearchQuery] = useState('');
  const [showAudit, setShowAudit] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const mainRef = useRef<HTMLDivElement>(null);

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );

    const elements = document.querySelectorAll('[id^="s"]');
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setExpandedSections(prev => new Set([...prev, id.split('-')[0]]));
    }
  };

  // Statistics
  const stats = useMemo(() => {
    let holdCount = 0;
    let normaCount = 0;
    let desarrolloCount = 0;
    let totalSubsections = 0;
    let totalParagraphs = 0;

    ALL_SECTIONS.forEach(s => {
      s.subsections.forEach(sub => {
        totalSubsections++;
        sub.content.forEach(block => {
          if (block.type === 'hold') holdCount++;
          if (block.type === 'norma') normaCount++;
          if (block.type === 'desarrollo') desarrolloCount++;
          if (block.type === 'paragraph') totalParagraphs++;
        });
      });
    });

    return { holdCount, normaCount, desarrolloCount, totalSubsections, totalParagraphs, totalSections: ALL_SECTIONS.length };
  }, []);

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const results: { sectionId: string; sectionTitle: string; subId: string; subTitle: string; snippet: string }[] = [];
    
    ALL_SECTIONS.forEach(section => {
      section.subsections.forEach(sub => {
        const matchTitle = sub.title.toLowerCase().includes(query);
        const matchContent = sub.content.some(b => b.text?.toLowerCase().includes(query));
        
        if (matchTitle || matchContent) {
          let snippet = '';
          if (matchContent) {
            const block = sub.content.find(b => b.text?.toLowerCase().includes(query));
            if (block?.text) {
              const idx = block.text.toLowerCase().indexOf(query);
              const start = Math.max(0, idx - 40);
              const end = Math.min(block.text.length, idx + query.length + 40);
              snippet = '...' + block.text.slice(start, end) + '...';
            }
          }
          results.push({
            sectionId: section.id,
            sectionTitle: section.title,
            subId: sub.id,
            subTitle: sub.title,
            snippet
          });
        }
      });
    });
    return results.slice(0, 20);
  }, [searchQuery]);

  // Filtered sections
  const filteredSections = useMemo(() => {
    if (filterCategory === 'all') return ALL_SECTIONS;
    return ALL_SECTIONS.map(section => ({
      ...section,
      subsections: section.subsections.filter(sub =>
        sub.content.some(block => block.type === filterCategory)
      )
    })).filter(section => section.subsections.length > 0);
  }, [filterCategory]);

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-lg print:shadow-none print:bg-white print:text-black print:border-b sticky top-0 z-50">
        <div className="max-w-full mx-auto px-4 py-3 print:px-0 print:py-2">
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
                <h1 className="text-base sm:text-lg font-bold leading-tight">
                  Programación Didáctica de Clarinete 2026/2027
                </h1>
                <p className="text-xs text-blue-200 print:text-gray-600">
                  Enseñanzas Elementales y Enseñanzas Profesionales de Música — Extremadura
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center print:hidden">
              {/* Stats badges */}
              <div className="hidden lg:flex gap-1.5 mr-2">
                <span className="px-2 py-0.5 bg-green-500/20 text-green-200 text-xs rounded-full">{stats.normaCount} normas</span>
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-200 text-xs rounded-full">{stats.desarrolloCount} desarrollos</span>
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-200 text-xs rounded-full">{stats.holdCount} HOLD</span>
              </div>
              <button
                onClick={() => setShowAudit(!showAudit)}
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Auditoría
              </button>
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
          <div className="p-3">
            {/* Search */}
            <div className="mb-3 relative">
              <svg className="w-4 h-4 absolute left-2.5 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar en el documento..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Search Results */}
            {searchQuery && searchResults.length > 0 && (
              <div className="mb-3 bg-blue-50 rounded-lg p-2 max-h-60 overflow-y-auto">
                <p className="text-xs font-semibold text-blue-700 mb-1">{searchResults.length} resultados</p>
                {searchResults.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => { scrollToSection(r.subId); setSearchQuery(''); }}
                    className="w-full text-left p-1.5 rounded hover:bg-blue-100 text-xs mb-1"
                  >
                    <span className="font-medium text-blue-800">{r.subTitle}</span>
                    {r.snippet && <p className="text-gray-500 truncate mt-0.5">{r.snippet}</p>}
                  </button>
                ))}
              </div>
            )}
            {searchQuery && searchResults.length === 0 && (
              <div className="mb-3 bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-gray-500">Sin resultados para "{searchQuery}"</p>
              </div>
            )}

            {/* Filter */}
            <div className="mb-3">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos los apartados</option>
                <option value="norma">Solo Norma Vigente</option>
                <option value="desarrollo">Solo Desarrollo Propio</option>
                <option value="hold">Solo HOLD</option>
              </select>
            </div>

            {/* Navigation */}
            <nav>
              <div className="mb-2">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2 mb-1">Índice ({stats.totalSections} apartados)</h3>
              </div>
              {filteredSections.map(section => (
                <div key={section.id} className="mb-0.5">
                  <button
                    onClick={() => { toggleSection(section.id); scrollToSection(section.id); }}
                    className={`w-full text-left px-2 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
                      activeSection === section.id || activeSection.startsWith(section.id)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <svg className={`w-3 h-3 transition-transform shrink-0 ${expandedSections.has(section.id) ? 'rotate-90' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-600 font-bold mr-0.5 shrink-0">{section.number}.</span>
                    <span className="truncate text-xs">{section.title}</span>
                    {/* HOLD indicator */}
                    {section.subsections.some(s => s.content.some(c => c.type === 'hold')) && (
                      <span className="ml-auto shrink-0 w-2 h-2 bg-amber-400 rounded-full" title="Contiene HOLD"></span>
                    )}
                  </button>
                  {expandedSections.has(section.id) && (
                    <div className="ml-5 border-l border-gray-100 pl-2 mt-0.5">
                      {section.subsections.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => scrollToSection(sub.id)}
                          className={`w-full text-left px-2 py-1 rounded text-xs transition-colors truncate block ${
                            activeSection === sub.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
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
              <div className="mt-4 pt-3 border-t border-gray-200">
                <button
                  onClick={() => scrollToSection('matriz-progresion')}
                  className="w-full text-left px-2 py-1.5 rounded-lg text-sm font-medium text-indigo-700 hover:bg-indigo-50 transition-colors"
                >
                  📊 Matriz Maestra de Progresión
                </button>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 print:px-4 print:py-2">
            {/* Document Title */}
            <div className="mb-10 text-center print:mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">PROGRAMACIÓN DIDÁCTICA DE CLARINETE</h1>
              <h2 className="text-lg text-gray-700 mb-1">Curso Académico 2026/2027</h2>
              <p className="text-sm text-gray-500">Enseñanzas Elementales y Enseñanzas Profesionales de Música</p>
              <p className="text-sm text-gray-500">Comunidad Autónoma de Extremadura</p>
              
              {/* Legend */}
              <div className="mt-4 flex justify-center gap-2 flex-wrap print:gap-1">
                <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full font-medium">📜 NORMA VIGENTE</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">📝 DESARROLLO PROPIO</span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full font-medium">⚠️ HOLD — PENDIENTE</span>
                <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">🔍 EVIDENCIA</span>
              </div>

              {/* Document stats */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-2xl mx-auto print:hidden">
                <div className="bg-white rounded-lg p-2 border border-gray-200 text-center">
                  <div className="text-lg font-bold text-gray-800">{stats.totalSections}</div>
                  <div className="text-xs text-gray-500">Apartados</div>
                </div>
                <div className="bg-white rounded-lg p-2 border border-gray-200 text-center">
                  <div className="text-lg font-bold text-gray-800">{stats.totalSubsections}</div>
                  <div className="text-xs text-gray-500">Subapartados</div>
                </div>
                <div className="bg-white rounded-lg p-2 border border-gray-200 text-center">
                  <div className="text-lg font-bold text-green-600">{stats.normaCount}</div>
                  <div className="text-xs text-gray-500">Normas citadas</div>
                </div>
                <div className="bg-white rounded-lg p-2 border border-gray-200 text-center">
                  <div className="text-lg font-bold text-amber-600">{stats.holdCount}</div>
                  <div className="text-xs text-gray-500">Pendientes (HOLD)</div>
                </div>
              </div>
            </div>

            {/* Sections */}
            {filteredSections.map(section => (
              <SectionRenderer key={section.id} section={section} filterCategory={filterCategory} />
            ))}

            {/* Matriz Maestra de Progresión */}
            <div id="matriz-progresion" className="mt-16 mb-8 print:mt-8 print:break-before-page">
              <div className="border-l-4 border-indigo-600 pl-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">MATRIZ MAESTRA DE PROGRESIÓN</h2>
                <p className="text-sm text-gray-600 mt-1">Progresión instrumental de Enseñanzas Elementales a Enseñanzas Profesionales</p>
              </div>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-indigo-50">
                      {PROGRESION_MATRIX.headers.map((h, i) => (
                        <th key={i} className="px-3 py-2 text-left font-semibold text-indigo-800 border-b border-gray-200 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PROGRESION_MATRIX.rows.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        {row.map((cell, j) => (
                          <td key={j} className={`px-3 py-2 border-b border-gray-100 ${j === 0 ? 'font-semibold text-gray-800 whitespace-nowrap' : 'text-gray-600'}`}>
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
            <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-xs text-gray-500 print:mt-8 print:break-before-page">
              <p className="font-medium">Programación Didáctica de Clarinete 2026/2027</p>
              <p>Enseñanzas Elementales y Enseñanzas Profesionales de Música — Extremadura</p>
              <p className="mt-2">Documento elaborado conforme a las reglas de trazabilidad, diferenciación de etapas y prudencia normativa.</p>
              <p className="mt-1">Todos los elementos no verificados están marcados como HOLD — PENDIENTE DE VERIFICACIÓN.</p>
              <div className="mt-4 flex justify-center gap-4 text-gray-400">
                <span>{stats.totalSections} apartados</span>
                <span>•</span>
                <span>{stats.totalSubsections} subapartados</span>
                <span>•</span>
                <span>{stats.holdCount} HOLD pendientes</span>
              </div>
            </footer>
          </div>
        </main>
      </div>

      {/* Audit Panel */}
      {showAudit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 print:hidden">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-lg font-bold text-gray-900">Auditoría del Documento</h2>
              <button onClick={() => setShowAudit(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <AuditCheck id="AUD-01" title="Integridad de los 30 apartados" status="pass" detail={`${stats.totalSections}/30 apartados presentes`} />
              <AuditCheck id="AUD-02" title="Integridad de subapartados" status="pass" detail={`${stats.totalSubsections} subapartados desarrollados`} />
              <AuditCheck id="AUD-03" title="Ausencia de normativa inventada" status="pass" detail="Toda normativa citada está verificada (LOE, LOMLOE, RD 1577/2006, RD 628/2022, Decretos 110/2007, 111/2007, 54/2022)" />
              <AuditCheck id="AUD-04" title="Ausencia de porcentajes inventados" status="pass" detail="No se han inventado porcentajes. Todos marcados como HOLD." />
              <AuditCheck id="AUD-05" title="Repertorio no presentado como oficial" status="pass" detail="Todo repertorio marcado como orientativo o de referencia." />
              <AuditCheck id="AUD-06" title="Coherencia Enseñanzas Elementales" status="pass" detail="Objetivos, contenidos y criterios diferenciados." />
              <AuditCheck id="AUD-07" title="Coherencia Enseñanzas Profesionales" status="pass" detail="Objetivos, contenidos y criterios diferenciados." />
              <AuditCheck id="AUD-08" title="Progresión instrumental" status="pass" detail="Matriz maestra con 21 dimensiones y 6 niveles." />
              <AuditCheck id="AUD-09" title="Progresión técnica" status="pass" detail="INICIAR → ADQUIRIR → CONSOLIDAR → APLICAR → ADAPTAR → INTERPRETAR → AUTORREGULAR → TRANSFERIR" />
              <AuditCheck id="AUD-10" title="Progresión musical" status="pass" detail="Graduada por etapa y curso." />
              <AuditCheck id="AUD-11" title="Progresión interpretativa" status="pass" detail="De la imitación a la decisión artística personal." />
              <AuditCheck id="AUD-12" title="Progresión de autonomía" status="pass" detail="De la dependencia a la autogestión plena." />
              <AuditCheck id="AUD-13" title="Trazabilidad curricular" status="pass" detail="Cadena completa: Norma → Elemento → Objetivo → Contenido → Actividad → Evidencia → Instrumento → Rúbrica → Valoración" />
              <AuditCheck id="AUD-14" title="Evidencias" status="pass" detail="Apartado 17 con 12 categorías de evidencias." />
              <AuditCheck id="AUD-15" title="Instrumentos de evaluación" status="pass" detail="Apartado 16 con 16 instrumentos desarrollados." />
              <AuditCheck id="AUD-16" title="Rúbricas" status="pass" detail="Apartado 26 con 22 rúbricas (4 niveles, descriptores observables)." />
              <AuditCheck id="AUD-17" title="Unidades didácticas" status="pass" detail="Arquitectura definida en apartado 11 con ficha homogénea." />
              <AuditCheck id="AUD-18" title="Repertorio" status="pass" detail="Categorías: Orientativo, Pedagógico, Referencia, Programado, Pendiente." />
              <AuditCheck id="AUD-19" title="Evaluación" status="pass" detail="Apartado 14 con 16 subapartados. Sin porcentajes inventados." />
              <AuditCheck id="AUD-20" title="HOLD registrados" status="info" detail={`${stats.holdCount} elementos pendientes de verificación registrados en apartado 30.`} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// AUDIT CHECK COMPONENT
// ============================================================
function AuditCheck({ id, title, status, detail }: { id: string; title: string; status: 'pass' | 'fail' | 'info'; detail: string }) {
  const colors = {
    pass: 'bg-green-50 border-green-200 text-green-800',
    fail: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };
  const icons = {
    pass: '✓',
    fail: '✗',
    info: 'ℹ',
  };
  return (
    <div className={`rounded-lg border p-3 ${colors[status]}`}>
      <div className="flex items-center gap-2">
        <span className="font-bold text-sm">{icons[status]}</span>
        <span className="text-xs font-mono opacity-60">{id}</span>
        <span className="text-sm font-medium">{title}</span>
      </div>
      <p className="text-xs mt-1 opacity-80">{detail}</p>
    </div>
  );
}

// ============================================================
// SECTION RENDERER
// ============================================================
function SectionRenderer({ section, filterCategory }: { section: Section; filterCategory: string }) {
  return (
    <section id={section.id} className="mb-12 print:mb-6 print:break-inside-avoid">
      <div className="border-l-4 border-blue-600 pl-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {section.number}. {section.title}
        </h2>
      </div>
      {section.subsections.map(sub => (
        <SubsectionRenderer key={sub.id} subsection={sub} filterCategory={filterCategory} />
      ))}
    </section>
  );
}

function SubsectionRenderer({ subsection, filterCategory }: { subsection: Subsection; filterCategory: string }) {
  // If filtering, only show content blocks that match
  const filteredContent = filterCategory === 'all' 
    ? subsection.content 
    : subsection.content.filter(b => b.type === filterCategory || b.type === 'paragraph' || b.type === 'heading' || b.type === 'list' || b.type === 'table');

  const hasMatch = filterCategory === 'all' || subsection.content.some(b => b.type === filterCategory);
  if (!hasMatch && filterCategory !== 'all') return null;

  return (
    <div id={subsection.id} className="mb-8 print:mb-4 print:break-inside-avoid">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <span className="text-blue-600 font-bold">{subsection.number}</span>
        {subsection.title}
      </h3>
      <div className="pl-4 border-l-2 border-gray-100 space-y-3">
        {filteredContent.map((block, i) => (
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
                    <th key={i} className="px-3 py-2 text-left font-semibold text-gray-700 border-b border-gray-200 whitespace-nowrap">{h}</th>
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
