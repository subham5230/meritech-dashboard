"use client";

import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { HistoricalDataPoint } from "@/types";

interface MultiplesSharePriceChartProps {
  companyId: string;
}

export function MultiplesSharePriceChart({
  companyId,
}: MultiplesSharePriceChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<HistoricalDataPoint | null>(
    null
  );
  const {
    data: chartData = [],
    isLoading,
    error,
  } = trpc.companyProfiles.getHistoricalMultiplesData.useQuery({ companyId });

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
  console.log("Multiples Chart Data for", companyId, ":", {
    firstPoint: chartData[0],
    lastPoint: chartData[chartData.length - 1],
    totalPoints: chartData.length,
    sharePriceRange: {
      min: Math.min(...chartData.map((d: any) => d.sharePrice)),
      max: Math.max(...chartData.map((d: any) => d.sharePrice)),
    },
    multiplesRange: {
      min: Math.min(
        ...chartData.map((d: any) =>
          Math.min(d.evToNtmRevenue, d.evToImpliedArr)
        )
      ),
      max: Math.max(
        ...chartData.map((d: any) =>
          Math.max(d.evToNtmRevenue, d.evToImpliedArr)
        )
      ),
    },
  });

  // Chart dimensions and calculations
  const chartHeight = 400;
  const chartWidth = 1000;
  const margin = { top: 20, right: 60, bottom: 40, left: 60 };
  const plotWidth = chartWidth - margin.left - margin.right;
  const plotHeight = chartHeight - margin.top - margin.bottom;

  // Data ranges
  const maxSharePrice = Math.max(...chartData.map((d: any) => d.sharePrice));
  const minSharePrice = Math.min(...chartData.map((d: any) => d.sharePrice));
  const maxMultiple = Math.max(
    ...chartData.map((d: any) => Math.max(d.evToNtmRevenue, d.evToImpliedArr))
  );
  const minMultiple = Math.min(
    ...chartData.map((d: any) => Math.min(d.evToNtmRevenue, d.evToImpliedArr))
  );

  // Scale functions
  const getSharePriceY = (price: number) => {
    return (
      margin.top +
      plotHeight -
      ((price - minSharePrice) / (maxSharePrice - minSharePrice)) * plotHeight
    );
  };

  const getMultipleY = (multiple: number) => {
    return (
      margin.top +
      plotHeight -
      ((multiple - minMultiple) / (maxMultiple - minMultiple)) * plotHeight
    );
  };

  const getX = (index: number) => {
    return margin.left + (index / (chartData.length - 1)) * plotWidth;
  };

  // Generate line paths
  const sharePricePath = chartData
    .map((point: any, index: any) => {
      const x = getX(index);
      const y = getSharePriceY(point.sharePrice);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const evNtmRevenuePath = chartData
    .map((point: any, index: any) => {
      const x = getX(index);
      const y = getMultipleY(point.evToNtmRevenue);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const evImpliedArrPath = chartData
    .map((point: any, index: any) => {
      const x = getX(index);
      const y = getMultipleY(point.evToImpliedArr);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

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
          {/* Grid lines for share price (left Y-axis) */}
          {[
            50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180,
          ].map((value) => {
            if (value >= minSharePrice && value <= maxSharePrice) {
              const y = getSharePriceY(value);
              return (
                <line
                  key={`grid-share-${value}`}
                  x1={margin.left}
                  y1={y}
                  x2={chartWidth - margin.right}
                  y2={y}
                  stroke="#f3f4f6"
                  strokeWidth={1}
                />
              );
            }
            return null;
          })}

          {/* Grid lines for multiples (right Y-axis) */}
          {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map((value) => {
            if (value >= minMultiple && value <= maxMultiple) {
              const y = getMultipleY(value);
              return (
                <line
                  key={`grid-multiple-${value}`}
                  x1={margin.left}
                  y1={y}
                  x2={chartWidth - margin.right}
                  y2={y}
                  stroke="#f3f4f6"
                  strokeWidth={1}
                  strokeDasharray="2,2"
                />
              );
            }
            return null;
          })}

          {/* Share Price Line */}
          <path
            d={sharePricePath}
            fill="none"
            stroke="#3A8F74"
            strokeWidth={2}
          />

          {/* EV/NTM Revenue Line */}
          <path
            d={evNtmRevenuePath}
            fill="none"
            stroke="#00ACFF"
            strokeWidth={2}
          />

          {/* EV/Implied ARR Line */}
          <path
            d={evImpliedArrPath}
            fill="none"
            stroke="#FF7D52"
            strokeWidth={2}
          />

          {/* Data points for Share Price */}
          {chartData.map((point: any, index: any) => (
            <circle
              key={`share-${index}`}
              cx={getX(index)}
              cy={getSharePriceY(point.sharePrice)}
              r={3}
              fill="#3A8F74"
              onMouseEnter={() => setHoveredPoint(point)}
              onMouseLeave={() => setHoveredPoint(null)}
              style={{ cursor: "pointer" }}
            />
          ))}

          {/* Data points for EV/NTM Revenue */}
          {chartData.map((point: any, index: any) => (
            <circle
              key={`ntm-${index}`}
              cx={getX(index)}
              cy={getMultipleY(point.evToNtmRevenue)}
              r={3}
              fill="#00ACFF"
              onMouseEnter={() => setHoveredPoint(point)}
              onMouseLeave={() => setHoveredPoint(null)}
              style={{ cursor: "pointer" }}
            />
          ))}

          {/* Data points for EV/Implied ARR */}
          {chartData.map((point: any, index: any) => (
            <circle
              key={`arr-${index}`}
              cx={getX(index)}
              cy={getMultipleY(point.evToImpliedArr)}
              r={3}
              fill="#FF7D52"
              onMouseEnter={() => setHoveredPoint(point)}
              onMouseLeave={() => setHoveredPoint(null)}
              style={{ cursor: "pointer" }}
            />
          ))}

          {/* X-axis labels (every 6 months) */}
          {chartData.map((point: any, index: any) => {
            if (index % 6 === 0 || index === chartData.length - 1) {
              return (
                <text
                  key={`x-label-${index}`}
                  x={getX(index)}
                  y={chartHeight - 10}
                  textAnchor="middle"
                  className="text-sm font-medium fill-gray-700"
                >
                  {point.date}
                </text>
              );
            }
            return null;
          })}

          {/* Left Y-axis labels (Share Price) */}
          {[
            50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180,
          ].map((value) => {
            if (value >= minSharePrice && value <= maxSharePrice) {
              const y = getSharePriceY(value);
              return (
                <text
                  key={`y-left-${value}`}
                  x={margin.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="text-sm font-medium fill-gray-700"
                >
                  ${value.toFixed(0)}
                </text>
              );
            }
            return null;
          })}

          {/* Right Y-axis labels (Multiples) */}
          {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60].map((value) => {
            if (value >= minMultiple && value <= maxMultiple) {
              const y = getMultipleY(value);
              return (
                <text
                  key={`y-right-${value}`}
                  x={chartWidth - margin.right + 10}
                  y={y + 4}
                  textAnchor="start"
                  className="text-sm font-medium fill-gray-700"
                >
                  {value}x
                </text>
              );
            }
            return null;
          })}
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
            <div className="font-semibold text-gray-900 mb-2">
              {hoveredPoint.date}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#3A8F74]"></div>
                <span className="text-gray-600">Share Price:</span>
                <span className="font-medium">
                  ${hoveredPoint.sharePrice.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#00ACFF]"></div>
                <span className="text-gray-600">EV/NTM Revenue:</span>
                <span className="font-medium">
                  {hoveredPoint.evToNtmRevenue.toFixed(1)}x
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF7D52]"></div>
                <span className="text-gray-600">EV/Implied ARR:</span>
                <span className="font-medium">
                  {hoveredPoint.evToImpliedArr.toFixed(1)}x
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-8">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#3A8F74]"></div>
          <span className="text-sm font-medium text-gray-700">Share Price</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#00ACFF]"></div>
          <span className="text-sm font-medium text-gray-700">
            EV / NTM Revenue
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#FF7D52]"></div>
          <span className="text-sm font-medium text-gray-700">
            EV / Implied ARR
          </span>
        </div>
      </div>
    </div>
  );
}
