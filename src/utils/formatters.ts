// Utility functions for formatting financial data

export const formatCurrency = (value: number, decimals: number = 0): string => {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(decimals)}K`;
  } else if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(decimals)}M`;
  } else if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(decimals)}B`;
  }
  return `$${value.toFixed(decimals)}`;
};

export const formatPercentage = (
  value: number,
  decimals: number = 1
): string => {
  if (value < 0) {
    return `(${Math.abs(value).toFixed(decimals)}%)`;
  }
  return `${value.toFixed(decimals)}%`;
};

export const formatRatio = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}x`;
};

export const formatNumber = (value: number, decimals: number = 0): string => {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const getPriceChangeColor = (value: number): string => {
  if (value > 0) return "text-[#166534]";
  if (value < 0) return "text-[#932028]";
  return "text-gray-600";
};

export const getPriceChangeBackground = (value: number): string => {
  if (value > 0) return "bg-[#F0FDF4]";
  if (value < 0) return "bg-[#FDF3F3]";
  return "bg-gray-50";
};

export const getPriceChangeBorder = (value: number): string => {
  if (value > 0) return "border-[#BBF7D0]";
  if (value < 0) return "border-[#FBCDCF]";
  return "border-gray-500";
};

export const getPriceChangeIcon = (value: number): string => {
  if (value > 0) return "▲";
  if (value < 0) return "▼";
  return "—";
};

// Format large numbers with appropriate suffixes
export const formatLargeNumber = (value: number): string => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`;
  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};
