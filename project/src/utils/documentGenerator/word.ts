import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

export async function generateWordDoc(content: string, topic: string) {
  if (!content || !topic) {
    throw new Error('Content and topic are required for document generation');
  }

  const doc = new Document({
    sections: [{
      properties: {},
      children: content.split('\n').map(text => 
        new Paragraph({
          children: [new TextRun({ text, size: 24 })]
        })
      )
    }]
  });

  const blob = await Packer.toBlob(doc);
  const safeFileName = topic.replace(/[^a-z0-9]/gi, '_').slice(0, 30);
  saveAs(blob, `${safeFileName}.docx`);
}