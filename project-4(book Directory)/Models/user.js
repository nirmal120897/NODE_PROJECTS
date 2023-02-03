const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
mongoose.connect("mongodb://127.0.0.1:27017/nirmaldb1",()=>{
console.log('database is connected....');
})
const userforbooks = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true
    
    }
    
});

 
userforbooks.pre("save",async function(next){
   
    if(this.isModified("password")){
    this.password = await bcryptjs.hash(this.password ,10);
    }
    next();
 

})




module.exports = mongoose.model('user@books', userforbooks)