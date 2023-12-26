const asyncHandler = require("express-async-handler")
const { pool } = require("../queries")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
/*
asyncHandler(async(req,res)=>{
    
})
*/
const runFunc = (str, res) => {
    pool.query(str, (error, result) => {
        if (error) {
            res.status(400)
            throw new Error(error)
        }
        res.json(result).status(200)
    })
}
const createUser = asyncHandler(async (req, res) => {
    let { name, email, password, avatar, about, gender } = req.body
    if (!name || !email || !password || !gender) {
        res.status(400);
        throw new Error("fields: name, email, password, and gender  are mandatory")
    }
    // if(!avatar){
    //     avatar = 'DEFAULT'
    // }
    const hashedPassword = await bcrypt.hash(password, 10);
    // let str = `INSERT INTO users(name, email, password avatar, about, gender) VALUES ($1,$2,$3,$4,$5,$6)`
    const client = await pool.connect();
    try {
        const result = await client.query("INSERT INTO users VALUES (DEFAULT,$1,$2,$3,$4,$5,$6) RETURNING *", [name, email, hashedPassword, avatar, about, gender])
        res.json(result.rows).status(200)
    } catch (error) {
        throw new Error(error)
    }
    // const result = await pool.query(str,[name, email, hashedPassword, "DEFAULT", about, gender])

})


const getUser = asyncHandler(async (req, res) => {
    const { column, value } = req.query
    // console.log(req.params)
    if (!column || !value) {
        res.status(400)
        throw new Error(`"value" or "column" parameter required for the request is empty`)
    }
    str = `SELECT * FROM users WHERE ${column} ILIKE '${value}'`
    pool.query(str, (error, result) => {
        if (error) {
            console.log(error)
        }
        res.json(result.rows).status(200)
    })
})


const updateUser = asyncHandler(async (req, res) => {
    const { id, columns, values } = req.body;
    let str = "UPDATE users SET";
    for (let index = 0; index < columns.length; index++) {
        const column = columns[index];
        const value = values[index];
        let tempStr = ` ${column} = '${value}'`
        str = str + tempStr
    }
    str = str + ` WHERE userid = ${id} RETURNING *`
    pool.query(str, (error, result) => {
        if (error) {
            console.log(error)
        }
        res.json(result.rows).status(200)
    })

})



const loginUser = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("fields: email, password are mandatory")
    }
    const client = await pool.connect();
    let user;

    user = await client.query(`SELECT * FROM users WHERE email = '${email}'`)
    client.release()

    if(user.rowCount == 0){
        res.status(401).json({ error: `cannot find account with email:  "${email}"` })
        throw new Error("User not found")
    }


    // console.log(user)
    let condition
    try {
        condition = await bcrypt.compare(password, user.rows[0]?.password)
    } catch (error) {
        res.sendStatus(500)
    }
    if (condition) {
        console.log(bcrypt.compare(password, user.rows[0].password))
        const accessToken = jwt.sign({
            user: user.rows[0].name,
            email: user.rows[0].email
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30s" })

        const refreshToken = jwt.sign({
            user: user.rows[0].name,
            email: user.rows[0].email
        },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" })
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 })
        let userObj = user.rows[0]
        userObj.password = undefined
        res.json({ name: userObj.name, accessToken }).status(200)
    }
    else {
        res.status(401).json({ error: `email or password not valid` })
        // res.json({ error: "email or password not valid" }).status(401);
        throw new Error("email or password is not valid");
    }

})


const logoutUser = asyncHandler(async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        res.sendStatus(401);
        throw new Error("no cookies available")
    }
    // console.log(cookies) 
    const refreshToken = cookies.jwt

    res.clearCookie('jwt', { httpOnly: true, secure: true })
    res.json({ message: "Logged out successfully" })
})



const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body
    if (!id) {
        res.status(400)
        throw new Error("ID not provided");
    }
    const client = await pool.connect();
    try {
        const user = await client.query("DELETE FROM users WHERE userid=$1  RETURNING *", [id])
        res.status(200).json(user)
    } catch (error) {
        res.status(500)
        throw new Error("SOMETHING WENT WRONG");
    }
})

module.exports = { getUser, loginUser, createUser, deleteUser, updateUser, logoutUser }