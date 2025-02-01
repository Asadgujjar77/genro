import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Document {
  id: string;
  topic: string;
  content: string;
  docType: 'word' | 'excel' | 'presentation';
  createdAt: string;
  updatedAt: string;
  tags: string[];
  favorite: boolean;
}

interface DocumentState {
  documents: Document[];
  currentDocument: Document | null;
  addDocument: (doc: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
  setCurrentDocument: (doc: Document | null) => void;
  toggleFavorite: (id: string) => void;
  addTag: (id: string, tag: string) => void;
  removeTag: (id: string, tag: string) => void;
}

export const useDocumentStore = create<DocumentState>()(
  persist(
    (set) => ({
      documents: [],
      currentDocument: null,
      addDocument: (doc) => set((state) => ({
        documents: [...state.documents, {
          ...doc,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }],
      })),
      updateDocument: (id, updates) => set((state) => ({
        documents: state.documents.map((doc) =>
          doc.id === id
            ? { ...doc, ...updates, updatedAt: new Date().toISOString() }
            : doc
        ),
      })),
      deleteDocument: (id) => set((state) => ({
        documents: state.documents.filter((doc) => doc.id !== id),
        currentDocument: state.currentDocument?.id === id ? null : state.currentDocument,
      })),
      setCurrentDocument: (doc) => set({ currentDocument: doc }),
      toggleFavorite: (id) => set((state) => ({
        documents: state.documents.map((doc) =>
          doc.id === id ? { ...doc, favorite: !doc.favorite } : doc
        ),
      })),
      addTag: (id, tag) => set((state) => ({
        documents: state.documents.map((doc) =>
          doc.id === id && !doc.tags.includes(tag)
            ? { ...doc, tags: [...doc.tags, tag] }
            : doc
        ),
      })),
      removeTag: (id, tag) => set((state) => ({
        documents: state.documents.map((doc) =>
          doc.id === id
            ? { ...doc, tags: doc.tags.filter((t) => t !== tag) }
            : doc
        ),
      })),
    }),
    {
      name: 'document-storage',
    }
  )
);