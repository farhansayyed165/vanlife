// import all the stuff
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const errorHandler = require("./middleware/errorHandler")
const validateToken = require("./middleware/validateToken")
const { pool } = require("./queries");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(errorHandler);
app.get("/", (req, res) => {
    res.json({ message: "Node js cool" });
});

app.use("/api/", require("./routes/vansRoute"))

app.use("/api/", require("./routes/userRoute"))

app.listen(3000, () => {
    console.log("Listening to port 3000");
})