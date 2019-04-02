const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Recipe = db.Recipe;

module.exports = {
    getAll,
    getById,
    getByUserId,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Recipe.find().select('-hash');
}

async function getById(id) {
    return await Recipe.findById(id).select('-hash');
}

async function getByUserId(username) {
    return await Recipe.findById(username).select('-hash');
}

async function create(recipeParam) {
    const recipe = new Recipe(recipeParam);

    // save recipe
    await recipe.save();
}

async function update(id, recipeParam) {
    const recipe = await Recipe.findById(id);

    // validate
    if (!recipe) throw 'Recipe not found';
    if (recipe.username !== recipeParam.username) {
        throw 'Sorry you don\'t have permission to edit';
    }

    // copy recipeParam properties to recipe
    Object.assign(recipe, recipeParam);

    await recipe.save();
}

async function _delete(id) {
    await Recipe.findByIdAndRemove(id);
}