import { Todo as TodoEntity } from "@/entities/todo";
import { LocalStorageTodoRepository } from "@/repositories/local-storage-todo-repository";
import type { TodoRepository } from "@/repositories/todo-repository";
import type { Todo } from "@/types";
import { useEffect, useState } from "react";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const todoRepository: TodoRepository = new LocalStorageTodoRepository();

  useEffect(() => {
    const storedTodos = todoRepository.getTodos();
    setTodos(storedTodos);
  }, [todoRepository]);

  const addTodo = () => {
    const newTodo = new TodoEntity(newTodoTitle);
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    todoRepository.saveTodos(updatedTodos);
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    todoRepository.saveTodos(updatedTodos);
  };

  const toggleComplete = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? new TodoEntity(todo.title, !todo.isCompleted, todo.id)
        : todo,
    );
    setTodos(updatedTodos);
    todoRepository.saveTodos(updatedTodos);
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
