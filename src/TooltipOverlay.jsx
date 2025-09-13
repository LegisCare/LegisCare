import React from 'react';

const TooltipOverlay = ({ isVisible, text = "Fale com a Aura" }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap animate-slide-up">
      {text}
      <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
    </div>
  );
};

export default TooltipOverlay;
