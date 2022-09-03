import React from 'react';
import { Box, Button, Grid, Group, Space, Title } from '@mantine/core';
import { useTodo } from '../../src';
import movies from '../../_data/movies';
import { TodoInput } from './TodoInput';
import { Prism } from '@mantine/prism';
import { ITodo } from '../../src/lib/useTodo';

export const ToggleTodo = () => {
	const {
		toggleTodo,
		allTodos: todos,
		listName,
	} = useTodo('toggleTodo', {
		initialData: movies.slice(0, 1),
	});

	const buttonHandler = () => {
		toggleTodo(todos[0].id);
	};

	const codeDemoBlock = React.useMemo(
		() =>
			`const { toggleTodo } = useTodo("toggleTodo");\n\ntoggleTodo("${todos[0]?.id}");\n// Toggle state of todo`,
		[todos]
	);

	return (
		<Grid align="flex-start">
			<Grid.Col sm={4} p="sm">
				<Button onClick={buttonHandler}>Toggle Todo</Button>
				<Space h="sm" />
				<Prism language="jsx">{codeDemoBlock}</Prism>
			</Grid.Col>
			<Grid.Col sm={4} p="sm">
				<Title>{listName}</Title>
				{todos.map((todo) => (
					<TodoInput key={todo.id} todo={todo} />
				))}
			</Grid.Col>
		</Grid>
	);
};
