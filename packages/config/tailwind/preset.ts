import type { Config } from "tailwindcss";
import { tokens } from "./tokens";

const preset: Config = {
  content: [],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--color-bg) / <alpha-value>)",
        fg: "hsl(var(--color-fg) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--color-primary) / <alpha-value>)",
          foreground: "hsl(var(--color-primary-fg) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--color-muted) / <alpha-value>)",
          foreground: "hsl(var(--color-muted-fg) / <alpha-value>)",
        },
        border: "hsl(var(--color-border) / <alpha-value>)",
        danger: "hsl(var(--color-danger) / <alpha-value>)",
        success: "hsl(var(--color-success) / <alpha-value>)",
        warning: "hsl(var(--color-warning) / <alpha-value>)",
        brand: tokens.colors.brand,
      },
      borderRadius: { DEFAULT: tokens.radius.md, ...tokens.radius },
    },
  },
  plugins: [],
};
export default preset;
