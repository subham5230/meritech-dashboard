# Architecture Diagram

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js 14)                   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Pages     │  │ Components  │  │   Utils     │        │
│  │             │  │             │  │             │        │
│  │ • Dashboard │  │ • Charts    │  │ • Formatters│        │
│  │ • Profiles  │  │ • Tables    │  │ • Helpers   │        │
│  │ • Tables    │  │ • Layout    │  │             │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
├─────────────────────────────────────────────────────────────┤
│                    API Layer (tRPC)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Routers   │  │   Server    │  │   Client    │        │
│  │             │  │             │  │             │        │
│  │ • Companies │  │ • API Root  │  │ • tRPC Utils│        │
│  │ • Profiles  │  │ • tRPC Setup│  │ • Providers │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
├─────────────────────────────────────────────────────────────┤
│                    Data Layer                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Types     │  │   Data      │  │   Config    │        │
│  │             │  │             │  │             │        │
│  │ • Interfaces│  │ • Dummy Data│  │ • Navigation│        │
│  │ • Enums     │  │ • Historical│  │ • Columns   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## Key Components

### 1. **Pages** (`src/app/`)

- **Dashboard**: Main landing page with overview
- **Company Profiles**: Detailed company analysis with charts and tables
- **Tables**: Data comparison views

### 2. **Components** (`src/components/`)

- **Charts**: Reusable chart components (revenue, profit, cash flow)
- **Tables**: Data table with filtering and column management
- **Layout**: Sidebar, topbar, and dashboard layout wrapper
- **Filters**: Company selector and filter controls

### 3. **API Layer** (`src/server/`)

- **tRPC Routers**: Type-safe API endpoints for companies and profiles
- **Server Setup**: tRPC configuration and middleware

### 4. **Data Layer**

- **Types**: TypeScript interfaces and enums
- **Dummy Data**: Mock data for development
- **Config**: Navigation and table column definitions

## Data Flow

1. **User Interaction** → Page Component
2. **Page Component** → tRPC Client Hook
3. **tRPC Client** → Server Router
4. **Server Router** → Data Processing
5. **Response** → Component State Update
6. **UI Re-render** → User sees updated data

## Key Technologies

- **Next.js 14**: App Router, Server Components
- **tRPC**: Type-safe API layer
- **TypeScript**: Full type safety
- **shadcn/ui**: UI component library
- **Chart.js**: Data visualization
