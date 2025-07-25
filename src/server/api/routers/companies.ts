import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import {
  dummyCompanies,
  filterOptions,
  calculateAggregates,
} from "@/data/dummy-data";
import { Company, FilterState } from "@/types";

export const companiesRouter = createTRPCRouter({
  // Get all companies
  getAll: publicProcedure.query(() => {
    return {
      companies: dummyCompanies,
      aggregates: calculateAggregates(dummyCompanies),
    };
  }),

  // Get company by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const company = dummyCompanies.find((c) => c.id === input.id);
      if (!company) {
        throw new Error("Company not found");
      }
      return company;
    }),

  // Search companies
  search: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(({ input }) => {
      const query = input.query.toLowerCase();
      return dummyCompanies.filter(
        (company) =>
          company.name.toLowerCase().includes(query) ||
          company.sector.toLowerCase().includes(query)
      );
    }),

  // Get filtered companies
  getFiltered: publicProcedure
    .input(
      z.object({
        filters: z
          .object({
            companies: z.array(z.string()).optional(),
            sectors: z.array(z.string()).optional(),
            revenueGrowth: z
              .object({
                min: z.number().optional(),
                max: z.number().optional(),
              })
              .optional(),
            marketCap: z
              .object({
                min: z.number().optional(),
                max: z.number().optional(),
              })
              .optional(),
            evToRevenue: z
              .object({
                min: z.number().optional(),
                max: z.number().optional(),
              })
              .optional(),
            ruleOf40: z
              .object({
                min: z.number().optional(),
                max: z.number().optional(),
              })
              .optional(),
            fcfMargin: z
              .object({
                min: z.number().optional(),
                max: z.number().optional(),
              })
              .optional(),
            impliedArr: z
              .object({
                min: z.number().optional(),
                max: z.number().optional(),
              })
              .optional(),
          })
          .optional(),
        sortColumn: z.string().optional(),
        sortDirection: z.enum(["asc", "desc"]).optional(),
        page: z.number().optional(),
        pageSize: z.number().optional(),
      })
    )
    .query(({ input }) => {
      let filteredCompanies = [...dummyCompanies];

      // Apply filters
      if (input.filters) {
        const filters = input.filters;

        if (filters.companies && filters.companies.length > 0) {
          filteredCompanies = filteredCompanies.filter((c) =>
            filters.companies!.includes(c.id)
          );
        }

        if (filters.sectors && filters.sectors.length > 0) {
          filteredCompanies = filteredCompanies.filter((c) =>
            filters.sectors!.includes(c.sector)
          );
        }

        if (filters.revenueGrowth) {
          filteredCompanies = filteredCompanies.filter((c) => {
            const growth = c.operatingMetrics.revenueGrowth;
            const min = filters.revenueGrowth!.min;
            const max = filters.revenueGrowth!.max;
            return (!min || growth >= min) && (!max || growth <= max);
          });
        }

        if (filters.marketCap) {
          filteredCompanies = filteredCompanies.filter((c) => {
            const marketCap = c.financialMetrics.marketCap;
            const min = filters.marketCap!.min;
            const max = filters.marketCap!.max;
            return (!min || marketCap >= min) && (!max || marketCap <= max);
          });
        }

        if (filters.evToRevenue) {
          filteredCompanies = filteredCompanies.filter((c) => {
            const evToRev = c.valuationMetrics.evToNtmRevenue;
            const min = filters.evToRevenue!.min;
            const max = filters.evToRevenue!.max;
            return (!min || evToRev >= min) && (!max || evToRev <= max);
          });
        }

        if (filters.ruleOf40) {
          filteredCompanies = filteredCompanies.filter((c) => {
            const ruleOf40 = c.operatingMetrics.ruleOf40;
            const min = filters.ruleOf40!.min;
            const max = filters.ruleOf40!.max;
            return (!min || ruleOf40 >= min) && (!max || ruleOf40 <= max);
          });
        }

        if (filters.fcfMargin) {
          filteredCompanies = filteredCompanies.filter((c) => {
            const fcfMargin = c.operatingMetrics.fcfMargin;
            const min = filters.fcfMargin!.min;
            const max = filters.fcfMargin!.max;
            return (!min || fcfMargin >= min) && (!max || fcfMargin <= max);
          });
        }

        if (filters.impliedArr) {
          filteredCompanies = filteredCompanies.filter((c) => {
            const impliedArr = c.financialMetrics.impliedArr;
            const min = filters.impliedArr!.min;
            const max = filters.impliedArr!.max;
            return (!min || impliedArr >= min) && (!max || impliedArr <= max);
          });
        }
      }

      // Apply sorting
      if (input.sortColumn && input.sortDirection) {
        filteredCompanies.sort((a, b) => {
          let aValue: any;
          let bValue: any;

          // Extract values based on column
          switch (input.sortColumn) {
            case "name":
              aValue = a.name;
              bValue = b.name;
              break;
            case "sector":
              aValue = a.sector;
              bValue = b.sector;
              break;
            case "price":
              aValue = a.tradingData.price;
              bValue = b.tradingData.price;
              break;
            case "priceChange3Mo":
              aValue = a.tradingData.priceChange3Mo;
              bValue = b.tradingData.priceChange3Mo;
              break;
            case "priceChange12Mo":
              aValue = a.tradingData.priceChange12Mo;
              bValue = b.tradingData.priceChange12Mo;
              break;
            case "marketCap":
              aValue = a.financialMetrics.marketCap;
              bValue = b.financialMetrics.marketCap;
              break;
            case "enterpriseValue":
              aValue = a.financialMetrics.enterpriseValue;
              bValue = b.financialMetrics.enterpriseValue;
              break;
            case "evToImpliedArr":
              aValue = a.valuationMetrics.evToImpliedArr;
              bValue = b.valuationMetrics.evToImpliedArr;
              break;
            case "evToNtmRevenue":
              aValue = a.valuationMetrics.evToNtmRevenue;
              bValue = b.valuationMetrics.evToNtmRevenue;
              break;
            case "ntmFcf":
              aValue = a.financialMetrics.ntmFcf;
              bValue = b.financialMetrics.ntmFcf;
              break;
            case "impliedArr":
              aValue = a.financialMetrics.impliedArr;
              bValue = b.financialMetrics.impliedArr;
              break;
            case "netNewArr":
              aValue = a.financialMetrics.netNewArr;
              bValue = b.financialMetrics.netNewArr;
              break;
            case "ltmRevenue":
              aValue = a.financialMetrics.ltmRevenue;
              bValue = b.financialMetrics.ltmRevenue;
              break;
            case "ltmRevenueGrowth":
              aValue = a.operatingMetrics.ltmRevenueGrowth;
              bValue = b.operatingMetrics.ltmRevenueGrowth;
              break;
            case "ntmRevenueGrowth":
              aValue = a.operatingMetrics.ntmRevenueGrowth;
              bValue = b.operatingMetrics.ntmRevenueGrowth;
              break;
            case "grossMargin":
              aValue = a.financialMetrics.grossMargin;
              bValue = b.financialMetrics.grossMargin;
              break;
            case "salesAndMarketingMargin":
              aValue = a.financialMetrics.salesAndMarketingMargin;
              bValue = b.financialMetrics.salesAndMarketingMargin;
              break;
            case "researchAndDevelopmentMargin":
              aValue = a.financialMetrics.researchAndDevelopmentMargin;
              bValue = b.financialMetrics.researchAndDevelopmentMargin;
              break;
            case "generalAndAdminMargin":
              aValue = a.financialMetrics.generalAndAdminMargin;
              bValue = b.financialMetrics.generalAndAdminMargin;
              break;
            case "operatingExpensesMargin":
              aValue = a.financialMetrics.operatingExpensesMargin;
              bValue = b.financialMetrics.operatingExpensesMargin;
              break;
            case "operatingIncomeMargin":
              aValue = a.financialMetrics.operatingIncomeMargin;
              bValue = b.financialMetrics.operatingIncomeMargin;
              break;
            case "freeCashFlowMargin":
              aValue = a.financialMetrics.freeCashFlowMargin;
              bValue = b.financialMetrics.freeCashFlowMargin;
              break;
            case "ntmFcfMargin":
              aValue = a.operatingMetrics.fcfMargin;
              bValue = b.operatingMetrics.fcfMargin;
              break;
            case "ruleOf40":
              aValue = a.operatingMetrics.ruleOf40;
              bValue = b.operatingMetrics.ruleOf40;
              break;
            case "magicNumber":
              aValue = a.operatingMetrics.magicNumber;
              bValue = b.operatingMetrics.magicNumber;
              break;
            case "paybackPeriod":
              aValue = a.operatingMetrics.paybackPeriod;
              bValue = b.operatingMetrics.paybackPeriod;
              break;
            case "impliedAverageAcv":
              aValue = a.operatingMetrics.impliedAverageAcv;
              bValue = b.operatingMetrics.impliedAverageAcv;
              break;
            case "customerCount":
              aValue = a.operatingMetrics.customerCount;
              bValue = b.operatingMetrics.customerCount;
              break;
            case "impliedArrPerFte":
              aValue = a.operatingMetrics.impliedArrPerFte;
              bValue = b.operatingMetrics.impliedArrPerFte;
              break;
            case "annualizedOpexPerFte":
              aValue = a.operatingMetrics.annualizedOpexPerFte;
              bValue = b.operatingMetrics.annualizedOpexPerFte;
              break;
            case "netDollarRetention":
              aValue = a.operatingMetrics.netDollarRetention;
              bValue = b.operatingMetrics.netDollarRetention;
              break;
            case "multipleReturnSinceIpo":
              aValue = a.operatingMetrics.multipleReturnSinceIpo;
              bValue = b.operatingMetrics.multipleReturnSinceIpo;
              break;
            case "evToNtmGrossProfit":
              aValue = a.valuationMetrics.evToNtmGrossProfit;
              bValue = b.valuationMetrics.evToNtmGrossProfit;
              break;
            case "evToNtmFcf":
              aValue = a.valuationMetrics.evToNtmFcf;
              bValue = b.valuationMetrics.evToNtmFcf;
              break;
            case "growthAdjEvToNtmRev":
              aValue = a.financialMetrics.growthAdjEvToNtmRev;
              bValue = b.financialMetrics.growthAdjEvToNtmRev;
              break;
            default:
              return 0;
          }

          if (typeof aValue === "string") {
            return input.sortDirection === "asc"
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
          } else {
            return input.sortDirection === "asc"
              ? aValue - bValue
              : bValue - aValue;
          }
        });
      }

      // Apply pagination
      const page = input.page || 1;
      const pageSize = input.pageSize || 10;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

      return {
        companies: paginatedCompanies,
        aggregates: calculateAggregates(filteredCompanies),
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(filteredCompanies.length / pageSize),
          totalItems: filteredCompanies.length,
          pageSize,
        },
      };
    }),

  // Get filter options
  getFilterOptions: publicProcedure.query(() => {
    return filterOptions;
  }),

  // Get sectors
  getSectors: publicProcedure.query(() => {
    return filterOptions.sectors;
  }),

  // Get company list for dropdowns
  getCompanyList: publicProcedure.query(() => {
    return filterOptions.companies;
  }),
});
