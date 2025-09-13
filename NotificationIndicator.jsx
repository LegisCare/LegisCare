import React from 'react';

const NotificationIndicator = ({ count = 0, hasProactiveSuggestions = false, hasHistory = false }) => {
  const shouldShow = count > 0 || hasProactiveSuggestions || hasHistory;
  
  if (!shouldShow) return null;

  return (
    <div className="absolute -top-1 -right-1 min-w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
      {count > 0 ? (
        <span className="text-xs text-white font-medium px-1">
          {count > 9 ? '9+' : count}
        </span>
      ) : (
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
      )}
    </div>
  );
};

export default NotificationIndicator;