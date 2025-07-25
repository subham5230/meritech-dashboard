import {
  CompanyProfileChart,
  QuarterlyRevenueChart,
  LtmRevenueChart,
  GrossProfitChart,
  FreeCashFlowChart,
  LtmRuleOf40Chart,
  MultiplesSharePriceChart,
  MarketCapImpliedArrChart,
} from "@/components/company-profiles/charts";

interface ChartsPageProps {
  params: Promise<{
    companyId: string;
  }>;
}

export default async function ChartsPage({ params }: ChartsPageProps) {
  const { companyId } = await params;

  return (
    <div className="space-y-12">
      {/* ARR & Net New ARR Chart */}
      <section
        id="arr-net-new-arr"
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          ARR ($B) & Net New ARR ($M)
        </h2>
        <CompanyProfileChart companyId={companyId} />
      </section>

      {/* Quarterly Revenue Chart */}
      <section
        id="quarterly-revenue"
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Quarterly Revenue ($M) & % Year-over-year Growth
        </h2>
        <QuarterlyRevenueChart companyId={companyId} />
      </section>

      {/* LTM Revenue Chart */}
      <section
        id="ltm-revenue"
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          LTM Revenue & % YoY Growth
        </h2>
        <LtmRevenueChart companyId={companyId} />
      </section>

      {/* Gross Profit Chart */}
      <section
        id="gross-profit-gross-margin"
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Gross Profit & Gross Margin
        </h2>
        <GrossProfitChart companyId={companyId} />
      </section>

      {/* Free Cash Flow Chart */}
      <section
        id="free-cash-flow-margin"
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Free Cash Flow & Margin
        </h2>
        <FreeCashFlowChart companyId={companyId} />
      </section>

      {/* LTM Rule of 40 */}
      <section
        id="ltm-rule-of-40"
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          LTM Rule of 40
        </h2>
        <LtmRuleOf40Chart companyId={companyId} />
      </section>

      {/* Multiples & Share Price */}
      <section
        id="multiples-share-price"
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Multiples & Share Price
        </h2>
        <MultiplesSharePriceChart companyId={companyId} />
      </section>

      {/* Market Cap & Implied ARR */}
      <section
        id="market-cap-implied-arr"
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Market Cap & Implied ARR
        </h2>
        <MarketCapImpliedArrChart companyId={companyId} />
      </section>
    </div>
  );
}
