import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './shared/styles/index.css';
import App from './App.tsx';

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
