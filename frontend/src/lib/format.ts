/** Format a percentage to 1 decimal max, no trailing zeros */
export function formatPercent(value: number): string {
  const v = Math.round(value * 10) / 10;
  return v % 1 === 0 ? `${v}%` : `${v.toFixed(1)}%`;
}

/** Format large numbers compactly: 32699 → 32.7k */
export function formatCompact(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return Math.round(value).toLocaleString();
}

/** Format currency as whole dollars */
export function formatCurrency(value: number): string {
  return `$${Math.round(value).toLocaleString()}`;
}
