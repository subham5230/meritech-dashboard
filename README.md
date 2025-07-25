# Meritech Dashboard

A modern financial dashboard built with Next.js 14 for analyzing company data, financial metrics, and market comparisons.

## Features

- 📊 **Interactive Charts**: Revenue trends, profit margins, cash flow analysis
- 📋 **Data Tables**: Sortable, filterable company comparison tables
- 🏢 **Company Profiles**: Detailed individual company analysis pages
- 🎯 **Type-Safe APIs**: Built with tRPC for end-to-end type safety
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **API**: tRPC
- **UI**: shadcn/ui + Tailwind CSS
- **Charts**: Chart.js + react-chartjs-2
- **Icons**: Lucide React

## Quick Start

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run development server**

   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js pages (App Router)
├── components/            # Reusable UI components
├── server/               # tRPC API routers
├── types/                # TypeScript definitions
├── data/                 # Mock data files
└── utils/                # Helper functions
```

## Documentation

- 📋 **[Architecture Diagram](./Documentation/architecture-diagram.md)** - High-level system overview
- 🔧 **[Tech Documentation](./Documentation/tech-documentation.md)** - Implementation details and patterns

## Development

### Adding New Features

- **New Chart**: Create component in `src/components/charts/`
- **New Page**: Add folder in `src/app/` with `page.tsx`
- **New API**: Add router method in `src/server/api/routers/`

### Key Patterns

- All API calls use tRPC for type safety
- Charts are reusable components with consistent props
- Tables support column management and filtering
- Layout components provide consistent structure

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
