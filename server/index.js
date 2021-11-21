const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

const todoData = [
  { id: 0, text: 'Buy milk', done: false },
  { id: 1, text: 'Buy eggs', done: false },
  { id: 2, text: 'Buy bread', done: false },
  { id: 3, text: 'Buy cheese', done: false },
];

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Express');
});

app.get('/todos', (req, res) => {
  res.json(todoData);
});

app.post('/todos', (req, res) => {
  const currentIds = todoData.map((todo) => todo.id);
  let newId = Math.max(...currentIds) + 1;
  if (currentIds.length === 0) {
    newId = 0;
  }
  const newTodo = {
    id: newId,
    text: req.body.text,
    done: false,
  };
  todoData.push(newTodo);
  console.log(todoData);
  res.end();
});

/* サーバーを起動する */
app.listen(port, () => {
  console.log(`http://localhost:${port} でサーバーを起動しました！`);
});
