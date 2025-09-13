import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: "Shield",
      title: "Confidencial",
      description: "Suas conversas são privadas e seguras"
    },
    {
      icon: "Heart",
      title: "Sem Julgamentos",
      description: "Ambiente acolhedor e compreensivo"
    },
    {
      icon: "Users",
      title: "Orientação Profissional",
      description: "Direcionamento para recursos adequados"
    }
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 gap-4">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <Icon name={feature?.icon} size={16} color="rgb(16, 185, 129)" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                {feature?.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustSignals;
