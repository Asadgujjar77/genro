import { CONFIG } from './config';

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  source: string;
}

export async function searchWeb(query: string): Promise<SearchResult[]> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${CONFIG.GOOGLE_SEARCH_API_KEY}&cx=${CONFIG.GOOGLE_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }

    const data = await response.json();
    
    return data.items?.map((item: any) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      source: new URL(item.link).hostname
    })) || [];
  } catch (error) {
    console.error('Error searching web:', error);
    return [];
  }
}