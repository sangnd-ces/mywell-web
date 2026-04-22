"use client";
import { useEffect, type ReactNode } from "react";
import { useSessionStore } from "../store";
import type { Session } from "../types";

interface AuthProviderProps {
  children: ReactNode;
  initialSession?: Session | null;
}

export function AuthProvider({ children, initialSession = null }: AuthProviderProps) {
  const setSession = useSessionStore((s) => s.setSession);

  useEffect(() => {
    setSession(initialSession);
  }, [initialSession, setSession]);

  return <>{children}</>;
}
