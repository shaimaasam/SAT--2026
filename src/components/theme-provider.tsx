"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

/**
 * GAT-style theme provider. Uses the default `light` / `dark-gat` class
 * names so our CSS variables activate correctly.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      value={{ light: "light", dark: "dark-gat" }}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
