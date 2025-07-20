import { use } from "react";
import ClientPricingPage from "./ClientPricing";


interface PricingParams {
  locale: string;
}

export default function ProductsPage({
  params,
}: {
  params: PricingParams | Promise<PricingParams>;
}) {
  // Properly unwrap params using React.use()
  const unwrappedParams = use(params as Promise<PricingParams>);
  const locale = unwrappedParams.locale || "en";

  // Pass the unwrapped locale to the client component
  return <ClientPricingPage locale={locale} />;
}