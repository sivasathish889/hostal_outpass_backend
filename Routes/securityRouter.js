const express = require("express")
const routes = express.Router()


routes.get("/register",(req,res)=>{
    res.json({"Message" : "ok"})
})










module.exports = routes