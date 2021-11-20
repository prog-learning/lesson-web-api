const express = require('express');
const cors = require('cors');
const app = express();

/* 通信の設定 */
// corsを使わない場合
// app.use(function (req, res, next) {
//   /* headerの設定 */
//   res.set({
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Headers': 'Content-Type',
//     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
//   });

//   /* intercept OPTIONS method */
//   if ('OPTIONS' === req.method) {
//     res.send(200);
//   } else {
//     next();
//   }
// });

// corsを使う場合
app.use(cors());

/* bodyのデータをちゃんとしてくれる設定 */
app.use(express.urlencoded());
app.use(express.json());

/* TODOのデータを仮にオブジェクトで作成 */
const todoData = [
  { id: 0, done: true, text: 'お餅を食べる' },
  { id: 1, done: false, text: 'お茶を飲む' },
  { id: 2, done: false, text: 'お菓子を食べる' },
];

/* エンドポイントごとに処理が書ける */
app.get('/', (req, res) => {
  res.send('Hello World!');
});

/* TODOリストを取得 */
app.get('/todos', (req, res) => {
  /* todoDataをJSONで送信 */
  res.json(todoData);
});

/* TODOの追加 */
app.post('/todos', (req, res) => {
  /* bodyにデータが送られている */
  const bodyText = req.body?.text;
  console.log('got data: ', bodyText);
  if (!bodyText) {
    res.status(400).json({
      status: 400,
      message: 'テキストがありません！',
    });
    return;
  }

  /* 受け取ってきたbodyを取得して新しいオブジェクトを作成 */
  const newTodo = { id: null, done: false, text: req.body.text };

  /* TODOのIDを設定 */
  const ids = todoData.map((todo) => todo.id); // 今あるIDを配列に
  if (ids.length !== 0) {
    const maxId = Math.max(...ids); // その中から最大の数を取得
    newTodo.id = maxId + 1; // 最大のIDに1を足したものをIDに
  } else {
    /* todoDataがない場合 */
    newTodo.id = 0;
  }

  /* TODOを追加 */
  todoData.push(newTodo);

  /* clientに正常に処理が行われたことを知らせる */
  res.status(200).end();
});

/* 指定したTODOの削除 */
app.delete('/todos/:id', (req, res) => {
  console.log(req.params.id);
  const deleteId = Number(req.params.id);

  /* 該当するidのtodoを削除 */
  const index = todoData.findIndex((todo) => todo.id === deleteId);
  todoData.splice(index, 1);
  res.status(200).end();
});

/* 指定したTODOのdoneを切り替える */
app.put('/todos/:id', (req, res) => {
  console.log(req.params.id);
  const changeId = Number(req.params.id);

  /* 該当するidのtodoのdoneを切り替える */
  const index = todoData.findIndex((todo) => todo.id === changeId);
  todoData[index].done = !todoData[index].done;
  res.status(200).end();
});

app.listen(3000, () => {
  console.log('http://localhost:3000 でサーバーを起動！');
});
