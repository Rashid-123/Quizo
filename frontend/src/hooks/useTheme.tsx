// useTheme.tsx
import { useContext } from "react";
import {
  ThemeProviderContext,
  ThemeProviderState,
} from "@/context/ThemeContext";

export function useTheme(): ThemeProviderState {
  const context = useContext(ThemeProviderContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
