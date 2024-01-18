'use strict';

// Globals

const todoList = document.querySelector('#todo-list');
const userSelect = document.querySelector('#user-todo');
const form = document.querySelector('form');
let todos = [];
let users = [];

// Attach Events

document.addEventListener('DOMContentLoaded', initApp);
form.addEventListener('submit', handleSubmit);

// Basic Logic

function getUserName(userId) {
	const user = users.find(user => user.id === userId);

	return user.name;
}

function createUserOption(user) {
	const option = document.createElement('option');
	option.value = user.id;
	option.innerText = user.name;

	userSelect.append(option);
}

function printTodo({id, userId, title, completed}) {
	const li = document.createElement('li');
	li.classList.add('todo-item');
	li.setAttribute('id', id);
	li.innerHTML = `<span>${title} <br >by <b>${getUserName(userId)}</b></span>`;

	const status = document.createElement('input');
	status.type = 'checkbox';
	status.checked = completed;
	status.addEventListener('change', handleTodoChange);

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
	users.forEach(user => createUserOption(user));
})
}

function handleSubmit(event) {
	event.preventDefault();
	createTodo({
		userId: Number(form.user.value),
		title: form.todo.value,
		completed: false,
	})
}

function handleTodoChange() {
	const todoId = this.parentElement.getAttribute('id');
	const complete = this.checked;

	toggleTodoComplete(todoId, complete);
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

async function createTodo(todo) {
	const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
		method: 'POST',
		body: JSON.stringify(todo),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const todoId = await response.json();

	printTodo(todoId);
}

async function toggleTodoComplete(todoId, completed) {
	const responce = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
		method: 'PATCH',
		body: JSON.stringify({completed}),
		headers: {
			'Content-Type': 'application/json',
		},
	})

}