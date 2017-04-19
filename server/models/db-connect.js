
var mongodb = require('mongodb');

var uri = process.env.RECIPES_DB_URI;

module.exports = function connect(done) {
    mongodb.MongoClient.connect(uri, done);
};
