import { AuthState } from "@/types/user/authState";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    user: null,
    setAuth: (token, user) => set({ token, user }),
    logout: () => set({ token: null, user: null }),
}));