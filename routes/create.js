var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

router.get('/', function(req, res, next) {
  res.render('create', {title: 'Matches - Create New'});
});

router.post('/insert', function(req, res, next) {
  var item = {
    name: req.body.name,
    type: req.body.type
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    /*db.collection('tournament').insertOne(item, function() {
      assert.equal(null, err);
      console.log('item is in');
      db.close();
    });*/
  });

  res.redirect('/');
});

module.exports = router;
