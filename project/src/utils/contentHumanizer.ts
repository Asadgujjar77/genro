import { casualPhrases, variations, randomElement, maybe, shuffleArray } from './textVariations';

// Add subtle typing mistakes and corrections
const addTypingQuirks = (text: string): string => {
  if (!maybe(0.15)) return text;
  
  const mistakes = [
    { pattern: 'th', correction: 'ht' },
    { pattern: 'ing', correction: 'ing.' },
    { pattern: 'and', correction: 'adn' }
  ];
  
  const mistake = randomElement(mistakes);
  const parts = text.split(mistake.pattern);
  if (parts.length > 1) {
    const index = Math.floor(Math.random() * (parts.length - 1)) + 1;
    parts[index] = `${mistake.correction}\b${mistake.pattern}`;
    return parts.join(mistake.pattern);
  }
  
  return text;
};

// Add natural pauses and flow
const addNaturalPauses = (text: string): string => {
  return text
    .replace(/\. /g, '... ')
    .replace(/\! /g, '! ... ')
    .replace(/\? /g, '? ... ');
};

// Replace formal phrases with casual alternatives
const casualizeText = (text: string): string => {
  let result = text;
  Object.entries(casualPhrases).forEach(([formal, casual]) => {
    const regex = new RegExp(`\\b${formal}\\b`, 'gi');
    result = result.replace(regex, () => randomElement(casual));
  });
  return result;
};

// Add personal touches and transitions
const addPersonalTouch = (text: string): string => {
  const sentences = text.split(/(?<=[.!?])\s+/);
  
  return sentences.map((sentence, index) => {
    // Add opening variations
    if (index === 0 && maybe(0.3)) {
      return randomElement(variations.openings) + ' ' + sentence.toLowerCase();
    }
    
    // Add transitions between topics
    if (index > 0 && maybe(0.2)) {
      return randomElement(variations.transitions) + ' ' + sentence.toLowerCase();
    }
    
    // Add personal insights
    if (maybe(0.15)) {
      return randomElement(variations.personalTouches) + ' ' + sentence.toLowerCase();
    }
    
    // Add emphasis
    if (maybe(0.1)) {
      return randomElement(variations.emphasis) + ' ' + sentence.toLowerCase();
    }
    
    return sentence;
  }).join(' ');
};

// Vary sentence structure
const varySentenceStructure = (text: string): string => {
  const sentences = text.split(/(?<=[.!?])\s+/);
  
  return sentences.map(sentence => {
    // Occasionally invert sentence structure
    if (maybe(0.2) && sentence.includes(',')) {
      const parts = sentence.split(',');
      return parts[1].trim() + ', ' + parts[0].toLowerCase();
    }
    
    // Add rhetorical questions
    if (maybe(0.1)) {
      return sentence + ' ' + randomElement([
        'Right?',
        'You know?',
        'Don\'t you think?',
        'Makes sense?'
      ]);
    }
    
    return sentence;
  }).join(' ');
};

// Main humanization function
export const humanizeContent = (content: string): string => {
  let humanized = content;
  
  // Apply transformations in random order to avoid patterns
  const transformations = shuffleArray([
    casualizeText,
    addPersonalTouch,
    varySentenceStructure,
    addTypingQuirks,
    addNaturalPauses
  ]);
  
  transformations.forEach(transform => {
    humanized = transform(humanized);
  });
  
  // Add a natural conclusion
  if (maybe(0.3)) {
    humanized += ' ' + randomElement(variations.conclusions) + ' ' +
      randomElement([
        'I hope this helps explain things!',
        'Pretty interesting stuff, right?',
        'What do you think about all this?',
        'Let me know if you want to know more!',
        'That\'s my take on it, anyway.'
      ]);
  }
  
  return humanized;
};