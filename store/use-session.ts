import { create } from "zustand";
import { StateStorage, createJSONStorage, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { MMKV } from "react-native-mmkv";

export const sessionStorage = new MMKV();

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return sessionStorage.set(name, value);
  },
  getItem: (name) => {
    const value = sessionStorage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return sessionStorage.delete(name);
  },
};

import type {} from "@redux-devtools/extension";
import { Session } from "@/types";

interface SessionStore {
  session: null | Session;
  setSession: (session: Session) => void;
  clearSession: () => void;
}

export const useSession = create<SessionStore>()(
  devtools(
    persist(
      immer((set) => ({
        session: null,
        setSession: (session) => set(() => ({ session })),
        clearSession: () => set(() => ({ session: null })),
      })),
      {
        name: "session",
        storage: createJSONStorage(() => zustandStorage),
        // enabled: process.env.NODE_ENV !== "production",
      }
    )
  )
);
