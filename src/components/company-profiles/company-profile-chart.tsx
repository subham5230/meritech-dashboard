"use client";

import { useState } from "react";
import { trpc } from "@/utils/trpc";

interface CompanyProfileChartProps {
  companyId: string;
}

interface ChartDataPoint {
  quarter: string;
  impliedArr: number;
  netNewArr: number;
  yoyGrowth: number;
}

export function CompanyProfileChart({ companyId }: CompanyProfileChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<ChartDataPoint | null>(null);

  const {
    data: chartData = [],
    isLoading,
    error,
  } = trpc.companyProfiles.getChartData.useQuery({
    companyId,
  });

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading chart data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-2xl text-red-600">⚠️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error Loading Data
          </h3>
          <p className="text-gray-600 mb-4">
            Unable to load chart data for this company.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show empty state
  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-2xl text-gray-400">📊</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Data Available
          </h3>
          <p className="text-gray-600">No chart data found for this company.</p>
        </div>
      </div>
    );
  }

  // Convert impliedArr from millions to billions for display
  const chartDataInBillions = chartData.map((d) => ({
    ...d,
    impliedArr: d.impliedArr / 1000, // Convert from millions to billions
  }));

  const maxArr = Math.max(...chartDataInBillions.map((d) => d.impliedArr));
  const maxGrowth = Math.max(...chartData.map((d) => d.yoyGrowth));

  const chartHeight = 400;
  const chartWidth = 1000; // Increased width for full container
  const barWidth = 50; // Slightly wider bars
  const spacing = 25; // More spacing between bars

  const getBarHeight = (value: number, maxValue: number) => {
    return (value / maxValue) * (chartHeight * 0.6);
  };

  const getLineY = (value: number, maxValue: number, isGrowth = false) => {
    const height = isGrowth ? chartHeight * 0.4 : chartHeight * 0.6;
    return chartHeight - (value / maxValue) * height;
  };

  return (
    <div className="relative">
      {/* Chart Container */}
      <div className="relative w-full" style={{ height: chartHeight }}>
        {/* Chart Bars and Lines */}
        <svg
          width="100%"
          height={chartHeight}
          className="absolute left-0 right-0"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid lines */}
          {[0, 0.5, 1, 1.5, 2, 2.5, 3].map((value, index) => (
            <line
              key={`grid-${index}`}
              x1={0}
              y1={chartHeight - (value / 3) * chartHeight}
              x2={chartWidth - 50}
              y2={chartHeight - (value / 3) * chartHeight}
              stroke="#f3f4f6"
              strokeWidth={1}
            />
          ))}

          {/* ARR Bars */}
          {chartDataInBillions.map((point, index) => {
            const x = index * (barWidth + spacing);
            const barHeight = getBarHeight(point.impliedArr, maxArr);
            const y = chartHeight - barHeight;

            return (
              <g key={`bar-${index}`}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill="#3A8F74"
                  className="hover:fill-[#3A8F74] transition-colors cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(chartData[index])}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  textAnchor="middle"
                  className="text-xs font-medium fill-black"
                >
                  ${point.impliedArr.toFixed(1)}B
                </text>
              </g>
            );
          })}

          {/* Net New ARR Line */}
          <polyline
            points={chartData
              .map((point, index) => {
                const x = index * (barWidth + spacing) + barWidth / 2;
                // Position using billions scale but data is in millions
                const netNewArrInBillions = point.netNewArr / 1000; // Convert millions to billions for positioning
                const y = getLineY(netNewArrInBillions, maxArr);
                return `${x},${y}`;
              })
              .join(" ")}
            fill="none"
            stroke="#00ACFF"
            strokeWidth={2}
          />

          {/* Net New ARR Data Points */}
          {chartData.map((point, index) => {
            const x = index * (barWidth + spacing) + barWidth / 2;
            // Position using billions scale but data is in millions
            const netNewArrInBillions = point.netNewArr / 1000; // Convert millions to billions for positioning
            const y = getLineY(netNewArrInBillions, maxArr);

            return (
              <g key={`net-new-${index}`}>
                <circle
                  cx={x}
                  cy={y}
                  r={4}
                  fill="#00ACFF"
                  className="hover:r-6 transition-all cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(point)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                <text
                  x={x}
                  y={y + 20}
                  textAnchor="middle"
                  className="text-xs font-medium fill-black"
                  style={{
                    filter: "contrast(1.2) brightness(0.8)",
                    textShadow:
                      "0 0 2px rgba(255,255,255,0.8), 0 0 4px rgba(255,255,255,0.6)",
                  }}
                >
                  ${point.netNewArr.toFixed(1)}M
                </text>
              </g>
            );
          })}

          {/* YoY Growth Line */}
          <polyline
            points={chartData
              .map((point, index) => {
                const x = index * (barWidth + spacing) + barWidth / 2;
                const y = getLineY(point.yoyGrowth, maxGrowth, true);
                return `${x},${y}`;
              })
              .join(" ")}
            fill="none"
            stroke="#FF7D52"
            strokeWidth={2}
          />

          {/* YoY Growth Data Points */}
          {chartData.map((point, index) => {
            const x = index * (barWidth + spacing) + barWidth / 2;
            const y = getLineY(point.yoyGrowth, maxGrowth, true);

            return (
              <g key={`growth-${index}`}>
                <circle
                  cx={x}
                  cy={y}
                  r={4}
                  fill="#FF7D52"
                  className="hover:r-6 transition-all cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(point)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                <text
                  x={x}
                  y={y - 10}
                  textAnchor="middle"
                  className="text-xs font-medium fill-black"
                  style={{
                    filter: "contrast(1.2) brightness(0.8)",
                    textShadow:
                      "0 0 2px rgba(255,255,255,0.8), 0 0 4px rgba(255,255,255,0.6)",
                  }}
                >
                  {point.yoyGrowth}%
                </text>
              </g>
            );
          })}

          {/* X-axis labels */}
          {chartData.map((point, index) => {
            const x = index * (barWidth + spacing) + barWidth / 2;
            return (
              <text
                key={`x-label-${index}`}
                x={x}
                y={chartHeight + 25}
                textAnchor="middle"
                className="text-sm font-medium fill-gray-700"
              >
                {point.quarter}
              </text>
            );
          })}
        </svg>

        {/* Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm z-10"
            style={{
              left: `${
                chartData.indexOf(hoveredPoint) * (barWidth + spacing) + 100
              }px`,
              top: "50px",
            }}
          >
            <div className="font-medium mb-2">{hoveredPoint.quarter}</div>
            <div className="space-y-1">
              <div className="text-green-600">
                Implied ARR ($B): ${(hoveredPoint.impliedArr / 1000).toFixed(1)}
                B
              </div>
              <div className="text-blue-600">
                Net New Implied ARR ($M): ${hoveredPoint.netNewArr.toFixed(1)}M
              </div>
              <div className="text-orange-600">
                % YoY Implied ARR Growth: {hoveredPoint.yoyGrowth}%
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-8">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#3A8F74] rounded-full"></div>
          <span className="text-sm text-gray-700">Implied ARR ($B)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#00ACFF] rounded-full"></div>
          <span className="text-sm text-gray-700">
            Net New Implied ARR ($M)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#FF7D52] rounded-full"></div>
          <span className="text-sm text-gray-700">
            % YoY Implied ARR Growth
          </span>
        </div>
      </div>
    </div>
  );
}
