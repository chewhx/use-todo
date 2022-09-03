import { Button, Grid, TextInput, Space, Title } from '@mantine/core';
import { Prism } from '@mantine/prism';
import React from 'react';
import { useTodo } from '../../src';
import movies from '../../_data/movies';
import { TodoInput } from './TodoInput';

export const Pop = () => {
	const { pop, todos, listName } = useTodo('pop', {
		initialData: movies.slice(0, 7),
	});

	const [title, setTitle] = React.useState<string>();

	React.useEffect(() => {
		if (todos.length) {
			setTitle(todos[todos.length - 1].title);
		}
	}, [todos]);

	const buttonHandler = () => {
		pop();
	};

	const codeDemoBlock = React.useMemo(
		() =>
			`const { pop } = useTodo("pop");\n\npop("${title}");\n// Removes the last todo`,
		[title]
	);

	return (
		<Grid align="flex-start">
			<Grid.Col sm={4} p="sm">
				<Button onClick={buttonHandler} disabled={todos.length === 0}>
					Pop
				</Button>
				<Space h="sm" />
				<Prism language="jsx">{codeDemoBlock}</Prism>
			</Grid.Col>
			<Grid.Col sm={4} sx={{ overflow: 'scroll', maxHeight: '100vh' }}>
				<Title>{listName}</Title>
				{todos.map((todo) => (
					<TodoInput key={todo.id} todo={todo} />
				))}
			</Grid.Col>
		</Grid>
	);
};
