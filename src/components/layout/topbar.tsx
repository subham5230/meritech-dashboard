"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { navigationItems } from "@/config/navigation";
import { cn } from "@/utils/cn";

export function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
        setExpandedItems([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => (prev.includes(itemId) ? [] : [itemId]));
  };

  const handleNavigationClick = (href: string) => {
    router.push(href);
    setMenuOpen(false);
    setExpandedItems([]);
  };

  return (
    <div className="bg-primary border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      {/* Left side - Title */}
      <div className="flex items-center">
        <h1 className="text-lg text-white font-serif">MERITECH ANALYTICS</h1>
      </div>

      {/* Right side - Hamburger Menu */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 text-white hover:bg-white/10 transition-colors rounded"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-64 max-h-96 z-50 overflow-y-auto">
            {navigationItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isActive =
                pathname.startsWith(item.href) ||
                (item.children &&
                  item.children.some((child: any) =>
                    pathname.startsWith(child.href)
                  ));
              const isExpanded = expandedItems.includes(item.id);

              return (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => {
                      if (hasChildren) {
                        toggleExpanded(item.id);
                      } else {
                        handleNavigationClick(item.href);
                      }
                    }}
                    className={cn(
                      "w-full flex items-center px-4 py-2 text-left text-sm transition-colors cursor-pointer",
                      isActive
                        ? "bg-green-50 text-green-700 border-l-2 border-green-600"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <span className="mr-3 text-lg">{getIcon(item.icon)}</span>
                    <span className="flex-1">{item.label}</span>
                    {hasChildren && (
                      <svg
                        className={cn(
                          "w-4 h-4 transition-transform",
                          isExpanded && "rotate-180"
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Sub-items */}
                  {hasChildren && isExpanded && item.children && (
                    <div className="bg-gray-50 border-l-2 border-gray-200">
                      {item.children.map((child: any) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <button
                            key={child.id}
                            onClick={() => handleNavigationClick(child.href)}
                            className={cn(
                              "w-full flex items-center px-8 py-2 text-left text-sm transition-colors cursor-pointer",
                              isChildActive
                                ? "bg-green-100 text-green-700 border-l-2 border-green-600"
                                : "text-gray-600 hover:bg-gray-100"
                            )}
                          >
                            <span className="mr-3 text-sm">
                              {getIcon(child.icon)}
                            </span>
                            <span>{child.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function getIcon(iconName: string): string {
  const icons: Record<string, string> = {
    Grid: "⊞",
    Building: "🏢",
    TrendingUp: "📈",
    DollarSign: "$",
    Clock: "⏰",
    BarChart: "📊",
    Activity: "📈",
    Calculator: "🧮",
    BarChart3: "📊",
    Gauge: "⚡",
    PieChart: "🥧",
    LineChart: "📈",
    BarChart2: "📊",
  };

  return icons[iconName] || "•";
}
