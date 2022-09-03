import React from 'react';
import { Box, Button, Grid, Group, Space, Title } from '@mantine/core';
import { useTodo } from '../../src';
import movies from '../../_data/movies';
import { TodoInput } from './TodoInput';
import { Prism } from '@mantine/prism';
import { ITodo } from '../../src/lib/useTodo';

export const MarkNotDone = () => {
	const {
		markNotDone,
		allTodos: todos,
		completedTodos,
		todos: availableTodos,
		listName,
	} = useTodo('markNotDone', {
		initialData: movies.slice(0, 7).map((e) => ({ ...e, isDone: true })),
	});

	const [title, setTitle] = React.useState<ITodo>();

	React.useEffect(() => {
		if (completedTodos.length) {
			setTitle(completedTodos[0]);
		}
	}, [todos]);

	const buttonHandler = () => {
		const todoToMark = todos.find((e) => e.isDone);
		if (todoToMark) {
			markNotDone(todoToMark.id);
		}
	};

	const codeDemoBlock = React.useMemo(
		() =>
			`const { markNotDone } = useTodo("markNotDone");\n\nmarkNotDone("${
				title?.id
			}");\n// Mark todo as not done\n\n/**\n${JSON.stringify(
				title,
				null,
				2
			)}\n*/`,
		[title]
	);

	return (
		<Grid align="flex-start">
			<Grid.Col sm={4} p="sm">
				<Button onClick={buttonHandler} disabled={completedTodos.length === 0}>
					Mark Not Done
				</Button>
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
