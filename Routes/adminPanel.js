const express = require("express")
const routes = express.Router()


routes.get("/",(req,res)=>{
    res.json({"Message" : "ok"})
})










module.exports = routes