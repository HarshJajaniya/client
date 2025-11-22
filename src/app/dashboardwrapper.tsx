"use client";
import React from "react";
import Navbar from "./component/Navbar/index";
import Sidebar from "./component/Sidebar/index";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark:bg-dark-bg flex min-h-screen w-full bg-gray-50 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="dark:bg-dark-bg flex w-full flex-col bg-gray-50 md:pl-64">
        {/* Navbar */}
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardWrapper;
