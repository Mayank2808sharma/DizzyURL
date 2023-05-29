const express = require('express');
const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const path = require('path');
const {connectToMongoDB} = require("./connect")
const PORT = 8001;
const app = express();
// connection to MongoDB
connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(()=>console.log("Connected to MongoDB Server")).catch((err)=>console.log("Error",err))

app.set('view engine','ejs');
app.set('views',path.resolve("./views"))
app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.use("/url",urlRoute)
app.use("/",staticRoute);

app.listen(PORT,()=>console.log(`Server running Successfully ${PORT}`))