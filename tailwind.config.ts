import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        navy: {
          50: "#F2F5FA", 100: "#E2E8F3", 200: "#C3CFE4", 300: "#94A8CC",
          400: "#5E78AC", 500: "#3A548C", 600: "#1F3864", 700: "#1A2F55",
          800: "#152540", 900: "#0F1B2E",
        },
        teal: {
          50: "#EEF7F4", 100: "#D6ECE4", 200: "#A8D8C9", 300: "#6FBBA5",
          400: "#3D9880", 500: "#0F6E56", 600: "#0D604B", 700: "#0A4C3C",
          800: "#083B2F", 900: "#052821",
        },
        primary: { DEFAULT: "#1F3864", foreground: "#FFFFFF" },
        accent: { DEFAULT: "#0F6E56", foreground: "#FFFFFF" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "#FFFFFF" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
      },
      borderRadius: { lg: "0.5rem", md: "0.375rem", sm: "0.25rem" },
      fontFamily: { sans: ["var(--font-inter)", "system-ui", "sans-serif"] },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "fade-in": { from: { opacity: "0", transform: "translateY(4px)" }, to: { opacity: "1", transform: "none" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.25s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
