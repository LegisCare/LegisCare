import React from 'react';
import Icon from '../../../components/AppIcon';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4 animate-slide-up">
      <div className="max-w-[80%]">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mr-2">
            <Icon name="Sparkles" size={16} color="white" />
          </div>
          <span className="text-sm font-medium text-gray-700">Aura</span>
        </div>
        
        <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing-dots"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing-dots" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing-dots" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-xs text-gray-500 ml-2">A escrever...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;