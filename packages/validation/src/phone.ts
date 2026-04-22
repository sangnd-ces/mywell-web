import { z } from "zod";

// Vietnamese mobile: +84 or 0 prefix, 9 digits starting 3/5/7/8/9
export const phoneVN = z
  .string()
  .regex(/^(?:\+84|0)(?:3|5|7|8|9)\d{8}$/, "Số điện thoại Việt Nam không hợp lệ");
