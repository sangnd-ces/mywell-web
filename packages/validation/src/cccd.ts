import { z } from "zod";

// CCCD: 12 numeric digits
export const cccd = z.string().regex(/^\d{12}$/, "CCCD phải là 12 chữ số");
