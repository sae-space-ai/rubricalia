/**
 * Servicio de APIs gratuitas para enriquecer contenido musical
 * - MusicBrainz: Base de datos de música (compositores, obras)
 * - Wikipedia: Contexto histórico y biografías
 */

export interface Composer {
  name: string;
  birthYear?: string;
  deathYear?: string;
  period?: string;
  description?: string;
  wikipediaUrl?: string;
}

export interface MusicalWork {
  title: string;
  composer: string;
  year?: string;
  genre?: string;
  description?: string;
}

/**
 * Busca información de un compositor en Wikipedia
 */
export async function searchComposer(name: string): Promise<Composer | null> {
  try {
    const response = await fetch(
      `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    
    return {
      name: data.title,
      description: data.extract,
      wikipediaUrl: data.content_urls?.desktop?.page
    };
  } catch (error) {
    console.error('Error buscando compositor:', error);
    return null;
  }
}

/**
 * Busca obras de un compositor en MusicBrainz
 */
export async function searchWorksByComposer(composerName: string): Promise<MusicalWork[]> {
  try {
    const response = await fetch(
      `https://musicbrainz.org/ws/2/work?query=artist:${encodeURIComponent(composerName)}&fmt=json&limit=10`
    );
    
    if (!response.ok) return [];
    
    const data = await response.json();
    
    return data.works?.map((work: any) => ({
      title: work.title,
      composer: composerName,
      year: work['first-release-date'] || undefined,
      genre: work.type || undefined
    })) || [];
  } catch (error) {
    console.error('Error buscando obras:', error);
    return [];
  }
}

/**
 * Obtiene información detallada de una obra musical
 */
export async function getWorkDetails(title: string, composer: string): Promise<MusicalWork | null> {
  try {
    const query = `${title} ${composer}`;
    const response = await fetch(
      `https://musicbrainz.org/ws/2/work?query=${encodeURIComponent(query)}&fmt=json&limit=1`
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    
    if (data.works && data.works.length > 0) {
      const work = data.works[0];
      return {
        title: work.title,
        composer: composer,
        year: work['first-release-date'] || undefined,
        genre: work.type || undefined,
        description: work.disambiguation || undefined
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error obteniendo detalles de obra:', error);
    return null;
  }
}

/**
 * Busca términos musicales en Wikipedia
 */
export async function searchMusicalTerm(term: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    return data.extract || null;
  } catch (error) {
    console.error('Error buscando término musical:', error);
    return null;
  }
}

/**
 * Obtiene una imagen aleatoria de un compositor desde Wikipedia
 */
export async function getComposerImage(name: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    return data.thumbnail?.source || null;
  } catch (error) {
    console.error('Error obteniendo imagen:', error);
    return null;
  }
}
