import './styles/toolbar.scss';
import { render } from './render';
import { renderButton } from './button';
import { createUserHandler } from './table';

const appElement = document.getElementById('app');

function renderToolbar() {
	return render(
		'div',
		{ class: 'toolbar' },
		[renderButton('Create user', createUserHandler, { class: 'button button--success' })],
	);
}

export function createToolbar() {
	const toolbar = renderToolbar();
	appElement.appendChild(toolbar);
}
