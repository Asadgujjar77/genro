import React from 'react';
import { Clock, Edit2, Trash2 } from 'lucide-react';

interface HistoryProps {
  drafts: any[];
  onEdit: (draft: any) => void;
  onDelete: (index: number) => void;
}

export default function History({ drafts, onEdit, onDelete }: HistoryProps) {
  if (drafts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>No history yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {drafts.map((draft, index) => (
        <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/50 border border-gray-200">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">{draft.topic}</h3>
            <p className="text-sm text-gray-500">
              {new Date(draft.timestamp).toLocaleDateString()} · {draft.docType}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(draft)}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              title="Edit"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(index)}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}