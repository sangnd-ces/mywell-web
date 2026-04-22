"use client";
import type { Role } from "../types";
import { useSession } from "./use-session";

export function useHasRole(...roles: Role[]): boolean {
  const session = useSession();
  if (!session) return false;
  return roles.some((r) => session.roles.includes(r));
}
