"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { navigationItems } from "@/config/navigation";
import { cn } from "@/utils/cn";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setExpandedItems([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => (prev.includes(itemId) ? [] : [itemId]));
  };

  return (
    <div
      ref={sidebarRef}
      className={cn(
        "fixed left-0 top-0 h-full bg-primary text-white transition-all duration-300 z-50 px-4 py-6 text-[14px]",
        isOpen ? "w-[16rem]" : "w-16"
      )}
    >
      {/* Logo */}
      <div>
        <div className="flex items-center justify-between">
          {isOpen && (
            <div className="flex items-center space-x-3">
              <div>
                <h2 className="text-[20px] font-serif">MERITECH</h2>
                <p className="text-md font-serif">ANALYTICS</p>
              </div>
            </div>
          )}
          <button onClick={onToggle} className={cn("rounded cursor-pointer")}>
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-[#ffffff33] mb-4 mt-2"></div>

      {/* Navigation */}
      <nav className="flex-1 py-1">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <NavigationItem
                item={item}
                isOpen={isOpen}
                isExpanded={expandedItems.includes(item.id)}
                onToggleExpanded={() => toggleExpanded(item.id)}
                router={router}
                pathname={pathname}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Divider */}
      {isOpen && (
        <div className="border-t-2 border-[#ffffff33] mb-6 mt-6"></div>
      )}

      {/* Footer */}
      <div>
        {isOpen && (
          <>
            <div className="text-[11px] mb-2 text-[#89A09B]">
              Footnotes: Updated on 27-Jun-2025
            </div>
            <div className="text-[11px] mb-4 text-[#89A09B]">
              Source: Company Filings and S&P Capital IQ
            </div>
            <button className="w-full bg-secondary/60 hover:bg-secondary/40 border-2 border-secondary text-white text-sm py-2 px-3 rounded transition-colors cursor-pointer">
              Share Feedback
            </button>
          </>
        )}

        {/* Divider */}
        <div className="border-t-2 border-[#ffffff33] mb-6 mt-6"></div>

        {/* User Profile */}
        <div
          className={cn(
            "flex items-center space-x-3",
            isOpen ? "mt-4" : "absolute bottom-4"
          )}
        >
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">S</span>
          </div>
          {isOpen && (
            <div>
              <p className="text-sm font-medium">Subham Mohanty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface NavigationItemProps {
  item: any;
  isOpen: boolean;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  router: any;
  pathname: string;
}

function NavigationItem({
  item,
  isOpen,
  isExpanded,
  onToggleExpanded,
  router,
  pathname,
}: NavigationItemProps) {
  const hasChildren = item.children && item.children.length > 0;
  const isActive =
    pathname.startsWith(item.href) ||
    (item.children &&
      item.children.some((child: any) => pathname.startsWith(child.href)));

  const handleClick = () => {
    if (hasChildren) {
      onToggleExpanded();
    } else if (item.href) {
      router.push(item.href);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={cn(
          "w-full flex items-center px-3 py-[2px] text-left hover:bg-secondary/70  transition-colors cursor-pointer rounded-md",
          isActive && "bg-secondary",
          !isOpen && "justify-center px-2"
        )}
      >
        <div className={cn("w-8 h-8 flex items-center justify-center rounded")}>
          <span className="text-lg">{getIcon(item.icon)}</span>
        </div>
        {isOpen && (
          <>
            <span className="flex-1">{item.label}</span>
            {hasChildren && (
              <svg
                className={cn("w-4 h-4 transition-transform")}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </>
        )}
      </button>

      {/* Sub-items Popover */}
      {hasChildren && isExpanded && isOpen && (
        <div className="absolute left-full top-0 ml-4 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-54 max-h-64 z-50 overflow-y-auto overflow-x-hidden">
          {item.children.map((child: any) => {
            const isChildActive = pathname === child.href;
            return (
              <button
                key={child.id}
                onClick={() => {
                  router.push(child.href);
                  onToggleExpanded(); // Close the popover after navigation
                }}
                className={cn(
                  "w-full flex items-center px-4 py-2 text-left text-sm transition-colors cursor-pointer",
                  isChildActive
                    ? "bg-green-50 text-green-700 border-l-2 border-green-600"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <span>{child.label}</span>
              </button>
            );
          })}
        </div>
      )}
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
