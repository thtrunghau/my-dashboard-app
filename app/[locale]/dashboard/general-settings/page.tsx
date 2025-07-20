import { use } from "react";
import ClientGeneralSetting from "./ClientGeneralSetting";

interface GeneralSettingParams {
  locale: string;
}

export default function GeneralSettingPage({
  params,
}: {
  params: GeneralSettingParams | Promise<GeneralSettingParams>;
}) {
  // Properly unwrap params using React.use()
  const unwrappedParams = use(params as Promise<GeneralSettingParams>);
  const locale = unwrappedParams.locale || "en";

  // Pass the unwrapped locale to the client component
  return <ClientGeneralSetting locale={locale} />;
}