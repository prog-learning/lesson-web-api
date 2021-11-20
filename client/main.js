/* 最新のデータを受け取ってHTMLに反映させる処理 */
const getTodoList = async () => {
  const response = await fetch('http://localhost:3000/todos');
  const data = await response.json();
  console.log('取得したデータ: ', data);

  /* DOMを挿入する場所を決める */
  const todoList = document.getElementById('todo_list');
  todoList.innerHTML = ''; // 前のデータを削除

  data.forEach((todo) => {
    /* li 要素を作成 */
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" ${todo.done ? 'checked' : ''}>
      <span>${todo.text}</span>
      <button>delete</button>
    `;
    /* チェックボックスの追加 */
    const checkbox = li.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('click', () => {
      /* チェックボックスがクリックされたら、データを更新する */
      toggleDone(todo.id);
    });

    /* delete ボタンの追加 */
    const deleteButton = li.querySelector('button');
    deleteButton.addEventListener('click', () => {
      deleteTodo(todo.id);
    });
    li.appendChild(deleteButton);
    /* これらの処理を終えたliをtodo_listに追加 */
    todoList.appendChild(li);
  });
};

/* データを追加する処理 */
const postTodo = async () => {
  try {
    /* inputの中身を取得 */
    const text = document.getElementById('todo_text').value;
    console.log(text);
    /* 送信する処理 */
    const response = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        /* JSONを送ることを送信先に伝える */
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    const status = response.json();
    console.log(status);

    /* 追加が成功したら,最新のデータを取得して表示する */
    await getTodoList();
    /* inputを空にする */
    document.getElementById('todo_text').value = '';
  } catch (error) {
    console.log('error');
    console.error(error);
    console.error(response);
  }
};

/* 指定したデータを削除する */
const deleteTodo = async (id) => {
  await fetch(`http://localhost:3000/todos/${id}`, {
    method: 'DELETE',
  });
  /* 削除が成功したら,最新のデータを取得して表示する */
  await getTodoList();
};

/* 指定したデータのdoneを切り替える */
const toggleDone = async (id) => {
  await fetch(`http://localhost:3000/todos/${id}`, {
    method: 'PUT',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    // body: JSON.stringify({ done: true }),
  });

  /* 削除が成功したら,最新のデータを取得して表示する */
  await getTodoList();
};

const isError = (response) => {
  if (!response.ok) {
    alert('エラーが発生しました');
    console.error('status: ', response.status);
    console.error('message: ', response.statusText);
  }
};
