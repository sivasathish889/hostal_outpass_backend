const jwt = require("jsonwebtoken")
require("dotenv").config()


const generateJwtToken = (data) => {
    return jwt.sign(data, process.env.JWT_PRIVATE_KEY,{algorithm : "HS256"} )
}

const verifyJwtToken = (enCodedToken) => {
    return jwt.verify(enCodedToken, process.env.JWT_PRIVATE_KEY)
}

module.exports = {generateJwtToken, verifyJwtToken}