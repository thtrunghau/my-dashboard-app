import { use } from "react";
import ClientProductsPage from "./ClientProducts";

interface ProductParams {
  locale: string;
}

export default function ProductsPage({
  params,
}: {
  params: ProductParams | Promise<ProductParams>;
}) {
  // Properly unwrap params using React.use()
  const unwrappedParams = use(params as Promise<ProductParams>);
  const locale = unwrappedParams.locale || "en";

  // Pass the unwrapped locale to the client component
  return <ClientProductsPage locale={locale} />;
}