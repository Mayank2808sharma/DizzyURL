const shortid = require('shortid');
const URL = require("./../models/url")
async function handleGenerateNewShortUrl(req,res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error:"send the URL to be Shortened"})
    }
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL:body.url,
        visitHistory:[],
    })
    return res.render("home",{
        id: shortID
    })
}


async function hanldeGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks: result.visitHistory.length, analytics: result.visitHistory,})
}

async function handleGetRequestandRedirect(req,res){
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitHistory:{
                timestamp: Date.now()
            }
        }
    })
    console.log(entry)
    res.redirect(entry.redirectURL);
}
module.exports = {
    handleGenerateNewShortUrl,
    hanldeGetAnalytics,
    handleGetRequestandRedirect,
}
