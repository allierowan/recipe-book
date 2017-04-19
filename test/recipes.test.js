require('dotenv').config();
var test = require('tape');
var recipes = require('../server/models/recipes');

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
    }, function callback(err, data){
        t.ifError(err);
        t.equal(data.ops[0].name, "test");
        t.end();
    });
});

test.onFinish(() => process.exit(0));
