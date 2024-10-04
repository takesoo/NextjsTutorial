import type { ApiClient } from "@/libs/api-clients/api-client";
import { type Todo, Todo as TodoEntity } from "../entities/todo";
import { FirebaseTodoRepository } from "./firebase-todo-repository";

const mockApiClient: ApiClient = {
  get: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
};

describe("FirebaseTodoRepository", () => {
  let repository: FirebaseTodoRepository;
  beforeEach(() => {
    repository = new FirebaseTodoRepository(mockApiClient);
  });

  it("should fetch todos from Firebase", async () => {
    (mockApiClient.get as jest.Mock).mockResolvedValue({
      "test-todo-1": {
        title: "Test Todo 1",
        isCompleted: false,
        id: "test-todo-1",
      },
      "test-todo-2": {
        title: "Test Todo 2",
        isCompleted: true,
        id: "test-todo-2",
      },
    });

    const todos = await repository.getTodos();

    expect(todos).toEqual([
      new TodoEntity("Test Todo 1", false, "test-todo-1"),
      new TodoEntity("Test Todo 2", true, "test-todo-2"),
    ]);
    expect(mockApiClient.get).toHaveBeenCalledWith("/todos.json");
  });

  it("should add todo to Firebase", async () => {
    const newTodo = {
      id: "test-todo-3",
      title: "Test Todo 3",
      isCompleted: false,
    };
    await repository.addTodo(newTodo);
    expect(mockApiClient.put).toHaveBeenCalledWith(
      `/todos/${newTodo.id}.json`,
      newTodo,
    );
  });

  it("should delete todo from Firebase", async () => {
    const todoId = "test-todo-1";
    await repository.deleteTodo(todoId);
    expect(mockApiClient.delete).toHaveBeenCalledWith(`/todos/${todoId}.json`);
  });

  it("should toggle the completion status of a todo", async () => {
    const todo: Todo = {
      id: "test-todo-1",
      title: "Test Todo 1",
      isCompleted: true,
    };
    await repository.toggleComplete(todo);
    expect(mockApiClient.patch).toHaveBeenCalledWith(`/todos/${todo.id}.json`, {
      isCompleted: todo.isCompleted,
    });
  });
});
