// console.log('Hello World!');

const getTodoList = async () => {
  const response = await fetch('http://localhost:3000/todos');
  const todos = await response.json();
  console.log(todos);

  const todoList = document.getElementById('todo_list');
  todoList.innerHTML = ''; // clear the list

  todos.forEach((todo) => {
    const todoElement = document.createElement('li');
    todoElement.innerHTML = `
      <input type="checkbox" ${todo.done ? 'checked' : ''}>
      <span>${todo.text}</span>
      <button>delete</button>
    `;
    todoList.appendChild(todoElement);
  });
};
