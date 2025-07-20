import { use } from "react";
import ClientLoginPage from "./ClientLoginPage";

interface LoginParams {
  locale: string;
}

export default function LoginPage({
  params,
}: {
  params: LoginParams | Promise<LoginParams>;
}) {
  const unwrappedParams = use(params as Promise<LoginParams>);
  const locale = unwrappedParams.locale || "en";

  return <ClientLoginPage locale={locale} />;
}