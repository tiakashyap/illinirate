/*
Courses can have many reviews (has-many relationship)
*/

const mongoose = require('mongoose');

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    courseNumber: { type: String, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    averageDifficulty: { type: Number, default: 0 },
    averageWorkload: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
