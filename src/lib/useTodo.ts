import React from 'react';
import { useLocalStorage as useTodosLocalStorage } from '../hooks/useLocalStorage';
import { generateTodo } from '../utils/generateTodo';

export interface ITodo {
	id: string;
	title: string;
	isDone: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface UseTodoOptions {
	initialData?: ITodo[];
	onUpdate?: (todos: ITodo[]) => void;
	useLocalStorage?: boolean;
}

export type ICreateTodo = Pick<ITodo, 'title'>;
export type IPushTodo = (title: string) => void;
export type IPopTodo = () => void;
export type IMarkDone = (id: string) => void;
export type IMarkNotDone = (id: string) => void;
export type IToggleTodo = (id: string) => void;
export type IUpdateTodo = (id: string, title: string) => void;
export type IRemoveTodo = (id: string) => void;

export interface UseTodoReturn {
	allTodos: ITodo[];
	todos: ITodo[];
	completedTodos: ITodo[];
	push: IPushTodo;
	pop: IPopTodo;
	markDone: IMarkDone;
	markNotDone: IMarkNotDone;
	toggleTodo: IToggleTodo;
	remove: IRemoveTodo;
	update: IUpdateTodo;
	listName: string;
}

export const useTodo = (
	listName: string,
	todoOptions?: UseTodoOptions
): UseTodoReturn => {
	const [_todos, setTodos] = React.useState<ITodo[]>([]);

	const { item, setItem } = useTodosLocalStorage(
		`@chewhx-use-todo-${listName}`
	);

	React.useEffect(() => {
		if (todoOptions?.useLocalStorage && item.length) {
			setTodos(item);
		} else {
			setTodos(todoOptions?.initialData || []);
		}

		return () => {
			if (todoOptions?.useLocalStorage && _todos.length) {
				setItem(_todos);
			}
		};
	}, []);

	React.useEffect(() => {
		if (todoOptions?.useLocalStorage) {
			setItem(_todos);
		}
		todoOptions?.onUpdate && todoOptions?.onUpdate(_todos);
	}, [_todos]);

	/**
	 * Push todo
	 */
	const push: IPushTodo = React.useCallback((title: string): void => {
		const todo = generateTodo(title);
		setTodos((p) => [...p, todo]);
	}, []);

	/**
	 * Pop todo
	 */
	const pop: IPopTodo = React.useCallback((): void => {
		setTodos((p) => p.filter((_, i) => i !== p.length - 1));
	}, []);

	/**
	 * Mark todo as done
	 */
	const markDone: IMarkDone = React.useCallback((id: string): void => {
		setTodos((p) =>
			p.map((e) => {
				if (e.id === id) {
					return { ...e, isDone: true, updatedAt: new Date() };
				}
				return e;
			})
		);
	}, []);

	/**
	 * Mark todo as not done
	 */
	const markNotDone: IMarkNotDone = React.useCallback((id: string): void => {
		setTodos((p) =>
			p.map((e) => {
				if (e.id === id) {
					return { ...e, isDone: false, updatedAt: new Date() };
				}
				return e;
			})
		);
	}, []);

	/**
	 * Toggle todo isDone
	 */
	const toggleTodo: IToggleTodo = React.useCallback((id: string): void => {
		setTodos((p) =>
			p.map((e) => {
				if (e.id === id) {
					return { ...e, isDone: !e.isDone, updatedAt: new Date() };
				}
				return e;
			})
		);
	}, []);

	/**
	 * Remove todo by id
	 */
	const remove: IRemoveTodo = React.useCallback((id: string): void => {
		setTodos((p) => p.filter((e) => e.id !== id));
	}, []);

	/**
	 * Update todo by id
	 */
	const update: IUpdateTodo = React.useCallback(
		(id: string, title: string): void => {
			setTodos((p) =>
				p.map((e) => {
					if (e.id === id) {
						return { ...e, title, updatedAt: new Date() };
					}
					return e;
				})
			);
		},
		[]
	);

	return {
		allTodos: _todos,
		todos: _todos.filter((e) => !e.isDone),
		completedTodos: _todos.filter((e) => e.isDone),
		push,
		pop,
		markDone,
		markNotDone,
		toggleTodo,
		remove,
		update,
		listName,
	};
};
