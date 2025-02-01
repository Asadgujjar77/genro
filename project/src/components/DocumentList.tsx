import React from 'react';
import { FileText, Star, Tags, Trash2 } from 'lucide-react';
import { useDocumentStore } from '../store/useDocumentStore';
import { Button } from './ui/Button';

export default function DocumentList() {
  const { documents, deleteDocument, toggleFavorite, setCurrentDocument } = useDocumentStore();

  if (!documents || documents.length === 0) {
    return (
        <div className="text-center py-8">
        <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p className="text-gray-500">No documents yet</p>
      </div>
    );
  }

  const sortedDocuments = [...documents].sort((a, b) => {
    if (a.favorite && !b.favorite) return -1;
    if (!a.favorite && b.favorite) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <div className="space-y-4">
      {sortedDocuments.map((doc) => (
        <div
          key={doc.id}
          className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-gray-500" />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">{doc.topic}</h3>
              <p className="text-sm text-gray-500">
                {new Date(doc.updatedAt).toLocaleDateString()} · {doc.docType}
              </p>
              {doc.tags && doc.tags.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {doc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleFavorite(doc.id)}
              className={doc.favorite ? 'text-yellow-500' : 'text-gray-500'}
            >
              <Star className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentDocument(doc)}
            >
              <Tags className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteDocument(doc.id)}
              className="text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}