import { Button, Input } from "@chakra-ui/react";

type AddTodoFormProps = {
	newTodoTitle: string;
	setNewTodoTitle: (title: string) => void;
	addTodo: () => void;
};
export default function AddTodoForm({
	newTodoTitle,
	setNewTodoTitle,
	addTodo,
}: AddTodoFormProps): JSX.Element {
	return (
		<>
			<Input
				placeholder="New Todo"
				value={newTodoTitle}
				onChange={(e) => setNewTodoTitle(e.target.value)}
			/>
			<Button onClick={addTodo} colorScheme="blue" mb={4}>
				Add Todo
			</Button>
		</>
	);
}
