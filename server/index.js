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

app.get('/', (req, res) => {
  res.send('Hello Express');
});

app.get('/todos', (req, res) => {
  res.json(todoData);
});

/* サーバーを起動する */
app.listen(port, () => {
  console.log(`http://localhost:${port} でサーバーを起動しました！`);
});
