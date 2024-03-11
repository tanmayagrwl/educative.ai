import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

interface Store {
  user: User | null;
  setUser: (user: User) => void;
}

const useStore = create<Store>(set => ({
  user: null,
  setUser: user => set({ user }),
}));

export default useStore;
