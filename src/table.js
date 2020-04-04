import './styles/table.scss';
import { render } from './render';
import { renderButton } from './button';
import { popupConfirm, popupCreate, popupEdit } from './popup';
import { createUser, updateUser, removeUser, users, getUserById } from './data';
import { setState } from './state';

const appElement = document.getElementById('app');

export function createUserHandler() {
	popupCreate((data) => createUser(data));
	setState('create');
}

export function editUserHandler(id) {
	const userData = getUserById(id);
	popupEdit((data) => updateUser(id, data), userData);
	setState('edit', id);
}

export function removeUserHandler(id) {
	popupConfirm(() => removeUser(id));
	setState('remove', id);
}

function renderTableRow(data) {
	const idLabel = render('span', { class: 'overflow' }, data.id);
	const emailLabel = render('span', { class: 'overflow' }, data.email);
	const usernameLabel = render('span', { class: 'overflow' }, data.username);
	const firstNameLabel = render('span', { class: 'overflow' }, data.firstName);
	const lastNameLabel = render('span', { class: 'overflow' }, data.lastName);
	const phoneLabel = render('span', { class: 'overflow' }, data.phone);
	const removeButton = renderButton('Remove', () => removeUserHandler(data.id));
	const editButton = renderButton('Edit', () => editUserHandler(data.id));

	return render('tr', [
		render('td', { 'data-name': 'ID' }, [idLabel]),
		render('td', { 'data-name': 'Email' }, [emailLabel]),
		render('td', { 'data-name': 'Username' }, [usernameLabel]),
		render('td', { 'data-name': 'First name' }, [firstNameLabel]),
		render('td', { 'data-name': 'Last name' }, [lastNameLabel]),
		render('td', { 'data-name': 'Phone' }, [phoneLabel]),
		render('td', { 'data-name': 'Remove' }, [removeButton]),
		render('td', { 'data-name': 'Edit' }, [editButton]),
	]);
}

function renderTableHead() {
	return render('thead', [
		render('tr', [
			render('th', 'ID'),
			render('th', 'Email'),
			render('th', 'Username'),
			render('th', 'First name'),
			render('th', 'Last name'),
			render('th', 'Phone'),
			render('th', 'Remove'),
			render('th', 'Edit'),
		]),
	]);
}

function renderTableBody(data) {
	const children = data.map(rowData => renderTableRow(rowData));
	return render('tbody', children);
}

function renderTable(data) {
	return render(
		'table',
		{
			id: 'table',
			class: 'table',
		},
		[
			renderTableHead(),
			renderTableBody(data),
		],
	);
}

export function createTable() {
	if (document.getElementById('table')) {
		document.getElementById('table').remove();
	}
	const table = renderTable(users);
	appElement.appendChild(table);
}
