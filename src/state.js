import { createUserHandler, editUserHandler, removeUserHandler } from './table';

export function stateRestore() {
	if (location.hash) {
		const hash = location.hash;
		const hashValue = hash.split('=')[1];
		const id = hashValue ? Number(hashValue) : null;
		if (hash.includes('create')) {
			createUserHandler();
		} else if (hash.includes('edit') && id) {
			editUserHandler(id);
		} else if (hash.includes('remove') && id) {
			removeUserHandler(id);
		}
	}
}

export function setState(state, value = null) {
	let url = `/#${state}`;
	if (value) {
		url += `=${value}`;
	}
	location.replace(url);
}
