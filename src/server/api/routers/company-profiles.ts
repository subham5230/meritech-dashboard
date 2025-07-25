import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { dummyCompanies } from "@/data/dummy-data";
import {
  historicalMultiplesData,
  getDefaultHistoricalData,
  marketCapImpliedArrData,
  getDefaultMarketCapImpliedArrData,
} from "@/data/historical-data";

// Chart data interface for quarterly metrics
interface ChartDataPoint {
  quarter: string;
  impliedArr: number;
  netNewArr: number;
  yoyGrowth: number;
}

// Generate quarterly chart data for a company
const generateChartData = (companyId: string): ChartDataPoint[] => {
  const company = dummyCompanies.find((c) => c.id === companyId);
  if (!company) return [];

  // Generate quarterly data based on company metrics
  const baseArr = company.financialMetrics.impliedArr;
  const baseNetNewArr = company.financialMetrics.netNewArr;
  const baseGrowth = company.operatingMetrics.ltmRevenueGrowth;

  const quarters = [
    "Q1'22",
    "Q2'22",
    "Q3'22",
    "Q4'22",
    "Q1'23",
    "Q2'23",
    "Q3'23",
    "Q4'23",
    "Q1'24",
    "Q2'24",
    "Q3'24",
    "Q4'24",
  ];

  return quarters.map((quarter, index) => {
    // Create deterministic growth patterns based on company data
    const timeProgress = index / 11; // 0 to 1 over 12 quarters

    // Implied ARR: Gradual growth from base to current level
    const impliedArrGrowth = 1 + (baseGrowth / 100) * timeProgress;
    const impliedArr = baseArr * impliedArrGrowth;

    // Net New ARR: Create realistic quarterly variations
    const quarterlyVariation = Math.sin(timeProgress * Math.PI * 2) * 0.2 + 1; // Cyclical pattern
    const netNewArr = baseNetNewArr * quarterlyVariation;

    // YoY Growth: Gradual decline from high growth to current level
    const growthDecline = 1 - timeProgress * 0.4; // Decline by 40% over time
    const yoyGrowth = baseGrowth * growthDecline;

    return {
      quarter,
      impliedArr: Math.round(impliedArr * 100) / 100,
      netNewArr: Math.round(netNewArr * 100) / 100,
      yoyGrowth: Math.round(yoyGrowth),
    };
  });
};

// Get company profile metrics for table view
const getCompanyMetrics = (companyId: string) => {
  const company = dummyCompanies.find((c) => c.id === companyId);
  if (!company) return null;

  return {
    operatingMetrics: {
      impliedArr: company.financialMetrics.impliedArr,
      impliedArrGrowth: company.operatingMetrics.ltmRevenueGrowth,
      netNewArr: company.financialMetrics.netNewArr,
      netNewArrGrowth: company.operatingMetrics.ltmRevenueGrowth * 0.8,
      ltmRevenue: company.financialMetrics.ltmRevenue,
      ltmRevenueGrowth: company.operatingMetrics.ltmRevenueGrowth,
      ntmRevenue: company.financialMetrics.ntmRevenue,
      ntmRevenueGrowth: company.operatingMetrics.ntmRevenueGrowth,
      operatingIncomeMargin: company.financialMetrics.operatingIncomeMargin,
    },
    financialMetrics: {
      grossMargin: company.financialMetrics.grossMargin,
      salesAndMarketingMargin: company.financialMetrics.salesAndMarketingMargin,
      researchAndDevelopmentMargin:
        company.financialMetrics.researchAndDevelopmentMargin,
      generalAndAdminMargin: company.financialMetrics.generalAndAdminMargin,
      freeCashFlowMargin: company.financialMetrics.freeCashFlowMargin,
    },
    companyProfiles: {
      subscriptionRevenue: null, // Not available in current data model
      proServicesRevenue: null, // Not available in current data model
      sbcRevenue: 22, // Hardcoded for now
    },
    tradingMetrics: {
      sharePrice: company.tradingData.price,
      sharePrice52w: company.tradingData.price * 1.1, // Approximate
      multipleReturnIpo: company.operatingMetrics.multipleReturnSinceIpo,
      marketCap: company.financialMetrics.marketCap,
      enterpriseValue: company.financialMetrics.enterpriseValue,
      evNtmRevenue: company.valuationMetrics.evToNtmRevenue,
      evImpliedArr: company.valuationMetrics.evToImpliedArr,
      evAgp: company.valuationMetrics.evToNtmGrossProfit,
    },
  };
};

