const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userSchema= new Schema({

    email:{
        type:String,
        unique:true
    },
    username:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    },

})
module.exports=mongoose.model('simple', userSchema);
