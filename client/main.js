// console.log('Hello World!');

/* データを受け取ってコンソールに出力する処理 */
const getHello = async () => {
  const response = await fetch('http://localhost:8000/');
  const data = await response.text();
  console.log(data);
};
getHello();

/* データを受け取って表示させる処理 */
const getUser = async () => {
  const response = await fetch('http://localhost:8000/user');
  const data = await response.json();
  console.log(data);
  document.getElementById('root').innerHTML = `<p>私は${data.name}です。</p>`;
};
getUser();
