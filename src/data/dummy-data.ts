import { Company, FilterOptions } from "@/types";

// Dummy data for Meritech Software Index companies
export const dummyCompanies: Company[] = [
  {
    id: "adobe",
    name: "Adobe",
    sector: "Software",
    financialMetrics: {
      marketCap: 160643,
      enterpriseValue: 161493,
      impliedArr: 22745,
      ntmRevenue: 22745,
      ntmFcf: 9677,
      ntmGrossProfit: 20470,
      ltmRevenue: 21375,
      netNewArr: 2274,
      growthAdjEvToNtmRev: 7.1,
      // % LTM Margins
      grossMargin: 90,
      salesAndMarketingMargin: 25,
      researchAndDevelopmentMargin: 14,
      generalAndAdminMargin: 6,
      operatingExpensesMargin: 45,
      operatingIncomeMargin: 45,
      freeCashFlowMargin: 42,
    },
    tradingData: {
      price: 376.92,
      priceChange3Mo: -3,
      priceChange12Mo: -28,
      volume: 2500000,
      avgVolume: 2800000,
    },
    operatingMetrics: {
      ruleOf40: 35,
      revenueGrowth: 12,
      grossMargin: 90,
      operatingMargin: 23,
      fcfMargin: 42,
      customerCount: 25000000,
      arpu: 0.91,
      // Advanced operating metrics
      magicNumber: 0.3,
      paybackPeriod: 43.5,
      impliedAverageAcv: 0.91,
      impliedArrPerFte: 742,
      annualizedOpexPerFte: 322,
      netDollarRetention: 110,
      multipleReturnSinceIpo: 6.8,
      // Growth metrics
      ltmRevenueGrowth: 12,
      ntmRevenueGrowth: 15,
    },
    valuationMetrics: {
      evToImpliedArr: 7.1,
      evToNtmRevenue: 7.1,
      evToNtmGrossProfit: 7.9,
      evToNtmFcf: 16.7,
      priceToBook: 15.2,
      priceToEarnings: 45.3,
    },
  },
  {
    id: "alkami",
    name: "Alkami",
    sector: "Fintech",
    financialMetrics: {
      marketCap: 2903,
      enterpriseValue: 3221,
      impliedArr: 393,
      ntmRevenue: 393,
      ntmFcf: 46,
      ntmGrossProfit: 315,
      ltmRevenue: 315,
      netNewArr: 39,
      growthAdjEvToNtmRev: 8.2,
      // % LTM Margins
      grossMargin: 80,
      salesAndMarketingMargin: 30,
      researchAndDevelopmentMargin: 23,
      generalAndAdminMargin: 16,
      operatingExpensesMargin: 54,
      operatingIncomeMargin: 9,
      freeCashFlowMargin: 1,
    },
    tradingData: {
      price: 27.95,
      priceChange3Mo: 6,
      priceChange12Mo: 12,
      volume: 450000,
      avgVolume: 500000,
    },
    operatingMetrics: {
      ruleOf40: 42,
      revenueGrowth: 25,
      grossMargin: 80,
      operatingMargin: 17,
      fcfMargin: 12,
      customerCount: 18000000,
      arpu: 0.22,
      // Advanced operating metrics
      magicNumber: 2.7,
      paybackPeriod: 6.9,
      impliedAverageAcv: 478,
      impliedArrPerFte: 382,
      annualizedOpexPerFte: 199,
      netDollarRetention: 115,
      multipleReturnSinceIpo: 0.9,
      // Growth metrics
      ltmRevenueGrowth: 25,
      ntmRevenueGrowth: 28,
    },
    valuationMetrics: {
      evToImpliedArr: 8.2,
      evToNtmRevenue: 8.2,
      evToNtmGrossProfit: 10.2,
      evToNtmFcf: 70.0,
      priceToBook: 8.5,
      priceToEarnings: 65.2,
    },
  },
  {
    id: "applovin",
    name: "AppLovin",
    sector: "Mobile Gaming",
    financialMetrics: {
      marketCap: 111066,
      enterpriseValue: 114225,
      impliedArr: 5945,
      ntmRevenue: 5945,
      ntmFcf: 3492,
      ntmGrossProfit: 4756,
      ltmRevenue: 3456,
      netNewArr: 594,
      growthAdjEvToNtmRev: 19.2,
      // % LTM Margins
      grossMargin: 80,
      salesAndMarketingMargin: 15,
      researchAndDevelopmentMargin: 8,
      generalAndAdminMargin: 3,
      operatingExpensesMargin: 25,
      operatingIncomeMargin: 53,
      freeCashFlowMargin: 49,
    },
    tradingData: {
      price: 324.7,
      priceChange3Mo: 6,
      priceChange12Mo: 321,
      volume: 1800000,
      avgVolume: 2000000,
    },
    operatingMetrics: {
      ruleOf40: 58,
      revenueGrowth: 72,
      grossMargin: 80,
      operatingMargin: 30,
      fcfMargin: 59,
      customerCount: 500000000,
      arpu: 0.012,
      // Advanced operating metrics
      magicNumber: 2.2,
      paybackPeriod: 6.6,
      impliedAverageAcv: 3582,
      impliedArrPerFte: 3582,
      annualizedOpexPerFte: 900,
      netDollarRetention: 105,
      multipleReturnSinceIpo: 4.1,
      // Growth metrics
      ltmRevenueGrowth: 72,
      ntmRevenueGrowth: 75,
    },
    valuationMetrics: {
      evToImpliedArr: 19.2,
      evToNtmRevenue: 19.2,
      evToNtmGrossProfit: 24.0,
      evToNtmFcf: 32.7,
      priceToBook: 12.8,
      priceToEarnings: 28.4,
    },
  },
  {
    id: "amplitude",
    name: "Amplitude",
    sector: "Analytics",
    financialMetrics: {
      marketCap: 3456,
      enterpriseValue: 3200,
      impliedArr: 320,
      ntmRevenue: 320,
      ntmFcf: 64,
      ntmGrossProfit: 272,
      ltmRevenue: 280,
      netNewArr: 32,
      growthAdjEvToNtmRev: 10.0,
      // % LTM Margins
      grossMargin: 85,
      salesAndMarketingMargin: 45,
      researchAndDevelopmentMargin: 18,
      generalAndAdminMargin: 16,
      operatingExpensesMargin: 78,
      operatingIncomeMargin: -1,
      freeCashFlowMargin: 1,
    },
    tradingData: {
      price: 18.45,
      priceChange3Mo: -2,
      priceChange12Mo: -15,
      volume: 800000,
      avgVolume: 900000,
    },
    operatingMetrics: {
      ruleOf40: 38,
      revenueGrowth: 20,
      grossMargin: 85,
      operatingMargin: 18,
      fcfMargin: 20,
      customerCount: 2500000,
      arpu: 0.128,
      // Advanced operating metrics
      magicNumber: 0.2,
      paybackPeriod: 73.1,
      impliedAverageAcv: 80,
      impliedArrPerFte: 432,
      annualizedOpexPerFte: 342,
      netDollarRetention: 101,
      multipleReturnSinceIpo: 0.3,
      // Growth metrics
      ltmRevenueGrowth: 20,
      ntmRevenueGrowth: 22,
    },
    valuationMetrics: {
      evToImpliedArr: 10.0,
      evToNtmRevenue: 10.0,
      evToNtmGrossProfit: 11.8,
      evToNtmFcf: 50.0,
      priceToBook: 6.2,
      priceToEarnings: 45.8,
    },
  },
  {
    id: "appfolio",
    name: "AppFolio",
    sector: "Property Management",
    financialMetrics: {
      marketCap: 8234,
      enterpriseValue: 8100,
      impliedArr: 823,
      ntmRevenue: 823,
      ntmFcf: 247,
      ntmGrossProfit: 740,
      ltmRevenue: 745,
      netNewArr: 82,
      growthAdjEvToNtmRev: 9.8,
      // % LTM Margins
      grossMargin: 90,
      salesAndMarketingMargin: 20,
      researchAndDevelopmentMargin: 17,
      generalAndAdminMargin: 8,
      operatingExpensesMargin: 38,
      operatingIncomeMargin: 27,
      freeCashFlowMargin: 22,
    },
    tradingData: {
      price: 234.5,
      priceChange3Mo: 8,
      priceChange12Mo: 45,
      volume: 350000,
      avgVolume: 400000,
    },
    operatingMetrics: {
      ruleOf40: 48,
      revenueGrowth: 30,
      grossMargin: 90,
      operatingMargin: 18,
      fcfMargin: 30,
      customerCount: 25000,
      arpu: 32.92,
      // Advanced operating metrics
      magicNumber: 1.8,
      paybackPeriod: 10.2,
      impliedAverageAcv: 41,
      impliedArrPerFte: 499,
      annualizedOpexPerFte: 207,
      netDollarRetention: 108,
      multipleReturnSinceIpo: 18.6,
      // Growth metrics
      ltmRevenueGrowth: 30,
      ntmRevenueGrowth: 32,
    },
    valuationMetrics: {
      evToImpliedArr: 9.8,
      evToNtmRevenue: 9.8,
      evToNtmGrossProfit: 10.9,
      evToNtmFcf: 32.8,
      priceToBook: 12.4,
      priceToEarnings: 38.2,
    },
  },
  {
    id: "appian",
    name: "Appian",
    sector: "Low-Code Platform",
    financialMetrics: {
      marketCap: 2345,
      enterpriseValue: 2100,
      impliedArr: 234,
      ntmRevenue: 234,
      ntmFcf: 35,
      ntmGrossProfit: 187,
      ltmRevenue: 210,
      netNewArr: 23,
      growthAdjEvToNtmRev: 9.0,
      // % LTM Margins
      grossMargin: 80,
      salesAndMarketingMargin: 45,
      researchAndDevelopmentMargin: 23,
      generalAndAdminMargin: 21,
      operatingExpensesMargin: 78,
      operatingIncomeMargin: -0.6,
      freeCashFlowMargin: 5,
    },
    tradingData: {
      price: 32.15,
      priceChange3Mo: -5,
      priceChange12Mo: -25,
      volume: 600000,
      avgVolume: 700000,
    },
    operatingMetrics: {
      ruleOf40: 25,
      revenueGrowth: 15,
      grossMargin: 80,
      operatingMargin: 10,
      fcfMargin: 15,
      customerCount: 1000000,
      arpu: 0.234,
      // Advanced operating metrics
      magicNumber: 0.8,
      paybackPeriod: 45.2,
      impliedAverageAcv: 667,
      impliedArrPerFte: 328,
      annualizedOpexPerFte: 233,
      netDollarRetention: 112,
      multipleReturnSinceIpo: 2.4,
      // Growth metrics
      ltmRevenueGrowth: 15,
      ntmRevenueGrowth: 18,
    },
    valuationMetrics: {
      evToImpliedArr: 9.0,
      evToNtmRevenue: 9.0,
      evToNtmGrossProfit: 11.2,
      evToNtmFcf: 60.0,
      priceToBook: 8.1,
      priceToEarnings: 52.3,
    },
  },
  {
    id: "atlassian",
    name: "Atlassian",
    sector: "Collaboration",
    financialMetrics: {
      marketCap: 45678,
      enterpriseValue: 45000,
      impliedArr: 4568,
      ntmRevenue: 4568,
      ntmFcf: 913,
      ntmGrossProfit: 4111,
      ltmRevenue: 4100,
      netNewArr: 457,
      growthAdjEvToNtmRev: 9.9,
      // % LTM Margins
      grossMargin: 90,
      salesAndMarketingMargin: 20,
      researchAndDevelopmentMargin: 34,
      generalAndAdminMargin: 9,
      operatingExpensesMargin: 61,
      operatingIncomeMargin: 24,
      freeCashFlowMargin: 30,
    },
    tradingData: {
      price: 185.3,
      priceChange3Mo: 12,
      priceChange12Mo: 35,
      volume: 1200000,
      avgVolume: 1300000,
    },
    operatingMetrics: {
      ruleOf40: 42,
      revenueGrowth: 25,
      grossMargin: 90,
      operatingMargin: 17,
      fcfMargin: 20,
      customerCount: 250000,
      arpu: 18.27,
      // Advanced operating metrics
      magicNumber: 1.2,
      paybackPeriod: 11.2,
      impliedAverageAcv: 406,
      impliedArrPerFte: 406,
      annualizedOpexPerFte: 245,
      netDollarRetention: 110,
      multipleReturnSinceIpo: 9.0,
      // Growth metrics
      ltmRevenueGrowth: 25,
      ntmRevenueGrowth: 28,
    },
    valuationMetrics: {
      evToImpliedArr: 9.9,
      evToNtmRevenue: 9.9,
      evToNtmGrossProfit: 10.9,
      evToNtmFcf: 49.3,
      priceToBook: 18.5,
      priceToEarnings: 42.1,
    },
  },
  {
    id: "avepoint",
    name: "AvePoint",
    sector: "Data Management",
    financialMetrics: {
      marketCap: 1234,
      enterpriseValue: 1100,
      impliedArr: 123,
      ntmRevenue: 123,
      ntmFcf: 25,
      ntmGrossProfit: 104,
      ltmRevenue: 115,
      netNewArr: 12,
      growthAdjEvToNtmRev: 8.9,
      // % LTM Margins
      grossMargin: 85,
      salesAndMarketingMargin: 35,
      researchAndDevelopmentMargin: 12,
      generalAndAdminMargin: 15,
      operatingExpensesMargin: 60,
      operatingIncomeMargin: 16,
      freeCashFlowMargin: 22,
    },
    tradingData: {
      price: 8.95,
      priceChange3Mo: 3,
      priceChange12Mo: -8,
      volume: 400000,
      avgVolume: 450000,
    },
    operatingMetrics: {
      ruleOf40: 32,
      revenueGrowth: 18,
      grossMargin: 85,
      operatingMargin: 14,
      fcfMargin: 20,
      customerCount: 8000000,
      arpu: 0.154,
      // Advanced operating metrics
      magicNumber: 0.5,
      paybackPeriod: 30.9,
      impliedAverageAcv: 15,
      impliedArrPerFte: 122,
      annualizedOpexPerFte: 72,
      netDollarRetention: 111,
      multipleReturnSinceIpo: 1.8,
      // Growth metrics
      ltmRevenueGrowth: 18,
      ntmRevenueGrowth: 20,
    },
    valuationMetrics: {
      evToImpliedArr: 8.9,
      evToNtmRevenue: 8.9,
      evToNtmGrossProfit: 10.6,
      evToNtmFcf: 44.0,
      priceToBook: 5.8,
      priceToEarnings: 35.2,
    },
  },
  {
    id: "avidxchange",
    name: "AvidXchange",
    sector: "Fintech",
    financialMetrics: {
      marketCap: 3456,
      enterpriseValue: 3800,
      impliedArr: 346,
      ntmRevenue: 346,
      ntmFcf: 52,
      ntmGrossProfit: 277,
      ltmRevenue: 310,
      netNewArr: 35,
      growthAdjEvToNtmRev: 11.0,
      // % LTM Margins
      grossMargin: 80,
      salesAndMarketingMargin: 25,
      researchAndDevelopmentMargin: 20,
      generalAndAdminMargin: 17,
      operatingExpensesMargin: 55,
      operatingIncomeMargin: 13,
      freeCashFlowMargin: 15,
    },
    tradingData: {
      price: 12.45,
      priceChange3Mo: -8,
      priceChange12Mo: -30,
      volume: 900000,
      avgVolume: 1000000,
    },
    operatingMetrics: {
      ruleOf40: 28,
      revenueGrowth: 15,
      grossMargin: 80,
      operatingMargin: 13,
      fcfMargin: 15,
      customerCount: 800000,
      arpu: 0.433,
      // Advanced operating metrics
      magicNumber: 0.7,
      paybackPeriod: 28.5,
      impliedAverageAcv: 51,
      impliedArrPerFte: 289,
      annualizedOpexPerFte: 150,
      netDollarRetention: 108,
      multipleReturnSinceIpo: 1.2,
      // Growth metrics
      ltmRevenueGrowth: 15,
      ntmRevenueGrowth: 18,
    },
    valuationMetrics: {
      evToImpliedArr: 11.0,
      evToNtmRevenue: 11.0,
      evToNtmGrossProfit: 13.7,
      evToNtmFcf: 73.1,
      priceToBook: 7.2,
      priceToEarnings: 48.5,
    },
  },
  {
    id: "salesforce",
    name: "Salesforce",
    sector: "CRM",
    financialMetrics: {
      marketCap: 245678,
      enterpriseValue: 248900,
      impliedArr: 28900,
      ntmRevenue: 28900,
      ntmFcf: 8670,
      ntmGrossProfit: 23120,
      ltmRevenue: 26700,
      netNewArr: 2890,
      growthAdjEvToNtmRev: 8.6,
      // % LTM Margins
      grossMargin: 75,
      salesAndMarketingMargin: 40,
      researchAndDevelopmentMargin: 12,
      generalAndAdminMargin: 8,
      operatingExpensesMargin: 60,
      operatingIncomeMargin: 15,
      freeCashFlowMargin: 32,
    },
    tradingData: {
      price: 245.67,
      priceChange3Mo: 12,
      priceChange12Mo: 45,
      volume: 3500000,
      avgVolume: 4000000,
    },
    operatingMetrics: {
      ruleOf40: 47,
      revenueGrowth: 32,
      grossMargin: 75,
      operatingMargin: 15,
      fcfMargin: 32,
      customerCount: 150000000,
      arpu: 0.193,
      // Advanced operating metrics
      magicNumber: 1.8,
      paybackPeriod: 12.5,
      impliedAverageAcv: 193,
      impliedArrPerFte: 520,
      annualizedOpexPerFte: 280,
      netDollarRetention: 118,
      multipleReturnSinceIpo: 12.3,
      // Growth metrics
      ltmRevenueGrowth: 32,
      ntmRevenueGrowth: 35,
    },
    valuationMetrics: {
      evToImpliedArr: 8.6,
      evToNtmRevenue: 8.6,
      evToNtmGrossProfit: 10.8,
      evToNtmFcf: 28.7,
      priceToBook: 4.2,
      priceToEarnings: 35.8,
    },
  },
  {
    id: "microsoft",
    name: "Microsoft",
    sector: "Enterprise Software",
    financialMetrics: {
      marketCap: 2890000,
      enterpriseValue: 2900000,
      impliedArr: 89000,
      ntmRevenue: 89000,
      ntmFcf: 35600,
      ntmGrossProfit: 71200,
      ltmRevenue: 85000,
      netNewArr: 8900,
      growthAdjEvToNtmRev: 32.6,
      // % LTM Margins
      grossMargin: 70,
      salesAndMarketingMargin: 15,
      researchAndDevelopmentMargin: 12,
      generalAndAdminMargin: 5,
      operatingExpensesMargin: 32,
      operatingIncomeMargin: 38,
      freeCashFlowMargin: 40,
    },
    tradingData: {
      price: 389.45,
      priceChange3Mo: 8,
      priceChange12Mo: 67,
      volume: 25000000,
      avgVolume: 28000000,
    },
    operatingMetrics: {
      ruleOf40: 78,
      revenueGrowth: 40,
      grossMargin: 70,
      operatingMargin: 38,
      fcfMargin: 40,
      customerCount: 1000000000,
      arpu: 0.089,
      // Advanced operating metrics
      magicNumber: 2.1,
      paybackPeriod: 8.2,
      impliedAverageAcv: 89,
      impliedArrPerFte: 890,
      annualizedOpexPerFte: 320,
      netDollarRetention: 125,
      multipleReturnSinceIpo: 15.7,
      // Growth metrics
      ltmRevenueGrowth: 40,
      ntmRevenueGrowth: 42,
    },
    valuationMetrics: {
      evToImpliedArr: 32.6,
      evToNtmRevenue: 32.6,
      evToNtmGrossProfit: 40.7,
      evToNtmFcf: 81.5,
      priceToBook: 12.8,
      priceToEarnings: 28.9,
    },
  },
  {
    id: "servicenow",
    name: "ServiceNow",
    sector: "IT Service Management",
    financialMetrics: {
      marketCap: 156789,
      enterpriseValue: 158900,
      impliedArr: 8900,
      ntmRevenue: 8900,
      ntmFcf: 2670,
      ntmGrossProfit: 7565,
      ltmRevenue: 8200,
      netNewArr: 890,
      growthAdjEvToNtmRev: 17.9,
      // % LTM Margins
      grossMargin: 82,
      salesAndMarketingMargin: 35,
      researchAndDevelopmentMargin: 15,
      generalAndAdminMargin: 8,
      operatingExpensesMargin: 58,
      operatingIncomeMargin: 24,
      freeCashFlowMargin: 30,
    },
    tradingData: {
      price: 789.23,
      priceChange3Mo: 15,
      priceChange12Mo: 89,
      volume: 1200000,
      avgVolume: 1500000,
    },
    operatingMetrics: {
      ruleOf40: 54,
      revenueGrowth: 30,
      grossMargin: 82,
      operatingMargin: 24,
      fcfMargin: 30,
      customerCount: 7500000,
      arpu: 1.187,
      // Advanced operating metrics
      magicNumber: 1.9,
      paybackPeriod: 15.3,
      impliedAverageAcv: 1187,
      impliedArrPerFte: 890,
      annualizedOpexPerFte: 420,
      netDollarRetention: 122,
      multipleReturnSinceIpo: 8.9,
      // Growth metrics
      ltmRevenueGrowth: 30,
      ntmRevenueGrowth: 32,
    },
    valuationMetrics: {
      evToImpliedArr: 17.9,
      evToNtmRevenue: 17.9,
      evToNtmGrossProfit: 21.0,
      evToNtmFcf: 59.5,
      priceToBook: 18.7,
      priceToEarnings: 42.3,
    },
  },
  {
    id: "datadog",
    name: "Datadog",
    sector: "Monitoring & Analytics",
    financialMetrics: {
      marketCap: 45678,
      enterpriseValue: 46890,
      impliedArr: 2345,
      ntmRevenue: 2345,
      ntmFcf: 469,
      ntmGrossProfit: 1993,
      ltmRevenue: 2100,
      netNewArr: 234,
      growthAdjEvToNtmRev: 20.0,
      // % LTM Margins
      grossMargin: 78,
      salesAndMarketingMargin: 45,
      researchAndDevelopmentMargin: 20,
      generalAndAdminMargin: 12,
      operatingExpensesMargin: 77,
      operatingIncomeMargin: 1,
      freeCashFlowMargin: 20,
    },
    tradingData: {
      price: 134.56,
      priceChange3Mo: -5,
      priceChange12Mo: -15,
      volume: 2800000,
      avgVolume: 3200000,
    },
    operatingMetrics: {
      ruleOf40: 21,
      revenueGrowth: 20,
      grossMargin: 78,
      operatingMargin: 1,
      fcfMargin: 20,
      customerCount: 25000000,
      arpu: 0.094,
      // Advanced operating metrics
      magicNumber: 0.8,
      paybackPeriod: 45.2,
      impliedAverageAcv: 94,
      impliedArrPerFte: 234,
      annualizedOpexPerFte: 180,
      netDollarRetention: 130,
      multipleReturnSinceIpo: 3.2,
      // Growth metrics
      ltmRevenueGrowth: 20,
      ntmRevenueGrowth: 22,
    },
    valuationMetrics: {
      evToImpliedArr: 20.0,
      evToNtmRevenue: 20.0,
      evToNtmGrossProfit: 23.5,
      evToNtmFcf: 100.0,
      priceToBook: 15.3,
      priceToEarnings: 85.6,
    },
  },
  {
    id: "snowflake",
    name: "Snowflake",
    sector: "Data Cloud",
    financialMetrics: {
      marketCap: 67890,
      enterpriseValue: 68900,
      impliedArr: 3456,
      ntmRevenue: 3456,
      ntmFcf: 691,
      ntmGrossProfit: 2938,
      ltmRevenue: 3100,
      netNewArr: 345,
      growthAdjEvToNtmRev: 19.9,
      // % LTM Margins
      grossMargin: 75,
      salesAndMarketingMargin: 50,
      researchAndDevelopmentMargin: 18,
      generalAndAdminMargin: 10,
      operatingExpensesMargin: 78,
      operatingIncomeMargin: -3,
      freeCashFlowMargin: 20,
    },
    tradingData: {
      price: 198.34,
      priceChange3Mo: -12,
      priceChange12Mo: -25,
      volume: 1800000,
      avgVolume: 2200000,
    },
    operatingMetrics: {
      ruleOf40: 17,
      revenueGrowth: 20,
      grossMargin: 75,
      operatingMargin: -3,
      fcfMargin: 20,
      customerCount: 8000000,
      arpu: 0.432,
      // Advanced operating metrics
      magicNumber: 0.6,
      paybackPeriod: 52.8,
      impliedAverageAcv: 432,
      impliedArrPerFte: 345,
      annualizedOpexPerFte: 220,
      netDollarRetention: 135,
      multipleReturnSinceIpo: 2.1,
      // Growth metrics
      ltmRevenueGrowth: 20,
      ntmRevenueGrowth: 22,
    },
    valuationMetrics: {
      evToImpliedArr: 19.9,
      evToNtmRevenue: 19.9,
      evToNtmGrossProfit: 23.4,
      evToNtmFcf: 99.7,
      priceToBook: 8.9,
      priceToEarnings: -45.2,
    },
  },
  {
    id: "palantir",
    name: "Palantir",
    sector: "Data Analytics",
    financialMetrics: {
      marketCap: 45678,
      enterpriseValue: 46890,
      impliedArr: 2345,
      ntmRevenue: 2345,
      ntmFcf: 469,
      ntmGrossProfit: 1993,
      ltmRevenue: 2100,
      netNewArr: 234,
      growthAdjEvToNtmRev: 20.0,
      // % LTM Margins
      grossMargin: 82,
      salesAndMarketingMargin: 35,
      researchAndDevelopmentMargin: 25,
      generalAndAdminMargin: 15,
      operatingExpensesMargin: 75,
      operatingIncomeMargin: 7,
      freeCashFlowMargin: 20,
    },
    tradingData: {
      price: 23.45,
      priceChange3Mo: 25,
      priceChange12Mo: 156,
      volume: 45000000,
      avgVolume: 50000000,
    },
    operatingMetrics: {
      ruleOf40: 27,
      revenueGrowth: 20,
      grossMargin: 82,
      operatingMargin: 7,
      fcfMargin: 20,
      customerCount: 3500000,
      arpu: 0.671,
      // Advanced operating metrics
      magicNumber: 1.2,
      paybackPeriod: 35.6,
      impliedAverageAcv: 671,
      impliedArrPerFte: 234,
      annualizedOpexPerFte: 180,
      netDollarRetention: 115,
      multipleReturnSinceIpo: 1.8,
      // Growth metrics
      ltmRevenueGrowth: 20,
      ntmRevenueGrowth: 22,
    },
    valuationMetrics: {
      evToImpliedArr: 20.0,
      evToNtmRevenue: 20.0,
      evToNtmGrossProfit: 23.5,
      evToNtmFcf: 100.0,
      priceToBook: 12.4,
      priceToEarnings: 85.6,
    },
  },
  {
    id: "zoom",
    name: "Zoom",
    sector: "Video Communications",
    financialMetrics: {
      marketCap: 23456,
      enterpriseValue: 23890,
      impliedArr: 1234,
      ntmRevenue: 1234,
      ntmFcf: 247,
      ntmGrossProfit: 1049,
      ltmRevenue: 1100,
      netNewArr: 123,
      growthAdjEvToNtmRev: 19.4,
      // % LTM Margins
      grossMargin: 75,
      salesAndMarketingMargin: 30,
      researchAndDevelopmentMargin: 12,
      generalAndAdminMargin: 8,
      operatingExpensesMargin: 50,
      operatingIncomeMargin: 25,
      freeCashFlowMargin: 20,
    },
    tradingData: {
      price: 78.9,
      priceChange3Mo: -8,
      priceChange12Mo: -45,
      volume: 3500000,
      avgVolume: 4000000,
    },
    operatingMetrics: {
      ruleOf40: 45,
      revenueGrowth: 20,
      grossMargin: 75,
      operatingMargin: 25,
      fcfMargin: 20,
      customerCount: 300000000,
      arpu: 0.004,
      // Advanced operating metrics
      magicNumber: 1.5,
      paybackPeriod: 18.7,
      impliedAverageAcv: 4,
      impliedArrPerFte: 123,
      annualizedOpexPerFte: 90,
      netDollarRetention: 110,
      multipleReturnSinceIpo: 2.3,
      // Growth metrics
      ltmRevenueGrowth: 20,
      ntmRevenueGrowth: 22,
    },
    valuationMetrics: {
      evToImpliedArr: 19.4,
      evToNtmRevenue: 19.4,
      evToNtmGrossProfit: 22.8,
      evToNtmFcf: 96.7,
      priceToBook: 6.8,
      priceToEarnings: 28.9,
    },
  },
  {
    id: "slack",
    name: "Slack",
    sector: "Team Collaboration",
    financialMetrics: {
      marketCap: 12345,
      enterpriseValue: 12890,
      impliedArr: 678,
      ntmRevenue: 678,
      ntmFcf: 136,
      ntmGrossProfit: 576,
      ltmRevenue: 600,
      netNewArr: 68,
      growthAdjEvToNtmRev: 19.0,
      // % LTM Margins
      grossMargin: 88,
      salesAndMarketingMargin: 45,
      researchAndDevelopmentMargin: 20,
      generalAndAdminMargin: 12,
      operatingExpensesMargin: 77,
      operatingIncomeMargin: 11,
      freeCashFlowMargin: 20,
    },
    tradingData: {
      price: 45.67,
      priceChange3Mo: 12,
      priceChange12Mo: 34,
      volume: 1200000,
      avgVolume: 1500000,
    },
    operatingMetrics: {
      ruleOf40: 31,
      revenueGrowth: 20,
      grossMargin: 88,
      operatingMargin: 11,
      fcfMargin: 20,
      customerCount: 15000000,
      arpu: 0.045,
      // Advanced operating metrics
      magicNumber: 1.1,
      paybackPeriod: 25.4,
      impliedAverageAcv: 45,
      impliedArrPerFte: 68,
      annualizedOpexPerFte: 85,
      netDollarRetention: 125,
      multipleReturnSinceIpo: 1.5,
      // Growth metrics
      ltmRevenueGrowth: 20,
      ntmRevenueGrowth: 22,
    },
    valuationMetrics: {
      evToImpliedArr: 19.0,
      evToNtmRevenue: 19.0,
      evToNtmGrossProfit: 22.4,
      evToNtmFcf: 94.8,
      priceToBook: 8.2,
      priceToEarnings: 45.6,
    },
  },
  {
    id: "twilio",
    name: "Twilio",
    sector: "Communication APIs",
    financialMetrics: {
      marketCap: 12345,
      enterpriseValue: 12890,
      impliedArr: 678,
      ntmRevenue: 678,
      ntmFcf: 136,
      ntmGrossProfit: 576,
      ltmRevenue: 600,
      netNewArr: 68,
      growthAdjEvToNtmRev: 19.0,
      // % LTM Margins
      grossMargin: 55,
      salesAndMarketingMargin: 30,
      researchAndDevelopmentMargin: 15,
      generalAndAdminMargin: 8,
      operatingExpensesMargin: 53,
      operatingIncomeMargin: 2,
      freeCashFlowMargin: 20,
    },
    tradingData: {
      price: 67.89,
      priceChange3Mo: -15,
      priceChange12Mo: -45,
      volume: 2500000,
      avgVolume: 3000000,
    },
    operatingMetrics: {
      ruleOf40: 22,
      revenueGrowth: 20,
      grossMargin: 55,
      operatingMargin: 2,
      fcfMargin: 20,
      customerCount: 300000,
      arpu: 2.0,
      // Advanced operating metrics
      magicNumber: 0.9,
      paybackPeriod: 38.4,
      impliedAverageAcv: 2000,
      impliedArrPerFte: 68,
      annualizedOpexPerFte: 120,
      netDollarRetention: 112,
      multipleReturnSinceIpo: 1.2,
      // Growth metrics
      ltmRevenueGrowth: 20,
      ntmRevenueGrowth: 22,
    },
    valuationMetrics: {
      evToImpliedArr: 19.0,
      evToNtmRevenue: 19.0,
      evToNtmGrossProfit: 22.4,
      evToNtmFcf: 94.8,
      priceToBook: 3.8,
      priceToEarnings: 85.6,
    },
  },
  {
    id: "shopify",
    name: "Shopify",
    sector: "E-commerce Platform",
    financialMetrics: {
      marketCap: 89012,
      enterpriseValue: 90123,
      impliedArr: 4567,
      ntmRevenue: 4567,
      ntmFcf: 913,
      ntmGrossProfit: 3882,
      ltmRevenue: 4100,
      netNewArr: 456,
      growthAdjEvToNtmRev: 19.7,
      // % LTM Margins
      grossMargin: 85,
      salesAndMarketingMargin: 25,
      researchAndDevelopmentMargin: 20,
      generalAndAdminMargin: 10,
      operatingExpensesMargin: 55,
      operatingIncomeMargin: 30,
      freeCashFlowMargin: 20,
    },
    tradingData: {
      price: 67.34,
      priceChange3Mo: 25,
      priceChange12Mo: 89,
      volume: 8500000,
      avgVolume: 10000000,
    },
    operatingMetrics: {
      ruleOf40: 50,
      revenueGrowth: 30,
      grossMargin: 85,
      operatingMargin: 30,
      fcfMargin: 20,
      customerCount: 2000000,
      arpu: 2.05,
      // Advanced operating metrics
      magicNumber: 2.3,
      paybackPeriod: 12.8,
      impliedAverageAcv: 2050,
      impliedArrPerFte: 456,
      annualizedOpexPerFte: 200,
      netDollarRetention: 108,
      multipleReturnSinceIpo: 8.9,
      // Growth metrics
      ltmRevenueGrowth: 30,
      ntmRevenueGrowth: 32,
    },
    valuationMetrics: {
      evToImpliedArr: 19.7,
      evToNtmRevenue: 19.7,
      evToNtmGrossProfit: 23.2,
      evToNtmFcf: 98.7,
      priceToBook: 12.4,
      priceToEarnings: 45.6,
    },
  },
  {
    id: "splunk",
    name: "Splunk",
    sector: "Data Analytics",
    financialMetrics: {
      marketCap: 23456,
      enterpriseValue: 23890,
      impliedArr: 1234,
      ntmRevenue: 1234,
      ntmFcf: 247,
      ntmGrossProfit: 1049,
      ltmRevenue: 1100,
      netNewArr: 123,
      growthAdjEvToNtmRev: 19.4,
      // % LTM Margins
      grossMargin: 75,
      salesAndMarketingMargin: 40,
      researchAndDevelopmentMargin: 18,
      generalAndAdminMargin: 12,
      operatingExpensesMargin: 70,
      operatingIncomeMargin: 5,
      freeCashFlowMargin: 20,
    },
    tradingData: {
      price: 145.67,
      priceChange3Mo: 8,
      priceChange12Mo: 34,
      volume: 1200000,
      avgVolume: 1500000,
    },
    operatingMetrics: {
      ruleOf40: 25,
      revenueGrowth: 20,
      grossMargin: 75,
      operatingMargin: 5,
      fcfMargin: 20,
      customerCount: 15000,
      arpu: 73.3,
      // Advanced operating metrics
      magicNumber: 1.1,
      paybackPeriod: 28.9,
      impliedAverageAcv: 73300,
      impliedArrPerFte: 123,
      annualizedOpexPerFte: 150,
      netDollarRetention: 118,
      multipleReturnSinceIpo: 3.4,
      // Growth metrics
      ltmRevenueGrowth: 20,
      ntmRevenueGrowth: 22,
    },
    valuationMetrics: {
      evToImpliedArr: 19.4,
      evToNtmRevenue: 19.4,
      evToNtmGrossProfit: 22.8,
      evToNtmFcf: 96.7,
      priceToBook: 8.9,
      priceToEarnings: 45.6,
    },
  },
  {
    id: "mongo",
    name: "MongoDB",
    sector: "Database",
    financialMetrics: {
      marketCap: 34567,
      enterpriseValue: 35678,
      impliedArr: 1789,
      ntmRevenue: 1789,
      ntmFcf: 358,
      ntmGrossProfit: 1521,
      ltmRevenue: 1600,
      netNewArr: 178,
      growthAdjEvToNtmRev: 19.9,
      // % LTM Margins
      grossMargin: 75,
      salesAndMarketingMargin: 45,
      researchAndDevelopmentMargin: 20,
      generalAndAdminMargin: 12,
      operatingExpensesMargin: 77,
      operatingIncomeMargin: -2,
      freeCashFlowMargin: 20,
    },
    tradingData: {
      price: 456.78,
      priceChange3Mo: 12,
      priceChange12Mo: 78,
      volume: 800000,
      avgVolume: 1000000,
    },
    operatingMetrics: {
      ruleOf40: 18,
      revenueGrowth: 20,
      grossMargin: 75,
      operatingMargin: -2,
      fcfMargin: 20,
      customerCount: 45000,
      arpu: 35.6,
      // Advanced operating metrics
      magicNumber: 0.8,
      paybackPeriod: 48.2,
      impliedAverageAcv: 35600,
      impliedArrPerFte: 178,
      annualizedOpexPerFte: 200,
      netDollarRetention: 125,
      multipleReturnSinceIpo: 5.7,
      // Growth metrics
      ltmRevenueGrowth: 20,
      ntmRevenueGrowth: 22,
    },
    valuationMetrics: {
      evToImpliedArr: 19.9,
      evToNtmRevenue: 19.9,
      evToNtmGrossProfit: 23.5,
      evToNtmFcf: 99.7,
      priceToBook: 25.8,
      priceToEarnings: -89.2,
    },
  },
  {
    id: "okta",
    name: "Okta",
    sector: "Identity & Access Management",
    financialMetrics: {
      marketCap: 15678,
      enterpriseValue: 16234,
      impliedArr: 890,
      ntmRevenue: 890,
      ntmFcf: 178,
      ntmGrossProfit: 756,
      ltmRevenue: 800,
      netNewArr: 89,
      growthAdjEvToNtmRev: 18.2,
      // % LTM Margins
      grossMargin: 80,
      salesAndMarketingMargin: 50,
      researchAndDevelopmentMargin: 20,
      generalAndAdminMargin: 15,
      operatingExpensesMargin: 85,
      operatingIncomeMargin: -5,
      freeCashFlowMargin: 20,
    },
    tradingData: {
      price: 89.12,
      priceChange3Mo: -8,
      priceChange12Mo: -25,
      volume: 1800000,
      avgVolume: 2200000,
    },
    operatingMetrics: {
      ruleOf40: 15,
      revenueGrowth: 20,
      grossMargin: 80,
      operatingMargin: -5,
      fcfMargin: 20,
      customerCount: 18000,
      arpu: 44.4,
      // Advanced operating metrics
      magicNumber: 0.7,
      paybackPeriod: 52.8,
      impliedAverageAcv: 44400,
      impliedArrPerFte: 89,
      annualizedOpexPerFte: 180,
      netDollarRetention: 120,
      multipleReturnSinceIpo: 2.8,
      // Growth metrics
      ltmRevenueGrowth: 20,
      ntmRevenueGrowth: 22,
    },
    valuationMetrics: {
      evToImpliedArr: 18.2,
      evToNtmRevenue: 18.2,
      evToNtmGrossProfit: 21.5,
      evToNtmFcf: 91.2,
      priceToBook: 8.9,
      priceToEarnings: -67.8,
    },
  },
  {
    id: "crowdstrike",
    name: "CrowdStrike",
    sector: "Cybersecurity",
    financialMetrics: {
      marketCap: 67890,
      enterpriseValue: 68901,
      impliedArr: 3456,
      ntmRevenue: 3456,
      ntmFcf: 691,
      ntmGrossProfit: 2938,
      ltmRevenue: 3100,
      netNewArr: 345,
      growthAdjEvToNtmRev: 19.9,
      // % LTM Margins
      grossMargin: 78,
      salesAndMarketingMargin: 40,
      researchAndDevelopmentMargin: 18,
      generalAndAdminMargin: 10,
      operatingExpensesMargin: 68,
      operatingIncomeMargin: 10,
      freeCashFlowMargin: 20,
    },
    tradingData: {
      price: 234.56,
      priceChange3Mo: 15,
      priceChange12Mo: 67,
      volume: 1200000,
      avgVolume: 1500000,
    },
    operatingMetrics: {
      ruleOf40: 30,
      revenueGrowth: 20,
      grossMargin: 78,
      operatingMargin: 10,
      fcfMargin: 20,
      customerCount: 25000,
      arpu: 124.0,
      // Advanced operating metrics
      magicNumber: 1.3,
      paybackPeriod: 32.8,
      impliedAverageAcv: 124000,
      impliedArrPerFte: 345,
      annualizedOpexPerFte: 250,
      netDollarRetention: 125,
      multipleReturnSinceIpo: 4.2,
      // Growth metrics
      ltmRevenueGrowth: 20,
      ntmRevenueGrowth: 22,
    },
    valuationMetrics: {
      evToImpliedArr: 19.9,
      evToNtmRevenue: 19.9,
      evToNtmGrossProfit: 23.4,
      evToNtmFcf: 99.7,
      priceToBook: 18.7,
      priceToEarnings: 89.4,
    },
  },
  {
    id: "zscaler",
    name: "Zscaler",
    sector: "Cybersecurity",
    financialMetrics: {
      marketCap: 23456,
      enterpriseValue: 23890,
      impliedArr: 1234,
      ntmRevenue: 1234,
      ntmFcf: 247,
      ntmGrossProfit: 1049,
      ltmRevenue: 1100,
      netNewArr: 123,
      growthAdjEvToNtmRev: 19.4,
      // % LTM Margins
      grossMargin: 80,
      salesAndMarketingMargin: 45,
      researchAndDevelopmentMargin: 15,
      generalAndAdminMargin: 8,
      operatingExpensesMargin: 68,
      operatingIncomeMargin: 12,
      freeCashFlowMargin: 20,
    },
    tradingData: {
      price: 178.9,
      priceChange3Mo: 8,
      priceChange12Mo: 45,
      volume: 900000,
      avgVolume: 1200000,
    },
    operatingMetrics: {
      ruleOf40: 32,
      revenueGrowth: 20,
      grossMargin: 80,
      operatingMargin: 12,
      fcfMargin: 20,
      customerCount: 7000,
      arpu: 157.1,
      // Advanced operating metrics
      magicNumber: 1.2,
      paybackPeriod: 28.9,
      impliedAverageAcv: 157100,
      impliedArrPerFte: 123,
      annualizedOpexPerFte: 180,
      netDollarRetention: 122,
      multipleReturnSinceIpo: 3.8,
      // Growth metrics
      ltmRevenueGrowth: 20,
      ntmRevenueGrowth: 22,
    },
    valuationMetrics: {
      evToImpliedArr: 19.4,
      evToNtmRevenue: 19.4,
      evToNtmGrossProfit: 22.8,
      evToNtmFcf: 96.7,
      priceToBook: 15.6,
      priceToEarnings: 67.8,
    },
  },
  {
    id: "elastic",
    name: "Elastic",
    sector: "Search & Analytics",
    financialMetrics: {
      marketCap: 12345,
      enterpriseValue: 12890,
      impliedArr: 678,
      ntmRevenue: 678,
      ntmFcf: 136,
      ntmGrossProfit: 576,
      ltmRevenue: 600,
      netNewArr: 68,
      growthAdjEvToNtmRev: 19.0,
      // % LTM Margins
      grossMargin: 75,
      salesAndMarketingMargin: 40,
      researchAndDevelopmentMargin: 20,
      generalAndAdminMargin: 12,
      operatingExpensesMargin: 72,
      operatingIncomeMargin: 3,
      freeCashFlowMargin: 20,
    },
    tradingData: {
      price: 89.67,
      priceChange3Mo: -5,
      priceChange12Mo: -15,
      volume: 600000,
      avgVolume: 800000,
    },
    operatingMetrics: {
      ruleOf40: 23,
      revenueGrowth: 20,
      grossMargin: 75,
      operatingMargin: 3,
      fcfMargin: 20,
      customerCount: 19000,
      arpu: 31.6,
      // Advanced operating metrics
      magicNumber: 0.9,
      paybackPeriod: 38.4,
      impliedAverageAcv: 31600,
      impliedArrPerFte: 68,
      annualizedOpexPerFte: 120,
      netDollarRetention: 115,
      multipleReturnSinceIpo: 2.1,
      // Growth metrics
      ltmRevenueGrowth: 20,
      ntmRevenueGrowth: 22,
    },
    valuationMetrics: {
      evToImpliedArr: 19.0,
      evToNtmRevenue: 19.0,
      evToNtmGrossProfit: 22.4,
      evToNtmFcf: 94.8,
      priceToBook: 8.9,
      priceToEarnings: 45.6,
    },
  },
  {
    id: "confluent",
    name: "Confluent",
    sector: "Data Streaming",
    financialMetrics: {
      marketCap: 8901,
      enterpriseValue: 9234,
      impliedArr: 456,
      ntmRevenue: 456,
      ntmFcf: 91,
      ntmGrossProfit: 387,
      ltmRevenue: 410,
      netNewArr: 45,
      growthAdjEvToNtmRev: 20.2,
      // % LTM Margins
      grossMargin: 75,
      salesAndMarketingMargin: 50,
      researchAndDevelopmentMargin: 25,
      generalAndAdminMargin: 15,
      operatingExpensesMargin: 90,
      operatingIncomeMargin: -15,
      freeCashFlowMargin: 20,
    },
    tradingData: {
      price: 23.45,
      priceChange3Mo: -12,
      priceChange12Mo: -35,
      volume: 1200000,
      avgVolume: 1500000,
    },
    operatingMetrics: {
      ruleOf40: 5,
      revenueGrowth: 20,
      grossMargin: 75,
      operatingMargin: -15,
      fcfMargin: 20,
      customerCount: 4500,
      arpu: 91.1,
      // Advanced operating metrics
      magicNumber: 0.5,
      paybackPeriod: 72.8,
      impliedAverageAcv: 91100,
      impliedArrPerFte: 45,
      annualizedOpexPerFte: 180,
      netDollarRetention: 130,
      multipleReturnSinceIpo: 0.8,
      // Growth metrics
      ltmRevenueGrowth: 20,
      ntmRevenueGrowth: 22,
    },
    valuationMetrics: {
      evToImpliedArr: 20.2,
      evToNtmRevenue: 20.2,
      evToNtmGrossProfit: 23.9,
      evToNtmFcf: 101.5,
      priceToBook: 6.8,
      priceToEarnings: -45.6,
    },
  },
];

