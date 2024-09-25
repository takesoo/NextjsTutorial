import type { Todo } from "@/types";
import { Button, Checkbox, ListItem, Text } from "@chakra-ui/react";

type TodoItemProps = {
  todo: Todo;
  toggleComplete: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
};
export const TodoItem = ({
  todo,
  toggleComplete,
  deleteTodo,
}: TodoItemProps): JSX.Element => {
  const handleToggleComplete = () => {
    toggleComplete(todo);
  };
  const handleDeleteTodo = () => {
    deleteTodo(todo.id);
  };
  return (
    <ListItem key={todo.id} display="flex" alignItems="center">
      <Checkbox
        isChecked={todo.isCompleted}
        onChange={handleToggleComplete}
        mr={2}
      />
      <Text flex={1} as={todo.isCompleted ? "del" : undefined}>
        {todo.title}
      </Text>
      <Button colorScheme="red" size={"sm"} onClick={handleDeleteTodo}>
        Delete
      </Button>
    </ListItem>
  );
};
