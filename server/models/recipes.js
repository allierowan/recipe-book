var dbConnect = require('./db-connect');
var ObjectID = require('mongodb').ObjectID;

module.exports = {
    create,
    getOne,
    getAll,
    removeOne
};

function getAll(done) {
  dbConnect(function connectHandler(err, db) {
    if (err) {
      done(err, null);
      return;
    }
    db.collection('recipes').find().toArray(function (err, data) {
      if (err) {
        done(err, null);
        return;
      }
      var mappedData = data.map(function (data) {
        return {
          'id': data._id,
          'name': data.name,
          'source': data.source,
          'ingredients': data.ingredients,
          'createTime': data.createTime
        }
      });
      done(null, mappedData);
    });
  });
}

function create(data, done) {
  dbConnect(function connectHandler(err, db) {
    if (err) {
      done(err, null);
      return;
    }
    data.createTime = Date.now();
    db.collection('recipes').insert(data, done);
  });
}

function getOne(id, done) {
  dbConnect(function connectHandler(err, db){
    if (err) {
      done(err, null);
      return;
    }

    db.collection('recipes').findOne({_id: new ObjectID(id)}, function(err, data) {
      if (err) {
        done(err, null);
      }

      var cleanData;

      if (!data) {
        cleanData = {};
      } else {
        cleanData = {
          "id": data._id,
          "name": data.name,
          "createTime": data.createTime,
          "rating": data.rating,
          "source": data.source,
          "ingredients": data.ingredients
        };
      }

      done(null, cleanData);
    });
  });
}

function removeOne(id, done) {
  dbConnect(function connectHandler(err, db) {
    if (err) {
      done(err, null);
      return;
    }

    db.collection('recipes').deleteOne({_id: new ObjectID(id)}, done);
  });
}
