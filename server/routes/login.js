const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


// LOG IN
router.post('/', async function(req, res, next) {
  // To make sure there is no whitespace in the username
  const username = req.body.username.trim();
  const user = await req.app.locals.db.collection('users').findOne({username: username})
  console.log(user)
  if(user == null){
    res.send('No user')
    // return res.status(400).send('Cannot find user')
  }
  try{
    if (await bcrypt.compare(req.body.password, user.password)){
      res.send('Success')
    } else{
      res.send('Wrong password')
    }
  }
  catch{
    res.status(500).send()
  }
});


// ADD USER
router.post('/users', async function(req, res){
  try{
    const user = await req.app.locals.db.collection('users').findOne({username: req.body.username})
    if(user != null){
      return res.status(400).send('User already exists')
    } else{
      const salt = await bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      // isAdmin is always true as we only have one user for now
      const newUser = {username: req.body.username, password: hashedPassword, isAdmin: true}
      console.log(user)
      req.app.locals.db.collection('users').insertOne(newUser);
      return res.status(200).send('Success')
    }
  }
  catch{
    res.status(500).send()
  }
})

module.exports = router;