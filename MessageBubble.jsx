import React from 'react';
import Icon from '../../../components/AppIcon';

const MessageBubble = ({ message, isUser, timestamp, isTyping = false }) => {
  const formatTime = (date) => {
    return new Intl.DateTimeFormat('pt-PT', {
      hour: '2-digit',
      minute: '2-digit'
    })?.format(date);
  };

  if (isTyping) {
    return (
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="MessageCircle" size={16} color="white" />
        </div>
        <div className="bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-100 max-w-xs">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing-dots"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing-dots" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing-dots" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start space-x-3 mb-4 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {!isUser && (
        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="MessageCircle" size={16} color="white" />
        </div>
      )}
      <div className={`max-w-xs lg:max-w-sm ${isUser ? 'ml-auto' : ''}`}>
        <div className={`rounded-lg px-4 py-3 ${
          isUser 
            ? 'bg-gray-100 text-gray-900' :'bg-white text-gray-900 shadow-sm border border-gray-100'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        </div>
        <p className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {formatTime(timestamp)}
        </p>
      </div>
      {isUser && (
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="User" size={16} color="white" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;