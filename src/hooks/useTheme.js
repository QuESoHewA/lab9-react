import { useContext } from "react";
import { ThemeContext } from "@context/ThemeContext";

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme trebuie folosit în interiorul ThemeProvider");
  return ctx;
}
