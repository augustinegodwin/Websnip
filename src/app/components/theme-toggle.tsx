"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * ThemeToggle Component
 * 
 * A responsive theme toggle button that switches between light and dark modes.
 * Features:
 * - Smooth transitions between themes
 * - System preference detection
 * - Accessible button with proper ARIA labels
 * - Icons change based on current theme
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before showing theme-specific content
  // This prevents hydration mismatch between server and client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-md border border-gray-300 dark:border-gray-600 animate-pulse" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {/* Sun icon for light mode */}
      <Sun
        className={`h-4 w-4 transition-all duration-300 ${
          theme === "dark" 
            ? "scale-0 rotate-90 opacity-0" 
            : "scale-100 rotate-0 opacity-100"
        }`}
      />
      
        {/* Moon icon for dark mode */}
        <Moon
          className={`absolute h-4 w-4 transition-all duration-300 ${
            theme === "dark" 
              ? "scale-100 rotate-0 opacity-100" 
              : "scale-0 rotate-90 opacity-0"
          }`}
        />
      </button>
  );
}