const express = require("express");
const mongoose=require("mongoose");
const app= express();


const MONGO_URL="mongodb://127.0.0.1:27017/stay-sphere"
main()
.then(()=>{
    console.log("db connected")
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
}



app.get("/",(req,res)=>{
    res.send("Hi, i am root ");
});

app.listen(8080,()=>{
    console.log("app is listening at port 8080")
});