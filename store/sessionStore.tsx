import { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import zustandStorage from "./zustandStore";

export interface User {
  onboarding_done?: boolean;
  name?: string;
  theme?: string;
  email?: string;
  picture?: string;
  role?: string;
}

type SessionStore = {
  session: Session | null;
  user: User | null;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  loading: boolean;
};

const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      session: null,
      user: null,
      loading: true,
      setSession: (session) =>
        set({
          session,
          user: session?.user.user_metadata || null,
          loading: false,
        }),
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useSessionStore;
