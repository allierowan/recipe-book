require('dotenv').config({ path: './.env.test' });
var test = require('tape');
var recipes = require('../server/models/recipes');
var dbConnect = require('../server/models/db-connect');

function teardown() {
    test('teardown', function(t) {
      dbConnect(function connectHandler(err, db){
        if (err) {
          t.ifError(err);
          t.end();
          }
        db.collection('recipes').remove({});
        t.end();
    });
  });
}

test('create and get a recipe', function(t) {
  recipes.create({
      name: "test",
      source: "www.abc.com",
      ingredients: {
        apple: {
          qty: 2
        },
        banana: {
          qty: 2
        }
      },
      rating: 5
    }, function callback(err, data) {
        t.ifError(err);
        t.equal(data.ops[0].name, "test");
        recipes.getOne(data.ops[0]._id, function callback(err, d) {
          t.ifError(err);
          t.equal(d.source, "www.abc.com");
          t.equal(d.name, "test");
          t.end();
        });
    });
});

teardown();

test.onFinish(() => process.exit(0));
