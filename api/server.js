// import all the stuff
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const errorHandler = require("./middleware/errorHandler")
const validateToken = require("./middleware/validateToken")
const { pool } = require("./queries");
const cookieParser = require('cookie-parser')
// const cors = require('cors')
const corsOptions = require("./config/corsOptions")


// app.use(bodyParser.json());
// app.use(cors(corsOptions));

app.use(cookieParser())

var cors = require('cors');
app.use(cors());
app.options('*',cors());
var allowCrossDomain = function(req,res,next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();  
}
app.use(allowCrossDomain);


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