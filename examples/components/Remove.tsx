import { Button, Grid, Title } from '@mantine/core';
import { Prism } from '@mantine/prism';
import React from 'react';
import { useTodo } from '../../src';
import { ITodo } from '../../src/lib/useTodo';
import movies from '../../_data/movies';
import { TodoInput } from './TodoInput';

export const Remove = () => {
	const {
		remove,
		allTodos: todos,
		todos: availableTodos,
		listName,
	} = useTodo('remove', {
		initialData: movies.slice(0, 7),
	});

	const [toRemove, setToRemove] = React.useState<ITodo>();

	React.useEffect(() => {
		if (availableTodos.length) {
			setToRemove(availableTodos[0]);
		}
	}, [availableTodos]);

	const buttonHandler = () => {
		const todoToMark = todos.find((e) => !e.isDone);
		if (todoToMark) {
			remove(todoToMark.id);
		}
	};

	const demoCodeBlock = `const { remove } = useTodo("remove");\n\nremove("${
		toRemove?.id
	}");\n// Remove a todo by id\n\n/**\n${JSON.stringify(
		toRemove,
		null,
		2
	)}\n*/`;

	return (
		<Grid align="flex-start">
			<Grid.Col sm={4} p="sm">
				<Button onClick={buttonHandler} disabled={todos.length === 0}>
					Remove
				</Button>
				<Prism language="jsx">{demoCodeBlock}</Prism>
			</Grid.Col>
			<Grid.Col sm={4} p="sm">
				<Title>{listName}</Title>
				{todos.map((todo) => (
					<TodoInput todo={todo} key={todo.id} />
				))}
			</Grid.Col>
		</Grid>
	);
};
