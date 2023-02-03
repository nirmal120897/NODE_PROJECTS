// const addproducts = require('./connection')

// addone=async(req,res)=>{
   
//     const data = {"Title":"The Siege","Author":"Helen Dunmore","Description":"The Levin family battle against starvation in this novel set during the German siege of Leningrad. Anna digs tank traps and dodges patrols as she scavenges for wood, but the hand of history is hard to escape."}
//     const data2 =  await new addproducts(data)
//     data2.save()
//     console.log(data2)
    
// }
const User = require('../Models/user')


const addd =async(req,res)=>{

    const data = {'name':'kdkdkdkdk','email':'mmm@gamil.com','password':'12k@12345'}
     const data2 = await new User(data)
     data2.save()

}

addd()
