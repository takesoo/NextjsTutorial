import AddTodoForm from "@/components/add-todo-form";
import { TodoList } from "@/components/todo-list";
import { Box } from "@chakra-ui/react";
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
	const [newTodoTitle, setNewTodoTitle] = useState("");

	// ページが読み込まれた時にローカルストレージからTODOを読み込む
	useEffect(() => {
		const storedTodos = getTodosFromLocalStorage();
		setTodos(storedTodos);
	}, []);

	// TODOを追加する
	const addTodo = () => {
		const newTodoItem: Todo = {
			id: uuidv4(),
			title: newTodoTitle,
			isCompleted: false,
		};
		const updatedTodos = [...todos, newTodoItem];
		setTodos(updatedTodos);
		saveTodosToLocalStorage(updatedTodos);
		setNewTodoTitle("");
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
