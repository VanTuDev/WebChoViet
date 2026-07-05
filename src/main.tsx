import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider } from './store/AppContext';
import { router } from './router';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      {/* AppProvider bọc toàn bộ app — state có thể truy cập ở mọi route */}
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </HelmetProvider>
  </StrictMode>,
);
