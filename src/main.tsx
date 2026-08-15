import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';

import { QueryProvider } from '@/providers/QueryProvider';
import { ReadableFontSync } from '@/providers/ReadableFontSync';

import App from './App';
import './index.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element #root was not found');
}

createRoot(root).render(
  <StrictMode>
    <QueryProvider>
      <ReadableFontSync />
      <App />
      <Toaster richColors closeButton position="bottom-right" />
    </QueryProvider>
  </StrictMode>,
);
