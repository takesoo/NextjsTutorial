import { FirebaseTodoRepository } from "@/repositories/firebase-todo-repository";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useTodos } from "./use-todos";

jest.mock("@/repositories/firebase-todo-repository");

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
};

describe("useTodos", () => {
  beforeEach(() => {
    (FirebaseTodoRepository as jest.Mock).mockImplementation(() => ({
      getTodos: jest.fn().mockRejectedValue([
        { id: "test-todo-1", title: "Test Todo 1", isCompleted: false },
        { id: "test-todo-2", title: "Test Todo 2", isCompleted: false },
      ]),
      addTodo: jest.fn(),
      deleteTodo: jest.fn(),
      toggleComplete: jest.fn(),
    }));
  });

  it("should fetch todos initially", async () => {
    // renderHook()でhookをレンダリングする
    const { result } = renderHook(() => useTodos(), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(true);
    // waitFor()でhookがコールバック関数の条件になるまで待つ
    await waitFor(() => {
      result.current.todos && result.current.todos.length > 0;
    });
    if (result.current.todos) {
      expect(result.current.todos.length).toBe(2);
    }
  });

  it("should add a new todo", async () => {
    const { result } = renderHook(() => useTodos(), {
      wrapper: createWrapper(),
    });
    // act()でhookを操作する
    act(() => {
      result.current.setNewTodoTitle("New Todo");
      result.current.addTodo();
    });
    await waitFor(() => {
      result.current.todos && result.current.todos.length === 3;
    });
    if (result.current.todos) {
      expect(result.current.todos).toContainEqual({
        id: expect.any(String),
        title: "New Todo",
        isCompleted: false,
      });
    }
  });

  it("should delete a todo", async () => {
    const { result } = renderHook(() => useTodos(), {
      wrapper: createWrapper(),
    });
    act(() => {
      if (result.current.todos) {
        result.current.deleteTodo(result.current.todos[0].id);
      }
    });
    await waitFor(() => {
      result.current.todos && result.current.todos.length === 1;
    });
    if (result.current.todos) {
      expect(result.current.todos).not.toContainEqual(result.current.todos[0]);
    }
  });

  it("should toggle a todo's isCompleted", async () => {
    const { result } = renderHook(() => useTodos(), {
      wrapper: createWrapper(),
    });
    act(() => {
      if (result.current.todos) {
        result.current.toggleComplete(result.current.todos[0]);
      }
    });
    await waitFor(() => {
      result.current.todos && result.current.todos[0].isCompleted === true;
    });
    if (result.current.todos) {
      expect(result.current.todos[0].isCompleted).toBe(true);
    }
  });
});
