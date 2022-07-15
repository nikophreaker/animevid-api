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
    let url = baseurl + `search/${slug}/`;

    try {
        await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36'
            }
        }).then(res2 => {
            if (res2.status == 200) {
                const $ = cheerio.load(res2.data);
                const element = $("#wasu");
                let searchData = [];
                let header, cover, title, detail, endpoint, type, duration, year;
                header = element.find("#content-wrap > .title").text().trim();
                element.find("#content-wrap > .menu > table").each((idx, el) => {
                    let coverTemp = $(el).find("tbody > tr > .vithumb > a > img").attr("src");
                    cover = coverTemp.charAt(0) == "/" ? baseurl + coverTemp.substring(1, coverTemp.length) : coverTemp;
                    title = $(el).find("tbody > tr > .videsc > a").text().trim();
                    detail = $(el).find("tbody > tr > .videsc > p").text().trim();
                    endpoint = $(el).find("tbody > tr > .videsc > a").attr("href");
                    type = $($(el).find("tbody > tr > .videsc > .label")[0]).text().trim()
                    duration = $($(el).find("tbody > tr > .videsc > .label")[1]).text().trim()
                    year = $($(el).find("tbody > tr > .videsc > .label")[2]).text().trim()
                    searchData.push({
                        cover,
                        title,
                        detail,
                        endpoint,
                        type,
                        duration,
                        year
                    })
                });
                return res.status(200).json({
                    status: 1,
                    message: "Success Get Data",
                    header,
                    searchData,
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
            message: error.message
        })
    }

});