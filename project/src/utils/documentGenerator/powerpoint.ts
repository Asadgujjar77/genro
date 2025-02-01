import pptxgen from 'pptxgenjs';

interface SlideContent {
  title: string;
  content: string[];
  images?: { url: string; alt: string; }[];
}

export async function generatePresentation(content: string, topic: string) {
  if (!content || !topic) {
    throw new Error('Content and topic are required for presentation generation');
  }

  const pres = new pptxgen();
  
  // Set presentation properties
  pres.author = 'AI Document Assistant';
  pres.company = 'Generated Content';
  pres.title = topic;

  // Create title slide
  const titleSlide = pres.addSlide();
  titleSlide.addText(topic, {
    x: '10%',
    y: '40%',
    w: '80%',
    fontSize: 44,
    bold: true,
    color: '363636',
    align: 'center'
  });

  // Process content into slides
  const slides = processContent(content);
  
  // Create content slides
  slides.forEach(slide => {
    const contentSlide = pres.addSlide();

    // Add title
    contentSlide.addText(slide.title, {
      x: '5%',
      y: '5%',
      w: '90%',
      fontSize: 32,
      bold: true,
      color: '363636'
    });

    // Add content
    contentSlide.addText(slide.content, {
      x: '5%',
      y: '25%',
      w: '90%',
      h: '70%',
      fontSize: 18,
      color: '666666',
      breakLine: true
    });

    // Add images if present
    slide.images?.forEach((image, index) => {
      contentSlide.addImage({
        path: image.url,
        x: '10%',
        y: index === 0 ? '50%' : '70%',
        w: '80%',
        h: '30%'
      });
    });
  });

  // Save the presentation
  const safeFileName = topic.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  await pres.writeFile({ fileName: `${safeFileName}.pptx` });
}

function processContent(content: string): SlideContent[] {
  // Split content into sections based on headers
  const sections = content.split(/(?=# )/g);
  
  return sections
    .filter(section => section.trim().length > 0)
    .map(section => {
      const lines = section.split('\n');
      const title = lines[0].replace(/^#\s+/, '').trim();
      const contentLines = lines.slice(1);

      // Extract images and text content
      const images: { url: string; alt: string; }[] = [];
      const textContent: string[] = [];

      contentLines.forEach(line => {
        const imageMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
        if (imageMatch) {
          images.push({
            alt: imageMatch[1],
            url: imageMatch[2]
          });
        } else if (line.trim()) {
          textContent.push(line.trim());
        }
      });

      return {
        title,
        content: textContent,
        images: images.length > 0 ? images : undefined
      };
    });
}