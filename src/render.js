export function render(tag, attrs = {}, children = []) {
	if (Array.isArray(attrs) || typeof attrs === 'string') {
		children = attrs;
	}
	return _render(tag, attrs, children);
}

function _render(tag, attrs = {}, children = []) {
	const element = document.createElement(tag);
	if (!Array.isArray(attrs) && typeof attrs === 'object') {
		Object.entries(attrs).forEach(([attribute, value]) => {
			element.setAttribute(attribute, value);
		});
	}

	if (Array.isArray(children)) {
		children.forEach(child => element.appendChild(child));
	} else {
		element.innerText = String(children);
	}

	return element;
}
