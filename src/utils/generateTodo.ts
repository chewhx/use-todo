import { nanoid } from 'nanoid';

export const generateTodo = (title: string) => ({
	id: nanoid(16),
	title,
	isDone: false,
	createdAt: new Date(),
	updatedAt: new Date(),
});
