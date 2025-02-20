const express = require("express");
const wardenModel = require("../Model/Schema/wardenModel");
const newRequestModel = require("../Model/Schema/newRequestModel");
const routes = express.Router();
const {
  wardenLoginController,
} = require("../Controller/wardenController/wardenLoginController");
const {
  passAcceptController,
  passRejectConroller,
  passPendingConroller,
  allAcceptController,
} = require("../Controller/wardenController/passController");

routes.post("/login", wardenLoginController);

routes.put("/passAccept/:id", passAcceptController);

routes.put("/passReject/:id", passRejectConroller);

routes.get("/pendingPasses", passPendingConroller);
routes.get("/acceptPasses", (req,res)=>{
  try {
    newRequestModel.find({status:"2"}).sort({createdAt:"descending"})
    .then((pass)=>{
      return res
              .json({message : "Accept Passes", pass, success : true})
    })
  } catch (error) {
      return res
              .json({message:error.message, success : false})
  }
});

routes.get("/rejectPasses", (req,res)=>{
  try {
    newRequestModel.find({status:"3"}).sort({createdAt:"descending"})
    .then((pass)=>{
      return res
              .json({message : "Accept Passes", pass, success : true})
    })
  } catch (error) {
      return res
              .json({message:error.message, success : false})
  }
});

routes.get("/:user",async(req,res)=>{
    const userId = req.params.user;
      try {
        await wardenModel.find({_id:userId})
        .then((data)=>{
          return res.status(200).json({message : "Ok", data, success : true})
        })
      } catch (error) {
        
      }

})
module.exports = routes;
