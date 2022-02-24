const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    token: String,
    dates: [{
        date: Date,
        hours: [{
            from: String,
            until: String,
            available: { type: Boolean, default: true }
        }],
    }],
});

module.exports = mongoose.model('user', userSchema);
