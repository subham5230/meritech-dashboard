// Core data structures for Meritech Analytics Dashboard

export interface Company {
  id: string;
  name: string;
  sector: string;
  financialMetrics: FinancialMetrics;
  tradingData: TradingData;
  operatingMetrics: OperatingMetrics;
  valuationMetrics: ValuationMetrics;
}

export interface FinancialMetrics {
  marketCap: number;
  enterpriseValue: number;
  impliedArr: number;
  ntmRevenue: number;
  ntmFcf: number;
  ntmGrossProfit: number;
  ltmRevenue: number;
  netNewArr: number;
  growthAdjEvToNtmRev: number;
  // % LTM Margins
  grossMargin: number;
  salesAndMarketingMargin: number;
  researchAndDevelopmentMargin: number;
  generalAndAdminMargin: number;
  operatingExpensesMargin: number;
  operatingIncomeMargin: number;
  freeCashFlowMargin: number;
}

export interface TradingData {
  price: number;
  priceChange3Mo: number;
  priceChange12Mo: number;
  volume: number;
  avgVolume: number;
}

export interface OperatingMetrics {
  ruleOf40: number;
  revenueGrowth: number;
  grossMargin: number;
  operatingMargin: number;
  fcfMargin: number;
  customerCount: number;
  arpu: number;
  // Advanced operating metrics
  magicNumber: number;
  paybackPeriod: number;
  impliedAverageAcv: number;
  impliedArrPerFte: number;
  annualizedOpexPerFte: number;
  netDollarRetention: number;
  multipleReturnSinceIpo: number;
  // Growth metrics
  ltmRevenueGrowth: number;
  ntmRevenueGrowth: number;
}

export interface ValuationMetrics {
  evToImpliedArr: number;
  evToNtmRevenue: number;
  evToNtmGrossProfit: number;
  evToNtmFcf: number;
  priceToBook: number;
  priceToEarnings: number;
}

// Filter and state management
export interface DashboardState {
  filters: FilterState;
  selectedCompanies: string[];
  tableConfig: TableConfig;
  currentView: DashboardView;
  userPreferences: UserPreferences;
}

export interface FilterState {
  companies: string[];
  sectors: string[];
  revenueGrowth: RangeFilter;
  marketCap: RangeFilter;
  evToRevenue: RangeFilter;
  ruleOf40: RangeFilter;
  fcfMargin: RangeFilter;
  impliedArr: RangeFilter;
}

export interface RangeFilter {
  min?: number;
  max?: number;
}

export interface TableConfig {
  sortColumn: string;
  sortDirection: "asc" | "desc";
  visibleColumns: string[];
  pageSize: number;
  currentPage: number;
}

export type DashboardView =
  | "comps-table"
  | "company-profiles"
  | "regression-analysis"
  | "valuation-metrics"
  | "operating-metrics"
  | "financial-metrics"
  | "trading-data";

export interface UserPreferences {
  theme: "light" | "dark";
  defaultView: DashboardView;
  savedFilters: FilterState[];
  tablePreferences: TableConfig;
}

// API interfaces
export interface DashboardAPI {
  getCompanies(): Promise<Company[]>;
  getCompanyDetails(id: string): Promise<Company>;
  searchCompanies(query: string): Promise<Company[]>;
  getFilterOptions(): Promise<FilterOptions>;
  saveUserPreferences(prefs: UserPreferences): Promise<void>;
  getUserPreferences(): Promise<UserPreferences>;
}

export interface FilterOptions {
  sectors: string[];
  companies: { id: string; name: string }[];
  ranges: {
    revenueGrowth: { min: number; max: number };
    marketCap: { min: number; max: number };
    evToRevenue: { min: number; max: number };
    ruleOf40: { min: number; max: number };
    fcfMargin: { min: number; max: number };
    impliedArr: { min: number; max: number };
  };
}

// Component interfaces
export interface TableProps {
  data: Company[];
  columns: TableColumn[];
  onSort: (column: string, direction: "asc" | "desc") => void;
  onRowSelect: (companyId: string) => void;
  selectedRows: string[];
  config: TableConfig;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable: boolean;
  format?: "currency" | "percentage" | "number" | "ratio" | "text";
  width?: string;
  align?: "left" | "center" | "right";
}

export interface FilterProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onClearFilters: () => void;
  filterOptions: FilterOptions;
}

// Navigation types
export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  children?: NavigationItem[];
  isActive?: boolean;
}

// Utility types
export type SortDirection = "asc" | "desc";

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: PaginationInfo;
}

// Historical data interfaces
export interface HistoricalDataPoint {
  date: string; // Format: "Jan-22", "Feb-22", etc.
  sharePrice: number;
  evToNtmRevenue: number;
  evToImpliedArr: number;
}

export interface MarketCapImpliedArrDataPoint {
  date: string; // Format: "Jan-22", "Feb-22", etc.
  marketCap: number; // In billions
  impliedArr: number; // In billions
}

export interface ChartDataPoint {
  quarter: string;
  impliedArr: number;
  netNewArr: number;
  yoyGrowth: number;
}

// Chart-specific data types
export interface FreeCashFlowDataPoint {
  quarter: string;
  fcf: number;
  fcfMargin: number;
}

export interface GrossProfitDataPoint {
  quarter: string;
  grossProfit: number;
  grossMargin: number;
}

export interface LtmRevenueDataPoint {
  quarter: string;
  ltmRevenue: number;
  yoyGrowth: number;
}

export interface RuleOf40DataPoint {
  quarter: string;
  ruleOf40: number;
  revenueGrowth: number;
  profitMargin: number;
}

export interface MultiplesDataPoint {
  quarter: string;
  evToRevenue: number;
  evToGrossProfit: number;
  evToFcf: number;
}
