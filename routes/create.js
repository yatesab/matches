var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');
var mongoData = require('./mongoData.js');


router.get('/', function(req, res, next) {
  res.render('create', {title: 'Matches - Create New'});
});

router.post('/insert', function(req, res, next) {
  var newDate = new Date();

  var today = (newDate.getMonth()+1) + '/' + newDate.getDate() + '/' + newDate.getFullYear();
  var time = newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
  var item = {
    name: req.body.name,
    type: req.body.type,
    date: today + " " + time
  };

  mongo.connect(mongoData.url, function(err, db) {
    assert.equal(null, err);

    var dbo = db.db(mongoData.databaseName);

    dbo.collection(mongoData.databaseCollection).insertOne(item, function(err, res) {
      assert.equal(null, err);
      console.log('item is in');
      db.close();
    });
      res.redirect('/');
  });

});

module.exports = router;
