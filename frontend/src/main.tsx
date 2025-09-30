import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store/store';
import './i18n';
import './index.css'
import App from './App.tsx'
import { NotistackProvider } from './NotistackProvider.tsx';
import { AuthProvider } from './components/AuthContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <NotistackProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </NotistackProvider>
    </Provider>
  </StrictMode>,
)
