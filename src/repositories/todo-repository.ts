import type { Todo } from "@/types";

export interface TodoRepository {
  getTodos(): Promise<Todo[]>;
  addTodo(todo: Todo): Promise<void>;
  deleteTodo(id: string): Promise<void>;
  toggleComplete(todo: Todo): Promise<void>;
}
