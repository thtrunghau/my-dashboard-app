//show list of orders
import { use } from "react";
import ClientCalendarPage from "./ClientCalendar";

interface CalendarParams {
  locale: string;
}

export default function CalendarPage({
  params,
}: {
  params: CalendarParams | Promise<CalendarParams>;
}) {
  // Properly unwrap params using React.use()
  const unwrappedParams = use(params as Promise<CalendarParams>);
  const locale = unwrappedParams.locale || "en";

  // Pass the unwrapped locale to the client component
  return <ClientCalendarPage locale={locale} />;
}