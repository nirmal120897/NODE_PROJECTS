const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/nirmaldb1",()=>{
console.log('database is connected....');
})
const user = new mongoose.Schema({

Title :{
    type : String,
    required: true
},

Author :{
    type : String,
    required: true
},

Description:{
    type : String,
    required: true
},

image :{
    type:String,
    required: true
}



});

module.exports= mongoose.model('Books collection',user)



