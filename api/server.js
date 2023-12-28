// import all the stuff
const express = require("express");
const app = express();
const errorHandler = require("./middleware/errorHandler")
const validateToken = require("./middleware/validateToken")
const { pool } = require("./queries");
const cookieParser = require('cookie-parser')
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const {getImageUrl} = require("./config/awsConfig")

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

app.get("/file",upload.single("image"), async (req, res)=>{
    console.log(req.body)
    console.log(req.file)
    res.send(req.body)
})

app.use("/api/", require("./routes/vansRoute"))

app.use("/api/", require("./routes/userRoute"))

app.get("/api/getUrl", async (req, res)=>{
    const url = await generateUploadUrl()
    res.send({url})
})

app.get("/api/refresh", require("./controller/refreshTokenController"))

app.listen(3000, () => {
    console.log("Listening to port 3000");
})