import { Document, Packer, Paragraph, TextRun } from 'docx';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export async function generateWordDoc(content: string, topic: string) {
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
  saveAs(blob, `${topic.slice(0, 30)}.docx`);
}

export function generateExcel(content: string, topic: string) {
  const rows = content.split('\n').map(line => [line]);
  const ws = XLSX.utils.aoa_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  saveAs(blob, `${topic.slice(0, 30)}.xlsx`);
}

export function generatePresentation(content: string) {
  // For now, we'll generate a text file with the presentation content
  // In a production environment, you'd want to use a library like pptxgenjs
  const blob = new Blob([content], { type: 'text/plain' });
  saveAs(blob, 'presentation.txt');
}