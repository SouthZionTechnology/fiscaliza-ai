import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Importa o store e dispara o carregamento dos dados
import { useSpendingStore } from './store/useSpendingStore.ts';

// Carrega os dados de gastos imediatamente ao iniciar a aplicação
useSpendingStore.getState().carregarDados();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