export const companyProfilesRouter = createTRPCRouter({
  // Get chart data for a company
  getChartData: publicProcedure
    .input(z.object({ companyId: z.string() }))
    .query(({ input }) => {
      const company = dummyCompanies.find((c) => c.id === input.companyId);
      if (!company) {
        const availableCompanies = dummyCompanies.map((c) => c.id).join(", ");
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Company with ID '${input.companyId}' not found. Available companies: ${availableCompanies}`,
        });
      }
      return generateChartData(input.companyId);
    }),

  // Get company metrics for table view
  getCompanyMetrics: publicProcedure
    .input(z.object({ companyId: z.string() }))
    .query(({ input }) => {
      const company = dummyCompanies.find((c) => c.id === input.companyId);
      if (!company) {
        const availableCompanies = dummyCompanies.map((c) => c.id).join(", ");
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Company with ID '${input.companyId}' not found. Available companies: ${availableCompanies}`,
        });
      }
      return getCompanyMetrics(input.companyId);
    }),

  // Get company details
  getCompanyDetails: publicProcedure
    .input(z.object({ companyId: z.string() }))
    .query(({ input }) => {
      const company = dummyCompanies.find((c) => c.id === input.companyId);
      if (!company) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Company not found",
        });
      }
      return company;
    }),

  // Get available companies for dropdown
  getAvailableCompanies: publicProcedure.query(() => {
    return dummyCompanies.map((c) => ({
      id: c.id,
      name: c.name,
      sector: c.sector,
    }));
  }),

  // Get quarterly revenue data
  getQuarterlyRevenueData: publicProcedure
    .input(z.object({ companyId: z.string() }))
    .query(({ input }) => {
      // Sample data for Quarterly Revenue chart
      return [
        { quarter: "Q1'22", quarterlyRevenue: 363.0, yoyGrowth: 78 },
        { quarter: "Q2'22", quarterlyRevenue: 406.1, yoyGrowth: 79 },
        { quarter: "Q3'22", quarterlyRevenue: 436.5, yoyGrowth: 74 },
        { quarter: "Q4'22", quarterlyRevenue: 469.4, yoyGrowth: 63 },
        { quarter: "Q1'23", quarterlyRevenue: 481.7, yoyGrowth: 50 },
        { quarter: "Q2'23", quarterlyRevenue: 509.5, yoyGrowth: 39 },
        { quarter: "Q3'23", quarterlyRevenue: 547.5, yoyGrowth: 31 },
        { quarter: "Q4'23", quarterlyRevenue: 589.6, yoyGrowth: 27 },
        { quarter: "Q1'24", quarterlyRevenue: 611.3, yoyGrowth: 26 },
        { quarter: "Q2'24", quarterlyRevenue: 645.3, yoyGrowth: 26 },
        { quarter: "Q3'24", quarterlyRevenue: 690.0, yoyGrowth: 26 },
        { quarter: "Q4'24", quarterlyRevenue: 737.7, yoyGrowth: 26 },
      ];
    }),

  // Get LTM revenue data
  getLtmRevenueData: publicProcedure
    .input(z.object({ companyId: z.string() }))
    .query(({ input }) => {
      // Sample data for LTM Revenue chart
      return [
        { quarter: "Q1'22", ltmRevenue: 1.2, yoyGrowth: 78 },
        { quarter: "Q2'22", ltmRevenue: 1.4, yoyGrowth: 79 },
        { quarter: "Q3'22", ltmRevenue: 1.5, yoyGrowth: 74 },
        { quarter: "Q4'22", ltmRevenue: 1.7, yoyGrowth: 63 },
        { quarter: "Q1'23", ltmRevenue: 1.8, yoyGrowth: 50 },
        { quarter: "Q2'23", ltmRevenue: 1.9, yoyGrowth: 39 },
        { quarter: "Q3'23", ltmRevenue: 2.0, yoyGrowth: 31 },
        { quarter: "Q4'23", ltmRevenue: 2.1, yoyGrowth: 27 },
        { quarter: "Q1'24", ltmRevenue: 2.3, yoyGrowth: 26 },
        { quarter: "Q2'24", ltmRevenue: 2.4, yoyGrowth: 26 },
        { quarter: "Q3'24", ltmRevenue: 2.5, yoyGrowth: 26 },
        { quarter: "Q4'24", ltmRevenue: 2.7, yoyGrowth: 26 },
      ];
    }),

  // Get gross profit data
  getGrossProfitData: publicProcedure
    .input(z.object({ companyId: z.string() }))
    .query(({ input }) => {
      // Sample data for Gross Profit chart
      return [
        { quarter: "Q1'22", grossProfit: 941.9, grossMargin: 79 },
        { quarter: "Q2'22", grossProfit: 1091.8, grossMargin: 80 },
        { quarter: "Q3'22", grossProfit: 1229.9, grossMargin: 80 },
        { quarter: "Q4'22", grossProfit: 1346.2, grossMargin: 80 },
        { quarter: "Q1'23", grossProfit: 1442.1, grossMargin: 80 },
        { quarter: "Q2'23", grossProfit: 1527.9, grossMargin: 81 },
        { quarter: "Q3'23", grossProfit: 1570.5, grossMargin: 78 },
        { quarter: "Q4'23", grossProfit: 1621.9, grossMargin: 76 },
        { quarter: "Q1'24", grossProfit: 1671.7, grossMargin: 74 },
        { quarter: "Q2'24", grossProfit: 1716.0, grossMargin: 72 },
        { quarter: "Q3'24", grossProfit: 1827.6, grossMargin: 72 },
        { quarter: "Q4'24", grossProfit: 1927.7, grossMargin: 72 },
      ];
    }),

  // Get free cash flow data
  getFreeCashFlowData: publicProcedure
    .input(z.object({ companyId: z.string() }))
    .query(({ input }) => {
      // Sample data for Free Cash Flow chart - updated to match image exactly
      return [
        { quarter: "Q1'22", fcf: 336.0, fcfMargin: 28 },
        { quarter: "Q2'22", fcf: 353.8, fcfMargin: 26 },
        { quarter: "Q3'22", fcf: 363.9, fcfMargin: 24 },
        { quarter: "Q4'22", fcf: 353.5, fcfMargin: 21 },
        { quarter: "Q1'23", fcf: 340.0, fcfMargin: 19 },
        { quarter: "Q2'23", fcf: 421.5, fcfMargin: 22 },
        { quarter: "Q3'23", fcf: 492.0, fcfMargin: 25 },
        { quarter: "Q4'23", fcf: 597.5, fcfMargin: 28 },
        { quarter: "Q1'24", fcf: 668.0, fcfMargin: 30 },
        { quarter: "Q2'24", fcf: 670.0, fcfMargin: 28 },
        { quarter: "Q3'24", fcf: 735.4, fcfMargin: 29 },
        { quarter: "Q4'24", fcf: 775.1, fcfMargin: 29 },
      ];
    }),

  // Get LTM Rule of 40 data
  getLtmRuleOf40Data: publicProcedure
    .input(z.object({ companyId: z.string() }))
    .query(({ input }) => {
      // Sample data for LTM Rule of 40 chart
      return [
        { quarter: "Q1'22", ruleOf40: 111, fcfMargin: 28, revenueGrowth: 78 },
        { quarter: "Q2'22", ruleOf40: 100, fcfMargin: 26, revenueGrowth: 79 },
        { quarter: "Q3'22", ruleOf40: 85, fcfMargin: 24, revenueGrowth: 74 },
        { quarter: "Q4'22", ruleOf40: 74, fcfMargin: 21, revenueGrowth: 63 },
        { quarter: "Q1'23", ruleOf40: 65, fcfMargin: 19, revenueGrowth: 50 },
        { quarter: "Q2'23", ruleOf40: 52, fcfMargin: 22, revenueGrowth: 48 },
        { quarter: "Q3'23", ruleOf40: 48, fcfMargin: 25, revenueGrowth: 31 },
        { quarter: "Q4'23", ruleOf40: 50, fcfMargin: 28, revenueGrowth: 28 },
        { quarter: "Q1'24", ruleOf40: 54, fcfMargin: 30, revenueGrowth: 27 },
        { quarter: "Q2'24", ruleOf40: 56, fcfMargin: 28, revenueGrowth: 26 },
        { quarter: "Q3'24", ruleOf40: 55, fcfMargin: 29, revenueGrowth: 26 },
        { quarter: "Q4'24", ruleOf40: 54, fcfMargin: 29, revenueGrowth: 26 },
      ];
    }),

  // Get historical multiples and share price data
  getHistoricalMultiplesData: publicProcedure
    .input(z.object({ companyId: z.string() }))
    .query(({ input }) => {
      // Return historical data for the company, or default data if not found
      return (
        historicalMultiplesData[input.companyId] || getDefaultHistoricalData()
      );
    }),

  // Get market cap and implied ARR data
  getMarketCapImpliedArrData: publicProcedure
    .input(z.object({ companyId: z.string() }))
    .query(({ input }) => {
      // Return market cap and implied ARR data for the company, or default data if not found
      return (
        marketCapImpliedArrData[input.companyId] ||
        getDefaultMarketCapImpliedArrData()
      );
    }),

  // Get metrics by category
  getMetricsByCategory: publicProcedure
    .input(
      z.object({
        companyId: z.string(),
        category: z.enum([
          "operating",
          "financial",
          "trading",
          "company-profiles",
        ]),
      })
    )
    .query(({ input }) => {
      const metrics = getCompanyMetrics(input.companyId);
      if (!metrics) return null;

      switch (input.category) {
        case "operating":
          return metrics.operatingMetrics;
        case "financial":
          return metrics.financialMetrics;
        case "trading":
          return metrics.tradingMetrics;
        case "company-profiles":
          return metrics.companyProfiles;
        default:
          return null;
      }
    }),
});
