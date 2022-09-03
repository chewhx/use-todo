import {
	ActionIcon,
	Box,
	MantineProvider,
	Space,
	TextInput,
	Title,
} from '@mantine/core';
import React from 'react';
import { PlaylistAdd } from 'tabler-icons-react';
import { useTodo } from '../src';
import { TodoInput } from './components/TodoInput';
import initialData from '../_data/todos';

export default {
	title: 'Example',
};

export const Example = () => {
	const {
		allTodos: todos,
		toggleTodo,
		listName,
		completedTodos,
		push,
		update,
		remove,
	} = useTodo('today', {
		initialData,
	});

	const [input, setInput] = React.useState<string>('');
	const ref = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		if (ref?.current) {
			ref?.current?.focus();
		}
	}, []);

	return (
		<MantineProvider withGlobalStyles withNormalizeCSS>
			<Box sx={{ width: '350px' }}>
				<Title>{listName}</Title>
				<TextInput
					ref={ref}
					value={input}
					onChange={(e) => setInput(e.currentTarget.value)}
					color="grape"
					placeholder="Add a new task"
					rightSection={
						<>
							<ActionIcon
								color="blue"
								variant="filled"
								size="sm"
								disabled={!input || !input.length}
								onClick={() => {
									push(input);
									setInput('');
								}}
							>
								<PlaylistAdd />
							</ActionIcon>
						</>
					}
				/>
				{todos.map((todo) => (
					<TodoInput
						sx={{
							margin: '0.5rem 0',
						}}
						disabled={todo.isDone}
						key={todo.id}
						todo={todo}
						toggle={() => toggleTodo(todo.id)}
						update={update}
						remove={remove}
					/>
				))}
				{/* <pre>{JSON.stringify(todos, null, 2)}</pre> */}
			</Box>
			<Space h="xl" />
			<Box sx={{ width: '350px' }}>
				{!!completedTodos.length && <Title color="dimmed">completed</Title>}
				{completedTodos.map((todo) => (
					<TodoInput
						sx={{
							margin: '0.5rem 0',
						}}
						disabled={todo.isDone}
						key={todo.id}
						todo={todo}
						toggle={() => toggleTodo(todo.id)}
						update={update}
						remove={remove}
					/>
				))}
			</Box>
		</MantineProvider>
	);
};
