import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingState = () => {
  return (
    <div className="flex items-center justify-center p-8 bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 animate-breathe">
          <Icon name="MessageCircle" size={24} color="white" />
        </div>
        <p className="text-sm text-gray-600">A conectar com a Aura...</p>
      </div>
    </div>
  );
};

export default LoadingState;