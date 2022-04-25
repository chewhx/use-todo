import React from 'react';
import { TodosContext } from './TodosProvider';

const useTodos = () => React.useContext(TodosContext);

export default useTodos;
