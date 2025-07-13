import { create } from 'zustand';

export const useUserStore = create((set) => ({
    user: null,
    setUser: (userData) => set({ user: userData }),
    isAuthenticated: false,
    setAuthenticated: (state) => set({ isAuthenticated: state }),
    clearUser: () => set({ user: null, isAuthenticated: false }),
}));