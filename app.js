const express = require('express');
const app = express();
const router = require('./routes/index');
const session = require('express-session');

const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'hella secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  } //adjustments are needed when production
}));

app.use('/', router);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});