const mongoose = require('mongoose')

const userShcema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },

})

const User = mongoose.model("User", userShcema)

module.exports = User