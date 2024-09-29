import { TodoItem } from "@/components/todo-item";
import type { Todo } from "@/types";
import { List } from "@chakra-ui/react";
import { fireEvent, render, screen } from "@testing-library/react";

describe("TodoItem", () => {
  const mockToggleComplete = jest.fn();
  const mockDeleteTodo = jest.fn();

  const todo: Todo = {
    id: "test-id",
    title: "Test Todo",
    isCompleted: false,
  };

  it("renders todo item", () => {
    render(
      // <TodoItem>は<List>でラップしないといけないため
      <List>
        <TodoItem
          todo={todo}
          toggleComplete={mockToggleComplete}
          deleteTodo={mockDeleteTodo}
        />
      </List>,
    );
    expect(screen.getByText("Test Todo")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("calls toggleComplete when checkbox is clicked", () => {
    render(
      <List>
        <TodoItem
          todo={todo}
          toggleComplete={mockToggleComplete}
          deleteTodo={mockDeleteTodo}
        />
      </List>,
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(mockToggleComplete).toHaveBeenCalledWith(todo);
  });

  it("calls deleteTodo when delete button is clicked", () => {
    render(
      <List>
        <TodoItem
          todo={todo}
          toggleComplete={mockToggleComplete}
          deleteTodo={mockDeleteTodo}
        />
      </List>,
    );
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);
    expect(mockDeleteTodo).toHaveBeenCalledWith(todo.id);
  });
});
