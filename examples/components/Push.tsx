import React from 'react';
import {
	Box,
	Button,
	Grid,
	Group,
	Space,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import { randomTitle } from 'random-movies';
import { useTodo } from '../../src';
import movies from '../../_data/movies';
import { TodoInput } from './TodoInput';
import { Prism } from '@mantine/prism';

export default {
	title: 'push',
};

export const Push = () => {
	const { push, todos, listName } = useTodo('push', {
		initialData: movies.slice(0, 3),
	});

	const [title, setTitle] = React.useState<string>(randomTitle() as string);

	const buttonHandler = () => {
		setTitle((p) => {
			push(p);
			return randomTitle() as string;
		});
	};

	const codeDemoBlock = React.useMemo(
		() =>
			`const { push } = useTodo("push");\n\npush("${title}");\n// Appends a new todo`,
		[title]
	);

	return (
		<Grid align="flex-start">
			<Grid.Col sm={4} p="sm">
				<Button onClick={buttonHandler}>Push</Button>
				<Space h="sm" />
				<TextInput
					value={title}
					onChange={(e) => setTitle(e.currentTarget.value)}
				/>
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
