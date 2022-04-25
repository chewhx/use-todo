import React from 'react';
import useTodos from './useTodos';
import { Todo } from './TodosProvider';

type Props = {
	children: (availableTodos: Todo[]) => JSX.Element;
};

const Todos: React.FC<Props> = ({ children }) => {
	const { availableTodos } = useTodos();
	return (
		<div>
			{typeof children === 'function' ? children(availableTodos) : children}
		</div>
	);
};

export default Todos;
