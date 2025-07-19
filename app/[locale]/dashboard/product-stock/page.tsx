import { use } from "react";
import ClientInStockProductsPage from "./ClientInStockProducts";


interface InStockProductParams {
  locale: string;
}

export default function ProductsPage({
  params,
}: {
  params: InStockProductParams | Promise<InStockProductParams>;
}) {
  // Properly unwrap params using React.use()
  const unwrappedParams = use(params as Promise<InStockProductParams>);
  const locale = unwrappedParams.locale || "en";

  // Pass the unwrapped locale to the client component
  return <ClientInStockProductsPage locale={locale} />;
}