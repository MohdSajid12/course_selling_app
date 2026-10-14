const {Router} = require('express');
const courseRouter = Router();
const {purchaseModel, courseModel} = require('../utills/db');
const userMiddleware = require('../middleware/user');


courseRouter.post('/purchase',userMiddleware,async (req,res)=>{
    try{
         const userId  = req.userId;
         const {courseId }= req.body;

         if(!courseId){
            res.status(404).json({msg:`Please provide courseId`});
         }
         const purchaseId  = await purchaseModel.create({
             userId : userId,
             courseId : courseId
         })

         return res.status(200).json({msg:`Course Purchase Successfully`});

    }catch(error){
        return res.status(500).json({msg:`Error ${error}`});
    }
})

courseRouter.get('/preview',async(req,res)=>{
    try{
        const courses = await courseModel.find({});

        return res.status(200).json({courses : courses})

    }catch(error){
        return res.status(500).json({msg:`Error ${error}`});
    }
})

module.exports = {
    courseRouter : courseRouter
}