import { render } from "@testing-library/react";
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
  });
});
