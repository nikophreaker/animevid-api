const express = require("express"),
    app = express();
// const fastify = require("fastify"),
//     app = fastify();
const updatedEps = require("./routers/updated-eps");
const cors = require("cors");
const helmet = require("helmet");
const PORT = 8000;
const cheerio = require("cheerio");
const axios = require("axios");
const baseurl = require("./constant/constant");
const {
    fetch
} = require("./scrappers/index.js");

// app.use(cors());
// app.use(helmet());
app.use("/api", updatedEps);
// app.get("/test", updatedEps);

// app.register(updatedEps, {
//     prefix: '/api'
// });

app.get('/', (req, res) => {
    res.send('Hello World');
});
// app.use("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "api path not found",
//   });
// });


app.listen(PORT, () => {
    console.log(`Listen to port: ${PORT}`);
});