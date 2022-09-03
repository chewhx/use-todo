# @chewhx/use-todo

React hook for creating and managing todo state.

[Demo](https://chewhx.github.io/use-todo/)

## Install

```bash
npm install @chewhx/use-todo
```

## Import

```jsx
import { useTodo } from '@chewhx/use-todo';
```

# useTodo

```jsx
const {
	allTodos,
	todos,
	completedTodos,
	push,
	pop,
	markDone,
	markNotDone,
	toggleTodo,
	remove,
	update,
	listName,
} = useTodo(listName, {
	initialData?,
	onUpdate?,
	useLocalStorage?,
});
```

### Options

- `listName: string`

  - **Required**
  - A unique key to identify state
  - Ensure that each todo hook has a unique key or it will cause errors with local storage

- `initialData: ITodo[]`

  - Optional
  - An array of data to initialize the todo state

- `onUpdate: (ITodo[]) => void`

  - Optional
  - A function which will be executed on every state update
  - Receives the full array of todos as param

- `useLocalStorage: boolean`
  - Optional
  - To store the todo state on local storage for persistence
  - **Data from local storage will take precedence over `initialData`**

### Returns

- `allTodos: ITodo[]`

  - Array of all todos

- `todos: ITodo[]`

  - Array of all todos which are not done

- `completedTodos: ITodo[]`

  - Array of all todos which are done

- `push: IPushTodo = (title: string) => void`

  - Appends a new todo

- `pop: IPopTodo = () => void`

  - Removes the last added todo

- `markDone: IMarkDone = (id: string) => void`

  - Mark a todo as done

- `markNotDone: IMarkNotDone = (id: string) => void`

  - Mark a todo as not done

- `toggleTodo: IToggleTodo = (id: string) => void`

  - Toggle the done status of todo

- `update: IUpdateTodo = (id: string, title: string) => void;`

  - Update the title of todo

- `remove: IRemoveTodo = (id: string) => void`

  - Remove a specific todo
