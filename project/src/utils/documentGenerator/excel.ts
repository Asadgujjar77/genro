import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export function generateExcel(content: string, topic: string) {
  if (!content || !topic) {
    throw new Error('Content and topic are required for spreadsheet generation');
  }

  const rows = content.split('\n').map(line => [line]);
  const ws = XLSX.utils.aoa_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  const safeFileName = topic.replace(/[^a-z0-9]/gi, '_').slice(0, 30);
  saveAs(blob, `${safeFileName}.xlsx`);
}