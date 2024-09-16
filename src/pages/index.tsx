import {
	Box,
	Button,
	Checkbox,
	Input,
	List,
	ListItem,
	Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Todo {
	id: string;
	title: string;
	isCompleted: boolean;
}

const getTodosFromLocalStorage = (): Todo[] => {
	const storedTodos = localStorage.getItem("todos");
	return storedTodos ? JSON.parse(storedTodos) : [];
};

const saveTodosToLocalStorage = (todos: Todo[]) => {
	localStorage.setItem("todos", JSON.stringify(todos));
};

export default function Home() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [newTodo, setNewTodo] = useState("");

	// ページが読み込まれた時にローカルストレージからTODOを読み込む
	useEffect(() => {
		const storedTodos = getTodosFromLocalStorage();
		setTodos(storedTodos);
	}, []);

	// TODOを追加する
	const addTodo = () => {
		const newTodoItem: Todo = {
			id: uuidv4(),
			title: newTodo,
			isCompleted: false,
		};
		const updatedTodos = [...todos, newTodoItem];
		setTodos(updatedTodos);
		saveTodosToLocalStorage(updatedTodos);
		setNewTodo("");
	};

	// TODOを削除する
	const deleteTodo = (id: string) => {
		const updatedTodos = todos.filter((todo) => todo.id !== id);
		setTodos(updatedTodos);
		saveTodosToLocalStorage(updatedTodos);
	};

	// isCompletedを切り替える
	const toggleComplete = (id: string) => {
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
		);
		setTodos(updatedTodos);
		saveTodosToLocalStorage(updatedTodos);
	};
	return (
		<Box p={5}>
			<Input
				placeholder="New Todo"
				value={newTodo}
				onChange={(e) => setNewTodo(e.target.value)}
			/>
			<Button onClick={addTodo} colorScheme="blue" mb={4}>
				Add Todo
			</Button>

			<List spacing={3}>
				{todos.map((todo) => (
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
				))}
			</List>
		</Box>
	);
}
