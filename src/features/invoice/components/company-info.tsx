import { InvoiceDetailElement } from "./invoice-detail-element";

export function CompanyInfo() {
  return (
    <div className="gap-2 grid grid-cols-[3fr,1fr] grid-rows-2">
      <InvoiceDetailElement label="Address">
        St 211 Corner 138, Sangkat Veal Vong, Khan 7 Makara, Phnom Penh, Cambodia
      </InvoiceDetailElement>
      <InvoiceDetailElement label="Contact">
        <div>
          <div>010 898 009</div>
          <div>010 898 009</div>
        </div>
      </InvoiceDetailElement>
      <InvoiceDetailElement label="អាស័យដ្ធាន">
        {"ផ្ទះលេខ ០១ ផ្លូវ​ ២១១​ សង្កាត់វាលវង់ ខណ្ឌ៧មករា រាជធានីភ្នំពេញ ព្រះរាជាណាចក្រកម្ពុជា"}
      </InvoiceDetailElement>
      <InvoiceDetailElement label="លេខទូរស័ព្ទ">
        <div>
          <div>010 898 009</div>
          <div>010 898 009</div>
        </div>
      </InvoiceDetailElement>
    </div>
  );
}