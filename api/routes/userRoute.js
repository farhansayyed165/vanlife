const express = require("express")
const router = express.Router();
const validateToken = require("../middleware/validateToken")
const {
    getUser, 
    loginUser, 
    deleteUser, 
    updateUser, 
    createUser,
    logoutUser} = require("../controller/userController")

router.get("/getUser", getUser);

router.get("/logoutUser", logoutUser);

router.put("/updateUser", validateToken, updateUser);  

router.post("/createUser", createUser);

router.post("/loginUser", loginUser);

router.delete("/deleteUser", validateToken, deleteUser);

module.exports = router;