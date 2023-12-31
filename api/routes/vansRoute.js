const express = require("express");
const router = express.Router();
const {getAllVans, getQueryVans} = require("../controller/vansController")

router.post("/getHostVans", getAllVans);

router.get("/vans", getQueryVans)


module.exports = router