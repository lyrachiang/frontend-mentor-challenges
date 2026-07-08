import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.scss';

import { RewardProvider } from '@/contexts/RewardContext';
import App from '@/components/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RewardProvider>
      <App />
    </RewardProvider>
  </StrictMode>
);
