import { use } from "react";
import ClientDashboardLayout from "./ClientDashboardLayout";

interface DashboardLayoutParams {
  locale: string;
}

/**
 * Server Component that properly handles async route parameters
 * This addresses the warning about directly accessing params.locale
 * by using React.use() to unwrap the params Promise
 */
export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: DashboardLayoutParams | Promise<DashboardLayoutParams>;
}) {
  // Properly unwrap params using React.use()
  // In current Next.js this is unnecessary but prepares for future versions
  const unwrappedParams = use(params as Promise<DashboardLayoutParams>);
  const locale = unwrappedParams.locale || "en";

  // Pass the unwrapped locale to the client component
  return <ClientDashboardLayout locale={locale}>{children}</ClientDashboardLayout>;
}