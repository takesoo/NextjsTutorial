import { AddTodoForm } from "@/components/add-todo-form";
import { TodoList } from "@/components/todo-list";
import { useTodos } from "@/hooks/use-todos";
import { Alert, AlertIcon, Box, Spinner } from "@chakra-ui/react";

export default function Home() {
  const {
    todos,
    isLoading,
    error,
    newTodoTitle,
    setNewTodoTitle,
    addTodo,
    deleteTodo,
    toggleComplete,
  } = useTodos();
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Failed to load todos.
      </Alert>
    );
  }
  return (
    <Box p={5}>
      <AddTodoForm
        newTodoTitle={newTodoTitle}
        setNewTodoTitle={setNewTodoTitle}
        addTodo={addTodo}
      />
      {todos && (
        <TodoList
          todos={todos}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      )}
    </Box>
  );
}
