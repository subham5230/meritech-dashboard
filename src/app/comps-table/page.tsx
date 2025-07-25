"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { FilterBar } from "@/components/filters/filter-bar";
import { DataTable } from "@/components/table/data-table";
import { trpc } from "@/utils/trpc";
import { FilterState, TableConfig } from "@/types";
import { defaultVisibleColumns } from "@/config/table-columns";

export default function DashboardPage() {
  // State management
  const [filters, setFilters] = useState<FilterState>({
    companies: [],
    sectors: [],
    revenueGrowth: {},
    marketCap: {},
    evToRevenue: {},
    ruleOf40: {},
    fcfMargin: {},
    impliedArr: {},
  });

  const [tableConfig, setTableConfig] = useState<TableConfig>({
    sortColumn: "name",
    sortDirection: "asc",
    visibleColumns: defaultVisibleColumns,
    pageSize: 30,
    currentPage: 1,
  });

  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(false);

  // Fetch data with filters
  const { data, isLoading, error } = trpc.companies.getFiltered.useQuery({
    filters,
    sortColumn: tableConfig.sortColumn,
    sortDirection: tableConfig.sortDirection,
    page: tableConfig.currentPage,
    pageSize: tableConfig.pageSize,
  });

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setTableConfig((prev) => ({ ...prev, currentPage: 1 })); // Reset to first page
  };

  const handleClearFilters = () => {
    setFilters({
      companies: [],
      sectors: [],
      revenueGrowth: {},
      marketCap: {},
      evToRevenue: {},
      ruleOf40: {},
      fcfMargin: {},
      impliedArr: {},
    });
    setTableConfig((prev) => ({ ...prev, currentPage: 1 }));
  };

  // Handle table sorting
  const handleSort = (column: string, direction: "asc" | "desc") => {
    setTableConfig((prev) => ({
      ...prev,
      sortColumn: column,
      sortDirection: direction,
    }));
  };

  // Handle table config changes
  const handleTableConfigChange = (config: Partial<TableConfig>) => {
    setTableConfig((prev) => ({ ...prev, ...config }));
  };

  // Handle filter collapse
  const handleFilterCollapse = (collapsed: boolean) => {
    setIsFiltersCollapsed(collapsed);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading dashboard...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-600">
            Error loading dashboard: {error.message}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Filter Bar */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        isCollapsed={isFiltersCollapsed}
        onCollapseChange={handleFilterCollapse}
      />

      {/* Data Table */}
      {data && (
        <DataTable
          companies={data.companies}
          aggregates={data.aggregates}
          onSort={handleSort}
          config={tableConfig}
          onConfigChange={handleTableConfigChange}
          isFiltersCollapsed={isFiltersCollapsed}
        />
      )}
    </DashboardLayout>
  );
}
