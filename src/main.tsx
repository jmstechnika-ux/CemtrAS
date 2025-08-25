import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { ChatHistoryProvider } from './contexts/ChatHistoryContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ChatHistoryProvider>
        <App />
      </ChatHistoryProvider>
    </AuthProvider>
  </StrictMode>
);
