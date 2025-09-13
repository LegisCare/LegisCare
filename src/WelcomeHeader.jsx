import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
          <Icon name="MessageCircle" size={32} color="white" />
        </div>
      </div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">
        Olá! Eu sou a Aura
      </h1>
      <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
        Sua assistente de apoio confidencial e imparcial, aqui para ajudá-lo a organizar pensamentos e encontrar orientação profissional.
      </p>
    </div>
  );
};

export default WelcomeHeader;
