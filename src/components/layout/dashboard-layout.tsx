"use client";

import { useState } from "react";
import { Sidebar } from ".";
import { Topbar } from "./topbar";
import { cn } from "@/utils/cn";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>

      {/* Main Content Area */}
      <div
        className={cn(
          "flex-1 flex flex-col overflow-hidden transition-all duration-300",
          sidebarOpen ? "lg:ml-[16rem]" : "lg:ml-16"
        )}
      >
        {/* Topbar - Only visible on medium screens and below */}
        <div className="lg:hidden">
          <Topbar
            onFiltersClick={() => console.log("Filters clicked")}
            onManageColumnsClick={() => console.log("Manage columns clicked")}
            onSearchClick={() => console.log("Search clicked")}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
