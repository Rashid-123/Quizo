// useTheme.tsx
import { useContext } from "react";
import {
  ThemeProviderContext,
  ThemeProviderState,
} from "@/context/ThemeContext"; // Update path accordingly

export function useTheme(): ThemeProviderState {
  const context = useContext(ThemeProviderContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
