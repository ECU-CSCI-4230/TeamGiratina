const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Preferences = db.Preferences;

module.exports = {
    getAll,
    getById,
    getByUserId,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Preferences.find().select('-hash');
}

async function getById(id) {
    return await Preferences.findById(id).select('-hash');
}

async function getByUserId(username) {
    return await Preferences.findById(username).select('-hash');
}

async function create(preferencesParam) {
    const Preferences = new Preferences(preferencesParam);

    // save preferences
    await Preferences.save();
}

async function update(id, preferencesParam) {
    const Preferences = await Preferences.findById(id);

    // validate
    if (!Preferences) throw 'Preferences not found';
    if (Preferences.username !== preferencesParam.username) {
        throw 'Sorry you don\'t have permission to edit';
    }

    // copy PreferencesParam properties to Preferences
    Object.assign(Preferences, preferencesParam);

    await Preferences.save();
}

async function _delete(id) {
    await Preferences.findByIdAndRemove(id);
}
