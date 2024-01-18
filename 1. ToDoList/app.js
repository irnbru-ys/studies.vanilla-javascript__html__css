'use strict';

(() => {
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
	li.setAttribute('data-id', id);
	li.innerHTML = `<span>${title} <br >by <b>${getUserName(userId)}</b></span>`;

	const status = document.createElement('input');
	status.type = 'checkbox';
	status.checked = completed;
	status.addEventListener('change', handleTodoChange);

	const close = document.createElement('span');
	close.innerHTML = '&times;';
	close.classList.add('close');
	close.addEventListener('click', handleClose);

	li.prepend(status);
	li.append(close);

	todoList.prepend(li);
}

function removeTodo(todoId) {
	
	todos = todos.filter(todo => todo.id !== todoId);
	
	const todo = todoList.querySelector(`[data-id="${todoId}"]`);
	todo.querySelector('input').removeEventListener('change', handleTodoChange);  
	todo.querySelector('.close').removeEventListener('click', handleClose);  

	todo.remove();
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
	const todoId = this.parentElement.getAttribute('data-id');
	const complete = this.checked;

	toggleTodoComplete(todoId, complete);
}

 function handleClose() {
	const todoId = this.parentElement.getAttribute('data-id');

	deleteTodo(todoId);
 }

// Async logic

async function getAllTodos() {
	try {
		const responce = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=15');

		if (!responce.ok) {
			throw new Error('Failed to connect with the server! Please try later')
		}
		const data = responce.json();
	
		return data;
	} catch (error) {
		console.error(error.stack)
	}
}

async function getAllUsers() {
	try {
		const responce = await fetch('https://jsonplaceholder.typicode.com/users');

		if (!responce.ok) {
			throw new Error('Failed to connect with the server! Please try later');
		}
		const data = responce.json();
	
		return data;
		
	} catch (error) {
		console.error(error.stack);
	}
} 

async function createTodo(todo) {
	try {
		const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
			method: 'POST',
			body: JSON.stringify(todo),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error('Failed to connect with the server! Please try later');
		}
	
		const todoId = await response.json();
	
		printTodo(todoId);
		
	} catch (error) {
		console.error(error.stack)
	}
}

async function toggleTodoComplete(todoId, completed) {
	try {
		const responce = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
			method: 'PATCH',
			body: JSON.stringify({completed}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!responce.ok) {
			throw new Error('Failed to connect with the server! Please try later');
		}
		
	} catch (error) {
		console.error(error.stack)
	}

}

async function deleteTodo(todoId) {
	try {
		const responce = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	
		if (responce.ok) {
			removeTodo(todoId);
		} else {
			throw new Error('Failed to connect with the server! Please try later');
		}
		
	} catch (error) {
		console.error(error.stack)
	}
}
})();