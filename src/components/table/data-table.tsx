"use client";

import { useState } from "react";
import { Company, TableConfig } from "@/types";
import { tableColumns } from "@/config/table-columns";
import {
  formatCurrency,
  formatPercentage,
  formatRatio,
  getPriceChangeColor,
  getPriceChangeBackground,
  getPriceChangeIcon,
  getPriceChangeBorder,
} from "@/utils/formatters";
import { cn } from "@/utils/cn";
import { ManageColumnsModal } from "./manage-columns-modal";

interface DataTableProps {
  companies: Company[];
  aggregates: any;
  onSort: (column: string, direction: "asc" | "desc") => void;
  config: TableConfig;
  onConfigChange: (config: Partial<TableConfig>) => void;
  isFiltersCollapsed?: boolean;
}

export function DataTable({
  companies,
  aggregates,
  onSort,
  config,
  onConfigChange,
  isFiltersCollapsed = false,
}: DataTableProps) {
  const [isManageColumnsOpen, setIsManageColumnsOpen] = useState(false);

  const visibleColumns = tableColumns.filter((col) =>
    config.visibleColumns.includes(col.key)
  );

  const getCellValue = (company: Company, columnKey: string) => {
    switch (columnKey) {
      case "name":
        return company.name;
      case "price":
        return company.tradingData.price;
      case "priceChange3Mo":
        return company.tradingData.priceChange3Mo;
      case "priceChange12Mo":
        return company.tradingData.priceChange12Mo;
      case "marketCap":
        return company.financialMetrics.marketCap;
      case "enterpriseValue":
        return company.financialMetrics.enterpriseValue;
      case "evToImpliedArr":
        return company.valuationMetrics.evToImpliedArr;
      case "evToNtmRevenue":
        return company.valuationMetrics.evToNtmRevenue;
      case "evToNtmGrossProfit":
        return company.valuationMetrics.evToNtmGrossProfit;
      case "evToNtmFcf":
        return company.valuationMetrics.evToNtmFcf;
      case "growthAdjEvToNtmRev":
        return company.financialMetrics.growthAdjEvToNtmRev;
      case "ntmFcf":
        return company.financialMetrics.ntmFcf;
      case "impliedArr":
        return company.financialMetrics.impliedArr;
      case "netNewArr":
        return company.financialMetrics.netNewArr;
      case "ltmRevenue":
        return company.financialMetrics.ltmRevenue;
      // % YoY Growth Section
      case "ltmRevenueGrowth":
        return company.operatingMetrics.ltmRevenueGrowth;
      case "ntmRevenueGrowth":
        return company.operatingMetrics.ntmRevenueGrowth;
      // % LTM Margins Section
      case "grossMargin":
        return company.financialMetrics.grossMargin;
      case "salesAndMarketingMargin":
        return company.financialMetrics.salesAndMarketingMargin;
      case "researchAndDevelopmentMargin":
        return company.financialMetrics.researchAndDevelopmentMargin;
      case "generalAndAdminMargin":
        return company.financialMetrics.generalAndAdminMargin;
      case "operatingExpensesMargin":
        return company.financialMetrics.operatingExpensesMargin;
      case "operatingIncomeMargin":
        return company.financialMetrics.operatingIncomeMargin;
      case "freeCashFlowMargin":
        return company.financialMetrics.freeCashFlowMargin;
      // Advanced Operating Metrics
      case "ntmFcfMargin":
        return company.operatingMetrics.fcfMargin;
      case "ruleOf40":
        return company.operatingMetrics.ruleOf40;
      case "magicNumber":
        return company.operatingMetrics.magicNumber;
      case "paybackPeriod":
        return company.operatingMetrics.paybackPeriod;
      case "impliedAverageAcv":
        return company.operatingMetrics.impliedAverageAcv;
      case "customerCount":
        return company.operatingMetrics.customerCount;
      case "impliedArrPerFte":
        return company.operatingMetrics.impliedArrPerFte;
      case "annualizedOpexPerFte":
        return company.operatingMetrics.annualizedOpexPerFte;
      case "netDollarRetention":
        return company.operatingMetrics.netDollarRetention;
      case "multipleReturnSinceIpo":
        return company.operatingMetrics.multipleReturnSinceIpo;
      default:
        return "";
    }
  };

  const formatCellValue = (value: any, format?: string) => {
    if (value === null || value === undefined) return "-";

    switch (format) {
      case "currency":
        return formatCurrency(value);
      case "percentage":
        return formatPercentage(value);
      case "ratio":
        return formatRatio(value);
      case "text":
        return value.toString();
      default:
        return value.toString();
    }
  };

  const handleSort = (columnKey: string) => {
    const newDirection =
      config.sortColumn === columnKey && config.sortDirection === "asc"
        ? "desc"
        : "asc";
    onSort(columnKey, newDirection);
  };

  const handleApplyColumnChanges = (newVisibleColumns: string[]) => {
    onConfigChange({ visibleColumns: newVisibleColumns });
  };

  const getAggregateValue = (columnKey: string, type: "mean" | "median") => {
    const aggregate = aggregates[type];
    switch (columnKey) {
      // Trading Data
      case "price":
        return aggregate?.price;
      case "priceChange3Mo":
        return aggregate?.priceChange3Mo;
      case "priceChange12Mo":
        return aggregate?.priceChange12Mo;

      // Financial Metrics
      case "marketCap":
        return aggregate?.marketCap;
      case "enterpriseValue":
        return aggregate?.enterpriseValue;
      case "impliedArr":
        return aggregate?.impliedArr;
      case "netNewArr":
        return aggregate?.netNewArr;
      case "ltmRevenue":
        return aggregate?.ltmRevenue;
      case "ntmFcf":
        return aggregate?.ntmFcf;
      case "growthAdjEvToNtmRev":
        return aggregate?.growthAdjEvToNtmRev;

      // Margins
      case "grossMargin":
        return aggregate?.grossMargin;
      case "salesAndMarketingMargin":
        return aggregate?.salesAndMarketingMargin;
      case "researchAndDevelopmentMargin":
        return aggregate?.researchAndDevelopmentMargin;
      case "generalAndAdminMargin":
        return aggregate?.generalAndAdminMargin;
      case "operatingExpensesMargin":
        return aggregate?.operatingExpensesMargin;
      case "operatingIncomeMargin":
        return aggregate?.operatingIncomeMargin;
      case "freeCashFlowMargin":
        return aggregate?.freeCashFlowMargin;

      // Operating Metrics
      case "ltmRevenueGrowth":
        return aggregate?.ltmRevenueGrowth;
      case "ntmRevenueGrowth":
        return aggregate?.ntmRevenueGrowth;
      case "fcfMargin":
        return aggregate?.fcfMargin;
      case "ruleOf40":
        return aggregate?.ruleOf40;
      case "magicNumber":
        return aggregate?.magicNumber;
      case "paybackPeriod":
        return aggregate?.paybackPeriod;
      case "impliedAverageAcv":
        return aggregate?.impliedAverageAcv;
      case "customerCount":
        return aggregate?.customerCount;
      case "impliedArrPerFte":
        return aggregate?.impliedArrPerFte;
      case "annualizedOpexPerFte":
        return aggregate?.annualizedOpexPerFte;
      case "netDollarRetention":
        return aggregate?.netDollarRetention;
      case "multipleReturnSinceIpo":
        return aggregate?.multipleReturnSinceIpo;

      // Valuation Metrics
      case "evToImpliedArr":
        return aggregate?.evToImpliedArr;
      case "evToNtmRevenue":
        return aggregate?.evToNtmRevenue;
      case "evToNtmGrossProfit":
        return aggregate?.evToNtmGrossProfit;
      case "evToNtmFcf":
        return aggregate?.evToNtmFcf;

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-gray-900">
            Meritech Software Index
          </h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsManageColumnsOpen(true)}
              className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              Manage Columns
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div
        className={cn(
          "overflow-x-auto overflow-y-auto",
          isFiltersCollapsed
            ? "lg:max-h-[calc(100vh-170px)] max-h-[calc(100vh-256px)]"
            : "lg:max-h-[calc(100vh-232px)] max-h-[calc(100vh-418px)]"
        )}
      >
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0 z-40">
            <tr>
              {visibleColumns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50",
                    column.sortable && "cursor-pointer hover:bg-gray-100",
                    column.align === "right" && "text-right",
                    column.align === "center" && "text-center",
                    column.key === "name" && "sticky left-0 z-20",
                    // Add vertical borders after specific columns
                    column.key === "priceChange12Mo" &&
                      "border-r-2 border-gray-300",
                    column.key === "enterpriseValue" &&
                      "border-r-2 border-gray-300",
                    column.key === "evToNtmFcf" && "border-r-2 border-gray-300",
                    column.key === "growthAdjEvToNtmRev" &&
                      "border-r-2 border-gray-300",
                    column.key === "ltmRevenue" && "border-r-2 border-gray-300",
                    column.key === "ntmRevenueGrowth" &&
                      "border-r-2 border-gray-300"
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div
                    className={cn(
                      "flex items-center",
                      column.align === "right" && "justify-end",
                      column.align === "center" && "justify-center"
                    )}
                  >
                    <span>{column.label}</span>
                    {column.sortable && (
                      <div className="ml-1">
                        {config.sortColumn === column.key ? (
                          <span className="text-blue-600">
                            {config.sortDirection === "asc" ? "↑" : "↓"}
                          </span>
                        ) : (
                          <span className="text-gray-300">↕</span>
                        )}
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Aggregates Row - Sticky */}
            <tr className="bg-green-50 sticky top-[80px] z-30">
              {visibleColumns.map((column) => {
                const meanValue = getAggregateValue(column.key, "mean");
                const medianValue = getAggregateValue(column.key, "median");
                return (
                  <td
                    key={column.key}
                    className={cn(
                      "px-4 py-2 whitespace-nowrap text-xs text-gray-900 bg-green-50",
                      column.align === "right" && "text-right",
                      column.align === "center" && "text-center",
                      column.key === "name" && "sticky left-0 z-20 bg-green-50",
                      // Add vertical borders after specific columns
                      column.key === "priceChange12Mo" &&
                        "border-r-2 border-gray-300",
                      column.key === "enterpriseValue" &&
                        "border-r-2 border-gray-300",
                      column.key === "evToNtmFcf" &&
                        "border-r-2 border-gray-300",
                      column.key === "growthAdjEvToNtmRev" &&
                        "border-r-2 border-gray-300",
                      column.key === "ltmRevenue" &&
                        "border-r-2 border-gray-300",
                      column.key === "ntmRevenueGrowth" &&
                        "border-r-2 border-gray-300"
                    )}
                  >
                    {column.key === "name" ? (
                      <div className="flex flex-col space-y-0.5">
                        <span className="font-bold text-xs">Mean</span>
                        <span className="font-bold text-xs">Median</span>
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-0.5">
                        <span className="font-bold text-xs">
                          {formatCellValue(meanValue, column.format)}
                        </span>
                        <span className="font-bold text-xs">
                          {formatCellValue(medianValue, column.format)}
                        </span>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Company Rows */}
            {companies.map((company) => (
              <tr
                key={company.id}
                className={cn("hover:bg-gray-50 transition-colors")}
              >
                {visibleColumns.map((column) => {
                  const value = getCellValue(company, column.key);
                  const isPriceChange =
                    column.key === "priceChange3Mo" ||
                    column.key === "priceChange12Mo";

                  return (
                    <td
                      key={column.key}
                      className={cn(
                        "px-4 py-2 whitespace-nowrap text-xs",
                        column.align === "right" && "text-right",
                        column.align === "center" && "text-center",
                        isPriceChange && getPriceChangeColor(value as number),
                        column.key === "name" &&
                          "sticky left-0 z-20 bg-white font-semibold",
                        // Add vertical borders after specific columns
                        column.key === "priceChange12Mo" &&
                          "border-r-2 border-gray-300",
                        column.key === "enterpriseValue" &&
                          "border-r-2 border-gray-300",
                        column.key === "evToNtmFcf" &&
                          "border-r-2 border-gray-300",
                        column.key === "growthAdjEvToNtmRev" &&
                          "border-r-2 border-gray-300",
                        column.key === "ltmRevenue" &&
                          "border-r-2 border-gray-300",
                        column.key === "ntmRevenueGrowth" &&
                          "border-r-2 border-gray-300"
                      )}
                    >
                      {isPriceChange ? (
                        <span
                          className={cn(
                            "flex items-center justify-end space-x-1 p-0.5 border rounded text-xs",
                            getPriceChangeBackground(value as number),
                            getPriceChangeBorder(value as number)
                          )}
                        >
                          <span className="text-xs">
                            {getPriceChangeIcon(value as number)}
                          </span>
                          <span className={cn("text-xs")}>
                            {formatCellValue(value, column.format)}
                          </span>
                        </span>
                      ) : (
                        formatCellValue(value, column.format)
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Manage Columns Modal */}
      <ManageColumnsModal
        isOpen={isManageColumnsOpen}
        onClose={() => setIsManageColumnsOpen(false)}
        columns={tableColumns}
        visibleColumns={config.visibleColumns}
        onApply={handleApplyColumnChanges}
      />
    </div>
  );
}
