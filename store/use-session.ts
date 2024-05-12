import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import type {} from "@redux-devtools/extension";
import { Session } from "@/types";

interface SessionStore {
  session: null | Session;
  setSession: (session: Session) => void;
  clearSession: () => void;
}

export const useSession = create<SessionStore>()(
  devtools(
    immer((set) => ({
      session: null,
      setSession: (session) => set(() => ({ session })),
      clearSession: () => set(() => ({ session: null })),
    })),
    {
      name: "session",
      // enabled: process.env.NODE_ENV !== "production",
    }
  )
);
