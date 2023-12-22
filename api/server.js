// import all the stuff
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { pool } = require("./queries");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.get("/", (req, res) => {
    res.json({ message: "Node js cool" });
});

app.use("/api/", require("./routes/vans"))

app.listen(3000, () => {
    console.log("Listening to port 3000");
})