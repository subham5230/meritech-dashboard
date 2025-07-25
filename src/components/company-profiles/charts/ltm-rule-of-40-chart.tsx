"use client";

import { useState } from "react";
import { trpc } from "@/utils/trpc";

interface LtmRuleOf40ChartProps {
  companyId: string;
}

interface ChartDataPoint {
  quarter: string;
  ruleOf40: number;
  fcfMargin: number;
  revenueGrowth: number;
}

export function LtmRuleOf40Chart({ companyId }: LtmRuleOf40ChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<ChartDataPoint | null>(null);

  const {
    data: chartData = [],
    isLoading,
    error,
  } = trpc.companyProfiles.getLtmRuleOf40Data.useQuery({
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

  const maxRuleOf40 = Math.max(...chartData.map((d: any) => d.ruleOf40));
  const maxFcfMargin = Math.max(...chartData.map((d: any) => d.fcfMargin));
  const maxRevenueGrowth = Math.max(
    ...chartData.map((d: any) => d.revenueGrowth)
  );

  const chartHeight = 400;
  const chartWidth = 1000;
  const barWidth = 50;
  const spacing = 25;

  const getBarHeight = (value: number, maxValue: number) => {
    return (value / maxValue) * (chartHeight * 0.6);
  };

  const getLineY = (value: number, maxValue: number) => {
    return chartHeight - (value / maxValue) * (chartHeight * 0.4);
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
          {[0, 20, 40, 60, 80, 100, 120].map((value, index) => (
            <line
              key={`grid-${index}`}
              x1={0}
              y1={chartHeight - (value / 120) * chartHeight}
              x2={chartWidth - 50}
              y2={chartHeight - (value / 120) * chartHeight}
              stroke="#f3f4f6"
              strokeWidth={1}
            />
          ))}

          {/* LTM Rule of 40 Bars */}
          {chartData.map((point: any, index: any) => {
            const x = index * (barWidth + spacing);
            const barHeight = getBarHeight(point.ruleOf40, maxRuleOf40);
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
                  onMouseEnter={() => setHoveredPoint(point)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  textAnchor="middle"
                  className="text-xs font-medium fill-black"
                >
                  {point.ruleOf40}%
                </text>
              </g>
            );
          })}

          {/* FCF Margin Line */}
          <polyline
            points={chartData
              .map((point: any, index: any) => {
                const x = index * (barWidth + spacing) + barWidth / 2;
                const y = getLineY(point.fcfMargin, maxFcfMargin);
                return `${x},${y}`;
              })
              .join(" ")}
            fill="none"
            stroke="#00ACFF"
            strokeWidth={2}
          />

          {/* FCF Margin Data Points */}
          {chartData.map((point: any, index: any) => {
            const x = index * (barWidth + spacing) + barWidth / 2;
            const y = getLineY(point.fcfMargin, maxFcfMargin);

            return (
              <g key={`fcf-${index}`}>
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
                  y={y - 10}
                  textAnchor="middle"
                  className="text-xs font-medium fill-black"
                  style={{
                    filter: "contrast(1.2) brightness(0.8)",
                    textShadow:
                      "0 0 2px rgba(255,255,255,0.8), 0 0 4px rgba(255,255,255,0.6)",
                  }}
                >
                  {point.fcfMargin}%
                </text>
              </g>
            );
          })}

          {/* Revenue YoY Growth Line */}
          <polyline
            points={chartData
              .map((point: any, index: any) => {
                const x = index * (barWidth + spacing) + barWidth / 2;
                const y = getLineY(point.revenueGrowth, maxRevenueGrowth);
                return `${x},${y}`;
              })
              .join(" ")}
            fill="none"
            stroke="#FF7D52"
            strokeWidth={2}
          />

          {/* Revenue YoY Growth Data Points */}
          {chartData.map((point: any, index: any) => {
            const x = index * (barWidth + spacing) + barWidth / 2;
            const y = getLineY(point.revenueGrowth, maxRevenueGrowth);

            return (
              <g key={`revenue-${index}`}>
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
                  y={y + 20}
                  textAnchor="middle"
                  className="text-xs font-medium fill-black"
                  style={{
                    filter: "contrast(1.2) brightness(0.8)",
                    textShadow:
                      "0 0 2px rgba(255,255,255,0.8), 0 0 4px rgba(255,255,255,0.6)",
                  }}
                >
                  {point.revenueGrowth}%
                </text>
              </g>
            );
          })}

          {/* X-axis labels */}
          {chartData.map((point: any, index: any) => {
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
                LTM Rule of 40: {hoveredPoint.ruleOf40}%
              </div>
              <div className="text-blue-600">
                % FCF Margin (LTM): {hoveredPoint.fcfMargin}%
              </div>
              <div className="text-orange-600">
                % Revenue YoY Growth (LTM): {hoveredPoint.revenueGrowth}%
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-8">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#3A8F74] rounded-full"></div>
          <span className="text-sm text-gray-700">LTM Rule of 40</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#00ACFF] rounded-full"></div>
          <span className="text-sm text-gray-700">% FCF Margin (LTM)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#FF7D52] rounded-full"></div>
          <span className="text-sm text-gray-700">
            % Revenue YoY Growth (LTM)
          </span>
        </div>
      </div>
    </div>
  );
}
