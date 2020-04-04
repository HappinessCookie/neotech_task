import './styles/main.scss';
import { createTable } from './table';
import { loadUsers } from './data';
import { createToolbar } from './toolbar';
import { stateRestore } from './state';

async function initApp() {
	createToolbar();
	await loadUsers();
	stateRestore();
	createTable();
}

initApp();
