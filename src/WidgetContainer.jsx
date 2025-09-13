import React from 'react';

const WidgetContainer = ({ children, className = "" }) => {
  return (
    <div className={`
      fixed bottom-5 right-5 z-[9999]
      sm:bottom-4 sm:right-4
      ${className}
    `}>
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default WidgetContainer;
