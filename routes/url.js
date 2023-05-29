const express = require("express");
const {handleGenerateNewShortUrl,hanldeGetAnalytics,handleGetRequestandRedirect} = require("./../controllers/url")
const router = express.Router();


router.post('/',handleGenerateNewShortUrl)

router.get('/analytics/:shortId',hanldeGetAnalytics)
router.get("/:shortId",handleGetRequestandRedirect)
module.exports = router
