const {Router} = require('express');
const adminRouter = Router();
const {adminModel} = require('../utills/db');


adminRouter.post('/signup',(req,res)=>{
    try{

         return res.status(200).json({ msg : `Signup endpoint` })
    }catch(error){
        return res.status(500).json({msg:`Error ${error}`});
    }
});

adminRouter.post('/signin',(req,res)=>{
    try{

        return res.status(200).json({msg: `Signin endpoint`})

    }catch(error){
        res.status(500).json({msg:`Error ${error}`});
    }
});

adminRouter.post('/course',(req,res)=>{
    try{

        return res.status(200).json({msg: `Signin endpoint`})

    }catch(error){
        res.status(500).json({msg:`Error ${error}`});
    }
});

adminRouter.put('/course',(req,res)=>{
    try{

        return res.status(200).json({msg: `Signin endpoint`})

    }catch(error){
        res.status(500).json({msg:`Error ${error}`});
    }
});

adminRouter.get('/course/bulk',(req,res)=>{
    try{

        return res.status(200).json({msg: `Signin endpoint`})

    }catch(error){
        res.status(500).json({msg:`Error ${error}`});
    }
});



module.exports = {
    adminRouter :adminRouter
}