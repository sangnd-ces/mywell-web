"use client";
import { useSessionStore } from "../store";

export function useLogout() {
  const setSession = useSessionStore((s) => s.setSession);
  return async () => {
    await fetch("/api/session", { method: "DELETE" }).catch(() => {});
    setSession(null);
    if (typeof window !== "undefined") window.location.href = "/login";
  };
}
