// src/store/useSpendingStore.ts

import { create } from 'zustand';
import axios from 'axios';

interface SpendingState {
  total: number;
  atualizado_em: string | null;
  loading: boolean;
  contador: number;
  setContador: (valor: number) => void;
  carregarDados: () => Promise<void>;
}

export const useSpendingStore = create<SpendingState>((set) => ({
  total: 0,
  atualizado_em: null,
  loading: true,
  contador: 0,

  setContador: (valor: number) => {
    set({ contador: valor });
  },

  carregarDados: async () => {
    try {
      const response = await axios.get('/gastos2025.json');
      const { total, atualizado_em } = response.data;

      set({
        total,
        atualizado_em,
        loading: false,
      });
    } catch (error) {
      console.error('Erro ao carregar dados de gastos:', error);
      set({ loading: false });
    }
  },
}));
