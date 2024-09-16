import { List } from "@chakra-ui/react";
import { TodoItem } from "./todo-item";

interface TodoListProps {
	todos: { id: string; title: string; isCompleted: boolean }[];
	toggleComplete: (id: string) => void;
	deleteTodo: (id: string) => void;
}
export const TodoList = ({
	todos,
	toggleComplete,
	deleteTodo,
}: TodoListProps): JSX.Element => {
	return (
		<List spacing={3}>
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					toggleComplete={toggleComplete}
					deleteTodo={deleteTodo}
				/>
			))}
		</List>
	);
};
