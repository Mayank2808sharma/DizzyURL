const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/",async(req,res)=>{
    const allURLs = await URL.find({});
    return res.render("home",{
        urls:allURLs
    });
})

module.exports = router;