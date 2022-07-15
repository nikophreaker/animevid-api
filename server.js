const express = require("express"),
    app = express();
// const fastify = require("fastify"),
//     app = fastify();
const updatedEps = require("./routers/updated-eps");
const watchEps = require("./routers/watch-eps");
const searchAnime = require("./routers/search-anime");
const detailAnime = require("./routers/detail-anime");
const cors = require("cors");
const helmet = require("helmet");
const PORT = 8000;

app.use(cors());
app.use(helmet());
app.use("/api", updatedEps);
app.use("/api", watchEps);
app.use("/api/search", searchAnime);
app.use("/api/anime", detailAnime);
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