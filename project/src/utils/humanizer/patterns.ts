// Common patterns to be replaced with more natural alternatives
export const patterns = {
  formalPhrases: {
    'therefore': ['so', 'that means', 'which means'],
    'additionally': ['also', 'plus', 'on top of that'],
    'however': ['but', 'though', 'still'],
    'consequently': ['because of this', 'that\'s why'],
    'furthermore': ['also', 'plus', 'not only that'],
    'nevertheless': ['still', 'but', 'even so'],
    'subsequently': ['then', 'after that', 'next'],
    'approximately': ['about', 'around', 'roughly'],
    'sufficient': ['enough', 'plenty of'],
    'utilize': ['use', 'work with'],
    'implement': ['do', 'put in place'],
    'facilitate': ['help', 'make easier'],
    'demonstrate': ['show', 'prove'],
    'regarding': ['about', 'when it comes to'],
    'numerous': ['many', 'lots of', 'plenty of'],
    'obtain': ['get', 'pick up'],
    'purchase': ['buy', 'get'],
    'require': ['need', 'want'],
    'commence': ['start', 'begin'],
    'terminate': ['end', 'stop']
  },
  
  sentenceStructures: [
    {
      pattern: /it is important to note that/gi,
      replacements: ['notably', 'importantly', 'keep in mind that', 'remember that']
    },
    {
      pattern: /in conclusion/gi,
      replacements: ['so there you have it', 'wrapping up', 'to sum it all up']
    },
    {
      pattern: /for example/gi,
      replacements: ['like', 'say', 'take', 'think about']
    },
    {
      pattern: /in other words/gi,
      replacements: ['basically', 'simply put', 'put another way']
    }
  ],
  
  redundantPhrases: [
    /due to the fact that/gi,
    /in spite of the fact that/gi,
    /in the event that/gi,
    /in the process of/gi,
    /with regard to/gi
  ]
};