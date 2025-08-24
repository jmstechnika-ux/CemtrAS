import React, { useState, useRef } from 'react';
import { Send, Paperclip, X } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string, files?: File[]) => void;
  isLoading: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading, placeholder }) => {
  const [input, setInput] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((input.trim() || selectedFiles.length > 0) && !isLoading) {
      onSend(input.trim(), selectedFiles);
      setInput('');
      setSelectedFiles([]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/') || 
                         file.type === 'application/pdf' ||
                         file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                         file.type === 'application/msword';
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      return isValidType && isValidSize;
    });
    
    setSelectedFiles(prev => [...prev, ...validFiles]);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-3">
      {/* File Preview Section */}
      {selectedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-slate-100 rounded-lg border-2 border-slate-200">
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-300 shadow-sm">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-700 truncate max-w-32">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="p-1 text-slate-400 hover:text-red-500 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder || "Describe your cement plant challenge or question..."}
            disabled={isLoading}
            className="w-full px-6 py-4 bg-slate-50 border-4 border-slate-300 rounded-2xl
                     focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500
                     disabled:opacity-50 disabled:cursor-not-allowed
                     text-slate-800 placeholder-slate-500 text-sm font-semibold
                     shadow-lg transition-all duration-300"
          />
          
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          {/* File upload button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="absolute right-16 top-1/2 transform -translate-y-1/2 p-2 text-slate-400 
                     hover:text-slate-600 transition-colors disabled:opacity-50"
            title="Upload images, PDF, or Word files"
          >
            <Paperclip size={18} />
          </button>
        </div>
        
        <button
          type="submit"
          disabled={(!input.trim() && selectedFiles.length === 0) || isLoading}
          className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-2xl 
                   hover:from-yellow-600 hover:to-yellow-700 focus:outline-none focus:ring-4 
                   focus:ring-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-300 flex items-center gap-3 shadow-lg
                   hover:shadow-xl hover:scale-105 font-bold text-sm"
        >
          <Send size={18} />
          <span className="hidden sm:inline">SEND</span>
        </button>
      </form>
    </div>
  );
};