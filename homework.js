const mongoose = require('mongoose');

const HomeworkSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, required: true },
    additionalInfo: { type: String },
    deadline: { type: Date, required: true },
    completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Homework', HomeworkSchema);
