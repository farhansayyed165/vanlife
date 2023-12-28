const express = require("express")
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
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

router.get("/getVans", validateToken,(req,res)=>{
    res.send("yes")
});

router.get("/logoutUser", logoutUser);

router.put("/updateUser", validateToken, updateUser);  

router.post("/createUser",upload.single("image"), createUser);

router.post("/loginUser", loginUser);

router.delete("/deleteUser", validateToken, deleteUser);

module.exports = router;