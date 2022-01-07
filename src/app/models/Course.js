const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const Course = new Schema({
    name: {
        type: String,
        maxLength: 255,
        required: true
    },
    description: {
        type: String,
        maxLength: 600,
    },
    thumbnail: {
        type: String,
    },
    slug: {
        type: String,
        unique: true,
    },
    videoId: {
        type: String,
        required: true
    },
    deletedAt: {
        type: Date
    }
}, {
    timestamps: true,
});


Course.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Course', Course);
