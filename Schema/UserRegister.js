const mongoose=require('mongoose');

const registerschema=mongoose.Schema({
    Name:{type:String},
    Email:{type:String},
    Password:{type:String},

})

const user=mongoose.model('Task Two Register',registerschema)

module.exports=user;