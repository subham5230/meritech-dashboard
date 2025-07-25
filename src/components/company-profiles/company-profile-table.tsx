"use client";

import { trpc } from "@/utils/trpc";

interface CompanyProfileTableProps {
  companyId: string;
}

interface MetricSection {
  id: string;
  title: string;
  metrics: MetricRow[];
}

interface MetricRow {
  id: string;
  label: string;
  value: string | number;
  isPercentage?: boolean;
  isCurrency?: boolean;
}

export function CompanyProfileTable({ companyId }: CompanyProfileTableProps) {
  const {
    data: companyMetrics,
    isLoading,
    error,
  } = trpc.companyProfiles.getCompanyMetrics.useQuery({ companyId });

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(4)].map((_, sectionIndex) => (
          <div
            key={sectionIndex}
            className="bg-white rounded-lg border border-gray-200"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="animate-pulse bg-gray-200 h-6 w-32 rounded"></div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="animate-pulse bg-gray-200 h-4 w-48 rounded"></div>
                    <div className="animate-pulse bg-gray-200 h-4 w-16 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-2xl text-red-600">⚠️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error Loading Data
          </h3>
          <p className="text-gray-600 mb-4">Unable to load company metrics.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show empty state
  if (!companyMetrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-2xl text-gray-400">📋</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Data Available
          </h3>
          <p className="text-gray-600">No metrics found for this company.</p>
        </div>
      </div>
    );
  }

  // Create metric sections from API data
  const createMetricSections = (): MetricSection[] => {
    const operatingMetrics: MetricRow[] = [
      {
        id: "implied-arr",
        label: "Implied ARR ($B)",
        value: `$${(companyMetrics.operatingMetrics.impliedArr / 1000).toFixed(
          1
        )}`,
        isCurrency: true,
      },
      {
        id: "implied-arr-growth",
        label: "Implied ARR % YoY Growth",
        value: `${companyMetrics.operatingMetrics.impliedArrGrowth}%`,
        isPercentage: true,
      },
      {
        id: "new-net-arr",
        label: "New Net ARR ($M)",
        value: `$${companyMetrics.operatingMetrics.netNewArr.toFixed(1)}`,
        isCurrency: true,
      },
      {
        id: "new-net-arr-growth",
        label: "New Net ARR % YoY Growth",
        value: `${companyMetrics.operatingMetrics.netNewArrGrowth}%`,
        isPercentage: true,
      },
      {
        id: "ltm-revenue",
        label: "LTM Revenue ($B)",
        value: `$${(companyMetrics.operatingMetrics.ltmRevenue / 1000).toFixed(
          1
        )}`,
        isCurrency: true,
      },
      {
        id: "ltm-revenue-growth",
        label: "LTM Revenue % YoY Growth",
        value: `${companyMetrics.operatingMetrics.ltmRevenueGrowth}%`,
        isPercentage: true,
      },
      {
        id: "ntm-revenue",
        label: "NTM Revenue",
        value: companyMetrics.operatingMetrics.ntmRevenue
          ? `$${(companyMetrics.operatingMetrics.ntmRevenue / 1000).toFixed(1)}`
          : "N/A",
        isCurrency: !!companyMetrics.operatingMetrics.ntmRevenue,
      },
      {
        id: "ntm-revenue-growth",
        label: "NTM Revenue % YoY Growth",
        value: companyMetrics.operatingMetrics.ntmRevenueGrowth
          ? `${companyMetrics.operatingMetrics.ntmRevenueGrowth}%`
          : "N/A",
        isPercentage: !!companyMetrics.operatingMetrics.ntmRevenueGrowth,
      },
      {
        id: "ltm-operating-income",
        label: "LTM Operating Income / (Loss) Margin",
        value: `${companyMetrics.operatingMetrics.operatingIncomeMargin}%`,
        isPercentage: true,
      },
    ];

    const financialMetrics: MetricRow[] = [
      {
        id: "ltm-gross-margin",
        label: "LTM Gross Margin",
        value: `${companyMetrics.financialMetrics.grossMargin}%`,
        isPercentage: true,
      },
      {
        id: "ltm-sales-marketing",
        label: "LTM Sales & Marketing % of Revenue",
        value: companyMetrics.financialMetrics.salesAndMarketingMargin
          ? `${companyMetrics.financialMetrics.salesAndMarketingMargin}%`
          : "N/A",
        isPercentage: !!companyMetrics.financialMetrics.salesAndMarketingMargin,
      },
      {
        id: "ltm-research-dev",
        label: "LTM Research & Development % of Revenue",
        value: companyMetrics.financialMetrics.researchAndDevelopmentMargin
          ? `${companyMetrics.financialMetrics.researchAndDevelopmentMargin}%`
          : "N/A",
        isPercentage:
          !!companyMetrics.financialMetrics.researchAndDevelopmentMargin,
      },
      {
        id: "ltm-general-admin",
        label: "LTM General & Administrative % of Revenue",
        value: companyMetrics.financialMetrics.generalAndAdminMargin
          ? `${companyMetrics.financialMetrics.generalAndAdminMargin}%`
          : "N/A",
        isPercentage: !!companyMetrics.financialMetrics.generalAndAdminMargin,
      },
      {
        id: "ltm-free-cash-flow",
        label: "LTM Free Cash Flow Margin",
        value: companyMetrics.financialMetrics.freeCashFlowMargin
          ? `${companyMetrics.financialMetrics.freeCashFlowMargin}%`
          : "N/A",
        isPercentage: !!companyMetrics.financialMetrics.freeCashFlowMargin,
      },
      // Company Profiles metrics merged into Financial Metrics
      {
        id: "subscription-revenue",
        label: "LTM Subscription Revenue as a % of Revenue",
        value: companyMetrics.companyProfiles.subscriptionRevenue
          ? `${companyMetrics.companyProfiles.subscriptionRevenue}%`
          : "N/A",
        isPercentage: !!companyMetrics.companyProfiles.subscriptionRevenue,
      },
      {
        id: "pro-services-revenue",
        label: "LTM Pro. Services Revenue as a % of Revenue",
        value: companyMetrics.companyProfiles.proServicesRevenue
          ? `${companyMetrics.companyProfiles.proServicesRevenue}%`
          : "N/A",
        isPercentage: !!companyMetrics.companyProfiles.proServicesRevenue,
      },
      {
        id: "sbc-revenue",
        label: "LTM SBC as a % of LTM Revenue",
        value: `${companyMetrics.companyProfiles.sbcRevenue}%`,
        isPercentage: true,
      },
    ];

    const tradingMetrics: MetricRow[] = [
      {
        id: "share-price",
        label: "Share Price",
        value: companyMetrics.tradingMetrics.sharePrice
          ? `$${companyMetrics.tradingMetrics.sharePrice.toFixed(2)}`
          : "N/A",
        isCurrency: !!companyMetrics.tradingMetrics.sharePrice,
      },
      {
        id: "share-price-52w",
        label: "Share Price % of 52-Week High",
        value: companyMetrics.tradingMetrics.sharePrice52w
          ? `${companyMetrics.tradingMetrics.sharePrice52w}%`
          : "N/A",
        isPercentage: !!companyMetrics.tradingMetrics.sharePrice52w,
      },
      {
        id: "multiple-return-ipo",
        label: "Multiple Return From IPO",
        value: companyMetrics.tradingMetrics.multipleReturnIpo
          ? `${companyMetrics.tradingMetrics.multipleReturnIpo}x`
          : "N/A",
      },
      {
        id: "market-cap",
        label: "Market Cap",
        value: companyMetrics.tradingMetrics.marketCap
          ? `$${(companyMetrics.tradingMetrics.marketCap / 1000).toFixed(0)}B`
          : "N/A",
        isCurrency: !!companyMetrics.tradingMetrics.marketCap,
      },
      {
        id: "enterprise-value",
        label: "Enterprise Value",
        value: companyMetrics.tradingMetrics.enterpriseValue
          ? `$${(companyMetrics.tradingMetrics.enterpriseValue / 1000).toFixed(
              0
            )}B`
          : "N/A",
        isCurrency: !!companyMetrics.tradingMetrics.enterpriseValue,
      },
      {
        id: "ev-ntm-revenue",
        label: "EV / NTM Revenue",
        value: companyMetrics.tradingMetrics.evNtmRevenue
          ? `${companyMetrics.tradingMetrics.evNtmRevenue}x`
          : "N/A",
      },
      {
        id: "ev-implied-arr",
        label: "EV / Implied ARR",
        value: companyMetrics.tradingMetrics.evImpliedArr
          ? `${companyMetrics.tradingMetrics.evImpliedArr}x`
          : "N/A",
      },
      {
        id: "ev-agp",
        label: "EV / AGP (annualized gross profit)",
        value: companyMetrics.tradingMetrics.evAgp
          ? `${companyMetrics.tradingMetrics.evAgp}x`
          : "N/A",
      },
    ];

    return [
      {
        id: "operating-metrics",
        title: "Operating Metrics",
        metrics: operatingMetrics,
      },
      {
        id: "financial-metrics",
        title: "Financial Metrics",
        metrics: financialMetrics,
      },
      {
        id: "trading-metrics",
        title: "Trading Metrics",
        metrics: tradingMetrics,
      },
    ];
  };

  const metricSections = createMetricSections();

  const formatValue = (metric: MetricRow) => {
    if (metric.value === "N/A") {
      return <span className="text-gray-900">{metric.value}</span>;
    }

    if (metric.isCurrency || metric.isPercentage) {
      return <span className="text-primary font-medium">{metric.value}</span>;
    }

    return <span className="text-gray-900">{metric.value}</span>;
  };

  return (
    <div className="space-y-6">
      {/* All Metrics Sections Displayed Vertically */}
      {metricSections.map((section) => (
        <div
          key={section.id}
          id={section.id}
          className="bg-white rounded-lg border border-gray-200"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {section.title}
            </h3>
          </div>

          <div className="divide-y divide-gray-100">
            {section.metrics.map((metric, index) => (
              <div
                key={metric.id}
                className={`px-6 py-4 flex justify-between items-center ${
                  index % 2 === 0 ? "bg-white" : "bg-[#F0F9F5]"
                }`}
              >
                <span className="text-sm text-gray-700">{metric.label}</span>
                <span className="text-sm font-medium">
                  {formatValue(metric)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
