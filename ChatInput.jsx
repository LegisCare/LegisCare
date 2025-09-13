import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-100 pt-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Digite a sua mensagem..."
            value={message}
            onChange={(e) => setMessage(e?.target?.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
            className="resize-none"
          />
        </div>
        <Button
          type="submit"
          variant="default"
          size="icon"
          disabled={!message?.trim() || disabled}
          iconName="Send"
          iconSize={16}
          className="bg-emerald-500 hover:bg-emerald-600 text-white flex-shrink-0"
        >
          <span className="sr-only">Enviar mensagem</span>
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;