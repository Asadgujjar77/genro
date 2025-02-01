import { transforms } from './transforms';

export function humanizeContent(content: string): string {
  // Split content into paragraphs
  const paragraphs = content.split('\n\n');
  
  // Process each paragraph
  const humanizedParagraphs = paragraphs.map(paragraph => {
    // Skip processing if paragraph is a markdown header or image
    if (paragraph.startsWith('#') || paragraph.startsWith('![')) {
      return paragraph;
    }

    // Apply transformations in random order
    let processed = paragraph;
    const transformations = [
      transforms.replaceFormalPhrases,
      transforms.improveFlow,
      transforms.addPersonalization,
      transforms.addEmphasis,
      transforms.addHedging,
      transforms.addFillers,
      transforms.addHesitations,
      transforms.addTypos
    ];

    // Shuffle and apply transformations
    transformations
      .sort(() => Math.random() - 0.5)
      .forEach(transform => {
        processed = transform(processed);
      });

    return processed;
  });

  // Rejoin paragraphs
  return humanizedParagraphs.join('\n\n');
}