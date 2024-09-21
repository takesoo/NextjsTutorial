import { LocalStorageTodoRepository } from "@/repositories/local-storage-todo-repository";
import type { TodoRepository } from "@/repositories/todo-repository";
import type { Todo } from "@/types";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  // データアクセスロジックをrepositoryに抽象化した
  const todoRepository: TodoRepository = new LocalStorageTodoRepository();

  useEffect(() => {
    const storedTodos = todoRepository.getTodos();
    setTodos(storedTodos);
  });

  const addTodo = () => {
    const newTodoItem: Todo = {
      id: uuidv4(),
      title: newTodoTitle,
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodoItem];
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
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
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
