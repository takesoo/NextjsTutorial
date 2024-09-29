import { fireEvent, render, screen } from "@testing-library/react";
import { AddTodoForm } from "./add-todo-form";

describe("AddTodoForm", () => {
  const mockSetTodoTitle = jest.fn();
  const mockAddTodo = jest.fn();
  it("renders input and button", () => {
    render(
      <AddTodoForm
        newTodoTitle=""
        setNewTodoTitle={mockSetTodoTitle}
        addTodo={mockAddTodo}
      />,
    );
    expect(screen.getByPlaceholderText("New Todo")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add todo/i }),
    ).toBeInTheDocument();
  });

  it("calls addTodo when the button is clicked", () => {
    render(
      <AddTodoForm
        newTodoTitle="Test Todo"
        setNewTodoTitle={mockSetTodoTitle}
        addTodo={mockAddTodo}
      />,
    );
    const button = screen.getByRole("button", { name: /add todo/i });
    fireEvent.click(button);
    expect(mockAddTodo).toHaveBeenCalled();
  });

  it("calls setNewTodoTitle on input change", () => {
    render(
      <AddTodoForm
        newTodoTitle=""
        setNewTodoTitle={mockSetTodoTitle}
        addTodo={mockAddTodo}
      />,
    );
    const input = screen.getByPlaceholderText("New Todo");
    fireEvent.change(input, { target: { value: "New Task" } });
    expect(mockSetTodoTitle).toHaveBeenCalledWith("New Task");
  });
});
