# Web API を作ってみよう 〜 Express 編 〜

## やること

Node.js で Express を 使って、TODO リストのデータを更新する Web API を作ってみる

Express

https://expressjs.com/ja/

## Installations

パッケージを入れて開発するため npm か yarn で管理していきます

```sh
cd server
yarn init -y
```

express と nodemon と cors を導入することで API の開発をやりやすくします

```sh
cd server
yarn add express nodemon cors
```

express ...前回使用した http よりも遥かに API が書きやすくなります

nodemon ...コードを修正したあとにサーバーを再起動する必要がなくなります

## Step

0. .gitignore の作成
1. scripts の追加
2. express の import とサーバーの起動
