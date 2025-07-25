"use client";

import { useState, useRef } from "react";
import { trpc } from "@/utils/trpc";
import { FilterState } from "@/types";
import { cn } from "@/utils/cn";
import { CompanySelectorModal } from "./company-selector-modal";

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onClearFilters: () => void;
  isCollapsed: boolean;
  onCollapseChange: (collapsed: boolean) => void;
}

export function FilterBar({
  filters,
  onFilterChange,
  onClearFilters,
  isCollapsed,
  onCollapseChange,
}: FilterBarProps) {
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);
  const [isCompanySelectorOpen, setIsCompanySelectorOpen] = useState(false);

  const { data: filterOptions } = trpc.companies.getFilterOptions.useQuery();

  const filterConfigs = [
    {
      key: "companies",
      label: "Company Selector",
      type: "modal" as const,
      options: filterOptions?.companies || [],
    },
    {
      key: "revenueGrowth",
      label: "% YoY NTM Revenue Growth",
      type: "range" as const,
      range: filterOptions?.ranges.revenueGrowth,
    },
    {
      key: "evToRevenue",
      label: "EV / NTM Revenue",
      type: "range" as const,
      range: filterOptions?.ranges.evToRevenue,
    },
    {
      key: "impliedArr",
      label: "Implied ARR",
      type: "range" as const,
      range: filterOptions?.ranges.impliedArr,
    },
    {
      key: "fcfMargin",
      label: "NTM FCF Margin",
      type: "range" as const,
      range: filterOptions?.ranges.fcfMargin,
    },
    {
      key: "marketCap",
      label: "Market Cap",
      type: "range" as const,
      range: filterOptions?.ranges.marketCap,
    },
    {
      key: "ruleOf40",
      label: "NTM Rule of 40",
      type: "range" as const,
      range: filterOptions?.ranges.ruleOf40,
    },
    {
      key: "sectors",
      label: "Sector",
      type: "multi-select" as const,
      options: filterOptions?.sectors.map((s) => ({ id: s, name: s })) || [],
    },
  ];

  const handleFilterChange = (key: string, value: any) => {
    onFilterChange({ [key]: value });
  };

  const toggleFilter = (filterKey: string) => {
    if (filterKey === "companies") {
      setIsCompanySelectorOpen(true);
      return;
    }
    setExpandedFilter(expandedFilter === filterKey ? null : filterKey);
  };

  return (
    <div className="bg-white border-b border-gray-200 p-6 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Company Selector & Filters
        </h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={onClearFilters}
            className="text-red-600 hover:text-red-700 text-sm font-medium cursor-pointer"
          >
            Clear Filters
          </button>
          <button
            onClick={() => {
              onCollapseChange(!isCollapsed);
              if (!isCollapsed) {
                setExpandedFilter(null); // Close any open filter when collapsing
              }
            }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm transition-colors cursor-pointer"
          >
            {isCollapsed ? "Expand" : "Collapse"}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "transition-all duration-300 ease-in-out overflow-hidden",
          isCollapsed ? "max-h-0 opacity-0" : "max-h-96 opacity-100"
        )}
      >
        <div className="flex flex-wrap gap-3">
          {filterConfigs.map((config) => (
            <div key={config.key} className="relative">
              <FilterButton
                config={config}
                value={filters[config.key as keyof FilterState]}
                isExpanded={expandedFilter === config.key}
                onToggle={() => toggleFilter(config.key)}
                onChange={(value) => handleFilterChange(config.key, value)}
              />
              {expandedFilter === config.key && config.type !== "modal" && (
                <FilterPopover
                  config={config}
                  value={filters[config.key as keyof FilterState]}
                  onChange={(value) => handleFilterChange(config.key, value)}
                  onClose={() => setExpandedFilter(null)}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Company Selector Modal */}
      <CompanySelectorModal
        isOpen={isCompanySelectorOpen}
        onClose={() => setIsCompanySelectorOpen(false)}
        selectedCompanies={filters.companies || []}
        onApply={(companies) => {
          handleFilterChange("companies", companies);
          setIsCompanySelectorOpen(false);
        }}
        companies={filterOptions?.companies || []}
      />
    </div>
  );
}

interface FilterButtonProps {
  config: any;
  value: any;
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (value: any) => void;
}

function FilterButton({
  config,
  value,
  isExpanded,
  onToggle,
}: FilterButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    if (config.type === "modal") {
      onToggle();
      return;
    }

    if (buttonRef.current && !isExpanded) {
      const rect = buttonRef.current.getBoundingClientRect();
      document.documentElement.style.setProperty(
        "--popover-top",
        `${rect.bottom + 8}px`
      );
      document.documentElement.style.setProperty(
        "--popover-left",
        `${rect.left}px`
      );
    }
    onToggle();
  };
  const hasValue = Array.isArray(value)
    ? value.length > 0
    : value?.min !== undefined || value?.max !== undefined;

  const getDisplayValue = () => {
    if (config.type === "multi-select") {
      return value && value.length > 0 ? `${value.length} selected` : "All";
    } else if (config.type === "range") {
      if (!value || (!value.min && !value.max)) return "All";
      if (value.min && value.max) return `${value.min}-${value.max}`;
      if (value.min) return `>${value.min}`;
      if (value.max) return `<${value.max}`;
      return "All";
    }
    return "All";
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      className={cn(
        "flex items-center space-x-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors cursor-pointer",
        hasValue
          ? "border-blue-500 bg-blue-50 text-blue-700"
          : "border-gray-300 bg-white text-gray-700 hover:border-gray-400",
        isExpanded && "border-blue-500 bg-blue-50"
      )}
    >
      <span>{config.label}</span>
      <span className="text-gray-400">{getDisplayValue()}</span>
      <span className="text-blue-500">+</span>
    </button>
  );
}

interface FilterPanelProps {
  config: any;
  value: any;
  onChange: (value: any) => void;
  onClose: () => void;
}

function FilterPopover({ config, value, onChange, onClose }: FilterPanelProps) {
  const getRangeOptions = (range: { min: number; max: number }) => {
    if (config.key === "revenueGrowth") {
      return ["All", "<10%", "10-25%", ">25%"];
    } else if (config.key === "evToRevenue") {
      return ["All", "<5x", "5-10x", ">10x"];
    } else if (config.key === "impliedArr") {
      return ["All", "<$500M", "$500M-$1B", ">$1B"];
    } else if (config.key === "fcfMargin") {
      return ["All", "<10%", "10-25%", ">25%"];
    } else if (config.key === "marketCap") {
      return ["All", "<$1B", "$1-$10B", ">$10B"];
    } else if (config.key === "ruleOf40") {
      return ["All", "<20%", "20-40%", ">40%"];
    } else if (config.key === "sectors") {
      return ["All", "Application", "Infrastructure & Security", "PLG"];
    }
    return ["All"];
  };

  const getCurrentSelection = () => {
    if (config.type === "multi-select") {
      return value && value.length > 0 ? `${value.length} selected` : "All";
    } else if (config.type === "range") {
      if (!value || (!value.min && !value.max)) return "All";
      if (value.min && value.max) return `${value.min}-${value.max}`;
      if (value.min) return `>${value.min}`;
      if (value.max) return `<${value.max}`;
      return "All";
    }
    return "All";
  };

  const handleRangeSelection = (option: string) => {
    let newValue: any = {};

    if (option === "All") {
      newValue = {};
    } else if (config.key === "revenueGrowth") {
      if (option === "<10%") newValue = { max: 10 };
      else if (option === "10-25%") newValue = { min: 10, max: 25 };
      else if (option === ">25%") newValue = { min: 25 };
    } else if (config.key === "evToRevenue") {
      if (option === "<5x") newValue = { max: 5 };
      else if (option === "5-10x") newValue = { min: 5, max: 10 };
      else if (option === ">10x") newValue = { min: 10 };
    } else if (config.key === "impliedArr") {
      if (option === "<$500M") newValue = { max: 500 };
      else if (option === "$500M-$1B") newValue = { min: 500, max: 1000 };
      else if (option === ">$1B") newValue = { min: 1000 };
    } else if (config.key === "fcfMargin") {
      if (option === "<10%") newValue = { max: 10 };
      else if (option === "10-25%") newValue = { min: 10, max: 25 };
      else if (option === ">25%") newValue = { min: 25 };
    } else if (config.key === "marketCap") {
      if (option === "<$1B") newValue = { max: 1000 };
      else if (option === "$1-$10B") newValue = { min: 1000, max: 10000 };
      else if (option === ">$10B") newValue = { min: 10000 };
    } else if (config.key === "ruleOf40") {
      if (option === "<20%") newValue = { max: 20 };
      else if (option === "20-40%") newValue = { min: 20, max: 40 };
      else if (option === ">40%") newValue = { min: 40 };
    }

    onChange(newValue);
    onClose();
  };

  if (config.type === "multi-select") {
    const currentValue = value || [];
    return (
      <div
        className="fixed bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-48 z-[100]"
        style={{
          top: "var(--popover-top, 0px)",
          left: "var(--popover-left, 0px)",
        }}
      >
        <div className="px-4 py-2 border-b border-gray-100">
          <h3 className="font-medium text-gray-900">{config.label}</h3>
        </div>
        <div className="p-2">
          {config.options.map((option: any) => (
            <button
              key={option.id}
              onClick={() => {
                const newValue = currentValue.includes(option.id)
                  ? currentValue.filter((id: string) => id !== option.id)
                  : [...currentValue, option.id];
                onChange(newValue);
              }}
              className={cn(
                "w-full flex items-center px-3 py-2 text-left text-sm transition-colors rounded cursor-pointer",
                currentValue.includes(option.id)
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <span>{option.name}</span>
              {currentValue.includes(option.id) && (
                <svg
                  className="w-4 h-4 ml-auto text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (config.type === "range") {
    const options = getRangeOptions(config.range);
    const currentSelection = getCurrentSelection();
    return (
      <div
        className="fixed bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-48 z-[100]"
        style={{
          top: "var(--popover-top, 0px)",
          left: "var(--popover-left, 0px)",
        }}
      >
        <div className="px-4 py-2 border-b border-gray-100">
          <h3 className="font-medium text-gray-900">{config.label}</h3>
        </div>
        <div className="p-2 flex gap-2">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleRangeSelection(option)}
              className={cn(
                "px-3 py-2 text-sm rounded transition-colors cursor-pointer",
                option === currentSelection ||
                  (option === "All" && currentSelection === "All")
                  ? "bg-green-100 text-gray-900 border border-green-300"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

interface MultiSelectFilterProps {
  options: { id: string; name: string }[];
  value: string[];
  onChange: (value: string[]) => void;
  onClose: () => void;
}

function MultiSelectFilter({
  options,
  value,
  onChange,
  onClose,
}: MultiSelectFilterProps) {
  const handleToggle = (optionId: string) => {
    const newValue = value.includes(optionId)
      ? value.filter((id) => id !== optionId)
      : [...value, optionId];
    onChange(newValue);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-gray-900">
          Select {options.length} options
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          ✕
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
        {options.map((option) => (
          <label key={option.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value.includes(option.id)}
              onChange={() => handleToggle(option.id)}
              className="rounded border-gray-300"
            />
            <span className="text-sm">{option.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

interface RangeFilterProps {
  range: { min: number; max: number };
  value: { min?: number; max?: number };
  onChange: (value: { min?: number; max?: number }) => void;
  onClose: () => void;
}

function RangeFilter({ range, value, onChange, onClose }: RangeFilterProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-gray-900">Set Range</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          ✕
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Min</label>
          <input
            type="number"
            value={value.min || ""}
            onChange={(e) =>
              onChange({
                ...value,
                min: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            placeholder={range.min.toString()}
            className="w-24 px-3 py-1 border border-gray-300 rounded text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Max</label>
          <input
            type="number"
            value={value.max || ""}
            onChange={(e) =>
              onChange({
                ...value,
                max: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            placeholder={range.max.toString()}
            className="w-24 px-3 py-1 border border-gray-300 rounded text-sm"
          />
        </div>
      </div>
    </div>
  );
}
