import { GoogleGenerativeAI } from '@google/generative-ai';
import { CONFIG } from './config';
import { searchImages } from './unsplash';
import { searchWeb } from './webSearch';
import { humanizeContent } from './contentHumanizer';

const genAI = new GoogleGenerativeAI(CONFIG.GEMINI_API_KEY);

export async function generateContent(topic: string, type: string, referenceText?: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  try {
    // Gather context from multiple sources
    const [imagesResult, webResults] = await Promise.allSettled([
      searchImages(topic),
      searchWeb(topic)
    ]);

    const selectedImages = imagesResult.status === 'fulfilled' ? imagesResult.value.slice(0, 3) : [];
    const selectedResults = webResults.status === 'fulfilled' ? webResults.value.slice(0, 3) : [];
    
    const context = `
      ${selectedResults.map(r => `From ${r.source}: ${r.snippet}`).join('\n\n')}
      ${referenceText ? `\nAdditional context: ${referenceText}` : ''}
    `.trim();

    const prompt = `
    Write about "${topic}" in a natural, conversational way. Include real facts and insights from these sources:

    ${context}

    Style guide:
    - Write like you're explaining to a friend
    - Mix facts with personal insights
    - Use casual language and natural transitions
    - Include relevant examples and real-world applications
    - Add your own analysis where appropriate
    - Vary sentence structure and length
    - Use contractions and informal phrases
    - Include rhetorical questions and conversational elements
    
    Format using:
    - # for main topics (use sparingly)
    - ** for important points
    - * for key terms
    - - for examples or lists
    
    Include these images naturally in the content:
    ${selectedImages.map((img: any) => `\n![${img.alt}](${img.url})`).join('\n')}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let content = response.text();

    // Apply humanization transformations
    content = humanizeContent(content);

    return content;
  } catch (error) {
    console.error('Error generating content:', error instanceof Error ? error.message : 'Unknown error');
    throw new Error('Failed to generate content. Please try again.');
  }
}