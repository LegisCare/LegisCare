import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import WelcomeMessageScreen from './pages/welcome-message-screen';
import ActiveConversation from './pages/active-conversation';
import ChatWidgetExpanded from './pages/chat-widget-expanded';
import ChatWidgetCollapsed from './pages/chat-widget-collapsed';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ActiveConversation />} />
        <Route path="/welcome-message-screen" element={<WelcomeMessageScreen />} />
        <Route path="/active-conversation" element={<ActiveConversation />} />
        <Route path="/chat-widget-expanded" element={<ChatWidgetExpanded />} />
        <Route path="/chat-widget-collapsed" element={<ChatWidgetCollapsed />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
