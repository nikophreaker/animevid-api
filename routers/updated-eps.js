const router = require("express").Router();
// const router = require("fastify")();
const cheerio = require("cheerio");
const axios = require("axios");
const baseurl = require("../constant/constant");
const {
    fetch
} = require("../puppeteerLib/puppeteer-lib") //require("../phantomLib/phantom");
module.exports = router;

router.get("/test", async (req, res) => {
    console.log("SUKESSSS");
});

router.get("/updated-list/page/:pagenumber", async (req, res) => {
    let pageNumber = req.params.pagenumber;
    let url = baseurl + `page/${pageNumber}/`;

    try {

        fetch(url, error => {
            // res.send({
            //     status: 0,
            //     message: error
            // });
        }, html => {
            const $ = cheerio.load(html);
            const element = $("#wasu");
            let update_list = [];
            let cover, title, eps, endpoint;

            element.find("#content-wrap > .ngiri > .menu > a").each((idx, el) => {
                cover = $(el).find(".list-anime").find("img").attr("data-original");
                title = $(el).find(".list-anime").find("p").text().trim();
                eps = $(el).find(".list-anime").find("span").text().trim();
                endpoint = $(el).attr("href");
                update_list.push({
                    cover,
                    title,
                    eps,
                    endpoint,
                })
            });
            return res.status(200).json({
                status: 1,
                message: "Success Get Data",
                update_list,
            });
        });

        // fetch(url, error => {
        //     return res.send({
        //         status: 0,
        //         message: error
        //     });
        // }, html => {
        //     const $ = cheerio.load(html);
        //     const element = $("#wasu");
        //     let update_list = [];
        //     let cover, title, eps, endpoint;

        //     element.find("#content-wrap > .ngiri > .menu > a").each((idx, el) => {
        //         cover = $(el).find(".list-anime").find("img").attr("data-original");
        //         title = $(el).find(".list-anime").find("p").text().trim();
        //         eps = $(el).find(".list-anime").find("span").text().trim();
        //         endpoint = $(el).attr("href");
        //         update_list.push({
        //             cover,
        //             title,
        //             eps,
        //             endpoint,
        //         })
        //     });
        //     return res.status(200).json({
        //         status: 1,
        //         message: "Success Get Data",
        //         update_list,
        //     });
        // });

        // await axios.get(url, {
        //     headers: {
        //         'User-Agent': 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36'
        //     }
        // }).then(res2 => {
        //     if (res2.status === 200) {
        //         const $ = cheerio.load(res2.data);
        //         const element = $("#wasu");
        //         let update_list = [];
        //         let cover, title, eps, endpoint;

        //         element.find("#content-wrap > .ngiri > .menu > a").each((idx, el) => {
        //             cover = $(el).find(".list-anime").find("img").attr("data-original");
        //             title = $(el).find(".list-anime").find("p").text().trim();
        //             eps = $(el).find(".list-anime").find("span").text().trim();
        //             endpoint = $(el).attr("href");
        //             update_list.push({
        //                 cover,
        //                 title,
        //                 eps,
        //                 endpoint,
        //             })
        //         });
        //         return res.status(200).json({
        //             status: 1,
        //             message: "Success Get Data",
        //             update_list,
        //         });
        //     } else {
        //         return res.send({
        //             status: 0,
        //             message: res2.status
        //         });
        //     }
        // });

    } catch (error) {
        return res.send({
            status: 0,
            message: error
        })
    }

});