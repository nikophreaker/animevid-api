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
    let url = baseurl + `anime/${slug}/`;

    try {
        await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36'
            }
        }).then(res2 => {
            if (res2.status == 200) {
                const $ = cheerio.load(res2.data);
                const element = $("#wasu");
                let epsData = [];
                let genreData = [];
                let cover, title, detail, endpoint;
                let coverTemp = element.find("#content-wrap > .ngirix > .menu > .detail > img").attr("src");
                cover = coverTemp.charAt(0) == "/" ? baseurl + coverTemp.substring(1, coverTemp.length) : coverTemp;
                title = element.find("#content-wrap > .ngirix > .menu > .detail > h2").text().trim();

                element.find("#content-wrap > .ngirix > .menu > .detail > li").each((id, el) => {
                    let genre = $(el).find("a").text().trim();
                    let genreEndpoint = $(el).find("a").attr("href");
                    genreData.push({
                        genre,
                        genreEndpoint
                    });
                });

                element.find("#content-wrap > .ngirix > .menu > .ep > a").each((id, el) => {
                    let eps = `Episode ${id+1}`
                    endpoint = $(el).attr("href");
                    epsData.push({
                        eps,
                        endpoint
                    })
                });

                return res.status(200).json({
                    status: 1,
                    message: "Success Get Data",
                    cover,
                    title,
                    genreData,
                    epsData,
                });
            } else {
                res2.send({
                    status: 0,
                    message: res.message
                });
            }
        });

    } catch (error) {
        res.send({
            status: 0,
            message: error.message
        })
    }

});