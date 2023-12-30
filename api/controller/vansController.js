const asyncHandler = require("express-async-handler")
const {pool} = require("../queries")

const getAllVans = asyncHandler(async (req, res)=>{
    const { userId } = req.body
    if(!userId){
        const error = "UserId not provided"
        res.json({error}).status(400)
        throw new Error(error)
    }
    const client = await pool.connect()
    const vans = await client.query("SELECT * FROM vans WHERE userid = $1", [userId])
    if(vans.rowCount == 0){
        console.log("vans",vans.rows, vans.rowCount)
        const error = "No Hosted vans"
        client.release()
        res.json({error}).status(204)
    }
    console.log(vans.rows)
    res.json({vans:vans.rows}).json(200)
});

const getQueryVans = asyncHandler(async (req, res)=>{
    if(!req.query){
        getAllVans()
    }
    const {price, type} = req.query;
    let str = 'SELECT * FROM vans '
    if(type == 'luxury' || type == 'rugged' || type == 'simple'){
       let typeStr = ` WHERE type='${type}' `  
       str = str + typeStr
    }
    if(price == 'asc' || price =='desc'){
        let priceStr = ` ORDER BY price ${price} `
        str = str + priceStr
    }
    pool.query(str, (error, result) => {
        if (error) {
            console.log(error)
        }
        res.json(result.rows).status(200)
    })
});
module.exports = {getAllVans, getQueryVans}