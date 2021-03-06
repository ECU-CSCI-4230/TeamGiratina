const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    email: { type: String, required: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, default: "9194577950"},
    notify: { type: Boolean, default: false},
    notifyExercise: { type: Boolean, default: false},
    notifyWater: { type: Boolean, default: false},
    notifyCook: { type: Boolean, default: false},
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);