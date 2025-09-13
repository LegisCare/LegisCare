import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationHeader = ({ onMenuToggle, onMinimize, isMenuOpen }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-md">
          <Icon name="Sparkles" size={20} color="white" />
        </div>
        
        <div>
          <h2 className="font-semibold text-gray-900">Aura</h2>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-breathe"></div>
            <span className="text-xs text-gray-500">Online • Assistente de apoio</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="w-8 h-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          title="Menu de opções"
        >
          <Icon name={isMenuOpen ? "X" : "MoreVertical"} size={16} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onMinimize}
          className="w-8 h-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          title="Minimizar conversa"
        >
          <Icon name="Minimize2" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ConversationHeader;
