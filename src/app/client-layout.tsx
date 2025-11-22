"use client";

import { ThemeProvider } from "./component/ThemeProvider";
import DashboardWrapper from "./dashboardwrapper";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <DashboardWrapper>{children}</DashboardWrapper>
    </ThemeProvider>
  );
}
