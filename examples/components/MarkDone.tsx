import { Button, Grid, Space, Title } from '@mantine/core';
import { Prism } from '@mantine/prism';
import React from 'react';
import { useTodo } from '../../src';
import { ITodo } from '../../src/lib/useTodo';
import movies from '../../_data/movies';
import { TodoInput } from './TodoInput';

export const MarkDone = () => {
	const {
		markDone,
		allTodos: todos,
		todos: availableTodos,
		listName,
	} = useTodo('markDone', {
		initialData: movies.slice(0, 7),
	});

	const [title, setTitle] = React.useState<ITodo>();

	React.useEffect(() => {
		if (availableTodos.length) {
			setTitle(availableTodos[0]);
		}
	}, [todos]);

	const buttonHandler = () => {
		const todoToMark = todos.find((e) => !e.isDone);
		if (todoToMark) {
			markDone(todoToMark.id);
		}
	};

	const codeDemoBlock = React.useMemo(
		() =>
			`const { markDone } = useTodo("markDone");\n\nmarkDone("${title}");\n// Mark as done id: ${
				title?.id
			}:\n\n/**\n${JSON.stringify(title, null, 2)}\n*/`,
		[title]
	);

	return (
		<Grid align="flex-start">
			<Grid.Col sm={4} p="sm">
				<Button onClick={buttonHandler} disabled={availableTodos.length === 0}>
					Mark Done
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
