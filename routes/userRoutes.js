const { Router } = require('express');
const userRouter = Router();
const {userModel} = require('../utills/db');

userRouter.post('/signup',(req,res)=>{
    try{

         return res.status(200).json({ msg : `Signup endpoint` })
    }catch(error){
        return res.status(500).json({msg:`Error ${error}`});
    }
});

userRouter.post('/signin',(req,res)=>{
    try{

        return res.status(200).json({msg: `Signin endpoint`})

    }catch(error){
        res.status(500).json({msg:`Error ${error}`});
    }
});

userRouter.get('/purchases' ,(req,res)=>{
    try{
        return res.status(200).json({msg:``})
    }catch(error){
        return res.status(500).json({msg:`Error ${error}`});
    }
})

module.exports = { 
    userRouter : userRouter
}