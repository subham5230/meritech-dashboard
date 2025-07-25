import { DashboardLayout } from "@/components/layout/dashboard-layout";
import Link from "next/link";

export default function CompanyProfileNotFound() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-400">🏢</span>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Company Profile Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            The company profile you're looking for doesn't exist. Please check
            the company ID or navigate using the sidebar.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/company-profiles/adobe/charts"
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors cursor-pointer"
            >
              Go to Adobe Profile
            </Link>
            <Link
              href="/comps-table"
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
            >
              View All Companies
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
