import React from 'react';
import { Push } from './components/Push';
import { MarkDone } from './components/MarkDone';
import { MarkNotDone } from './components/MarkNotDone';
import { Pop } from './components/Pop';
import { Remove } from './components/Remove';
import { ToggleTodo } from './components/ToggleTodo';
import { Update } from './components/Update';

export default {
	title: 'Features',
};

export const _Push = () => <Push />;
export const _Pop = () => <Pop />;
export const _MarkDone = () => <MarkDone />;
export const _MarkNotDone = () => <MarkNotDone />;
export const _ToggleTodo = () => <ToggleTodo />;
export const _Remove = () => <Remove />;
export const _Update = () => <Update />;
