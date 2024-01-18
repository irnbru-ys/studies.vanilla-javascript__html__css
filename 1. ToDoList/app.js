'use strict';

// Globals

const todoList = document.querySelector('#todo-list');
let todos = [];
let users = [];

// Attach Events

document.addEventListener('DOMContentLoaded', initApp);

// Basic Logic

function getUserName(userId) {
	const user = users.find(user => user.id === userId);

	return user.name;
}

function printTodo({id, userId, title, completed}) {
	const li = document.createElement('li');
	li.classList.add('todo-item');
	li.setAttribute('id', id);
	li.innerHTML = `<span>${title} by <b>${getUserName(userId)}</b></span>`;

	const status = document.createElement('input');
	status.type = 'checkbox';
	status.checked = completed;

	const close = document.createElement('span');
	close.innerHTML = '&times;';
	close.classList.add('close');

	li.prepend(status);
	li.append(close);

	todoList.prepend(li);
}

// Event Logic

function initApp() {
	Promise.all([getAllTodos(), getAllUsers()])
		.then(values => {
			[todos, users] = values;

	// Отправить в разметку
	todos.forEach(todo => printTodo(todo))
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