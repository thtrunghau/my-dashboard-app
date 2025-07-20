//show list of orders
import { use } from "react";
import ClientOrderPage from "./ClientOrder";

interface OrderParams {
  locale: string;
}

export default function OrderPage({
  params,
}: {
  params: OrderParams | Promise<OrderParams>;
}) {
  // Properly unwrap params using React.use()
  const unwrappedParams = use(params as Promise<OrderParams>);
  const locale = unwrappedParams.locale || "en";

  // Pass the unwrapped locale to the client component
  return <ClientOrderPage locale={locale} />;
}