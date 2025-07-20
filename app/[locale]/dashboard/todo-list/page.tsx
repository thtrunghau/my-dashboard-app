import { use } from "react";
import ClientTodoListPage from "./ClientTodoList";


interface TodoListParams {
  locale: string;
}

export default function TodoListPage({
  params,
}: {
  params: TodoListParams | Promise<TodoListParams>;
}) {
  // Properly unwrap params using React.use()
  const unwrappedParams = use(params as Promise<TodoListParams>);
  const locale = unwrappedParams.locale || "en";

  // Pass the unwrapped locale to the client component
  return <ClientTodoListPage locale={locale} />;
}