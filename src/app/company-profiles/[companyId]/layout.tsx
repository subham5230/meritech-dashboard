import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  CompanyProfileHeader,
  CompanyProfileSidebar,
} from "@/components/company-profiles";
import { ErrorBoundary } from "@/components/error-boundary";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

interface CompanyProfileLayoutProps {
  children: ReactNode;
  params: Promise<{
    companyId: string;
  }>;
}

export default async function CompanyProfileLayout({
  children,
  params,
}: CompanyProfileLayoutProps) {
  const { companyId } = await params;

  // Redirect to a valid company if the ID is invalid (like DDOG)
  if (
    companyId === "DDOG" ||
    companyId === "SNOW" ||
    companyId === "CRWD" ||
    companyId === "ZS" ||
    companyId === "PLTR"
  ) {
    redirect("/company-profiles/adobe/charts");
  }

  return (
    <DashboardLayout>
      <ErrorBoundary>
        <div className="relative h-full">
          {/* Fixed left sidebar with metrics categories */}
          <div className="absolute left-0 top-0 bottom-0 z-10">
            <CompanyProfileSidebar />
          </div>

          {/* Main content area with left margin to account for fixed sidebar */}
          <div className="ml-[18rem] flex flex-col h-full">
            <CompanyProfileHeader companyId={companyId} />
            <main className="flex-1 p-6 overflow-y-auto">{children}</main>
          </div>
        </div>
      </ErrorBoundary>
    </DashboardLayout>
  );
}
