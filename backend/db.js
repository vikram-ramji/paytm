// backend/db.js
const mongoose = require('mongoose')
const argon2 = require("argon2")

// Connect to database
mongoose.connect('mongodb://localhost:27017/paytm?replicaSet=rs0')

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 3,
        maxLength: 30

    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})

// Method to generate Hash from plain text  using argon2
userSchema.methods.createHash = async function (plainTextPassword) {
    // return password hash
    return await argon2.hash(plainTextPassword);
};

// Method to validate the entered password using argon2
userSchema.methods.validatePassword = async function (candidatePassword) {
  return await argon2.verify(this.password_hash, candidatePassword)
};

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

// Create a model from the schema
const User = mongoose.model('User', userSchema)
const Account = mongoose.model('Account', accountSchema)

module.exports = {
    User,
    Account
}