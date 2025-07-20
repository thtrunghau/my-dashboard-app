import { use } from "react";
import ClientUiElement from "./ClientUiElement";

interface UiElementParams {
  locale: string;
}

export default function UiElementPage({
  params,
}: {
  params: UiElementParams | Promise<UiElementParams>;
}) {
  // Properly unwrap params using React.use()
  const unwrappedParams = use(params as Promise<UiElementParams>);
  const locale = unwrappedParams.locale || "en";

  // Pass the unwrapped locale to the client component
  return <ClientUiElement locale={locale} />;
}
