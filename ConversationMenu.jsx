import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationMenu = ({ isOpen, onClose, onReset, onExport, onProfessionalDirectory }) => {
  if (!isOpen) return null;

  const menuItems = [
    {
      icon: 'Download',
      label: 'Exportar conversa',
      description: 'Guardar como PDF ou texto',
      onClick: onExport,
      variant: 'default'
    },
    {
      icon: 'Users',
      label: 'Diretório profissional',
      description: 'Encontrar especialistas locais',
      onClick: onProfessionalDirectory,
      variant: 'default'
    },
    {
      icon: 'RotateCcw',
      label: 'Reiniciar conversa',
      description: 'Começar uma nova sessão',
      onClick: onReset,
      variant: 'outline'
    }
  ];

  return (
    <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-scale-in">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Opções da conversa</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-6 h-6 text-gray-400 hover:text-gray-600"
          >
            <Icon name="X" size={14} />
          </Button>
        </div>
      </div>
      <div className="p-2">
        {menuItems?.map((item, index) => (
          <button
            key={index}
            onClick={item?.onClick}
            className="w-full flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              item?.variant === 'outline' ?'bg-gray-100 text-gray-600' :'bg-emerald-100 text-emerald-600'
            }`}>
              <Icon name={item?.icon} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm">{item?.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item?.description}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-lg">
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Icon name="Shield" size={12} />
          <span>Todas as conversas são confidenciais e seguras</span>
        </div>
      </div>
    </div>
  );
};

export default ConversationMenu;