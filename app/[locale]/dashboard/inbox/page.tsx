import { use } from "react";
import ClientInboxPage from "./ClientInbox";

interface InboxParams {
  locale: string;
}

export default function InboxPage({
  params,
}: {
  params: InboxParams | Promise<InboxParams>;
}) {
  // Properly unwrap params using React.use()
  const unwrappedParams = use(params as Promise<InboxParams>);
  const locale = unwrappedParams.locale || "en";

  // Pass the unwrapped locale to the client component
  return <ClientInboxPage locale={locale} />;
}