import { useEffect } from 'react';

export const useLocalStorage = (key: string) => {
	useEffect(() => {
		const initialItem = localStorage.getItem(key) ?? '[]';
		localStorage.setItem(key, initialItem);
	}, []);

	const setItem = (item: any) =>
		localStorage.setItem(key, JSON.stringify(item));

	const _item = localStorage.getItem(key);

	return { item: _item ? JSON.parse(_item) : [], setItem };
};
