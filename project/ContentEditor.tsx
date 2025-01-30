import React from 'react';
import { Check, X } from 'lucide-react';

interface ContentEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function ContentEditor({ content, onContentChange, onSave, onCancel }: ContentEditorProps) {
  return (
    <div className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        className="w-full h-96 p-4 rounded-xl border border-gray-200 input-focus bg-white/50 font-mono text-sm"
        placeholder="Generated content will appear here..."
      />
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
        >
          <Check className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}