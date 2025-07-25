"use client";

import { ErrorBoundary } from "@/components/error-boundary";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { CompanyProfileSidebar } from "@/components/company-profiles/company-profile-sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CompanyProfilesPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to a default company (adobe) with charts view
    router.push("/company-profiles/adobe/charts");
  }, [router]);

  return (
    <DashboardLayout>
      <ErrorBoundary>
        <div className="relative h-full">
          {/* Fixed left sidebar with metrics categories */}
          <div className="absolute left-0 top-0 bottom-0 z-10">
            <CompanyProfileSidebar />
          </div>

          <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading company profiles...</p>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </DashboardLayout>
  );
}
