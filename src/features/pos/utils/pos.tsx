export function calculateTotalCost(price: string | number, discount: string | number, qty: string | number) {

  return ((
    (
      ((Number(price) * 100) || 0)
      -
      ((Number(discount) * 100) || 0)
    )
  *
  (Number(qty) || 0)
  ) / 100).toFixed(2);
}