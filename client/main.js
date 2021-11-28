// console.log('Hello World!');

/* TODOのデータを取得する */
const getTodoList = async () => {
  const response = await fetch('http://localhost:3000/todos', {
    method: 'GET',
  });
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
    todoElement.querySelector('button').addEventListener('click', () => {
      deleteTodo(todo.id);
    });
    todoElement.querySelector('input').addEventListener('click', () => {
      toggleTodo(todo.id, todo.done);
    });
    todoList.appendChild(todoElement);
  });
};

/* TODOのデータを新規追加する */
const addTodo = async () => {
  const text = document.getElementById('todo_text').value;
  try {
    console.log(text);
    // if (!text) throw new Error('text is empty'); // client-side validation

    const response = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    /* エラーかどうかを判定する */
    if (response.status !== 200) {
      const json = await response.json();
      throw new Error(json.message);
    }

    /* 画面を更新する */
    await getTodoList();

    /* inputのテキストを空にする */
    document.getElementById('todo_text').value = '';
  } catch (error) {
    console.error(error);
  }
};

/* 指定したTODOを削除する */

const deleteTodo = async (todoId) => {
  await fetch(`http://localhost:3000/todos/${todoId}`, {
    method: 'DELETE',
  });

  /* 画面を更新する */
  await getTodoList();
};

/* 指定したTODOのdoneを切り替える */
const toggleTodo = async (todoId) => {
  await fetch(`http://localhost:3000/todos/${todoId}`, {
    method: 'PUT',
  });

  /* 画面を更新する */
  await getTodoList();
};
