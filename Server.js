const express=require('express');
const connectdb = require('./Database');
const router = require('./TestRouter');
const path=require('path');
const cors = require('cors');
const multer = require('multer');




const app=express();
app.use(cors());

connectdb();

app.use(express.json());
app.use('/uploads', express.static('uploads'));


app.use('/uploads', router);


app.get('/',(req,res)=>{
    res.json('Api is running')
})

app.get('/home',(req,res)=>{
    res.render('home page')
})



app.use('/',router);

const PORT=process.env.PORT || 4000;

app.listen(PORT,()=>console.log('Port is running on 4000'))