const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        // required: true
    },
    sport: {
        type: String,
        required: true,
    },
    carrer: {
        type: String,
        required: true,
    },
    writer: {
        type: String,
        required: true,
    },
    comments: [
        {
            comment: { type: String, required: true },
            commentWriter: { type: String, required: true },
        },
    ],
});

module.exports = mongoose.model('Post', postSchema);
