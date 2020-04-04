import './styles/input.scss';
import { render } from './render';

export function renderInput(name, label = '', value = '') {
	return render('label', { class: 'label' }, [
		render('span', label || name),
		render('input',
			{
				value,
				class: 'input',
			},
		),
	]);
}
