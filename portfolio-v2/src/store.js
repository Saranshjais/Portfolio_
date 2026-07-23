import { create } from 'zustand';

export const useStore = create((set) => ({
  activeShape: 'sphere', // 'sphere', 'barChart', 'galaxy', 'clusters'
  setActiveShape: (shape) => set({ activeShape: shape }),
}));
