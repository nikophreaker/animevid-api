const express = require("express");
const app = express();
const updatedEps = require("./routers/updated-eps");
const cors = require("cors");
const helmet = require("helmet");
const PORT = 8000;

app.use(cors());
app.use(helmet());
app.get("/api/updated-list/page/:pagenumber", updatedEps);
// app.get("/test", updatedEps);

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


