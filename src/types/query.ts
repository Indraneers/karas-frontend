export interface APIQuery {
  page?: number;
  q?: string;
  [key: string]: Date | string | number | undefined;
}