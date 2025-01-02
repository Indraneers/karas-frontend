export interface ProductDto {
  id: string;
  name: string;
  categoryId: string;
  unitCount?: number;
  variable: boolean;
  baseUnit: string;
}