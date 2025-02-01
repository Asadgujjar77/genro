// Common phrases and their casual alternatives
export const casualPhrases: Record<string, string[]> = {
  'therefore': ['so', 'that means', 'which means', 'as a result'],
  'additionally': ['also', 'plus', 'on top of that', 'what\'s more'],
  'however': ['but', 'though', 'still', 'mind you'],
  'consequently': ['because of this', 'so', 'which means', 'that\'s why'],
  'furthermore': ['also', 'and', 'plus', 'not only that'],
  'nevertheless': ['still', 'but', 'even so', 'that said'],
  'subsequently': ['then', 'after that', 'next', 'later'],
  'approximately': ['about', 'around', 'roughly', 'give or take'],
  'sufficient': ['enough', 'plenty of', 'adequate', 'good enough'],
  'utilize': ['use', 'work with', 'apply', 'go with'],
  'implement': ['do', 'put in place', 'set up', 'get going'],
  'facilitate': ['help', 'make easier', 'support', 'smooth out'],
  'demonstrate': ['show', 'prove', 'make clear', 'point out'],
  'regarding': ['about', 'when it comes to', 'talking about'],
  'numerous': ['many', 'lots of', 'plenty of', 'a bunch of'],
  'obtain': ['get', 'pick up', 'grab', 'find'],
  'purchase': ['buy', 'get', 'pick up'],
  'require': ['need', 'want', 'have to have'],
  'commence': ['start', 'begin', 'kick off'],
  'terminate': ['end', 'stop', 'finish'],
  'observe': ['see', 'notice', 'spot'],
  'inquire': ['ask', 'wonder', 'want to know']
};

// Personal insights and transitions for more natural flow
export const variations = {
  openings: [
    "You know what's interesting?",
    "Here's something cool:",
    "I was thinking about this, and",
    "Get this:",
    "Check this out:",
    "Here's the thing:",
    "Interestingly enough,",
    "Fun fact:",
    "I've found that",
    "From what I understand,"
  ],
  transitions: [
    "Speaking of which,",
    "That reminds me,",
    "By the way,",
    "Oh, and",
    "Plus,",
    "Here's another thing:",
    "This is cool too:",
    "You'll love this:",
    "And you know what else?",
    "Here's a neat part:"
  ],
  personalTouches: [
    "I think",
    "In my experience,",
    "From what I've seen,",
    "Personally,",
    "If you ask me,",
    "The way I see it,",
    "I've noticed that",
    "It seems to me that",
    "I'd say that",
    "My take on this is"
  ],
  emphasis: [
    "Actually,",
    "Seriously,",
    "Believe it or not,",
    "Here's the cool part:",
    "Now this is important:",
    "Get ready for this:",
    "Check this out:",
    "This is wild:",
    "The best part is",
    "Here's what's amazing:"
  ],
  conclusions: [
    "So basically,",
    "The key thing to remember is",
    "When you think about it,",
    "At the end of the day,",
    "All things considered,",
    "Looking at the big picture,",
    "To wrap it up,",
    "Here's the bottom line:",
    "The main takeaway is",
    "What it comes down to is"
  ]
};

// Writing style variations
export const styleVariations = {
  sentenceLengths: ['short', 'medium', 'long'],
  tones: ['casual', 'balanced', 'professional'],
  structures: ['direct', 'narrative', 'explanatory']
};

// Helper functions
export const randomElement = <T>(array: T[]): T => 
  array[Math.floor(Math.random() * array.length)];

export const maybe = (probability: number): boolean => 
  Math.random() < probability;

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};