const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const Recipe = db.Recipe;

module.exports = {
    authenticate,
    getAll,
    getById,
    getByUserId,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await Recipe.find().select('-hash');
}

async function getById(id) {
    return await Recipe.findById(id).select('-hash');
}

async function getByUserId(id) {
    return await Recipe.findById(username).select('-hash');
}

async function create(recipeParam) {
    const recipe = new Recipe(recipeParam);

    // save recipe
    await recipe.save();
}

async function update(id, userParam, recipeParam) {
    const recipe = await Recipe.findById(id);

    // validate
    if (!recipe) throw 'Recipe not found';
    if (recipe.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Sorry you don\'t have permission to edit';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}