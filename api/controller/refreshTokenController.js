const asyncHandler = require("express-async-handler")
// const { pool } = require("../queries")
const jwt = require("jsonwebtoken")

const refreshToken = asyncHandler(async (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt){
        res.status(401);
        throw new Error("no cookies available")
    }

    const refreshToken = cookies.jwt

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded)=>{
        if(err){
            res.status(401)
            throw new Error("User not Authorized");
        }
        
        const accessToken = jwt.sign({
            user:decoded.name,
            email:decoded.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" })
        res.json({accessToken})

         
    })
});

module.exports = refreshToken