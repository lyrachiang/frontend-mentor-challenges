import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.scss';

import { ToastProvider } from '@/contexts/ToastContext';
import App from '@/components/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>
);
