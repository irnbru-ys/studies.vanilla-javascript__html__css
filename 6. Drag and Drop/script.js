'use strict';

const dragMe = document.querySelector('#dragger');
const output = document.querySelector('.output');

dragMe.addEventListener('dragsrart', (event) => {
	dragMe.style.opacity = 0.2;
});

dragMe.addEventListener('dragend', (event) => {
	dragMe.style.opacity = '';
});

output.addEventListener('dragenter', (event) => {
	if (event.target.classList.contains('box')) {
		event.target.classList.add('red');
	}
});

output.addEventListener('dragleave', (event) => {
	if (event.target.classList.contains('box')) {
		event.target.classList.remove('red');
	}
});

output.addEventListener('dragover', (event) => {
	if (event.target.classList.contains('box')) {
		event.preventDefault();
	}
});

output.addEventListener('drop', (event) => {
	event.preventDefault();
	if (event.target.classList.contains('box')) {
		event.target.append(dragMe);
	}
});

