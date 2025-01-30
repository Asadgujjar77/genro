import React from 'react';
import { FileText, FileSpreadsheet, Presentation } from 'lucide-react';

interface DocumentTypeProps {
  selected: string;
  onSelect: (type: string) => void;
}

export default function DocumentType({ selected, onSelect }: DocumentTypeProps) {
  const types = [
    { id: 'word', icon: FileText, label: 'Document' },
    { id: 'excel', icon: FileSpreadsheet, label: 'Spreadsheet' },
    { id: 'presentation', icon: Presentation, label: 'Presentation' }
  ];

  return (
    <div className="flex flex-col gap-3">
      {types.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`p-4 rounded-xl transition-all ${
            selected === id
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
              : 'bg-white/50 hover:bg-white border border-gray-200 text-gray-600 hover:border-purple-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium">{label}</span>
          </div>
        </button>
      ))}
    </div>
  );
}