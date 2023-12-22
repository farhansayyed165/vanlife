const asyncHandler = require("express-async-handler")
const {pool} = require("../queries")

const getAllVans = asyncHandler(async (req, res)=>{
    pool.query("SELECT * FROM vans ORDER BY vanid ASC;", (error, result) => {
        if (error) {
            console.log(error)
        }
        res.json(result.rows).status(200)
    })
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