import { Todo as TodoEntity } from "@/entities/todo";
import type { Todo } from "@/types";
import type { TodoRepository } from "./todo-repository";

export class LocalStorageTodoRepository implements TodoRepository {
  private storageKey = "todos";

  getTodos(): Todo[] {
    const storedTodos = localStorage.getItem(this.storageKey);
    if (!storedTodos) return [];
    const parsedTodos = JSON.parse(storedTodos);
    // Todoエンティティに変換する
    return parsedTodos.map((todo: Todo) => {
      return new TodoEntity(todo.title, todo.isCompleted, todo.id);
    });
  }

  saveTodos(todos: Todo[]): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(
        todos.map((todo) => ({
          id: todo.id,
          title: todo.title,
          isCompleted: todo.isCompleted,
        })),
      ),
    );
  }
}
