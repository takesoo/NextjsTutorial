import { Todo as TodoEntity } from "@/entities/todo";
import { AxiosApiClient } from "@/libs/api-clients/axios-api-client";
import { FirebaseTodoRepository } from "@/repositories/firebase-todo-repository";
import type { TodoRepository } from "@/repositories/todo-repository";
import type { Todo } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export const useTodos = () => {
  const [newTodoTitle, setNewTodoTitle] = useState("");

  // const todoRepository: TodoRepository = useMemo(() => {
  //   const apiClient = new AxiosApiClient();
  //   return new FirebaseTodoRepository(apiClient);
  // }, []);
  const todoRepository = new FirebaseTodoRepository(new AxiosApiClient());

  const queryClient = useQueryClient();

  const {
    data: todos,
    isLoading,
    error,
  } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      return await todoRepository.getTodos();
    },
  });

  const addTodoMutation = useMutation({
    mutationFn: () => {
      const newTodo = new TodoEntity(newTodoTitle);
      return todoRepository.addTodo(newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] }); // キャッシュを無効にして再フェッチ
      setNewTodoTitle("");
    },
    onError: (error) => {
      console.error("Failed to add todo", error);
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: (id: string) => {
      return todoRepository.deleteTodo(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Failed to delete todo", error);
    },
  });

  const toggleCompleteMutation = useMutation({
    mutationFn: (todo: Todo) => {
      const todoToUpdate = new TodoEntity(
        todo.title,
        !todo.isCompleted,
        todo.id,
      );

      return todoRepository.toggleComplete(todoToUpdate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Failed to toggle complete", error);
    },
  });

  return {
    todos,
    isLoading,
    error,
    newTodoTitle,
    setNewTodoTitle,
    addTodo: () => addTodoMutation.mutate(),
    deleteTodo: (id: string) => deleteTodoMutation.mutate(id),
    toggleComplete: (todo: Todo) => toggleCompleteMutation.mutate(todo),
  };
};
