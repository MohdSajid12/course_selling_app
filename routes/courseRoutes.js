const {Router} = require('express');
const courseRouter = Router();
const {courseModel} = require('../utills/db');


courseRouter.post('/purchase',(req,res)=>{
    try{

    }catch(error){
        return res.status(500).json({msg:`Error ${error}`});
    }
})

courseRouter.get('/preview',(req,res)=>{
    try{
        return res.status(200).json({msg :`Signup endpoint`});

    }catch(error){
        return res.status(500).json({msg:`Error ${error}`});
    }
})

module.exports = {
    courseRouter : courseRouter
}