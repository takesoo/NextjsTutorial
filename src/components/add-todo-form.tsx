import { Button, Input } from "@chakra-ui/react";

type AddTodoFormProps = {
  newTodoTitle: string;
  setNewTodoTitle: (title: string) => void;
  addTodo: () => void;
};
export const AddTodoForm = ({
  newTodoTitle,
  setNewTodoTitle,
  addTodo,
}: AddTodoFormProps): JSX.Element => {
  const handleSubmit = () => {
    addTodo();
  };
  return (
    <>
      <Input
        placeholder="New Todo"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
      />
      {console.log(newTodoTitle === "")}
      <Button
        onClick={handleSubmit}
        colorScheme="blue"
        mb={4}
        isDisabled={newTodoTitle.trim() === ""}
      >
        Add Todo
      </Button>
    </>
  );
};
