import React from 'react';
import { Check, X, Bold, Italic, Underline, List, Heading, Download, Edit2 } from 'lucide-react';
import ImageSearch from './ImageSearch';

interface ContentEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function ContentEditor({ content, onContentChange, onSave, onCancel }: ContentEditorProps) {
  const [isEditing, setIsEditing] = React.useState(false);

  const handleFormat = (format: string) => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let formattedText = '';

    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `__${selectedText}__`;
        break;
      case 'heading':
        formattedText = `\n# ${selectedText}\n`;
        break;
      case 'list':
        formattedText = selectedText.split('\n').map(line => `- ${line}`).join('\n');
        break;
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    onContentChange(newContent);
  };

  const handleImageInsert = (imageUrl: string, alt: string, credit: string, creditUrl: string) => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const imageMarkdown = `\n![${alt}](${imageUrl})\n<small>Photo by [${credit}](${creditUrl}) on [Unsplash](https://unsplash.com)</small>\n`;
    const newContent = content.substring(0, textarea.selectionStart) + 
                      imageMarkdown + 
                      content.substring(textarea.selectionEnd);
    onContentChange(newContent);
  };

  const renderPreview = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/__(.*?)__/g, '<u>$1</u>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold my-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold my-3">$1</h2>')
      .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="my-4 rounded-lg max-w-full h-auto">')
      .replace(/<small>(.*?)<\/small>/g, '<small class="text-gray-500 block mt-1 mb-4">$1</small>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">$1</a>')
      .replace(/\n/g, '<br>');
  };

  if (!isEditing) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold dark:text-white">Preview</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={onSave}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 dark:bg-purple-500 text-white hover:bg-purple-700 dark:hover:bg-purple-600"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
        <div 
          className="w-full min-h-[600px] p-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-auto prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: renderPreview(content) }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Formatting Toolbar */}
      <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => handleFormat('bold')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleFormat('italic')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleFormat('underline')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          title="Underline"
        >
          <Underline className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />
        <button
          onClick={() => handleFormat('heading')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          title="Add Heading"
        >
          <Heading className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleFormat('list')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          title="Add List"
        >
          <List className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />
        <ImageSearch onImageSelect={handleImageInsert} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Editor */}
        <div>
          <div className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Editor</div>
          <textarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            className="w-full h-[500px] p-4 rounded-xl border border-gray-200 dark:border-gray-700 input-focus bg-white/50 dark:bg-gray-800/50 font-mono text-sm dark:text-white"
            placeholder="Start typing your content..."
          />
        </div>

        {/* Preview */}
        <div>
          <div className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Preview</div>
          <div 
            className="w-full h-[500px] p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-auto prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: renderPreview(content) }}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
        >
          <Check className="w-4 h-4" />
          Preview
        </button>
      </div>
    </div>
  );
}