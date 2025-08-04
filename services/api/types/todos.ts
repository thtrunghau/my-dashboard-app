/**
 * Todo-related type definitions
 * Based on existing todo-list components
 */

// Todo priority levels
export type TodoPriority = "high" | "medium" | "low";

// Todo status options
export type TodoStatus = "pending" | "completed" | "overdue";

// Todo interface based on your TodoCard component
export interface Todo {
  id: string | number;
  title: string;
  description: string;
  completed: boolean;
  priority: TodoPriority;
  dueDate?: string; // ISO date string
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
  userId?: string | number; // Owner of the todo
  category?: string;
  tags?: string[];
  isStarred?: boolean; // For UI favorite status
  assignedTo?: string | number; // User ID
}

// Todo response from API (matching DummyJSON structure)
export interface TodoResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

// Todo search parameters
export interface TodoSearchParams {
  q?: string; // Search query
  limit?: number;
  skip?: number;
  userId?: string | number; // Filter by user
  completed?: boolean; // Filter by completion status
  priority?: TodoPriority; // Filter by priority
  dueDate?: string; // Filter by due date
  category?: string; // Filter by category
  tag?: string; // Filter by tag
  [key: string]: unknown; // Support for additional parameters
}

// Todo creation request
export type CreateTodoRequest = Omit<Todo, "id" | "createdAt" | "updatedAt">;

// Todo update request
export type UpdateTodoRequest = Partial<Omit<Todo, "id">>;

// Todo form values for adding/editing
export interface TodoFormValues {
  title: string;
  description: string;
  priority: TodoPriority;
  dueDate?: string;
  completed?: boolean;
  category?: string;
  tags?: string[];
}
