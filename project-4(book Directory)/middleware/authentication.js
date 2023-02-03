const jwt = require('jsonwebtoken')


module.exports.auth =(req,res,next)=>{

    try{
    const pagetoken = req.cookies.jwt
    const verifytoken = jwt.verify(pagetoken,'nirmalumarvanshi57')
    console.log(verifytoken);
     next();
     }catch(error){
    
         res.send("!!!!!YOU ARE NOT ALIGIBLE FOR USING THIS PAGE!!!!!!")

     }
}