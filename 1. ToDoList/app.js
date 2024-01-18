'use strict';

// Globals

let todos = [];
let users = [];

// Attach Events

document.addEventListener('DOMContentLoaded', initApp);

// Event Logic

function initApp() {
	Promise.all([getAllTodos(), getAllUsers()])
		.then(values => {
			[todos, users] = values;

	// Отправить в разметку
})
}
// Async logic

async function getAllTodos() {
	const responce = await fetch('https://jsonplaceholder.typicode.com/todos');
	const data = responce.json();

	return data;
}

async function getAllUsers() {
	const responce = await fetch('https://jsonplaceholder.typicode.com/users');
	const data = responce.json();

	return data;
}