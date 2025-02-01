const UNSPLASH_API_KEY = 'yAIFvoWhNukc_9V4svgOmV-mF2PXbW-wImWgwZyiIy8';

export async function searchImages(query: string) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=9&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
  
    const data = await response.json();
    return data.results.map((img: any) => ({
      id: img.id,
      url: img.urls.regular + '&w=800', // Optimize image size
      thumb: img.urls.thumb,
      alt: img.alt_description || query,
      credit: img.user.name,
      creditUrl: img.user.links.html
    }));
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}