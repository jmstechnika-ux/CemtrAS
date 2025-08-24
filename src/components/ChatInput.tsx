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
        <button
          type="button"
          className="absolute right-16 top-1/2 transform -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <Mic size={18} />
        </button>
      </div>
      
      <button
        type="submit"
        disabled={!input.trim() || isLoading}
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
  );
};