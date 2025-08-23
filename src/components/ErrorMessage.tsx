import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border-4 border-red-200 rounded-2xl p-6 mb-6 shadow-lg">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-red-100 rounded-xl">
          <AlertTriangle className="text-red-600" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-red-800 mb-2">⚠️ SYSTEM ERROR</h3>
          <p className="text-sm text-red-700 font-semibold leading-relaxed">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-red-600 text-white text-sm rounded-xl hover:bg-red-700 
                     transition-all duration-300 font-bold shadow-lg hover:shadow-xl
                     flex items-center gap-2"
          >
            <RefreshCw size={16} />
            RETRY
          </button>
        )}
      </div>
    </div>
  );
};