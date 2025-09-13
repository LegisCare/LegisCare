import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageInput = ({ onSendMessage, disabled, placeholder = "Escreva a sua mensagem..." }) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);
  const maxCharacters = 1000;

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    if (value?.length <= maxCharacters) {
      setMessage(value);
      
      // Auto-resize textarea
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${Math.min(textareaRef?.current?.scrollHeight, 120)}px`;
      }
    }
  };

  const remainingChars = maxCharacters - message?.length;
  const isNearLimit = remainingChars < 50;

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={`w-full px-4 py-3 pr-12 border rounded-2xl resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
              disabled 
                ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed' :'bg-white border-gray-300 text-gray-900'
            } ${isFocused ? 'shadow-md' : 'shadow-sm'}`}
            style={{ 
              minHeight: '48px',
              maxHeight: '120px',
              lineHeight: '1.5'
            }}
          />
          
          <div className="absolute right-3 bottom-3 flex items-center space-x-2">
            {message?.trim() && (
              <Button
                type="submit"
                variant="default"
                size="icon"
                disabled={disabled || !message?.trim()}
                className="w-8 h-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-md transition-all duration-200"
              >
                <Icon name="Send" size={16} />
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-4 text-gray-500">
            <span className="flex items-center">
              <Icon name="Lock" size={12} className="mr-1" />
              Conversa confidencial
            </span>
            <span className="hidden sm:flex items-center">
              <Icon name="Shield" size={12} className="mr-1" />
              RGPD compatível
            </span>
          </div>
          
          <div className={`transition-colors duration-200 ${
            isNearLimit ? 'text-amber-600' : 'text-gray-400'
          }`}>
            {remainingChars} caracteres restantes
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
          <Icon name="CornerDownLeft" size={12} />
          <span>Enter para enviar • Shift+Enter para nova linha</span>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;