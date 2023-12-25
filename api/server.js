// import all the stuff
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const errorHandler = require("./middleware/errorHandler")
const validateToken = require("./middleware/validateToken")
const { pool } = require("./queries");
const cookieParser = require('cookie-parser')


app.use(bodyParser.json());

app.use(cookieParser())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS");
    next();
});


app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(errorHandler);
app.get("/", (req, res) => {
    res.json({ message: "Node js cool" });
});

app.use("/api/", require("./routes/vansRoute"))

app.use("/api/", require("./routes/userRoute"))

app.get("/api/refresh", require("./controller/refreshTokenController"))

app.listen(3000, () => {
    console.log("Listening to port 3000");
})