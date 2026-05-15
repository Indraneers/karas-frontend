import { Separator } from "@/components/ui/separator";
import { CompanyInfo } from "@/features/invoice/components/company-info";
import { CompanyLogoName } from "@/features/invoice/components/company-logo-name";
import { CustomerInfo } from "@/features/invoice/components/customer-info";
import { InvoiceDetailElement } from "@/features/invoice/components/invoice-detail-element";
import { InvoiceNumber } from "@/features/invoice/components/invoice-number";
import { InvoiceTable } from "@/features/invoice/components/invoice-table.tsx";
import { VehicleInfo } from "@/features/invoice/components/vehicle-info";
import { getSaleById } from "@/features/sale/api/sale";
import { PaymentType, StatusEnum } from "@/features/sale/types/sale";
import { convertSaleResponseDtoToSale } from "@/features/sale/utils/sale";
import { cn } from "@/lib/utils";
import { useQueries } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import { getConfig } from "@/features/app-config/api/app-config";

interface InvoiceSearch {
  print: boolean;
}

export const Route = createFileRoute("/_protected_layout/invoice/$saleId")({
  component: () => <InvoicePage />,
  validateSearch: (search: Record<string, unknown>): InvoiceSearch => {
    return {
      print: Boolean(search.print) || false,
    };
  },
});

export function InvoicePage() {
  const { saleId } = Route.useParams();
  const { print } = Route.useSearch();

  const [saleQuery, configQuery] = useQueries({
    queries: [
      {
        queryKey: ["sale-" + saleId],
        queryFn: () => getSaleById(saleId),
      },
      {
        queryKey: ["config"],
        queryFn: () => getConfig(),
      },
    ],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    onAfterPrint: () => {
      window.close();
    },
  });

  const [isReadyToPrint, setIsReadyToPrint] = useState(false);

  useEffect(() => {
    if (print && saleQuery.isSuccess && configQuery.isSuccess) {
      const raf = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setIsReadyToPrint(true);
        });
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [configQuery.isSuccess, print, saleQuery.isSuccess]);

  useEffect(() => {
    if (isReadyToPrint) {
      reactToPrintFn();
    }
  }, [isReadyToPrint, reactToPrintFn]);

  if (saleQuery.isError || configQuery.isError) {
    return "error";
  }

  if (saleQuery.isLoading || configQuery.isError) {
    return "loading";
  }

  if (!saleQuery.data || !configQuery.data) {
    return "empty";
  }

  return (
    <div className="flex justify-center items-center bg-white w-full text-black">
      <div className="p-10 font-body a4-page" ref={contentRef}>
        <div className="flex justify-between items-start">
          <h1 className="font-display font-medium text-[44px] tracking-tight leading-none">
            Invoice
          </h1>
          <InvoiceNumber id={saleQuery.data.id || ""} />
        </div>
        <div className="gap-8 grid grid-cols-2 mt-8">
          <CompanyLogoName config={configQuery.data} />
          <CompanyInfo config={configQuery.data} />
        </div>
        <Separator className="mt-6 bg-neutral-200" />
        <CustomerInfo customer={saleQuery.data.customer} className="my-2" />
        <Separator className="bg-neutral-200" />
        <VehicleInfo vehicle={saleQuery.data.vehicle} className="my-2" />
        <Separator className="mb-4 bg-neutral-200" />
        <div className="flex justify-between items-end gap-4 mt-3">
          <div className="flex items-center gap-3">
            <InvoiceStatusBadge statusEnum={saleQuery.data.status} />
            <InvoicePaymentTypeBadge paymentType={saleQuery.data.paymentType} />
            <InvoiceDetailElement
              className={cn(
                "hidden",
                saleQuery.data.status === StatusEnum.HOLD && "block"
              )}
              label="Due By"
            >
              <span className="font-medium">
                {format(saleQuery.data.dueAt, "do MMM yyyy, hh:mm aa")}
              </span>
            </InvoiceDetailElement>
          </div>
          <div className="flex gap-8">
            <InvoiceDetailElement label="Initiated By">
              <span className="font-medium">{saleQuery.data.user.username}</span>
            </InvoiceDetailElement>
            <InvoiceDetailElement label="Transaction Time">
              <span className="font-medium">
                {format(saleQuery.data.createdAt, "do MMM yyyy, hh:mm aa")}
              </span>
            </InvoiceDetailElement>
          </div>
        </div>
        <InvoiceTable
          className="mt-8 page-break"
          sale={convertSaleResponseDtoToSale(saleQuery.data)}
        />
      </div>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";

export function InvoiceStatusBadge({ statusEnum }: { statusEnum: StatusEnum }) {
  return (
    <>
      {statusEnum === StatusEnum.PAID && (
        <Badge className="bg-emerald-600 text-white border-transparent shadow-none font-semibold text-sm uppercase tracking-[0.16em] px-3.5 py-1 rounded-md">
          Paid
        </Badge>
      )}
      {statusEnum === StatusEnum.HOLD && (
        <Badge className="bg-amber-500 text-white border-transparent shadow-none font-semibold text-sm uppercase tracking-[0.16em] px-3.5 py-1 rounded-md">
          Hold
        </Badge>
      )}
    </>
  );
}

export function InvoicePaymentTypeBadge({
  paymentType,
}: {
  paymentType: PaymentType;
}) {
  return (
    <>
      {paymentType === PaymentType.BANK && (
        <Badge className="bg-sky-600 text-white border-transparent shadow-none font-semibold text-sm uppercase tracking-[0.16em] px-3.5 py-1 rounded-md">
          By Bank
        </Badge>
      )}
      {paymentType === PaymentType.CASH && (
        <Badge className="bg-emerald-600 text-white border-transparent shadow-none font-semibold text-sm uppercase tracking-[0.16em] px-3.5 py-1 rounded-md">
          By Cash
        </Badge>
      )}
    </>
  );
}
