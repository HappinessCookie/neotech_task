import './styles/button.scss';
import { render } from './render';

export function renderButton(text, handler, attrs = { class: 'button' }) {
	const button = render('button', attrs, text);
	if (handler) {
		button.addEventListener('click', handler);
	}
	return button;
}
