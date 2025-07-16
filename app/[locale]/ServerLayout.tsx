import { use } from "react";
import ClientLayout from "./ClientLayout";

interface LayoutParams {
  locale: string;
}

// This is a Server Component (no "use client" directive)
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: LayoutParams | Promise<LayoutParams>;
}) {
  // Properly unwrap params using React.use()
  // This works now and will continue to work in future Next.js versions
  const unwrappedParams = use(params as Promise<LayoutParams>);
  const locale = unwrappedParams.locale || "en";

  return <ClientLayout locale={locale}>{children}</ClientLayout>;
}
