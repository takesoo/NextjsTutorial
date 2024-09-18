import { AddTodoForm } from "@/components/add-todo-form";
import { TodoList } from "@/components/todo-list";
import { useTodos } from "@/hooks/use-todos";
import { Box } from "@chakra-ui/react";

export default function Home() {
  const {
    todos,
    newTodoTitle,
    setNewTodoTitle,
    addTodo,
    deleteTodo,
    toggleComplete,
  } = useTodos();
  return (
    <Box p={5}>
      <AddTodoForm
        newTodoTitle={newTodoTitle}
        setNewTodoTitle={setNewTodoTitle}
        addTodo={addTodo}
      />
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    </Box>
  );
}
