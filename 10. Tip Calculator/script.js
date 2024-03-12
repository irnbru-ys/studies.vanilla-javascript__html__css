'use strict';

const output = document.querySelector('.output');

const div1 = createElement(output, 'div', '');
addText('Total Bill = ', div1);
const totalBill = createElement(div1, 'input', '');
const div2 = createElement(output, 'div', '');
addText('Tip Percentage % ', div2);
const totalPers = createElement(div2, 'input', '');
totalBill.setAttribute('type', 'number');
totalPers.setAttribute('type', 'number');
totalPers.value = 15;
totalBill.value = 100;

const btn = createElement(output, 'button', 'Get total');
const total = createElement(output, 'div', '-')


btn.addEventListener('click', (event) => {
	let tb = totalBill.value;
	let tp = totalPers.value;
	tb = (tb < 0) ? 0 : tb;
	totalBill.value = tb;
	tp = (tp > 100 || tp < 100) ? 100 : tp;
	totalPers.value = tp;
	total.textContent = `Tip should be $${(tb * (tp / 100)).toFixed(2)}`;

});

function createElement(elementParent, elementType, elementText ) {
	const element = document.createElement(elementType);
	elementParent.append(element);
	element.innerHTML = elementText;
	return element;
}

function addText(message, elementParent) {
	const temp = document.createTextNode(message);
	elementParent.appendChild(temp);
}