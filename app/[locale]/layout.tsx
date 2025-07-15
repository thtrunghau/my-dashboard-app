import { use } from "react";
import ClientLayout from "./ClientLayout";

interface LayoutParams {
  locale: string;
}

/**
 * Server Component that properly handles async route parameters
 * This addresses the warning: "params should be awaited before using its properties"
 * by using React.use() to unwrap the params Promise
 */
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: LayoutParams | Promise<LayoutParams>;
}) {
  // Properly unwrap params using React.use()
  // In current Next.js this is unnecessary but prepares for future versions
  const unwrappedParams = use(params as Promise<LayoutParams>);
  const locale = unwrappedParams.locale || "en";

  // Pass the unwrapped locale to the client component
  return <ClientLayout locale={locale}>{children}</ClientLayout>;
}
