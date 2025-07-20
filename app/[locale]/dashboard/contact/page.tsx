import { use } from "react";
import ClientContactPage from "./ClientContact";


interface ContactParams {
  locale: string;
}

export default function ContactListPage({
  params,
}: {
  params: ContactParams | Promise<ContactParams>;
}) {
  // Properly unwrap params using React.use()
    const unwrappedParams = use(params as Promise<ContactParams>);
  const locale = unwrappedParams.locale || "en";

  // Pass the unwrapped locale to the client component
  return <ClientContactPage locale={locale} />;
}