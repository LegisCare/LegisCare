import React from 'react';
import { AlertTriangle, RefreshCw, X, Clock } from 'lucide-react';

const ErrorMessage = ({ error, onRetry, onDismiss }) => {
  if (!error) return null;

  const getErrorIcon = () => {
    switch (error?.type) {
      case 'quota':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'waiting':
        return <Clock className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
    }
  };

  const getErrorStyles = () => {
    switch (error?.type) {
      case 'quota':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'waiting':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-red-50 border-red-200 text-red-800';
    }
  };

  return (
    <div className={`mx-4 mb-4 p-4 rounded-lg border ${getErrorStyles()} animate-fade-in`}>
      <div className="flex items-start space-x-3">
        {getErrorIcon()}
        
        <div className="flex-1 min-w-0">
          <div className="text-sm leading-relaxed whitespace-pre-line">
            {error?.message}
          </div>
          
          {error?.type === 'quota' && (
            <div className="mt-3 p-3 bg-white/50 rounded-md text-xs">
              <div className="font-medium mb-1">💡 Dica enquanto aguarda:</div>
              <div>Use este tempo para organizar os seus pensamentos ou praticar uma técnica de respiração. Estaremos de volta em breve!</div>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2 flex-shrink-0">
          {error?.canRetry && error?.type !== 'waiting' && onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center space-x-1 text-xs font-medium px-3 py-1.5 bg-white/80 hover:bg-white rounded-md border transition-colors"
              disabled={error?.type === 'waiting'}
            >
              <RefreshCw className="w-3 h-3" />
              <span>Tentar novamente</span>
            </button>
          )}
          
          {onDismiss && error?.type !== 'waiting' && (
            <button
              onClick={onDismiss}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Fechar erro"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;