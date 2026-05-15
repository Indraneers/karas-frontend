export interface AnalyticDTO {
  value: string;
  date: string;
}

export interface TopProductDTO {
  productId: string;
  productName: string;
  revenue: number;
  unitsSold: number;
}

export interface RevenueBreakdownDTO {
  id: string;
  label: string;
  revenue: number;
  orderCount: number;
}