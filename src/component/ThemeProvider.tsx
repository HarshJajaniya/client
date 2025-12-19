"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "@/lib/mui-theme";

function MuiThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <MuiThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      {children}
    </MuiThemeProvider>
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
      <MuiThemeWrapper>{children}</MuiThemeWrapper>
    </NextThemesProvider>
  );
}