// Calculate mean and median values for aggregated rows
export const calculateAggregates = (companies: Company[]) => {
  const metrics = companies.map((c) => ({
    // Trading Data
    price: c.tradingData.price,
    priceChange3Mo: c.tradingData.priceChange3Mo,
    priceChange12Mo: c.tradingData.priceChange12Mo,

    // Financial Metrics
    marketCap: c.financialMetrics.marketCap,
    enterpriseValue: c.financialMetrics.enterpriseValue,
    impliedArr: c.financialMetrics.impliedArr,
    netNewArr: c.financialMetrics.netNewArr,
    ltmRevenue: c.financialMetrics.ltmRevenue,
    ntmFcf: c.financialMetrics.ntmFcf,
    growthAdjEvToNtmRev: c.financialMetrics.growthAdjEvToNtmRev,

    // Margins
    grossMargin: c.financialMetrics.grossMargin,
    salesAndMarketingMargin: c.financialMetrics.salesAndMarketingMargin,
    researchAndDevelopmentMargin:
      c.financialMetrics.researchAndDevelopmentMargin,
    generalAndAdminMargin: c.financialMetrics.generalAndAdminMargin,
    operatingExpensesMargin: c.financialMetrics.operatingExpensesMargin,
    operatingIncomeMargin: c.financialMetrics.operatingIncomeMargin,
    freeCashFlowMargin: c.financialMetrics.freeCashFlowMargin,

    // Operating Metrics
    ltmRevenueGrowth: c.operatingMetrics.ltmRevenueGrowth,
    ntmRevenueGrowth: c.operatingMetrics.ntmRevenueGrowth,
    fcfMargin: c.operatingMetrics.fcfMargin,
    ruleOf40: c.operatingMetrics.ruleOf40,
    magicNumber: c.operatingMetrics.magicNumber,
    paybackPeriod: c.operatingMetrics.paybackPeriod,
    impliedAverageAcv: c.operatingMetrics.impliedAverageAcv,
    customerCount: c.operatingMetrics.customerCount,
    impliedArrPerFte: c.operatingMetrics.impliedArrPerFte,
    annualizedOpexPerFte: c.operatingMetrics.annualizedOpexPerFte,
    netDollarRetention: c.operatingMetrics.netDollarRetention,
    multipleReturnSinceIpo: c.operatingMetrics.multipleReturnSinceIpo,

    // Valuation Metrics
    evToImpliedArr: c.valuationMetrics.evToImpliedArr,
    evToNtmRevenue: c.valuationMetrics.evToNtmRevenue,
    evToNtmGrossProfit: c.valuationMetrics.evToNtmGrossProfit,
    evToNtmFcf: c.valuationMetrics.evToNtmFcf,
  }));

  const mean = {
    // Trading Data
    price: metrics.reduce((sum, m) => sum + m.price, 0) / metrics.length,
    priceChange3Mo:
      metrics.reduce((sum, m) => sum + m.priceChange3Mo, 0) / metrics.length,
    priceChange12Mo:
      metrics.reduce((sum, m) => sum + m.priceChange12Mo, 0) / metrics.length,

    // Financial Metrics
    marketCap:
      metrics.reduce((sum, m) => sum + m.marketCap, 0) / metrics.length,
    enterpriseValue:
      metrics.reduce((sum, m) => sum + m.enterpriseValue, 0) / metrics.length,
    impliedArr:
      metrics.reduce((sum, m) => sum + m.impliedArr, 0) / metrics.length,
    netNewArr:
      metrics.reduce((sum, m) => sum + m.netNewArr, 0) / metrics.length,
    ltmRevenue:
      metrics.reduce((sum, m) => sum + m.ltmRevenue, 0) / metrics.length,
    ntmFcf: metrics.reduce((sum, m) => sum + m.ntmFcf, 0) / metrics.length,
    growthAdjEvToNtmRev:
      metrics.reduce((sum, m) => sum + m.growthAdjEvToNtmRev, 0) /
      metrics.length,

    // Margins
    grossMargin:
      metrics.reduce((sum, m) => sum + m.grossMargin, 0) / metrics.length,
    salesAndMarketingMargin:
      metrics.reduce((sum, m) => sum + m.salesAndMarketingMargin, 0) /
      metrics.length,
    researchAndDevelopmentMargin:
      metrics.reduce((sum, m) => sum + m.researchAndDevelopmentMargin, 0) /
      metrics.length,
    generalAndAdminMargin:
      metrics.reduce((sum, m) => sum + m.generalAndAdminMargin, 0) /
      metrics.length,
    operatingExpensesMargin:
      metrics.reduce((sum, m) => sum + m.operatingExpensesMargin, 0) /
      metrics.length,
    operatingIncomeMargin:
      metrics.reduce((sum, m) => sum + m.operatingIncomeMargin, 0) /
      metrics.length,
    freeCashFlowMargin:
      metrics.reduce((sum, m) => sum + m.freeCashFlowMargin, 0) /
      metrics.length,

    // Operating Metrics
    ltmRevenueGrowth:
      metrics.reduce((sum, m) => sum + m.ltmRevenueGrowth, 0) / metrics.length,
    ntmRevenueGrowth:
      metrics.reduce((sum, m) => sum + m.ntmRevenueGrowth, 0) / metrics.length,
    fcfMargin:
      metrics.reduce((sum, m) => sum + m.fcfMargin, 0) / metrics.length,
    ruleOf40: metrics.reduce((sum, m) => sum + m.ruleOf40, 0) / metrics.length,
    magicNumber:
      metrics.reduce((sum, m) => sum + m.magicNumber, 0) / metrics.length,
    paybackPeriod:
      metrics.reduce((sum, m) => sum + m.paybackPeriod, 0) / metrics.length,
    impliedAverageAcv:
      metrics.reduce((sum, m) => sum + m.impliedAverageAcv, 0) / metrics.length,
    customerCount:
      metrics.reduce((sum, m) => sum + m.customerCount, 0) / metrics.length,
    impliedArrPerFte:
      metrics.reduce((sum, m) => sum + m.impliedArrPerFte, 0) / metrics.length,
    annualizedOpexPerFte:
      metrics.reduce((sum, m) => sum + m.annualizedOpexPerFte, 0) /
      metrics.length,
    netDollarRetention:
      metrics.reduce((sum, m) => sum + m.netDollarRetention, 0) /
      metrics.length,
    multipleReturnSinceIpo:
      metrics.reduce((sum, m) => sum + m.multipleReturnSinceIpo, 0) /
      metrics.length,

    // Valuation Metrics
    evToImpliedArr:
      metrics.reduce((sum, m) => sum + m.evToImpliedArr, 0) / metrics.length,
    evToNtmRevenue:
      metrics.reduce((sum, m) => sum + m.evToNtmRevenue, 0) / metrics.length,
    evToNtmGrossProfit:
      metrics.reduce((sum, m) => sum + m.evToNtmGrossProfit, 0) /
      metrics.length,
    evToNtmFcf:
      metrics.reduce((sum, m) => sum + m.evToNtmFcf, 0) / metrics.length,
  };

  const sorted = {
    // Trading Data
    price: metrics.map((m) => m.price).sort((a, b) => a - b),
    priceChange3Mo: metrics.map((m) => m.priceChange3Mo).sort((a, b) => a - b),
    priceChange12Mo: metrics
      .map((m) => m.priceChange12Mo)
      .sort((a, b) => a - b),

    // Financial Metrics
    marketCap: metrics.map((m) => m.marketCap).sort((a, b) => a - b),
    enterpriseValue: metrics
      .map((m) => m.enterpriseValue)
      .sort((a, b) => a - b),
    impliedArr: metrics.map((m) => m.impliedArr).sort((a, b) => a - b),
    netNewArr: metrics.map((m) => m.netNewArr).sort((a, b) => a - b),
    ltmRevenue: metrics.map((m) => m.ltmRevenue).sort((a, b) => a - b),
    ntmFcf: metrics.map((m) => m.ntmFcf).sort((a, b) => a - b),
    growthAdjEvToNtmRev: metrics
      .map((m) => m.growthAdjEvToNtmRev)
      .sort((a, b) => a - b),

    // Margins
    grossMargin: metrics.map((m) => m.grossMargin).sort((a, b) => a - b),
    salesAndMarketingMargin: metrics
      .map((m) => m.salesAndMarketingMargin)
      .sort((a, b) => a - b),
    researchAndDevelopmentMargin: metrics
      .map((m) => m.researchAndDevelopmentMargin)
      .sort((a, b) => a - b),
    generalAndAdminMargin: metrics
      .map((m) => m.generalAndAdminMargin)
      .sort((a, b) => a - b),
    operatingExpensesMargin: metrics
      .map((m) => m.operatingExpensesMargin)
      .sort((a, b) => a - b),
    operatingIncomeMargin: metrics
      .map((m) => m.operatingIncomeMargin)
      .sort((a, b) => a - b),
    freeCashFlowMargin: metrics
      .map((m) => m.freeCashFlowMargin)
      .sort((a, b) => a - b),

    // Operating Metrics
    ltmRevenueGrowth: metrics
      .map((m) => m.ltmRevenueGrowth)
      .sort((a, b) => a - b),
    ntmRevenueGrowth: metrics
      .map((m) => m.ntmRevenueGrowth)
      .sort((a, b) => a - b),
    fcfMargin: metrics.map((m) => m.fcfMargin).sort((a, b) => a - b),
    ruleOf40: metrics.map((m) => m.ruleOf40).sort((a, b) => a - b),
    magicNumber: metrics.map((m) => m.magicNumber).sort((a, b) => a - b),
    paybackPeriod: metrics.map((m) => m.paybackPeriod).sort((a, b) => a - b),
    impliedAverageAcv: metrics
      .map((m) => m.impliedAverageAcv)
      .sort((a, b) => a - b),
    customerCount: metrics.map((m) => m.customerCount).sort((a, b) => a - b),
    impliedArrPerFte: metrics
      .map((m) => m.impliedArrPerFte)
      .sort((a, b) => a - b),
    annualizedOpexPerFte: metrics
      .map((m) => m.annualizedOpexPerFte)
      .sort((a, b) => a - b),
    netDollarRetention: metrics
      .map((m) => m.netDollarRetention)
      .sort((a, b) => a - b),
    multipleReturnSinceIpo: metrics
      .map((m) => m.multipleReturnSinceIpo)
      .sort((a, b) => a - b),

    // Valuation Metrics
    evToImpliedArr: metrics.map((m) => m.evToImpliedArr).sort((a, b) => a - b),
    evToNtmRevenue: metrics.map((m) => m.evToNtmRevenue).sort((a, b) => a - b),
    evToNtmGrossProfit: metrics
      .map((m) => m.evToNtmGrossProfit)
      .sort((a, b) => a - b),
    evToNtmFcf: metrics.map((m) => m.evToNtmFcf).sort((a, b) => a - b),
  };

  const median = {
    // Trading Data
    price: sorted.price[Math.floor(sorted.price.length / 2)],
    priceChange3Mo:
      sorted.priceChange3Mo[Math.floor(sorted.priceChange3Mo.length / 2)],
    priceChange12Mo:
      sorted.priceChange12Mo[Math.floor(sorted.priceChange12Mo.length / 2)],

    // Financial Metrics
    marketCap: sorted.marketCap[Math.floor(sorted.marketCap.length / 2)],
    enterpriseValue:
      sorted.enterpriseValue[Math.floor(sorted.enterpriseValue.length / 2)],
    impliedArr: sorted.impliedArr[Math.floor(sorted.impliedArr.length / 2)],
    netNewArr: sorted.netNewArr[Math.floor(sorted.netNewArr.length / 2)],
    ltmRevenue: sorted.ltmRevenue[Math.floor(sorted.ltmRevenue.length / 2)],
    ntmFcf: sorted.ntmFcf[Math.floor(sorted.ntmFcf.length / 2)],
    growthAdjEvToNtmRev:
      sorted.growthAdjEvToNtmRev[
        Math.floor(sorted.growthAdjEvToNtmRev.length / 2)
      ],

    // Margins
    grossMargin: sorted.grossMargin[Math.floor(sorted.grossMargin.length / 2)],
    salesAndMarketingMargin:
      sorted.salesAndMarketingMargin[
        Math.floor(sorted.salesAndMarketingMargin.length / 2)
      ],
    researchAndDevelopmentMargin:
      sorted.researchAndDevelopmentMargin[
        Math.floor(sorted.researchAndDevelopmentMargin.length / 2)
      ],
    generalAndAdminMargin:
      sorted.generalAndAdminMargin[
        Math.floor(sorted.generalAndAdminMargin.length / 2)
      ],
    operatingExpensesMargin:
      sorted.operatingExpensesMargin[
        Math.floor(sorted.operatingExpensesMargin.length / 2)
      ],
    operatingIncomeMargin:
      sorted.operatingIncomeMargin[
        Math.floor(sorted.operatingIncomeMargin.length / 2)
      ],
    freeCashFlowMargin:
      sorted.freeCashFlowMargin[
        Math.floor(sorted.freeCashFlowMargin.length / 2)
      ],

    // Operating Metrics
    ltmRevenueGrowth:
      sorted.ltmRevenueGrowth[Math.floor(sorted.ltmRevenueGrowth.length / 2)],
    ntmRevenueGrowth:
      sorted.ntmRevenueGrowth[Math.floor(sorted.ntmRevenueGrowth.length / 2)],
    fcfMargin: sorted.fcfMargin[Math.floor(sorted.fcfMargin.length / 2)],
    ruleOf40: sorted.ruleOf40[Math.floor(sorted.ruleOf40.length / 2)],
    magicNumber: sorted.magicNumber[Math.floor(sorted.magicNumber.length / 2)],
    paybackPeriod:
      sorted.paybackPeriod[Math.floor(sorted.paybackPeriod.length / 2)],
    impliedAverageAcv:
      sorted.impliedAverageAcv[Math.floor(sorted.impliedAverageAcv.length / 2)],
    customerCount:
      sorted.customerCount[Math.floor(sorted.customerCount.length / 2)],
    impliedArrPerFte:
      sorted.impliedArrPerFte[Math.floor(sorted.impliedArrPerFte.length / 2)],
    annualizedOpexPerFte:
      sorted.annualizedOpexPerFte[
        Math.floor(sorted.annualizedOpexPerFte.length / 2)
      ],
    netDollarRetention:
      sorted.netDollarRetention[
        Math.floor(sorted.netDollarRetention.length / 2)
      ],
    multipleReturnSinceIpo:
      sorted.multipleReturnSinceIpo[
        Math.floor(sorted.multipleReturnSinceIpo.length / 2)
      ],

    // Valuation Metrics
    evToImpliedArr:
      sorted.evToImpliedArr[Math.floor(sorted.evToImpliedArr.length / 2)],
    evToNtmRevenue:
      sorted.evToNtmRevenue[Math.floor(sorted.evToNtmRevenue.length / 2)],
    evToNtmGrossProfit:
      sorted.evToNtmGrossProfit[
        Math.floor(sorted.evToNtmGrossProfit.length / 2)
      ],
    evToNtmFcf: sorted.evToNtmFcf[Math.floor(sorted.evToNtmFcf.length / 2)],
  };

  return { mean, median };
};

// Filter options for the dashboard
export const filterOptions: FilterOptions = {
  sectors: [
    "Software",
    "Fintech",
    "Mobile Gaming",
    "Analytics",
    "Property Management",
    "Low-Code Platform",
    "Collaboration",
    "Data Management",
  ],
  companies: dummyCompanies.map((c) => ({ id: c.id, name: c.name })),
  ranges: {
    revenueGrowth: { min: 12, max: 72 },
    marketCap: { min: 1234, max: 160643 },
    evToRevenue: { min: 7.1, max: 19.2 },
    ruleOf40: { min: 25, max: 58 },
    fcfMargin: { min: 12, max: 59 },
    impliedArr: { min: 123, max: 22745 },
  },
};
