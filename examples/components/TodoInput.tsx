import React from 'react';
import {
	ActionIcon,
	Checkbox,
	Group,
	Menu,
	TextInput,
	TextInputProps,
} from '@mantine/core';
import { IRemoveTodo, ITodo, IUpdateTodo } from '../../src/lib/useTodo';
import { Dots } from 'tabler-icons-react';

export const TodoInput = ({
	todo,
	toggle,
	update,
	remove,
	...rest
}: {
	todo: ITodo;
	toggle?: () => void;
	update?: IUpdateTodo;
	remove?: IRemoveTodo;
} & TextInputProps) => {
	const [value, setValue] = React.useState<string>(todo?.title || '');

	React.useEffect(() => {
		setValue(todo?.title);
	}, [todo]);

	return (
		<TextInput
			{...rest}
			my="xs"
			value={value}
			onChange={(e) => {
				setValue(e.currentTarget.value);
				update && update(todo.id, e.currentTarget.value);
			}}
			disabled={todo.isDone}
			rightSectionWidth={60}
			rightSection={
				<Group spacing={5}>
					<Checkbox
						color="grape"
						checked={todo.isDone}
						onChange={() => toggle && toggle()}
					/>
					<Menu>
						<Menu.Target>
							<ActionIcon size="sm">
								<Dots />
							</ActionIcon>
						</Menu.Target>
						<Menu.Dropdown>
							<Menu.Item onClick={() => remove && remove(todo.id)}>
								Delete
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Group>
			}
		/>
	);
};
