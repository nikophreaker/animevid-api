const router = require("express").Router();
// const router = require("fastify")();
const cheerio = require("cheerio");
const axios = require("axios");
const baseurl = require("../constant/constant");
module.exports = router;

router.get("/test", async (req, res) => {
    console.log("SUKESSSS");
});

router.get("/:slug", async (req, res) => {
    let slug = req.params.slug;
    let url = baseurl + `${slug}/`;

    try {
        await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36'
            }
        }).then(res2 => {
            if (res2.status == 200) {
                const $ = cheerio.load(res2.data);
                const element = $("#wasu");
                let serverData = [];
                let cover, title, detail, server;
                let tempCover = element.find(".detail > img").attr("src");
                cover = tempCover.charAt(0) == "/" ? baseurl + tempCover.substring(1, tempCover.length) : tempCover;
                title = element.find("#content-wrap > .ngiri > h1").text().trim();
                detail = element.find(".detail > p").text().trim();
                element.find("#content-wrap > .ngiri > .menu > .servers > a").each((idx, el) => {
                    let data = $(el).attr("data-video")
                    server = data.charAt(0) == "/" ? baseurl + data.substring(1, data.length) : data;
                    serverData.push({
                        server
                    })
                });
                return res.status(200).json({
                    status: 1,
                    message: "Success Get Data",
                    cover,
                    title,
                    detail,
                    serverData,
                });
            } else {
                return res.send({
                    status: 0,
                    message: res2.message
                });
            }
        });

    } catch (error) {
        return res.send({
            status: 0,
            message: error
        })
    }

});