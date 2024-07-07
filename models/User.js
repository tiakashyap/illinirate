/*
Users can have many reviews (has-many relationship)
*/

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    semesterStarted: { type: String },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;

