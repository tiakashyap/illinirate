/*
Reviews belongs to 1 user and 1 course (belongs-to relationship)
*/

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    semesterTaken: { type: String, required: true },
    difficultyNumeric: { type: Number, required: true },
    difficultyCategory: { type: String, required: true },
    workloadNumeric: { type: Number, required: true },
    workloadCategory: { type: String, required: true },
    rating: { type: Number, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;