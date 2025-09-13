import React from 'react';
import Button from '../../../components/ui/Button';

const ConversationStarters = ({ onStarterClick }) => {
  const starters = [
    {
      id: 1,
      text: "Preciso de ajuda para organizar os meus pensamentos",
      category: "organization"
    },
    {
      id: 2,
      text: "Procuro orientação profissional",
      category: "guidance"
    },
    {
      id: 3,
      text: "Sinto-me perdido e preciso de direção",
      category: "support"
    },
    {
      id: 4,
      text: "Como posso encontrar recursos de apoio?",
      category: "resources"
    }
  ];

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-4 text-center">
        Como posso ajudá-lo hoje?
      </h3>
      <div className="space-y-2">
        {starters?.map((starter) => (
          <Button
            key={starter?.id}
            variant="outline"
            size="sm"
            fullWidth
            className="text-left justify-start h-auto py-3 px-4 text-sm text-gray-700 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-colors"
            onClick={() => onStarterClick(starter?.text)}
          >
            {starter?.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ConversationStarters;
