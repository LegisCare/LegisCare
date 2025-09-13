import React from 'react';
import Icon from '../../../components/AppIcon';

const GDPRCompliance = () => {
  return (
    <div className="mt-6 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
        <Icon name="Shield" size={14} color="rgb(107, 114, 128)" />
        <span>Conforme RGPD</span>
        <span>•</span>
        <span>Dados protegidos</span>
        <span>•</span>
        <span>Privacidade garantida</span>
      </div>
      <p className="text-center text-xs text-gray-400 mt-2 leading-relaxed">
        As suas informações são tratadas com total confidencialidade e não são partilhadas com terceiros.
      </p>
    </div>
  );
};

export default GDPRCompliance;
