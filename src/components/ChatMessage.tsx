import React from 'react';
import { User, Bot, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import type { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  // Format AI responses with technical structure
  const formatAIResponse = (content: string) => {
    // Check if response already has structured format
    if (content.includes('**Problem Statement**') || content.includes('**Analysis**')) {
      return content;
    }
    
    // If not structured, return as-is but with better formatting
    return content;
  };

  const renderFormattedContent = (content: string) => {
    const formattedContent = isUser ? content : formatAIResponse(content);
    
    // Split by sections and format
    const sections = formattedContent.split(/\*\*(.*?)\*\*/g);
    
    return sections.map((section, index) => {
      if (index % 2 === 1) {
        // This is a header
        const sectionTitle = section.trim();
        let icon = <Info className="w-4 h-4" />;
        let colorClass = 'text-blue-600 bg-blue-50 border-blue-200';
        
        if (sectionTitle.toLowerCase().includes('problem')) {
          icon = <AlertTriangle className="w-4 h-4" />;
          colorClass = 'text-red-600 bg-red-50 border-red-200';
        } else if (sectionTitle.toLowerCase().includes('solution') || sectionTitle.toLowerCase().includes('recommendation')) {
          icon = <CheckCircle className="w-4 h-4" />;
          colorClass = 'text-green-600 bg-green-50 border-green-200';
        } else if (sectionTitle.toLowerCase().includes('analysis')) {
          colorClass = 'text-blue-600 bg-blue-50 border-blue-200';
        } else if (sectionTitle.toLowerCase().includes('safety') || sectionTitle.toLowerCase().includes('best practices')) {
          icon = <AlertTriangle className="w-4 h-4" />;
          colorClass = 'text-yellow-600 bg-yellow-50 border-yellow-200';
        }
        
        return (
          <div key={index} className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 ${colorClass} font-bold text-sm mb-3 mt-4`}>
            {icon}
            {sectionTitle}
          </div>
        );
      } else if (section.trim()) {
        // This is content
        return (
          <div key={index} className="text-gray-700 leading-relaxed mb-2">
            {section.split('\n').map((line, lineIndex) => {
              if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                return (
                  <div key={lineIndex} className="flex items-start gap-2 ml-4 mb-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{line.replace(/^[•-]\s*/, '')}</span>
                  </div>
                );
              }
              return line.trim() ? <p key={lineIndex} className="mb-2">{line}</p> : null;
            })}
          </div>
        );
      }
      return null;
    });
  };
  
  return (
    <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-8`}>
      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
        isUser 
          ? 'bg-gradient-to-br from-blue-600 to-blue-800' 
          : 'bg-gradient-to-br from-gray-700 to-gray-900'
      }`}>
        {isUser ? <User size={20} className="text-white" /> : <Bot size={20} className="text-white" />}
      </div>
      
      <div className={`max-w-4xl ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block px-6 py-4 shadow-lg ${
          isUser
            ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl rounded-br-md'
            : 'bg-white text-gray-800 border-4 border-gray-200 rounded-2xl rounded-bl-md'
        }`}>
          <div className="text-sm leading-relaxed">
            {isUser ? (
              <div className="font-semibold">{message.content}</div>
            ) : (
              <div className="space-y-2">
                {renderFormattedContent(message.content)}
              </div>
            )}
          </div>
        </div>
        <div className={`text-xs text-gray-500 mt-2 font-semibold ${isUser ? 'text-right' : 'text-left'}`}>
          {isUser ? 'YOU' : 'VIPUL'} • {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};