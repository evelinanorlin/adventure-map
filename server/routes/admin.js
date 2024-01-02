var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  req.app.locals.db.collection('admin').find().toArray()
  .then(results => {
    console.log(results[0].username)
    res.send(results[0].username)
  })
});

router.post('/add', function(req, res){
  req.app.locals.db.collection('admin').insertOne(req.body)
  .then(result => {
    console.log(result)
    res.send(result)
  })
})

module.exports = router;