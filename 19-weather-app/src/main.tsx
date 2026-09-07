import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.scss';

import { UnitProvider } from '@/contexts/UnitContext';
import App from '@/components/App';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UnitProvider>
        <App />
      </UnitProvider>
    </QueryClientProvider>
  </StrictMode>
);
