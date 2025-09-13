import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

const ChatConversation = ({ messages, isTyping = false }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 chat-scrollbar" style={{ maxHeight: '400px' }}>
      <div className="space-y-4">
        {messages?.map((message, index) => (
          <MessageBubble
            key={index}
            message={message?.content}
            isUser={message?.isUser}
            timestamp={message?.timestamp}
          />
        ))}
        {isTyping && (
          <MessageBubble 
            message=""
            isUser={false}
            timestamp=""
            isTyping={true} 
          />
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatConversation;
