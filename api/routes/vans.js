const express = require("express");
const router = express.Router();
const {getAllVans} = require("../controller/vansController")

router.get("/allVans", getAllVans);


module.exports = router