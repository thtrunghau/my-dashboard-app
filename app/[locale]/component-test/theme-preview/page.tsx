import { use } from "react";
import ClientThemePreviewPage from "./ClientThemePreview";

interface ThemePreviewParams {
  locale: string;
}

/**
 * Server Component that properly handles async route parameters
 * This addresses the warning about directly accessing params.locale
 * by using React.use() to unwrap the params Promise
 */
export default function ThemePreviewPage({
  params,
}: {
  params: ThemePreviewParams | Promise<ThemePreviewParams>;
}) {
  // Properly unwrap params using React.use()
  // In current Next.js this is unnecessary but prepares for future versions
  const unwrappedParams = use(params as Promise<ThemePreviewParams>);
  const locale = unwrappedParams.locale || "en";

  // Pass the unwrapped locale to the client component
  return <ClientThemePreviewPage locale={locale} />;
}
