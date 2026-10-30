const express = require("express");
const mongoose=require("mongoose");
const app= express();
const Listing=require("./models/listing")
const path=require("path");
const methodOverride=require("method-override");
const ejsMate = require("ejs-mate");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")))


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

//index route
app.get("/listings",async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index",{allListings});
});

//New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//Create route
app.post("/listings",async(req,res)=>{
    // let {title,description,image,price,location,country}=req.body;
    // let data=  await new Listing({title:title,description:description,image:image,price:price,location:location,country:country})

    let data = await new Listing(req.body.listing);
    await data.save();
    res.redirect("/listings");
});

//Edit Route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id}=req.params;
    
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

//Update Route
app.put("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    let updatedData={...req.body.listing}
    console.log(updatedData)
     await Listing.findByIdAndUpdate(id,updatedData,{ runValidators: true });
   res.redirect(`/listings/${id}`)
});

//Delete Route
app.delete("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings")
});

//show route
app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    
    const listing = await Listing.findById(id);
    // console.log("hello");
    res.render("listings/show.ejs",{listing});
});


app.listen(8080,()=>{
    console.log("app is listening at port 8080")
});