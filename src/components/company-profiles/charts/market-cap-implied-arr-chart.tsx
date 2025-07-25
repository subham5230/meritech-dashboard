"use client";

import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { MarketCapImpliedArrDataPoint } from "@/types";

interface MarketCapImpliedArrChartProps {
  companyId: string;
}

export function MarketCapImpliedArrChart({
  companyId,
}: MarketCapImpliedArrChartProps) {
  const [hoveredPoint, setHoveredPoint] =
    useState<MarketCapImpliedArrDataPoint | null>(null);
  const {
    data: chartData = [],
    isLoading,
    error,
  } = trpc.companyProfiles.getMarketCapImpliedArrData.useQuery({ companyId });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Loading chart data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-red-500">Error loading chart data</div>
      </div>
    );
  }

  if (!chartData.length) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">No data available</div>
      </div>
    );
  }

  // Debug: Log the first few data points to verify we're using real data
  console.log("Market Cap & Implied ARR Chart Data for", companyId, ":", {
    firstPoint: chartData[0],
    lastPoint: chartData[chartData.length - 1],
    totalPoints: chartData.length,
    marketCapRange: {
      min: Math.min(...chartData.map((d: any) => d.marketCap)),
      max: Math.max(...chartData.map((d: any) => d.marketCap)),
    },
    impliedArrRange: {
      min: Math.min(...chartData.map((d: any) => d.impliedArr)),
      max: Math.max(...chartData.map((d: any) => d.impliedArr)),
    },
  });

  // Chart dimensions and calculations
  const chartHeight = 400;
  const chartWidth = 1000;
  const margin = { top: 20, right: 60, bottom: 40, left: 60 };
  const plotWidth = chartWidth - margin.left - margin.right;
  const plotHeight = chartHeight - margin.top - margin.bottom;

  // Data ranges
  const maxMarketCap = Math.max(...chartData.map((d: any) => d.marketCap));
  const minMarketCap = Math.min(...chartData.map((d: any) => d.marketCap));
  const maxImpliedArr = Math.max(...chartData.map((d: any) => d.impliedArr));
  const minImpliedArr = Math.min(...chartData.map((d: any) => d.impliedArr));

  // Scale functions
  const getMarketCapY = (marketCap: number) => {
    return (
      margin.top +
      plotHeight -
      ((marketCap - minMarketCap) / (maxMarketCap - minMarketCap)) * plotHeight
    );
  };

  const getImpliedArrY = (impliedArr: number) => {
    return (
      margin.top +
      plotHeight -
      ((impliedArr - minImpliedArr) / (maxImpliedArr - minImpliedArr)) *
        plotHeight
    );
  };

  const getX = (index: number) => {
    return margin.left + (index / (chartData.length - 1)) * plotWidth;
  };

  // Generate line paths
  const marketCapPath = chartData
    .map((point: any, index: any) => {
      const x = getX(index);
      const y = getMarketCapY(point.marketCap);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const impliedArrPath = chartData
    .map((point: any, index: any) => {
      const x = getX(index);
      const y = getImpliedArrY(point.impliedArr);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  // Generate grid lines for Market Cap (left Y-axis)
  const marketCapGridLines = [];
  const marketCapStep = (maxMarketCap - minMarketCap) / 8;
  for (let i = 0; i <= 8; i++) {
    const value = minMarketCap + i * marketCapStep;
    const y = getMarketCapY(value);
    marketCapGridLines.push(
      <line
        key={`marketCap-grid-${i}`}
        x1={margin.left}
        y1={y}
        x2={margin.left + plotWidth}
        y2={y}
        stroke="#E5E7EB"
        strokeWidth={1}
      />
    );
  }

  // Generate grid lines for Implied ARR (right Y-axis)
  const impliedArrGridLines = [];
  const impliedArrStep = (maxImpliedArr - minImpliedArr) / 10;
  for (let i = 0; i <= 10; i++) {
    const value = minImpliedArr + i * impliedArrStep;
    const y = getImpliedArrY(value);
    impliedArrGridLines.push(
      <line
        key={`impliedArr-grid-${i}`}
        x1={margin.left}
        y1={y}
        x2={margin.left + plotWidth}
        y2={y}
        stroke="#E5E7EB"
        strokeWidth={1}
        strokeDasharray="2,2"
      />
    );
  }

  return (
    <div className="relative">
      <div className="relative w-full" style={{ height: chartHeight }}>
        <svg
          width="100%"
          height={chartHeight}
          className="absolute left-0 right-0"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid lines for Market Cap (left Y-axis) */}
          {marketCapGridLines}

          {/* Grid lines for Implied ARR (right Y-axis) */}
          {impliedArrGridLines}

          {/* Market Cap Line */}
          <path
            d={marketCapPath}
            fill="none"
            stroke="#3A8F74"
            strokeWidth={2}
          />

          {/* Implied ARR Line */}
          <path
            d={impliedArrPath}
            fill="none"
            stroke="#00ACFF"
            strokeWidth={2}
          />

          {/* Data points for Market Cap */}
          {chartData.map((point: any, index: any) => (
            <circle
              key={`marketCap-${index}`}
              cx={getX(index)}
              cy={getMarketCapY(point.marketCap)}
              r={3}
              fill="#3A8F74"
              onMouseEnter={() => setHoveredPoint(point)}
              onMouseLeave={() => setHoveredPoint(null)}
              style={{ cursor: "pointer" }}
            />
          ))}

          {/* Data points for Implied ARR */}
          {chartData.map((point: any, index: any) => (
            <circle
              key={`impliedArr-${index}`}
              cx={getX(index)}
              cy={getImpliedArrY(point.impliedArr)}
              r={3}
              fill="#00ACFF"
              onMouseEnter={() => setHoveredPoint(point)}
              onMouseLeave={() => setHoveredPoint(null)}
              style={{ cursor: "pointer" }}
            />
          ))}

          {/* X-axis labels (every 6 months) */}
          {chartData.map((point: any, index: any) => {
            if (index % 6 === 0) {
              return (
                <text
                  key={`x-label-${index}`}
                  x={getX(index)}
                  y={chartHeight - 10}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#6B7280"
                >
                  {point.date}
                </text>
              );
            }
            return null;
          })}

          {/* Left Y-axis labels (Market Cap) */}
          {marketCapGridLines.map((_, index) => {
            const value = minMarketCap + index * marketCapStep;
            const y = getMarketCapY(value);
            return (
              <text
                key={`marketCap-label-${index}`}
                x={margin.left - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="12"
                fill="#6B7280"
              >
                ${value.toFixed(1)}B
              </text>
            );
          })}

          {/* Right Y-axis labels (Implied ARR) */}
          {impliedArrGridLines.map((_, index) => {
            const value = minImpliedArr + index * impliedArrStep;
            const y = getImpliedArrY(value);
            return (
              <text
                key={`impliedArr-label-${index}`}
                x={chartWidth - margin.right + 10}
                y={y + 4}
                textAnchor="start"
                fontSize="12"
                fill="#6B7280"
              >
                ${value.toFixed(1)}B
              </text>
            );
          })}

          {/* Y-axis titles */}
          <text
            x={margin.left / 2}
            y={20}
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="#374151"
          >
            Market Cap ($B)
          </text>
          <text
            x={chartWidth - margin.right / 2}
            y={20}
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="#374151"
          >
            Implied ARR ($B)
          </text>
        </svg>

        {/* Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm"
            style={{
              left: `${
                (chartData.indexOf(hoveredPoint) / (chartData.length - 1)) * 100
              }%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            <div className="font-semibold text-gray-900">
              {hoveredPoint.date}
            </div>
            <div className="text-[#3A8F74]">
              Market Cap: ${hoveredPoint.marketCap.toFixed(1)}B
            </div>
            <div className="text-[#00ACFF]">
              Implied ARR: ${hoveredPoint.impliedArr.toFixed(1)}B
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-8">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#3A8F74]"></div>
          <span className="text-sm font-medium text-gray-700">
            Market Cap ($B)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#00ACFF]"></div>
          <span className="text-sm font-medium text-gray-700">
            Implied ARR ($B)
          </span>
        </div>
      </div>
    </div>
  );
}
