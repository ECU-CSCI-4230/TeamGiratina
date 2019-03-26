const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
	username: { type: String, required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    serves: { type: String, required: true },
    ingredients : { type: [], required: true},
    instructions: { type: [], required: true},
    imageUrl: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Recipe', schema);