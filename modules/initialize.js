const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017")
 const db=mongoose.connection
 db.on('open', ()=> console.log('sucessfully'))
 db.on('error', (error)=> console.log(`sorry ${error}`))
 module.exports=db;