"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Table view sections for intersection observer
const tableSections = [
  { id: "operating-metrics", label: "Operating Metrics" },
  { id: "financial-metrics", label: "Financial Metrics" },
  { id: "trading-metrics", label: "Trading Metrics" },
];

// Chart view sections organized by category
const chartSectionsByCategory = [
  {
    id: "operating-data",
    label: "Operating Data",
    sections: [
      { id: "arr-net-new-arr", label: "ARR & Net New ARR" },
      { id: "quarterly-revenue", label: "Quarterly Revenue & % YoY Growth" },
      { id: "ltm-revenue", label: "LTM Revenue & % YoY Growth" },
      { id: "gross-profit-gross-margin", label: "Gross Profit & Gross Margin" },
      { id: "free-cash-flow-margin", label: "Free Cash Flow & Margin" },
      { id: "ltm-rule-of-40", label: "LTM Rule of 40" },
    ],
  },
  {
    id: "trading-data",
    label: "Trading Data",
    sections: [
      { id: "multiples-share-price", label: "Multiples & Share Price" },
      { id: "market-cap-implied-arr", label: "Market Cap & Implied ARR" },
    ],
  },
];

// Flattened chart sections for intersection observer
const chartSections = chartSectionsByCategory.flatMap(
  (category) => category.sections
);

export function CompanyProfileSidebar() {
  const pathname = usePathname();
  const [activeTableSection, setActiveTableSection] =
    useState("operating-metrics");
  const [activeChartSection, setActiveChartSection] =
    useState("arr-net-new-arr");
  const isTableView = pathname.includes("/table");

  const handleTableSectionClick = (sectionId: string) => {
    console.log("Clicking section:", sectionId); // Debug log
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update active section immediately when clicking
      setActiveTableSection(sectionId);
      console.log("Active section set to:", sectionId); // Debug log
    } else {
      console.log("Element not found for click:", sectionId); // Debug log
    }
  };

  const handleChartSectionClick = (sectionId: string) => {
    console.log("Clicking chart section:", sectionId); // Debug log
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update active section immediately when clicking
      setActiveChartSection(sectionId);
      console.log("Active chart section set to:", sectionId); // Debug log
    } else {
      console.log("Element not found for click:", sectionId); // Debug log
    }
  };

  // Set up intersection observer for table and chart sections
  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const setupObserver = () => {
      const sections = isTableView ? tableSections : chartSections;

      // Check if all elements exist
      const allElementsExist = sections.every((section) =>
        document.getElementById(section.id)
      );

      if (!allElementsExist) {
        console.log("Some elements not found, retrying...");
        setTimeout(setupObserver, 200);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              console.log("Intersection detected:", entry.target.id);
              if (isTableView) {
                setActiveTableSection(entry.target.id);
              } else {
                setActiveChartSection(entry.target.id);
              }
            }
          });
        },
        {
          rootMargin: "-20% 0px -60% 0px", // Trigger when section is 20% from top
          threshold: 0.1, // Lower threshold for easier detection
        }
      );

      // Observe all sections
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          console.log("Observing element:", section.id);
          observer!.observe(element);
        }
      });
    };

    // Initial setup with delay
    const timer = setTimeout(setupObserver, 300);

    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [isTableView]);

  // Render different sidebar content based on view
  if (isTableView) {
    return (
      <div className="w-[18rem] bg-gray-50 border-r border-gray-200 flex flex-col h-full shadow-lg">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {tableSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleTableSectionClick(section.id)}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  activeTableSection === section.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Chart view sidebar with scrollable sections
  return (
    <div className="w-[18rem] bg-gray-50 border-r border-gray-200 flex flex-col h-full shadow-lg">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {chartSectionsByCategory.map((category) => (
            <div key={category.id} className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-500 tracking-wider px-3">
                {category.label}
              </h3>
              <div className="space-y-1">
                {category.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleChartSectionClick(section.id)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                      activeChartSection === section.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
