var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const MongoClient = require('mongodb').MongoClient;

const Db = process.env.ATLAS_URI;

MongoClient.connect('mongodb+srv://norlinevelina:Laxlada1@adventuremap.noo8vnu.mongodb.net/?retryWrites=true&w=majority', {
})
.then(client => {
  console.log('Connected to Database');
  const db = client.db('adventuremap');
  app.locals.db = db;
  // const experiencesCollection = db.collection('experiences')
  // app.use('/experiences', experiencesRouter(experiencesCollection))
})

var indexRouter = require('./routes/index');
var experiencesRouter = require('./routes/experiences');
var adminRouter = require('./routes/admin');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/experiences', experiencesRouter);
app.use('/admin', adminRouter);

module.exports = app;
