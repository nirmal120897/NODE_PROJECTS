const mongoose = require('mongoose')
var bycrypt = require('bcryptjs');
const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: Number,
        required: true
    
    }
    
});


// user.pre('save', function (next) {
//     const user = this;
//     if (!user.isModified('password')) {
//         next();
//     }
//     bycrypt.genSalt(10, (err, salt) => {

//         bycrypt.hash(user.password, salt, (_, hash) => {
//             user.password = hash
//             next()
//         })
//     })
// })



module.exports = mongoose.model('users', user)