import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeHeader from './components/WelcomeHeader';
import TrustSignals from './components/TrustSignals';
import ConversationStarters from './components/ConversationStarters';
import GDPRCompliance from './components/GDPRCompliance';
import ChatInput from './components/ChatInput';

const WelcomeMessageScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('pt');

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('aura-language') || 'pt';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleStarterClick = (starterText) => {
    setIsLoading(true);
    
    // Simulate starting conversation with the selected starter
    setTimeout(() => {
      // Store the starter message for the active conversation
      localStorage.setItem('aura-starter-message', starterText);
      navigate('/active-conversation');
    }, 500);
  };

  const handleSendMessage = (message) => {
    setIsLoading(true);
    
    // Simulate sending custom message
    setTimeout(() => {
      // Store the custom message for the active conversation
      localStorage.setItem('aura-starter-message', message);
      navigate('/active-conversation');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto">
        {/* Chat Widget Container */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h2 className="text-white font-medium text-sm">Aura</h2>
                  <p className="text-emerald-100 text-xs">Assistente de Apoio</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/chat-widget-collapsed')}
                className="text-white hover:text-emerald-100 transition-colors p-1"
                aria-label="Minimizar chat"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6 max-h-96 overflow-y-auto chat-scrollbar">
            <WelcomeHeader />
            <TrustSignals />
            <ConversationStarters onStarterClick={handleStarterClick} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-gray-50">
            <ChatInput 
              onSendMessage={handleSendMessage} 
              disabled={isLoading}
            />
            <GDPRCompliance />
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500"></div>
              <span className="text-gray-700">A iniciar conversa...</span>
            </div>
          </div>
        )}

        {/* Mobile Responsive Adjustments */}
        <style jsx>{`
          @media (max-width: 640px) {
            .max-w-md {
              max-width: 100%;
              margin: 0;
              height: 100vh;
            }
            
            .rounded-lg {
              border-radius: 0;
            }
            
            .shadow-lg {
              box-shadow: none;
            }
            
            .border {
              border: none;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default WelcomeMessageScreen;
