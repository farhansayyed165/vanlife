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



module.exports = {getAllVans}