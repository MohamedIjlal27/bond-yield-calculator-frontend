/**
 * Utility functions for formatting and data manipulation
 */

/**
 * Format a number as a percentage string
 */
export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(2)}%`;
}

/**
 * Format a number as currency (USD)
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format a date string to localized date
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Capitalize the first letter of a string
 */
export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Get badge color classes based on premium/discount indicator
 */
export function getBadgeColor(indicator: string): string {
  switch (indicator) {
    case "premium":
      return "bg-green-100 text-green-800 border-green-200";
    case "discount":
      return "bg-red-100 text-red-800 border-red-200";
    case "par":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

/**
 * Get description text for bond status
 */
export function getBondStatusDescription(indicator: string): string {
  switch (indicator) {
    case "premium":
      return "Trading above face value";
    case "discount":
      return "Trading below face value";
    case "par":
      return "Trading at face value";
    default:
      return "";
  }
}
