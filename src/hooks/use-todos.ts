import { Todo as TodoEntity } from "@/entities/todo";
import { AxiosApiClient } from "@/libs/api-clients/axios-api-client";
import { FirebaseTodoRepository } from "@/repositories/firebase-todo-repository";
import type { TodoRepository } from "@/repositories/todo-repository";
import type { Todo } from "@/types";
import { useEffect, useMemo, useState } from "react";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const todoRepository: TodoRepository = useMemo(() => {
    const apiClient = new AxiosApiClient();
    return new FirebaseTodoRepository(apiClient);
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await todoRepository.getTodos();
      setTodos(fetchedTodos);
    };

    fetchTodos();
  }, [todoRepository]);

  // firebase realtime databaseがレスポンスとデータ更新にタイムラグがあるので、先にstateを更新してからDBの更新をしています。
  const addTodo = async () => {
    const newTodo = new TodoEntity(newTodoTitle);
    setTodos([...todos, newTodo]);

    try {
      await todoRepository.addTodo(newTodo);
    } catch (error: unknown) {
      console.error("failed to add todo", error);
      throw new Error("failed to add todo");
    }
  };

  // firebase realtime databaseがレスポンスとデータ更新にタイムラグがあるので、先にstateを更新してからDBの更新をしています。
  const deleteTodo = async (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);

    try {
      await todoRepository.deleteTodo(id);
    } catch (error: unknown) {
      console.error("failed to delete todo", error);
      throw new Error("failed to delete todo");
    }
  };

  // firebase realtime databaseがレスポンスとデータ更新にタイムラグがあるので、先にstateを更新してからDBの更新をしています。
  const toggleComplete = async (id: string) => {
    const updatedTodos = todos.map((todo) => {
      return todo.id === id
        ? new TodoEntity(todo.title, !todo.isCompleted, todo.id)
        : todo;
    });
    setTodos(updatedTodos);

    const todoToUpdate = updatedTodos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    try {
      await todoRepository.toggleComplete(todoToUpdate);
    } catch (error: unknown) {
      console.error("failed to update todo", error);
      throw new Error("failed to update todo");
    }
  };

  return {
    todos,
    newTodoTitle,
    setNewTodoTitle,
    addTodo,
    deleteTodo,
    toggleComplete,
  };
};
