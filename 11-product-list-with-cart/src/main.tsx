import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.scss';

import { CartProvider } from '@/contexts/CartContext';
import App from '@/components/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);
