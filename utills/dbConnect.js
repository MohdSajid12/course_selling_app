const mongoose = require('mongoose');

async function connectDb(){
     await mongoose.connect(process.env.MONGO_URI).
     then(()=>{
         console.log(`MongoDb connected Successfully`);
     }).catch((err)=>{
        console.log(`Something went wrong`,err.message);
        process.exit(1);
     })
}

module.exports = connectDb;