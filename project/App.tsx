import React, { useState, useEffect } from 'react';
import { Sparkle, Save, History as HistoryIcon } from 'lucide-react';
import FileUpload from './components/FileUpload';
import DocumentType from './components/DocumentType';
import ContentEditor from './components/ContentEditor';
import History from './components/History';
import { generateContent } from './utils/gemini';
import { generateWordDoc, generateExcel, generatePresentation } from './utils/documentGenerator';

function App() {
  const [docType, setDocType] = useState('word');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [referenceText, setReferenceText] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const savedDrafts = localStorage.getItem('documentDrafts');
    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts));
    }
  }, []);

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
      switch (docType) {
        case 'word':
          await generateWordDoc(generatedContent, topic);
          break;
        case 'excel':
          generateExcel(generatedContent, topic);
          break;
        case 'presentation':
          generatePresentation(generatedContent);
          break;
      }
      setIsEditing(false);
      handleSaveDraft();
    } catch (error) {
      console.error('Error saving document:', error);
      alert('Failed to save document. Please try again.');
    }
  };

  const handleSaveDraft = () => {
    const draft = {
      topic,
      docType,
      content: generatedContent,
      referenceText,
      timestamp: new Date().toISOString()
    };
    
    const newDrafts = [...drafts, draft];
    setDrafts(newDrafts);
    localStorage.setItem('documentDrafts', JSON.stringify(newDrafts));
  };

  const handleEditDraft = (draft: any) => {
    setTopic(draft.topic);
    setDocType(draft.docType);
    setGeneratedContent(draft.content);
    setReferenceText(draft.referenceText || '');
    setIsEditing(true);
    setShowHistory(false);
  };

  const handleDeleteDraft = (index: number) => {
    const newDrafts = drafts.filter((_, i) => i !== index);
    setDrafts(newDrafts);
    localStorage.setItem('documentDrafts', JSON.stringify(newDrafts));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-white/80 backdrop-blur-lg border-r border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-12">
            <div className="p-2 rounded-xl bg-purple-500/10">
              <Sparkle className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
              Genro
            </h1>
          </div>
          <DocumentType selected={docType} onSelect={setDocType} />
          
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="mt-8 w-full flex items-center gap-2 p-4 rounded-xl bg-white/50 hover:bg-white border border-gray-200 text-gray-600"
          >
            <HistoryIcon className="w-5 h-5" />
            <span className="text-sm font-medium">History</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-8 py-12">
          <div className="max-w-3xl mx-auto">
            {showHistory ? (
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-xl font-semibold mb-6">Document History</h2>
                <History
                  drafts={drafts}
                  onEdit={handleEditDraft}
                  onDelete={handleDeleteDraft}
                />
              </div>
            ) : (
              <div className="space-y-8">
                <div className="glass-card rounded-2xl shadow-xl shadow-purple-500/5 overflow-hidden">
                  <div className="p-8 space-y-8">
                    {!isEditing ? (
                      <>
                        {/* Topic Input */}
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-700">
                            What would you like to create?
                          </label>
                          <textarea
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="w-full p-4 rounded-xl border border-gray-200 input-focus bg-white/50 resize-none"
                            placeholder="Enter your topic or description..."
                            rows={4}
                          />
                        </div>

                        {/* File Upload */}
                        <div className="space-y-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Reference Material (Optional)
                          </label>
                          <FileUpload onFileSelect={handleFileSelect} />
                        </div>

                        {/* Generate Button */}
                        <button
                          onClick={handleGenerate}
                          disabled={loading || !topic}
                          className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-white font-medium transition-all ${
                            loading || !topic
                              ? 'bg-gray-400'
                              : 'bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40'
                          }`}
                        >
                          <Sparkle className="w-5 h-5" />
                          {loading ? 'Generating...' : 'Generate Document'}
                        </button>
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

                {/* Features */}
                {!isEditing && (
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      { title: 'Professional', description: 'High-quality output' },
                      { title: 'Multiple Formats', description: 'Word, Excel & More' },
                      { title: 'AI-Powered', description: 'Smart Generation' }
                    ].map((feature, index) => (
                      <div key={index} className="glass-card rounded-xl p-4">
                        <h3 className="font-medium text-gray-900">{feature.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
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