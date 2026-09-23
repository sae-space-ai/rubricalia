import { useState } from 'react';
import { searchComposer, searchWorksByComposer } from '../services/api';

interface ComposerInfoProps {
  composerName: string;
}

export default function ComposerInfo({ composerName }: ComposerInfoProps) {
  const [loading, setLoading] = useState(false);
  const [composer, setComposer] = useState<any>(null);
  const [works, setWorks] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setSearched(true);
    
    const composerData = await searchComposer(composerName);
    setComposer(composerData);
    
    const worksData = await searchWorksByComposer(composerName);
    setWorks(worksData);
    
    setLoading(false);
  };

  if (!searched) {
    return (
      <button
        onClick={handleSearch}
        className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
      >
        🔍 Buscar información en APIs musicales
      </button>
    );
  }

  if (loading) {
    return (
      <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-700">Buscando información en MusicBrainz y Wikipedia...</p>
      </div>
    );
  }

  return (
    <div className="mt-2 p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-bold text-blue-800">📚 Información de APIs Musicales</span>
        <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded">LIVE</span>
      </div>
      
      {composer && (
        <div className="mb-3">
          <h4 className="text-xs font-semibold text-slate-800 mb-1">
            {composer.name} (Wikipedia)
          </h4>
          {composer.description && (
            <p className="text-xs text-slate-700 leading-relaxed">
              {composer.description.substring(0, 200)}...
            </p>
          )}
          {composer.wikipediaUrl && (
            <a
              href={composer.wikipediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:text-blue-800 underline mt-1 inline-block"
            >
              Ver en Wikipedia →
            </a>
          )}
        </div>
      )}
      
      {works.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-slate-800 mb-1">
            Obras en MusicBrainz:
          </h4>
          <ul className="space-y-1">
            {works.slice(0, 5).map((work, i) => (
              <li key={i} className="text-xs text-slate-700">
                • {work.title} {work.year && <span className="text-slate-500">({work.year})</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {!composer && works.length === 0 && (
        <p className="text-xs text-slate-600">
          No se encontró información adicional en las APIs.
        </p>
      )}
      
      <div className="mt-2 pt-2 border-t border-blue-200">
        <p className="text-[10px] text-slate-500">
          Datos obtenidos de MusicBrainz y Wikipedia (APIs gratuitas)
        </p>
      </div>
    </div>
  );
}
