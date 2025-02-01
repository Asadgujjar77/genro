import React, { useState, useEffect } from 'react';
import { Sparkle, History as HistoryIcon } from 'lucide-react';
import FileUpload from './components/FileUpload';
import DocumentType from './components/DocumentType';
import ContentEditor from './components/ContentEditor';
import History from './components/History';
import ThemeToggle from './components/ThemeToggle';
import { generateContent } from './utils/gemini';
import { generateDocument } from './utils/documentGenerator';
import { useDocumentStore } from './store/useDocumentStore';
import DocumentList from './components/DocumentList';
import TagManager from './components/TagManager';
import { Button } from './components/ui/Button';

function App() {
  const [docType, setDocType] = useState('word');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [referenceText, setReferenceText] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const { addDocument } = useDocumentStore();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleFileSelect = async (file: File) => {
    try {
      const text = await file.text();
      setReferenceText(text);
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Error reading file. Please try again.');
    }
  };

  const handleGenerate = async () => {
    if (!topic) return;

    setLoading(true);
    try {
      const content = await generateContent(topic, docType, referenceText);
      setGeneratedContent(content);
      setIsEditing(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContent = async () => {
    try {
      await generateDocument(generatedContent, topic, docType);
      
      // Save to document store
      addDocument({
        topic,
        content: generatedContent,
        docType: docType as 'word' | 'excel' | 'presentation',
        tags: [],
        favorite: false
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving document:', error);
      alert('Failed to save document. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-gray-900 dark:to-gray-800">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-r border-gray-200 dark:border-gray-700 p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-12">
            <div className="p-2 rounded-xl bg-purple-500/10 dark:bg-purple-500/20">
              <Sparkle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 text-transparent bg-clip-text">
              Genro
            </h1>
          </div>
          
          <div className="flex-1">
            <DocumentType selected={docType} onSelect={setDocType} />
            
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="mt-8 w-full flex items-center gap-2 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
            >
              <HistoryIcon className="w-5 h-5" />
              <span className="text-sm font-medium">History</span>
            </button>
          </div>

          <div className="mt-auto pt-4">
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-8 py-12">
          <div className="max-w-3xl mx-auto">
            {showHistory ? (
              <div className="space-y-8">
                <DocumentList />
                <TagManager />
              </div>
            ) : (
              <div className="space-y-8">
                <div className="glass-card rounded-2xl shadow-xl shadow-purple-500/5 overflow-hidden">
                  <div className="p-8 space-y-8">
                    {!isEditing ? (
                      <>
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            What would you like to create?
                          </label>
                          <textarea
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 input-focus bg-white/50 dark:bg-gray-800/50 resize-none dark:text-white"
                            placeholder="Enter your topic or description..."
                            rows={4}
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Reference Material (Optional)
                          </label>
                          <FileUpload onFileSelect={handleFileSelect} />
                        </div>

                        <Button
                          onClick={handleGenerate}
                          disabled={loading || !topic}
                          className="w-full"
                        >
                          <Sparkle className="w-5 h-5 mr-2" />
                          {loading ? 'Generating...' : 'Generate Document'}
                        </Button>
                      </>
                    ) : (
                      <ContentEditor
                        content={generatedContent}
                        onContentChange={setGeneratedContent}
                        onSave={handleSaveContent}
                        onCancel={() => setIsEditing(false)}
                      />
                    )}
                  </div>
                </div>

                {!isEditing && (
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      { title: 'Professional', description: 'High-quality output' },
                      { title: 'Multiple Formats', description: 'Word, Excel & More' },
                      { title: 'AI-Powered', description: 'Smart Generation' }
                    ].map((feature, index) => (
                      <div key={index} className="glass-card rounded-xl p-4">
                        <h3 className="font-medium text-gray-900 dark:text-white">{feature.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;