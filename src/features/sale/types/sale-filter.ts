import { PaymentType, StatusEnum } from "./sale";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type SaleFilter = {
  createdAtFrom?: Date;
  createdAtTo?: Date;
  customerId?: string;
  vehicleId?: string;
  userId?: string;
  paymentType?: PaymentType;
  status?: StatusEnum;
}