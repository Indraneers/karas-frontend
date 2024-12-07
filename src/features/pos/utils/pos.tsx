export function calculateTotalCost(price: string, discount: string, qty: string) {
  return ((
    (
      ((parseFloat(price) * 100) || 0)
      -
      ((parseFloat(discount) * 100) || 0)
    )
  *
  (parseInt(qty) || 0)
  ) / 100).toFixed(2);
}