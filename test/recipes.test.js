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

test('get all recipes', function(t) {
  recipes.create({
    name: "test2",
    source: "www.recipes.com",
    ingredients: {
      butter: {
        qty: 1,
        unit: "tbsp"
      }
    }
  }, function callback(err, data) {
    t.ifError(err);
    recipes.getAll(function callback(err, d) {
      t.ifError(err);
      t.equal(d.length, 2);
      t.equal(d[0].name, "test");
      t.equal(d[1].name, "test2");
      t.end();
    });
  });
});

test('delete a recipe', function(t) {
  recipes.create({
    name: "test3",
    source: "bestrecipe.com",
  }, function callback(err, data) {
    t.ifError(err);
    var id = data.ops[0]._id;
    recipes.removeOne(id, function callback(err, data) {
      t.ifError(err);
      recipes.getOne(id, function callback(err, data) {
        t.equal(JSON.stringify(data), '{}');
        t.end();
      });
    });
  });
});


teardown();

test.onFinish(() => process.exit(0));
