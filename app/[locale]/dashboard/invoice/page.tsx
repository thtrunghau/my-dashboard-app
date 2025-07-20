import { use } from "react";
import ClientInvoice from "./ClientInvoice";

interface InvoiceParams {
  locale: string;
}

export default function InvoicePage({
  params,
}: {
  params: InvoiceParams | Promise<InvoiceParams>;
}) {
  // Properly unwrap params using React.use()
  const unwrappedParams = use(params as Promise<InvoiceParams>);
  const locale = unwrappedParams.locale || "en";

  // Pass the unwrapped locale to the client component
  return <ClientInvoice locale={locale} />;
}
