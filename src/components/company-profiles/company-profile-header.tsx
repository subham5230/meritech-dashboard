"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ExternalLink, BarChart3, Table } from "lucide-react";
import { trpc } from "@/utils/trpc";

interface CompanyProfileHeaderProps {
  companyId: string;
}

export function CompanyProfileHeader({ companyId }: CompanyProfileHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);

  const { data: companies = [], isLoading: companiesLoading } =
    trpc.companyProfiles.getAvailableCompanies.useQuery();
  const currentCompany =
    companies.find((c: any) => c.id === companyId) || companies[0];
  const isChartsView = pathname.includes("/charts");
  const isTableView = pathname.includes("/table");

  // Show loading state while companies are being fetched
  if (companiesLoading || !companies.length) {
    return (
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl text-gray-900">Company Profiles</h1>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <ExternalLink className="w-4 h-4" />
              Share link
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="animate-pulse bg-gray-200 h-10 w-32 rounded-lg"></div>
            <div className="animate-pulse bg-gray-200 h-6 w-24 rounded-full"></div>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <div className="animate-pulse bg-gray-200 h-8 w-16 rounded-md"></div>
              <div className="animate-pulse bg-gray-200 h-8 w-16 rounded-md ml-1"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleCompanySelect = (companyId: string) => {
    const currentView = isChartsView ? "charts" : "table";
    router.push(`/company-profiles/${companyId}/${currentView}`);
    setIsCompanyDropdownOpen(false);
  };

  const handleViewChange = (view: "charts" | "table") => {
    router.push(`/company-profiles/${companyId}/${view}`);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Title and Share link */}
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-gray-900">Company Profiles</h1>
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            <ExternalLink className="w-4 h-4" />
            Share link
          </button>
        </div>

        {/* Right side - Company selector and view tabs */}
        <div className="flex items-center gap-3">
          {/* Company Selector with Company Name */}
          <div className="relative">
            <button
              onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
              className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-[#DBF0E6] text-primary border border-primary/10 rounded-md transition-colors text-sm font-medium"
            >
              <span>Select Company</span>
              <span className="text-primary bg-gray-50 p-1 rounded-md">
                *{currentCompany.name}
              </span>
            </button>

            {isCompanyDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {companies.map((company: any) => (
                  <button
                    key={company.id}
                    onClick={() => handleCompanySelect(company.id)}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                      company.id === currentCompany.id
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700"
                    }`}
                  >
                    {company.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* View Tabs */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => handleViewChange("charts")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isChartsView
                  ? "bg-white text-primary shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Charts
            </button>
            <button
              onClick={() => handleViewChange("table")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isTableView
                  ? "bg-white text-primary shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Table className="w-4 h-4" />
              Table
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
