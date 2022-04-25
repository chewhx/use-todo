import React from 'react';
import { ComponentMeta } from '@storybook/react';
import TodosProvider from './TodosProvider';
import useTodos from './useTodos';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
	title: 'Feedback/Notifications',
	component: TodosProvider,
} as ComponentMeta<typeof TodosProvider>;

const App = () => {
	const { toggleTodo, availableTodos, completedTodos, append, remove } =
		useTodos();
	const [input, setInput] = React.useState<string>('');

	const addTodo = () => {
		append(input);
		setInput('');
	};

	const inputRef = React.createRef<HTMLInputElement>();

	React.useEffect(() => {
		if (inputRef?.current) {
			inputRef.current.focus();
		}
	}, []);

	return (
		<div className="container">
			<div>
				<h1>Hello</h1>
				<input
					ref={inputRef}
					type="text"
					className="form-control"
					value={input}
					onChange={(e) => setInput(e.currentTarget.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							if (input) {
								addTodo();
							}
						}
					}}
				/>
				<button onClick={addTodo} className="btn btn-primary">
					Append
				</button>
			</div>
			<div>
				<h1>Todos</h1>
				{availableTodos.map((e) => (
					<ul className="list-group">
						<li className="list-group-item">
							<div className="row">
								<div className="col-10">
									{e.title} - {e.is_done ? 'true' : 'false'}
								</div>
								<div className="col-2">
									<button
										className="btn btn-danger"
										onClick={() => toggleTodo(e.id)}
									>
										Done
									</button>
									<button
										className="btn btn-danger"
										onClick={() => remove(e.id)}
									>
										Delete
									</button>
								</div>
							</div>
						</li>
					</ul>
				))}
			</div>
			<div>
				<h1>Completed</h1>
				{completedTodos.map((e) => (
					<ul className="list-group">
						<li className="list-group-item">
							<div className="row">
								<div className="col-10">
									{e.title} - {e.is_done ? 'true' : 'false'}
								</div>
								<div className="col-2">
									<button
										className="btn btn-danger"
										onClick={() => toggleTodo(e.id)}
									>
										Done
									</button>
									<button
										className="btn btn-danger"
										onClick={() => remove(e.id)}
									>
										Delete
									</button>
								</div>
							</div>
						</li>
					</ul>
				))}
			</div>
		</div>
	);
};

export const Todos = () => (
	<TodosProvider>
		<App />
	</TodosProvider>
);
