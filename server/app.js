require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;
// const uri = `mongodb+srv://${mongo_username}:${mongo_password}@adventuremap.noo8vnu.mongodb.net/?retryWrites=true&w=majority`;
console.log(mongo_password)
const uri = `mongodb+srv://norlinevelina:Laxlada1@adventuremap.noo8vnu.mongodb.net/`;
const port = process.env.PORT || 3000;

const init = async () => {
  await MongoClient.connect(uri, {
  })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('adventuremap');
    app.locals.db = db;
  })
  .catch(err => {
    console.error('Error connecting to the databas:', err);
    process.exit(1); // Terminate the application on database connection error
  });
}


init();
  
var experiencesRouter = require('./routes/experiences');
var adminRouter = require('./routes/admin');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/experiences', experiencesRouter);
app.use('/admin', adminRouter);

module.exports = app;
