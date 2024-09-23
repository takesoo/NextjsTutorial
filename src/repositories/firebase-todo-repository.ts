import { Todo as TodoEntity } from "@/entities/todo";
import type { ApiClient } from "@/libs/api-clients/api-client";
import type { Todo } from "@/types";
import type { TodoRepository } from "./todo-repository";

export class FirebaseTodoRepository implements TodoRepository {
  private apiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getTodos() {
    const data = await this.apiClient.get<{
      [key: string]: { title: string; isCompleted: boolean; id: string };
    }>("/todos.json");
    if (!data) return [];
    return Object.keys(data).map((key) => {
      const properties = data[key];
      return new TodoEntity(
        properties.title,
        properties.isCompleted,
        properties.id,
      );
    });
  }

  async addTodo(todo: Todo) {
    // キーにtodo.idを指定するためにputで作成しています
    await this.apiClient.put(`/todos/${todo.id}.json`, todo);
  }

  async deleteTodo(id: string) {
    await this.apiClient.delete(`/todos/${id}.json`);
  }

  async toggleComplete(todo: Todo) {
    await this.apiClient.patch(`/todos/${todo.id}.json`, {
      isCompleted: todo.isCompleted,
    });
  }
}
