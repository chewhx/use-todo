import React from 'react';
import { Box, Button, Grid, Group, TextInput, Title } from '@mantine/core';
import { useTodo } from '../../src';
import movies from '../../_data/movies';
import { TodoInput } from './TodoInput';
import { Prism } from '@mantine/prism';
import { randomTitle } from 'random-movies';

export const Update = () => {
	const {
		update,
		allTodos: todos,
		listName,
	} = useTodo('update', {
		initialData: movies.slice(0, 1),
	});

	const [input, setInput] = React.useState<string>(
		'Type something here to update'
	);

	const buttonHandler = () => {
		update(todos[0].id, input);
	};

	const demoCodeBlock = `const { update } = useTodo("update");\n\nupdate("${todos[0]?.id}", "${input}");\n// Update a todo by id`;

	return (
		<Grid align="flex-start">
			<Grid.Col sm={4} p="sm">
				<Button onClick={buttonHandler}>Update</Button>
				<TextInput
					size="xs"
					my="sm"
					value={input}
					onChange={(e) => setInput(e.currentTarget.value)}
				/>
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
