import axios, { AxiosHeaders, type AxiosResponse } from "axios";
import { AxiosApiClient } from "./axios-api-client";

jest.mock("axios");

describe("AxiosApiClient", () => {
  let apiClient: AxiosApiClient;

  const mockAxiosInstance = {
    get: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(() => {
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);
    apiClient = new AxiosApiClient();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should send GET request and return data", async () => {
    const mockData: { title: string; isCompleted: boolean } = {
      title: "test-todo",
      isCompleted: false,
    };
    const mockResponse: AxiosResponse = {
      data: mockData,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {
        headers: new AxiosHeaders(),
      },
    };
    mockAxiosInstance.get.mockResolvedValue(mockResponse);
    const result = await apiClient.get("/todos/test-todo-1.json");
    expect(result).toEqual(mockData);
    expect(mockAxiosInstance.get).toHaveBeenCalledWith(
      "/todos/test-todo-1.json",
    );
  });

  it("should send PUT request with data", async () => {
    const todo = {
      id: "test-todo-1",
      title: "Test Todo 1",
      isCompleted: false,
    };
    await apiClient.put("/todos/test-todo-1.json", todo);
    expect(mockAxiosInstance.put).toHaveBeenCalledWith(
      "/todos/test-todo-1.json",
      todo,
    );
  });

  it("should send PATCH request with data", async () => {
    const todoToBeUpdated = {
      id: "test-todo-1",
      title: "Updated Test Todo 1",
      isCompleted: true,
    };
    await apiClient.patch("/todos/test-todo-1.json", todoToBeUpdated);
    expect(mockAxiosInstance.patch).toHaveBeenCalledWith(
      "/todos/test-todo-1.json",
      todoToBeUpdated,
    );
  });

  it("should send DELETE request with data", async () => {
    await apiClient.delete("/todos/test-todo-1.json");
    expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
      "/todos/test-todo-1.json",
    );
  });
});
