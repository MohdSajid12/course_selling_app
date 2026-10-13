const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = 6000;
const {userRouter} = require('./routes/userRoutes');
const {courseRouter} = require('./routes/courseRoutes');
const {adminRouter} = require('./routes/adminRoutes');
const connectDb = require('./utills/dbConnect');
app.use(express.json());


app.use('/api/v1/user' ,userRouter);
app.use('/api/v1/admin' ,adminRouter);
app.use('/api/v1/course',courseRouter)



app.listen(PORT ,()=>{
    connectDb();
    console.log(`Server is running at the port ${PORT}`);
})