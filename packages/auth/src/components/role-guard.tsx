"use client";
import type { ReactNode } from "react";
import { useHasRole } from "../hooks/use-has-role";
import type { Role } from "../types";

interface RoleGuardProps {
  roles: Role[];
  fallback?: ReactNode;
  children: ReactNode;
}

export function RoleGuard({ roles, fallback = null, children }: RoleGuardProps) {
  const allowed = useHasRole(...roles);
  if (!allowed) return <>{fallback}</>;
  return <>{children}</>;
}
