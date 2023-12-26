// import all the stuff
const express = require("express");
const app = express();
const errorHandler = require("./middleware/errorHandler")
const validateToken = require("./middleware/validateToken")
const { pool } = require("./queries");
const cookieParser = require('cookie-parser')

const cors = require("cors");

app.use(cookieParser())

app.use(express.json())

const corsConfig = {
    credentials: true,
    origin: true,
};

app.use(cors(corsConfig));

app.use(errorHandler);

app.use(express.urlencoded({
    extended: true,
}));

app.get("/", (req, res) => {
    res.json({ message: "Node js cool" });
});

app.use("/api/", require("./routes/vansRoute"))

app.use("/api/", require("./routes/userRoute"))

app.get("/api/refresh", require("./controller/refreshTokenController"))

app.listen(3000, () => {
    console.log("Listening to port 3000");
})