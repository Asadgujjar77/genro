import { variations } from './variations';
import { patterns } from './patterns';

// Helper functions
const randomElement = <T>(array: T[]): T => 
  array[Math.floor(Math.random() * array.length)];

const maybe = (probability: number): boolean => 
  Math.random() < probability;

const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Transform functions
export const transforms = {
  addTypos: (text: string): string => {
    if (!maybe(0.15)) return text;
    
    const commonTypos = [
      { correct: 'th', typo: 'ht' },
      { correct: 'ing', typo: 'ing.' },
      { correct: 'and', typo: 'adn' },
      { correct: 'the', typo: 'teh' }
    ];
    
    let result = text;
    if (maybe(0.3)) {
      const typo = randomElement(commonTypos);
      const words = result.split(' ');
      const randomIndex = Math.floor(Math.random() * words.length);
      
      if (words[randomIndex].includes(typo.correct)) {
        words[randomIndex] = words[randomIndex].replace(
          typo.correct,
          `${typo.typo}\b${typo.correct}`
        );
        result = words.join(' ');
      }
    }
    
    return result;
  },

  addHesitations: (text: string): string => {
    const sentences = text.split('. ');
    return sentences.map(sentence => {
      if (maybe(0.2)) {
        const hesitation = randomElement([
          'um, ',
          'uh, ',
          'well, ',
          'hmm, ',
          'let\'s see, '
        ]);
        return hesitation + sentence.charAt(0).toLowerCase() + sentence.slice(1);
      }
      return sentence;
    }).join('. ');
  },

  addFillers: (text: string): string => {
    const sentences = text.split('. ');
    return sentences.map(sentence => {
      if (maybe(0.25)) {
        const filler = randomElement(variations.fillers);
        return `${sentence}, ${filler}`;
      }
      return sentence;
    }).join('. ');
  },

  addPersonalization: (text: string): string => {
    const sentences = text.split('. ');
    return sentences.map((sentence, index) => {
      if (index === 0 && maybe(0.4)) {
        return randomElement(variations.sentenceStarters) + ' ' + 
               sentence.charAt(0).toLowerCase() + sentence.slice(1);
      }
      if (maybe(0.2)) {
        return randomElement(variations.personalInsights) + ' ' + 
               sentence.charAt(0).toLowerCase() + sentence.slice(1);
      }
      return sentence;
    }).join('. ');
  },

  replaceFormalPhrases: (text: string): string => {
    let result = text;
    Object.entries(patterns.formalPhrases).forEach(([formal, casual]) => {
      const regex = new RegExp(`\\b${formal}\\b`, 'gi');
      result = result.replace(regex, () => randomElement(casual));
    });
    return result;
  },

  improveFlow: (text: string): string => {
    let result = text;
    patterns.sentenceStructures.forEach(({ pattern, replacements }) => {
      result = result.replace(pattern, () => randomElement(replacements));
    });
    return result;
  },

  addEmphasis: (text: string): string => {
    const sentences = text.split('. ');
    return sentences.map(sentence => {
      if (maybe(0.15)) {
        return randomElement(variations.emphasis) + ' ' + 
               sentence.charAt(0).toLowerCase() + sentence.slice(1);
      }
      return sentence;
    }).join('. ');
  },

  addHedging: (text: string): string => {
    const sentences = text.split('. ');
    return sentences.map(sentence => {
      if (maybe(0.2)) {
        return sentence.replace(/^/, randomElement(variations.hedging) + ' ');
      }
      return sentence;
    }).join('. ');
  }
};