import { use } from "react";
import ClientMainDashboardPage from "./ClientMainDashboard";

interface MainDashboardParams {
  locale: string;
}

/**
 * Server Component that properly handles async route parameters
 * This addresses the warning about directly accessing params.locale
 * by using React.use() to unwrap the params Promise
 */
export default function MainDashboardPage({
  params,
}: {
  params: MainDashboardParams | Promise<MainDashboardParams>;
}) {
  // Properly unwrap params using React.use()
  const unwrappedParams = use(params as Promise<MainDashboardParams>);
  const locale = unwrappedParams.locale || "en";

  // Pass the unwrapped locale to the client component
  return <ClientMainDashboardPage locale={locale} />;
}