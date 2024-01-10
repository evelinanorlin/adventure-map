const express = require('express');
const router = express.Router();

/* GET experiences listing. */
router.get('/', function(req, res, next) {
  req.app.locals.db.collection('experiences').find().toArray()
  .then(results => {
    res.send(results)
  })
});

router.get('/newexperience', function(req, res){
  res.send('new experiencesss')
})

router.get('/:id', function(req, res, next) {
  let experience = req.params.id;
  console.log(req.params.id)
  res.send(`respond with a resource ${experience}`);
  res.status(201).json(experience);
});

router.post('/add', async function(req, res, next) {
  req.app.locals.db.collection('experiences').insertOne(req.body)
  .then(result => {
    console.log(result)
    res.send(result)
  })
});

module.exports = router;
