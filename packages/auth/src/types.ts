export type Role =
  | "hotel_frontdesk"
  | "hotel_manager"
  | "hospital_coordinator"
  | "ktv_supervisor"
  | "gs_operator"
  | "gs_lead"
  | "mywell_admin"
  | "mywell_finance";

export interface Session {
  userId: string;
  displayName: string;
  roles: Role[];
  tenantId: string;
  expiresAt: string;
}
