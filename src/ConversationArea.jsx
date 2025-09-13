import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import ErrorMessage from './ErrorMessage';

const ConversationArea = ({ 
  messages, 
  isTyping, 
  error, 
  onRetryError, 
  onDismissError, 
  onMessageReaction 
}) => {
  const messagesEndRef = useRef(null);
  const conversationRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'end'
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div 
      ref={conversationRef}
      className="flex-1 overflow-y-auto chat-scrollbar bg-gray-50 p-4"
      style={{ maxHeight: 'calc(100vh - 200px)' }}
    >
      <div className="space-y-1">
        {messages?.length === 0 && !isTyping && !error && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Olá! Sou a Aura</h3>
            <p className="text-gray-600 max-w-md mx-auto text-sm leading-relaxed">
              Estou aqui para oferecer apoio empático e ajudá-lo a organizar os seus pensamentos. 
              Como posso ajudá-lo hoje?
            </p>
          </div>
        )}
        
        {messages?.map((message) => (
          <MessageBubble
            key={message?.id}
            message={message}
            isUser={message?.isUser}
            timestamp={message?.timestamp}
            status={message?.status}
            onReaction={onMessageReaction}
          />
        ))}
        
        {error && (
          <ErrorMessage
            message={error}
            onRetry={onRetryError}
            onDismiss={onDismissError}
          />
        )}
        
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ConversationArea;
