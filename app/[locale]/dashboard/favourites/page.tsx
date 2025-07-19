import { use } from "react";
import ClientFavouriteProductsPage from "./ClientFavouriteProducts";

interface FavouriteProductParams {
  locale: string;
}

export default function FavouriteProductsPage({
  params,
}: {
  params: FavouriteProductParams | Promise<FavouriteProductParams>;
}) {
  // Properly unwrap params using React.use()
  const unwrappedParams = use(params as Promise<FavouriteProductParams>);
  const locale = unwrappedParams.locale || "en";

  // Pass the unwrapped locale to the client component
  return <ClientFavouriteProductsPage locale={locale} />;
}