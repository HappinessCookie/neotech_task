import axios from 'axios';
import { createTable } from './table';

const API_URL = '//localhost:3000/';

axios.defaults.baseURL = API_URL;

export const users = [];

export function getUserById(id) {
	return users.find(user => user.id === id);
}

export async function loadUsers() {
	try {
		const response = await axios.get('/user');
		if (response.status === 200) {
			users.push(...response.data);
		}
		return response.data;
	} catch (err) {
		console.warn(err);
	}
}

export async function createUser(payload) {
	try {
		const response = await axios.post('/user', payload);
		if (response.status === 201) {
			users.push(response.data);
		}
	} catch (err) {
		console.warn(err);
	}

	createTable();
}

export async function updateUser(id, payload) {
	try {
		const response = await axios.patch(`/user/${id}`, payload);
		if (response.status === 200) {
			const index = users.findIndex(user => user.id === response.data.id);
			users.splice(index, 1, response.data);
		}
	} catch (err) {
		console.warn(err);
	}

	createTable();
}

export async function removeUser(id) {
	try {
		const response = await axios.delete(`/user/${id}`);
		if (response.status === 200) {
			const index = users.findIndex(user => user.id === id);
			users.splice(index, 1);
		}
	} catch (err) {
		console.warn(err);
	}

	createTable();
}
