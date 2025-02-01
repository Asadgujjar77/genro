import { GoogleGenerativeAI } from '@google/generative-ai';
import { CONFIG } from './config';

const genAI = new GoogleGenerativeAI(CONFIG.GEMINI_API_KEY);

export async function solveMathProblem(problem: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
    Solve this math problem step by step: "${problem}"
    
    Please provide:
    1. A clear explanation of the approach
    2. Detailed steps showing all work
    3. The final answer
    4. Any relevant formulas or theorems used
    
    Format the response using markdown with:
    - Headers for main sections
    - Numbered steps
    - Math expressions in LaTeX format
    - Important points in bold
    
    Make the explanation clear and educational.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let solution = response.text();

    // Convert the markdown response to HTML with LaTeX rendering
    solution = solution
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/# (.*?)\n/g, '<h3 class="text-xl font-semibold mb-3">$1</h3>')
      .replace(/## (.*?)\n/g, '<h4 class="text-lg font-medium mb-2">$1</h4>')
      .replace(/\n(\d+\. )/g, '<br>$1')
      .replace(/`(.*?)`/g, '<code>$1</code>');

    return solution;
  } catch (error) {
    console.error('Error solving math problem:', error);
    throw new Error('Failed to solve the math problem. Please try again.');
  }
}