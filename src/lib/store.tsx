import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AppState, Preferences, Profile } from "./learnmate";

const KEY = "learnmate-state-v1";

const initial: AppState = {
  profile: null,
  preferences: null,
  completed: [],
  streak: 0,
  lastActive: null,
};

function load(): AppState {
  if (typeof window === "undefined") return initial;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initial;
    return { ...initial, ...JSON.parse(raw) };
  } catch { return initial; }
}

interface Ctx {
  state: AppState;
  setProfile: (p: Profile) => void;
  setPreferences: (p: Preferences) => void;
  toggleTopic: (id: string) => void;
  reset: () => void;
}

const LearnMateContext = createContext<Ctx | null>(null);

export function LearnMateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(load());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* */ }
  }, [state, hydrated]);

  const value: Ctx = {
    state,
    setProfile: (profile) => setState(s => ({ ...s, profile })),
    setPreferences: (preferences) => setState(s => ({ ...s, preferences })),
    toggleTopic: (id) => setState(s => {
      const has = s.completed.includes(id);
      const today = new Date().toDateString();
      const wasYesterday = s.lastActive && (Date.now() - new Date(s.lastActive).getTime() < 1000*60*60*48);
      return {
        ...s,
        completed: has ? s.completed.filter(x => x !== id) : [...s.completed, id],
        streak: has ? s.streak : (s.lastActive === today ? s.streak : (wasYesterday ? s.streak + 1 : 1)),
        lastActive: today,
      };
    }),
    reset: () => setState(initial),
  };

  return <LearnMateContext.Provider value={value}>{children}</LearnMateContext.Provider>;
}

export function useLearnMate() {
  const ctx = useContext(LearnMateContext);
  if (!ctx) throw new Error("useLearnMate must be used inside LearnMateProvider");
  return ctx;
}
