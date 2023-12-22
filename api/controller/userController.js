const asyncHandler = require("express-async-handler")
const {pool} = require("../queries")

/*
asyncHandler(async(req,res)=>{
    
})
*/
const getUser = asyncHandler(async(req,res)=>{
    const {column, value} = req.query
    // console.log(req.params)
    if(!column || !value){
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


const updateUser = asyncHandler(async(req,res)=>{
    const {id, columns, values} = req.body;
    let str = "UPDATE users SET";
    for (let index = 0; index < columns.length; index++) {
        const column = columns[index];
        const value = values[index];
        let tempStr = ` ${column} = '${value}'`
        str = str + tempStr
    }
    str = str + ` WHERE userid = ${id}`
    pool.query(str, (error, result) => {
        if (error) {
            console.log(error)
        }
        res.json(result.rows).status(200)
    }) 
    
})


const loginUser = asyncHandler(async(req,res)=>{
    
})

const createUser = asyncHandler(async(req,res)=>{

})



const deleteUser = asyncHandler(async(req,res)=>{
    
})

module.exports = {getUser,loginUser,createUser,deleteUser,updateUser}