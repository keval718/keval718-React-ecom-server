const mongoose=require('mongoose');
const config=require('config');
const dbconn=config.get('mongoDBConnectURI');

//async is used to wait the command untill first data comes from databse
const connectDB=async()=>{
    try{
        //awaits till  connection happens
          await mongoose.connect(dbconn);
          console.log("database connected")
    }
    catch(err)
    {
        console.log("unable to connect");
        process.exit();
    }
};

module.exports=connectDB;