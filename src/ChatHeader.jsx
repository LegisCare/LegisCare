import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ onMinimize, onClose }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 rounded-t-lg">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
          <Icon name="MessageCircle" size={18} color="white" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">Aura - Assistente de Apoio</h3>
          <p className="text-xs text-gray-500">Sempre aqui para ajudar</p>
        </div>
      </div>
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMinimize}
          className="h-8 w-8 text-gray-500 hover:text-gray-700"
        >
          <Icon name="Minus" size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 text-gray-500 hover:text-gray-700"
        >
          <Icon name="X" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
