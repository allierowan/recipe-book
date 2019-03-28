(function() {
  'use strict';
  window.recipes = window.recipes || {};
  window.recipes.getRecipes = getRecipes;
  window.recipes.saveRecipe = saveRecipe;

  function getRecipes(query) {
    let options = {
        url: '/api/recipes',
        method: 'get',
        dataType: 'json'
    };

    if (query) {
        options.data = { query: query };
    }

    return $.ajax(options);
}

  /**
     * Saves a single recipe by making an API call.
     *
     * @param  {Object} data All required recipe data: {name, source}
     * @return {Promise}     jQuery XHR Promise
     */
    function saveRecipe(data) {
      if (!data || !data.name || !data.source) {
          var def = $.Deferred();
          def.reject('Please provide a valid name and source to create a recipe.');
          return def.promise();
      }

      return $.ajax({
        url: '/api/recipes',
        method: 'post',
        data: JSON.stringify(data),
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    function deleteRecipe(id) {
      if (!id) {
        var def = $.Deferred();
        def.reject('Please provide the id of the recipe you want to delete');
        return def.promise();
      }

      return $.ajax({
        url: '/api/recipes/' + id,
        method: 'delete',
        dataType: 'json'
      });
    }
}());
