/** Philippine peso amounts from procurement notices (not millions). */
export function pesoFull(amount: number): string {
  return `₱${amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const compact = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  notation: 'compact',
  maximumFractionDigits: 1,
});

/** Short peso amounts for headline figures, e.g. ₱107.7M. */
export function pesoCompact(amount: number): string {
  return compact.format(amount);
}
