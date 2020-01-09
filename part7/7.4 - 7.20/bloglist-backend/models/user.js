const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    username: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }],
    passwordHash: String
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});

userSchema.plugin(mongooseUniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User;