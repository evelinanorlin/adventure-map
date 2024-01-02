require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

const MongoClient = require('mongodb').MongoClient;
const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@adventuremap.noo8vnu.mongodb.net/?retryWrites=true&w=majority`;

MongoClient.connect(uri, {useNewUrlParser: true
})
.then(client => {
  console.log('Connected to Database');
  const db = client.db('adventuremap');
  app.locals.db = db;
  // const experiencesCollection = db.collection('experiences')
  // app.use('/experiences', experiencesRouter(experiencesCollection))
})
.catch(err => {
  console.error('Error connecting to the database:', err);
  process.exit(1); // Terminate the application on database connection error
});

var indexRouter = require('./routes/index');
var experiencesRouter = require('./routes/experiences');
var adminRouter = require('./routes/admin');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/experiences', experiencesRouter);
app.use('/admin', adminRouter);

module.exports = app;
