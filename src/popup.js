import './styles/popup.scss';
import { render } from './render';
import { renderButton } from './button';
import { renderInput } from './input';

const appElement = document.getElementById('app');

export function closePopup() {
	const popup = document.getElementById('popup');
	popup.addEventListener('animationend', popup.remove, { once: true });
	popup.classList.add('popup__backdrop--closing-progress');
	document.body.classList.remove('scroll-disabled');
	history.replaceState({}, 'createUser', '/');
}

export function renderPopup(title, children = []) {
	const popup = render('div', { class: 'popup' }, [
		render('div', { class: 'popup__header' }, [
			render('div', { class: 'popup__title' }, title),
			renderButton('X', () => closePopup(), { class: 'popup__close' }),
		]),
		render('div', { class: 'popup__body' }, children),
	]);
	const popupBackdrop = render(
		'div',
		{
			class: 'popup__backdrop',
			id: 'popup',
		},
		[popup],
	);
	popup.addEventListener('click', (event) => event.stopPropagation());
	popupBackdrop.addEventListener('click', closePopup, { once: true });
	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape') {
			closePopup();
		}
	}, { once: true });
	document.body.classList.add('scroll-disabled');
	appElement.appendChild(popupBackdrop);
}

export function popupConfirm(successCallback) {
	renderPopup('Remove user?', [
		render('div', [
			renderButton('Yes', () => {
				successCallback();
				closePopup();
			}, { class: 'button button--danger' }),
			renderButton('No', () => closePopup()),
		]),
	]);
}

export function popupCreate(successCallback) {
	renderPopup('Create form', [
		renderUserForm(successCallback),
	]);
}

export function popupEdit(successCallback, userData) {
	renderPopup('Edit form', [
		renderUserForm(successCallback, userData),
	]);
}

function renderUserForm(submitHandler, userData = {}) {
	const emailInput = renderInput('email', 'Email', userData.email);
	const usernameInput = renderInput('username', 'Username', userData.username);
	const firstNameInput = renderInput('firstName', 'First name', userData.firstName);
	const lastNameInput = renderInput('lastName', 'Last name', userData.lastName);
	const phoneInput = renderInput('phone', 'Phone', userData.phone);

	const form = render('form', { class: 'form' }, [
		emailInput,
		usernameInput,
		firstNameInput,
		lastNameInput,
		phoneInput,
		renderButton(
			'Save',
			() => ({}),
			{
				type: 'submit',
				class: 'button button--success',
			},
		),
	]);

	if (submitHandler) {
		form.addEventListener('submit', (event) => {
			event.preventDefault();
			const email = emailInput.control.value;
			const username = usernameInput.control.value;
			const firstName = firstNameInput.control.value;
			const lastName = lastNameInput.control.value;
			const phone = phoneInput.control.value;
			submitHandler({
				email,
				username,
				firstName,
				lastName,
				phone,
			});
			closePopup();
		});
	}

	return form;
}






