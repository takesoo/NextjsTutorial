import { TodoList } from "@/components/todo-list";
import type { Todo } from "@/types";
import { render, screen } from "@testing-library/react";

describe("TodoList", () => {
  const mockToggleComplete = jest.fn();
  const mockDeleteTodo = jest.fn();

  const todos: Todo[] = [
    { id: "test-todo-1", title: "Test Todo 1", isCompleted: false },
    { id: "test-todo-2", title: "Test Todo 2", isCompleted: true },
  ];

  it("renders list of todos", () => {
    render(
      <TodoList
        todos={todos}
        toggleComplete={mockToggleComplete}
        deleteTodo={mockDeleteTodo}
      />,
    );
    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
  });
});
