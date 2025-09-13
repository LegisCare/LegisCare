import React from 'react';
import Icon from '../../../components/AppIcon';

const ErrorState = ({ onRetry, errorMessage }) => {
  const displayMessage = errorMessage || 'Ocorreu um erro inesperado. Por favor, tente novamente.';

  return (
    <div className="p-6 text-center bg-red-50">
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
          <Icon name="AlertCircle" size={24} className="text-red-600" />
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-red-800 mb-2">
        Ops! Algo correu mal
      </h3>
      
      <p className="text-red-700 mb-4 text-sm">
        {displayMessage}
      </p>
      
      <button
        onClick={onRetry}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200"
      >
        Tentar Novamente
      </button>
      
      <div className="mt-4 text-xs text-red-600">
        <div className="flex items-center justify-center space-x-1">
          <Icon name="Shield" size={12} />
          <span>Suas conversas permanecem privadas e seguras</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
