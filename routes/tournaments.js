var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');
var mongoData = require('./mongoData.js');


router.get('/:id', function(req, res, next) {
  mongo.connect(mongoData.url, function(err, db) {
    assert.equal(null, err);

    var dbo = db.db(mongoData.databaseName);
    var query = { "_id" : ObjectId(req.params.id) };

    var test = dbo.collection(mongoData.databaseCollection).findOne(query, function(err, result) {
      assert.equal(null, err);

      res.render('tournament', {title: 'Matches - Tournament', tournament: result});
    });
  });
});

module.exports = router;
