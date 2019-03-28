var express = require('express');
var recipesModel = require('../models/recipes');
var router = express.Router();

router.get('/', function allRecipes(req, res) {
  recipesModel.getAll(function dataGetter(err, data) {
    if (err) {
      console.error(err);
      res.status(500).send('Uh oh... couldn\'t get your data');
      return;
    }
    res.json(data);
  });
});

router.get('/:id([a-f0-9]{24})', function getARecipe(req, res) {
  recipesModel.getOne(req.params.id, function dataRetrieved(err, data) {
    if (err) {
        console.error(err);
        res.status(500).send('Uh oh... couldn\'t get your data');
        return;
    }
    res.json( data );
  });
});

router.post('/', function createRecipe(req, res) {

    recipesModel.create(req.body, function dataCreated(err, data) {
        if (err) {
          console.error(err);
          res.status(500).send('Uh oh... couldn\'t post your data');
          return;
        }
        res.json(
          {
            "name": data.ops[0].name,
            "source": data.ops[0].source,
            "ingredients": data.ops[0].ingredients,
            "createTime": data.ops[0].createTime
          });
    });
});

router.delete('/:id([a-f0-9]{24})', function destroyRecipe(req, res){
  recipesModel.destroy(req.params.id, function dataDeleted(err, data){
    if (err) {
      console.error(err);
      res.status(400).send('Sorry...couldn\'t delete your data');
      return;
    }
    res.json(data);
  });
});

module.exports = router;
