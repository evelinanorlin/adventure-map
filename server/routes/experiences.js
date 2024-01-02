var express = require('express');
var router = express.Router();

/* GET experiences listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/newexperience', function(req, res){
  res.send('new experiencesss')
})

router.get('/:id', function(req, res, next) {
  let experience = req.params.id;
  console.log(req.params.id)
  res.send(`respond with a resource ${experience}`);
});

module.exports = router;
