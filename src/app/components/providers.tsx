"use client";

import { ThemeProvider } from "next-themes";

/**
 * Providers Component
 * 
 * Wraps the app with necessary providers for theme functionality.
 * Configured to:
 * - Enable system theme detection
 * - Disable theme transition on page load to prevent flash
 * - Set default theme to system preference
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}