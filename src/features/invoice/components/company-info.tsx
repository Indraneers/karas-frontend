import { InvoiceDetailElement } from "./invoice-detail-element";
import { AppConfig } from "@/features/app-config/types/app-config";

export function CompanyInfo({ config }: { config: AppConfig}) {
  return (
    <div className="gap-2 grid grid-cols-[3fr,1fr] grid-rows-2">
      <InvoiceDetailElement label="Address">
        {config.addressEn}
      </InvoiceDetailElement>
      <InvoiceDetailElement label="Contact">
        <div>
          {config.phoneNumbers.map((p, i) => (
            <div key={i}>
              {p}
            </div>
          ))}
        </div>
      </InvoiceDetailElement>
      <InvoiceDetailElement label="អាស័យដ្ធាន">
        {config.addressKh}
      </InvoiceDetailElement>
      <InvoiceDetailElement label="លេខទូរស័ព្ទ">
        <div>
          {config.phoneNumbers.map((p, i) => (
            <div key={i}>
              {p}
            </div>
          ))}
        </div>
      </InvoiceDetailElement>
    </div>
  );
}