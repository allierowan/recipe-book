var dbConnect = require('./db-connect');
var ObjectID = require('mongodb').ObjectID;

module.exports = {
    create,
    getOne
};

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
  dbConnect(function ConnectHandler(err, db){
    if (err) {
      done(err, null);
      return;
    }

    db.collection('recipes').findOne({_id: new ObjectID(id)}, function(err, data) {
      if (err) {
        done(err, null);
      }

      var cleanData = {
        "id": data._id,
        "name": data.name,
        "createTime": data.createTime,
        "rating": data.rating,
        "source": data.source,
        "ingredients": data.ingredients
      };

      done(null, cleanData);
    });
  });
}
