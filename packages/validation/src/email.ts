import { z } from "zod";
export const email = z.string().email("Email không hợp lệ");
