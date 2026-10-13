const express = require('express');
const app = express();
const PORT = 6000;
const {userRouter} = require('./routes/userRoutes');
const {courseRouter} = require('./routes/courseRoutes');
app.use(express.json());


app.use('/api/v1/user' ,userRouter);
app.use('/api/v1/course',courseRouter)







app.listen(PORT ,()=>{
    console.log(`Server is running at the port ${PORT}`);
})