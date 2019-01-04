var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');
var mongoData = require('./mongoData.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  var resultArray = [];
  mongo.connect(mongoData.url, function(err, db) {
    assert.equal(null, err);

    var dbo = db.db(mongoData.databaseName);

    var cursor = dbo.collection(mongoData.databaseCollection).find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('index', {title: 'Matches - Main Page', items: resultArray});
    });
  });
});


router.post('/remove_one', function(req, res, next) {
  mongo.connect(mongoData.url, function(err, db) {
    assert.equal(null, err);

    var dbo = db.db(mongoData.databaseName);
    var query = { "_id" : ObjectId(req.body.id) };

    dbo.collection(mongoData.databaseCollection).deleteOne(query, function(err, obj) {
      assert.equal(null, err);
      res.send(obj);
      res.end();
    });
  });
});

router.post('/delete', function(req, res, next) {

});

module.exports = router;
