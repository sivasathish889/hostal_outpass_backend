const bcrypt = require("bcrypt")

const saltRounds = 10

const generateHashPassword = (password) =>{
    return bcrypt.hashSync(password, saltRounds)
}

const comparePassword = (password, hashPassword)=>{
    return bcrypt.compareSync(password,hashPassword)
}

module.exports = { generateHashPassword, comparePassword }