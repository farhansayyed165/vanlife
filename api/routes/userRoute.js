const express = require("express")
const router = express.Router();
const {
    getUser, 
    loginUser, 
    deleteUser, 
    updateUser, 
    createUser} = require("../controller/userController")

router.get("/getUser", getUser);

router.put("/updateUser", updateUser)

module.exports = router;