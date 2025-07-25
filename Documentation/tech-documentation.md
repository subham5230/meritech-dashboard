# Tech Documentation

## What This App Does

This is a financial dashboard that shows company data with charts and tables. Users can view company profiles, compare data, and analyze financial metrics.

## How It's Built

### Frontend Framework

- **Next.js 14** with App Router
- Uses Server Components for better performance
- TypeScript for type safety

### Data Flow

1. **tRPC** handles all API calls (type-safe, no REST endpoints)
2. **Server-side** processes data and returns it
3. **Client-side** displays data in charts and tables

### Key Libraries

#### UI & Styling

- **shadcn/ui**: Pre-built components (buttons, tables, modals)
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icons

#### Data Visualization

- **Chart.js**: Line charts, bar charts
- **react-chartjs-2**: React wrapper for Chart.js

#### State Management

- **React hooks**: useState, useEffect for local state
- **tRPC**: Handles server state and caching

## File Structure Explained

```
src/
├── app/                    # Next.js pages (App Router)
│   ├── page.tsx           # Dashboard home
│   ├── company-profiles/  # Company detail pages
│   └── comps-table/       # Comparison table page
├── components/            # Reusable UI components
│   ├── charts/           # Chart components
│   ├── table/            # Data table components
│   └── layout/           # Layout components
├── server/               # Backend logic
│   └── api/              # tRPC routers
├── types/                # TypeScript definitions
├── data/                 # Mock data files
└── utils/                # Helper functions
```

## How Data Works

### Mock Data

- `dummy-data.ts`: Sample company data
- `historical-data.ts`: Time-series data for charts

### Data Types

- Company info (name, metrics, financials)
- Chart data (revenue, profit, cash flow)
- Table data (comparisons, rankings)

## Key Features

### 1. Company Profiles

- Individual company pages with charts
- Financial metrics visualization
- Historical data trends

### 2. Data Tables

- Sortable and filterable tables
- Column management (show/hide columns)
- Company comparison views

### 3. Charts

- Revenue trends over time
- Profit margins
- Cash flow analysis
- Market cap comparisons

## Performance Optimizations

- **Server Components**: Reduce client-side JavaScript
- **tRPC Caching**: Automatic request deduplication
- **Chart.js**: Efficient canvas-based rendering
- **Tailwind**: Only includes used CSS

## Development Setup

1. Install dependencies: `npm install`
2. Run dev server: `npm run dev`
3. Open: `http://localhost:3000`

## Adding New Features

### New Chart

1. Create component in `src/components/charts/`
2. Add to chart index file
3. Use in company profile page

### New Data Type

1. Add interface in `src/types/`
2. Create tRPC router method
3. Add to dummy data if needed

### New Page

1. Create folder in `src/app/`
2. Add `page.tsx` file
3. Update navigation config

## Common Patterns

### tRPC Usage

```typescript
// In component
const { data, isLoading } = api.companies.getAll.useQuery();

// In server
export const companiesRouter = router({
  getAll: publicProcedure.query(() => {
    return dummyData;
  }),
});
```

### Chart Component

```typescript
// Standard chart wrapper
<CompanyProfileChart data={chartData} title="Revenue Growth" type="line" />
```

### Table Component

```typescript
// Reusable data table
<DataTable data={tableData} columns={columnConfig} filters={filterOptions} />
```
