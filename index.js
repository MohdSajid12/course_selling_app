const express = require('express');
const app = express();
const PORT = 6000;
app.use(express.json());


app.post('/user/signup',(req,res)=>{
    try{
       
         return res.status(200).json({
            msg : `Signup endpoint`
         })
    }catch(error){
        return res.status(500).json({msg:`Error ${error}`});
    }
});

app.post('/user/signin',(req,res)=>{
    try{

        return res.status(200).json({msg: `Signin endpoint`})

    }catch(error){
        res.status(500).json({msg:`Error ${error}`});
    }
});

app.get('/user/purchases' ,(req,res)=>{
    try{
        
        return res.status(200).json({msg:``})
    }catch(error){
        return res.status(500).json({msg:`Error ${error}`});
    }
})

app.post('/course/purchase',(req,res)=>{
    try{

    }catch(error){
        return res.status(500).json({msg:`Error ${error}`});
    }
})

app.get('/courses',(req,res)=>{
    try{

    }catch(error){
        return res.status(500).json({msg:`Error ${error}`});
    }
})





app.listen(PORT ,()=>{
    console.log(`Server is running at the port ${PORT}`);
})