const express = require ('express');

const usermodel = require('../models/mealtypes.js')

const router = express.Router()

router.post('/postmealtypes', async (req,res) =>{
    const reqdata = req.body;
    console.log("reqbody",req.body);

    let userdata = new usermodel({
      name : reqdata.name,
      content : reqdata.content,
      image: reqdata.image,
      meal_type: reqdata.meal_type,
    })
    try {
        let finaluserdata = await userdata.save()
        res.status(200).json({"status":200, "data":finaluserdata, "message":" Mealtypes added successfully","error": false})
    }
    catch(error){
        res.status(400).json({"status":400, "message":error.message,"error": true})
    }
})

  // GET request to fetch all users
  router.get('/mealtypes', async (req, res) => {
    try {
      // Fetch all users from the database
      let getuserdata = await usermodel.find();
      var userdata = {
        "mealtypes" : getuserdata
      }
      // Send the users as the response
      res.status(200).json({"status":200, "data":userdata, "message":"User fetch successfully","error": false})
    } catch (error) {
      res.status(400).json({ status: 400, message: error.message, error: true });
    }
  });

module.exports = router;