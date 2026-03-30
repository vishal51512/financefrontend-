/**
 * Format a number as Indian Rupee currency.
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert category_breakdown object to array for Recharts.
 */
export function categoryToChartData(breakdown = {}) {
  return Object.entries(breakdown).map(([name, value]) => ({
    name: capitalize(name),
    value,
  }));
}

/**
 * Convert monthly_trend object to sorted array for Recharts.
 */
export function monthlyToChartData(trend = {}) {
  return Object.entries(trend)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, amount]) => ({ month, amount }));
}

/**
 * Chart color palette.
 */
export const PALETTE = [
  "#6EE7B7", "#34D399", "#10B981", "#059669",
  "#FCD34D", "#FBBF24", "#F59E0B", "#D97706",
  "#67E8F9", "#22D3EE", "#06B6D4", "#0891B2",
];
