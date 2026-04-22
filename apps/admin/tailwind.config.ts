import type { Config } from "tailwindcss";
import preset from "@mywell/config/tailwind/preset";

const config: Config = {
  presets: [preset],
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
    "../../packages/notifications/src/**/*.{ts,tsx}",
  ],
};
export default config;
