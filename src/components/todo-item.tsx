import { Button, Checkbox, ListItem, Text } from "@chakra-ui/react";

interface TodoItemProps {
	todo: { id: string; title: string; isCompleted: boolean };
	toggleComplete: (id: string) => void;
	deleteTodo: (id: string) => void;
}
export const TodoItem = ({
	todo,
	toggleComplete,
	deleteTodo,
}: TodoItemProps): JSX.Element => {
	return (
		<ListItem key={todo.id} display="flex" alignItems="center">
			<Checkbox
				isChecked={todo.isCompleted}
				onChange={() => {
					toggleComplete(todo.id);
				}}
				mr={2}
			/>
			<Text flex={1} as={todo.isCompleted ? "del" : undefined}>
				{todo.title}
			</Text>
			<Button
				colorScheme="red"
				size={"sm"}
				onClick={() => {
					deleteTodo(todo.id);
				}}
			>
				Delete
			</Button>
		</ListItem>
	);
};
