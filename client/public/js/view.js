(function() {
  'use strict';
  window.recipes = window.recipes || {};
  let $recipes = $('.recipe-list');
  let $msg = $('.message');

  $('.add-recipe').submit(addRecipe);
  $recipes.on('click', '.delete', removeJob);

  $(function() {
        window.recipes.getRecipes()
            .then(function(recipes) {
                $recipes.html('');
                recipes.forEach(showRecipe);
            })
            .catch(function(xhr) {
                showError(`Unable to load recipes (${xhr.status})`);
            });
    });

    function showRecipe(data) {
        $recipes.prepend(`
            <li>
                <article data-id='${data.id}'>
                    <p><a href='${data.source}'>${data.name}</a></p>
                    <button class='delete'>X</button>
                </article>
            </li>
        `);
    }

    function addRecipe(e) {
        e.preventDefault();
        clearMessage();

        let data = {};
        $(this).serializeArray().forEach(function transformFormData(field) {
            data[field.name] = field.value;
        });
        if (!data.name || !data.source) {
            return showError('Please enter both a name and source to add a recipe!');
        }
        window.recipes.saveRecipe(data)
            .then(function handleSave(recipe) {
                console.log(arguments);
                showSuccess('Your recipe has been added!');
                showRecipe(recipe);
            })
            .catch(function handleErr(xhr) {
                showError(`Unable to save data (${xhr.status})`);
            });
    }

    function removeRecipe(e) {
      e.preventDefault();
      let id = $(this).closest('article').data('id');
      if (!id) {
        return showError('Unable to determine the id for the recipe you want to delete. Try refreshing the page.');
      }
      window.recipes.deleteRecipe(e)
        .then(function removeRecipeHTML() {
          $(`[data-id="${id}"]`).parent().remove();
          showSuccess('Your recipe has been deleted!');
        })
        .catch(function showRemoveError(xhr) {
          showError('Unable to remove recipe');
        });
    }

    function clearMessage() {
        $msg.text('').removeClass('success show');
    }

    function showSuccess(msg) {
        $msg.text(msg).addClass('show success');
        setTimeout(clearMessage, 4500);
    }

    function showError(msg) {
        $msg.text(msg).addClass('show');
        setTimeout(clearMessage, 4500);
    }
}());
