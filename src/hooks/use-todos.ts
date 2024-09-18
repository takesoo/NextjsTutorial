import type { Todo } from "@/types";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const getTodosFromLocalStorage = (): Todo[] => {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : [];
};

const saveTodosToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  useEffect(() => {
    const storedTodos = getTodosFromLocalStorage();
    setTodos(storedTodos);
  }, []);

  const addTodo = () => {
    const newTodoItem: Todo = {
      id: uuidv4(),
      title: newTodoTitle,
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodoItem];
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  const toggleComplete = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
    );
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
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
