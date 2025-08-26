import React, { useState } from 'react';
import { Send, Mic } from 'lucide-react';
interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
}
export const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading, placeholder }) => {
  const [input, setInput] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <div className="flex-1 relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder || "Describe your cement plant challenge or question..."}
          disabled={isLoading}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   disabled:opacity-50 disabled:cursor-not-allowed
                   text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm
                   transition-all duration-200"
        />
        <button
          type="button"
          className="absolute right-12 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <Mic size={16} />
        </button>
      </div>
      
      <button
        type="submit"
        disabled={!input.trim() || isLoading}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 disabled:opacity-50 disabled:cursor-not-allowed
                 transition-all duration-200 flex items-center gap-2 
                 font-semibold text-sm"
      >
        <Send size={16} />
        <span className="hidden sm:inline">Send</span>
      </button>
    </form>
  );
};