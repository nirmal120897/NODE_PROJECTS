const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/nirmaldb1')

const Product = mongoose.Schema({
    name: {
        require: true,
        type: String
    },
    price: {
        require: true,
        type: String
    },
    description: {
        require: true,
        type: String
    }

})

module.exports = mongoose.model('products', Product)