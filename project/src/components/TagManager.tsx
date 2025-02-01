import React, { useState } from 'react';
import { Tag, Plus, X } from 'lucide-react';
import { useDocumentStore } from '../store/useDocumentStore';
import { Button } from './ui/Button';

export default function TagManager() {
  const { currentDocument, addTag, removeTag } = useDocumentStore();
  const [newTag, setNewTag] = useState('');

  if (!currentDocument) return null;

  const handleAddTag = () => {
    if (newTag.trim()) {
      addTag(currentDocument.id, newTag.trim());
      setNewTag('');
    }
  };

  return (
    <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="w-5 h-5 text-purple-500" />
        <h3 className="font-medium text-gray-900 dark:text-white">Manage Tags</h3>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add new tag..."
          className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
          onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
        />
        <Button onClick={handleAddTag}>
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {currentDocument.tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300"
          >
            {tag}
            <button
              onClick={() => removeTag(currentDocument.id, tag)}
              className="p-1 hover:text-red-500"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}