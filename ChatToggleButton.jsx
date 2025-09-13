import React from 'react';
import Icon from '../../../components/AppIcon';

const ChatToggleButton = ({ onClick, hasNotification = false, isHovered, onMouseEnter, onMouseLeave }) => {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        relative w-14 h-14 bg-emerald-500 hover:bg-emerald-600 
        rounded-full shadow-lg hover:shadow-xl
        flex items-center justify-center
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
        ${isHovered ? 'scale-110' : 'scale-100'}
        group
      `}
      aria-label="Abrir chat com Aura"
    >
      <Icon 
        name="MessageCircle" 
        size={24} 
        color="white" 
        className="transition-transform duration-200 group-hover:scale-110"
      />
      
      {hasNotification && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white">
          <div className="w-full h-full bg-red-500 rounded-full animate-pulse"></div>
        </div>
      )}
    </button>
  );
};

export default ChatToggleButton;