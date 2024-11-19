export function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency,
  }).format(amount);
}
