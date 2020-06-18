const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
/* 데이터베이스와 서버를 연결하기 위해 knex.js를 사용
https://knexjs.org/ 참조 */
const knex = require('knex');

const register = require('./controllers/register');
const siginin = require('./controllers/siginin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '!2TiZhAlFh',
    database: 'smart-brain',
  },
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {});
app.post('/signin', (req, res) => {
  siginin.handleSiginin(req, res, db, bcrypt);
});
app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.get('/profile/:id', (req, res) => {
  profile.handleProfile(req, res, db);
});
app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});
app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
