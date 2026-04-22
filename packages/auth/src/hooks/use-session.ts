"use client";
import { useSessionStore } from "../store";

export function useSession() {
  return useSessionStore((s) => s.session);
}
