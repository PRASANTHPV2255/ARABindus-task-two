const user = require("../Schema/UserRegister")
const bycrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const JWT_SECRET="Secretcode123";


const UserRegister=async(req,res)=>{
    const {Name,Email,Password,confirmPassword}=req.body

    const finduser=await user.findOne({Name})

    if(!Name || !Email || !Password || !confirmPassword){
        return res.json({msg:"Fill all the field"})

    } else if(Password != confirmPassword) {
        res.json({msg:"Password is not correct"})

    }else if(finduser){
        res.json({msg:'Name is already taken'})

    } else {
       const hash=await bycrypt.hash(Password,10)
       const Newuser=await user.create({Name,Email,Password:hash})
       const Token=gentoken(Newuser._id)
       return res.json({msg:'SignUp success',Newuser,Token:Token})
    }
}

//--Login

const login=async(req,res)=>{
    const {Name,Password}=req.body

    const getuser=await user.findOne({Name});
   

    if(getuser && bycrypt.compareSync(Password,getuser.Password)){
        const Token=gentoken(getuser._id)
        return res.json({msg:'Login success',Token:Token,getuser})
    } else {
        res.json({msg:"Username and Password is not correct"})
    }
}

//--manage account

const update=async(req,res)=>{
    const {Name,Email,Password}=req.body;
    const _id=req.params.id; 
    const salt=await bycrypt.genSalt(10);
    const hash=await bycrypt.hash(Password,salt)
    const manage=await user.findByIdAndUpdate(_id,{Name,Email,Password:hash})

    if(manage){
        return res.json({msg:'Updated',manage})
    } else {
        return res.json({msg:"not updated"})
    }
}

const gentoken=(id)=>{
    return jwt.sign({id},JWT_SECRET,{expiresIn:'1h'})
}

module.exports={UserRegister,login,update}