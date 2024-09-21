import type { Todo } from "@/types";

export interface TodoRepository {
  getTodos(): Todo[];
  saveTodos(todos: Todo[]): void;
}
