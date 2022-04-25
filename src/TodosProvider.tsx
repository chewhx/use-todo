import React from 'react';

type TodosProviderProps = {
	children: React.ReactNode;
};

export type Todo = {
	id: number;
	title: string;
	is_done: boolean;
	created_at: Date;
	updated_at: Date;
};

type TodosContextProps = {
	allTodos: Todo[];
	availableTodos: Todo[];
	completedTodos: Todo[];
	append: (values: string) => void;
	remove: (_id: number) => void;
	completeTodo: (_id: number) => void;
	toggleTodo: (_id: number) => void;
	setTodo: (_id: number, state: boolean) => void;
};

export const TodosContext = React.createContext<TodosContextProps>({
	allTodos: [],
	availableTodos: [],
	completedTodos: [],
	append: () => {},
	remove: () => {},
	completeTodo: () => {},
	toggleTodo: () => {},
	setTodo: () => {},
});

const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
	const [todos, setTodos] = React.useState<Todo[]>([]);
	const append = (values: string) => {
		const todo: Todo = {
			id: Date.now(),
			title: values,
			is_done: false,
			created_at: new Date(),
			updated_at: new Date(),
		};
		setTodos((p) => [...p, todo]);
	};

	const remove = (_id: number) =>
		setTodos((p) => p.filter(({ id }) => id !== _id));

	const completeTodo = (_id: number) =>
		setTodos((p) =>
			p.map(({ id, ...rest }) =>
				id === _id ? { id, ...rest, is_done: true } : { id, ...rest }
			)
		);

	const toggleTodo = (_id: number) =>
		setTodos((p) =>
			p.map(({ id, ...rest }) =>
				id === _id ? { id, ...rest, is_done: !rest.is_done } : { id, ...rest }
			)
		);

	const setTodo = (_id: number, state: boolean) =>
		setTodos((p) =>
			p.map(({ id, ...rest }) =>
				id === _id ? { id, ...rest, is_done: state } : { id, ...rest }
			)
		);
	const value = {
		append,
		remove,
		allTodos: todos,
		completedTodos: todos.filter((e) => e.is_done === true),
		availableTodos: todos.filter((e) => e.is_done === false),
		completeTodo,
		toggleTodo,
		setTodo,
	};

	return (
		<TodosContext.Provider value={value}>{children}</TodosContext.Provider>
	);
};

export default TodosProvider;
