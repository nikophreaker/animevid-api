const router = require("express").Router();
const cheerio = require("cheerio");
const axios = require("axios");
const baseurl = "https://185.224.82.193/";
const { fetch } = require("../scrappers/index.js");
module.exports = router;

router.get("/test", async (req, res) => {
    console.log("SUKESSSS");
});

router.get("/api/updated-list/page/:pagenumber", async (req, res) => {
    let pageNumber = req.params.pagenumber;
    let url = baseurl+`page/${pageNumber}/`;

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent' : 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36'
            }
        });
        fetch(url, error => {
            res.send({
                status: 0,
                message: error
            })
        }, html => {
            if (response.status === 200) {
                const $ = cheerio.load(html);
                const element = $("#wasu");
                let update_list = [];
                let cover, title, eps, endpoint;

                element.find("#content-wrap > .ngiri > .menu > a").each((idx, el) => {
                    cover = $(el).find("img").attr("src");
                    title = $(el).find("p").text().trim();
                    eps = $(el).find("span").text().trim();
                    endpoint = $(el).attr("href");
                    update_list.push({
                        cover,
                        title,
                        eps,
                        endpoint,
                    })
                });

                console.log("200");
                return res.status(200).json({
                    status: 1,
                    message: "Success Get Data",
                    update_list,
                });
            } else {
                console.log("404");
                return res.send({
                    message: response.status,
                });
            }
        })
    } catch (error) {
        console.log("500");
        res.send({
            status: 0,
            message: error
        })
    }

});
