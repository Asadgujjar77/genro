import { generateWordDoc } from './word';
import { generateExcel } from './excel';
import { generatePresentation } from './powerpoint';

/**
 * Generates a document based on the specified type
 */
export async function generateDocument(content: string, topic: string, type: string) {
  if (!content || !topic || !type) {
    throw new Error('Content, topic, and type are required for document generation');
  }

  try {
    switch (type.toLowerCase()) {
      case 'word':
        await generateWordDoc(content, topic);
        break;
      case 'excel':
        await generateExcel(content, topic);
        break;
      case 'presentation':
        await generatePresentation(content, topic);
        break;
      default:
        throw new Error(`Unsupported document type: ${type}`);
    }
  } catch (error) {
    console.error('Error generating document:', error);
    throw new Error('Failed to generate document. Please try again.');
  }
}

// Export individual generators for direct use if needed
export { generateWordDoc, generateExcel, generatePresentation };