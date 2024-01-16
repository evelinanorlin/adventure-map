const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

/* GET experiences listing. */
router.get('/', function(req, res, next) {
  req.app.locals.db.collection('experiences').find().toArray()
  .then(results => {
    res.send(results)
  })
});

router.post('/add', async function(req, res, next) {
  console.log(req.body)
  req.app.locals.db.collection('experiences').insertOne(req.body)
  .then(result => {
    console.log(result)
    res.send(result)
  })
});

router.delete('/delete', async function(req, res, next) {
  const experienceId = req.body._id;
  try{
    const objectId = new ObjectId(experienceId);
    const result = await req.app.locals.db.collection('experiences').deleteOne({_id: objectId});
    console.log(result)
    if (result.deletedCount === 1) {
      console.log('Delete successful');
      res.status(200).json({ success: true });
    } else {
      console.log('No document found with the provided _id');
      res.status(404).json({ success: false, error: 'Document not found' });
    }
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


router.put('/update', async function(req, res, next) {
  const experienceId = req.body._id;
  try {
    const objectId = new ObjectId(experienceId);

    // Construct the update object based on req.body
    const updateObject = {
      $set: {
        isReviewed: req.body.isReviewed,
        // Add other fields you want to update here
      }
    };
    
    // Perform the update operation
    const result = await req.app.locals.db.collection('experiences').updateOne(
      { _id: objectId },
      updateObject
      );
      console.log(result)

    // Check if the update was successful
    if (result.modifiedCount === 1) {
      console.log('Update successful');
      res.status(200).json({ success: true });
    } else {
      console.log('No document found with the provided _id');
      res.status(404).json({ success: false, error: 'Document not found' });
    }
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
