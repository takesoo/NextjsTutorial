import type { Todo } from "@/types";
import type { TodoRepository } from "./todo-repository";

export class LocalStorageTodoRepository implements TodoRepository {
  private storageKey = "todos";

  getTodos(): Todo[] {
    const storedTodos = localStorage.getItem(this.storageKey);
    return storedTodos ? JSON.parse(storedTodos) : [];
  }

  saveTodos(todos: Todo[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
  }
}
