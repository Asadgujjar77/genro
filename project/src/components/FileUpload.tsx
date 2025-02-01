import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export default function FileUpload({ onFileSelect }: FileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="w-full">
      <label className="flex flex-col items-center justify-center w-full h-32 border border-gray-200 rounded-xl cursor-pointer bg-white/50 hover:bg-white/80 transition-all">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-6 h-6 mb-2 text-blue-600" />
          <p className="mb-1 text-sm text-gray-600">
            <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">Any document format</p>
        </div>
        <input type="file" className="hidden" onChange={handleFileChange} accept=".doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.pdf" />
      </label>
    </div>
  );
}