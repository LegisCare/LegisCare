import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatFooter = ({ onReset, onExport }) => {
  return (
    <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 rounded-b-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={14}
            className="text-gray-600 hover:text-gray-800"
          >
            Reiniciar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
            iconSize={14}
            className="text-gray-600 hover:text-gray-800"
          >
            Exportar
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={14} color="#10B981" />
          <span className="text-xs text-gray-600">RGPD</span>
        </div>
      </div>
      <div className="text-xs text-gray-500 leading-relaxed">
        <p className="mb-1">
          <Icon name="Lock" size={12} className="inline mr-1" />
          Conversas confidenciais e seguras
        </p>
        <p>
          A Aura oferece apoio empático mas não substitui aconselhamento profissional.
        </p>
      </div>
    </div>
  );
};

export default ChatFooter;