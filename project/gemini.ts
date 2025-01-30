import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyAxj0zWVQIPiJfBO2hYarFAVyEFUAHeHU4';
const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateContent(topic: string, type: string, referenceText?: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  let prompt = `Create a detailed ${type} about "${topic}". `;
  if (referenceText) {
    prompt += `Use this reference material for context: ${referenceText}. `;
  }
  prompt += `Make it professional and well-structured.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating content:', error);
    throw new Error('Failed to generate content');
  }
}