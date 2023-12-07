const express = require ('express');

const usermodel = require('../models/location.js')

const router = express.Router()

router.post('/postlocations', async (req,res) =>{
    const reqdata = req.body;
    console.log("reqbody",req.body);

    let userdata = new usermodel({
      name : reqdata.name,
      city_id : reqdata.city_id,
      location_id: reqdata.location_id,
      city: reqdata.city,
      country_name: reqdata.country_name,
    })
    try {
        let finaluserdata = await userdata.save()
        res.status(200).json({"status":200, "data":finaluserdata, "message":"Location added successfully","error": false})
    }
    catch(error){
        res.status(400).json({"status":400, "message":error.message,"error": true})
    }
})

  // GET request to fetch all users
  router.get('/location', async (req, res) => {
    try {
      // Fetch all users from the database
      let getuserdata = await usermodel.find();
      var userdata = {
        "location" : getuserdata
      }
      // Send the users as the response
      res.status(200).json({"status":200, "data":userdata, "message":"User fetch successfully","error": false})
    } catch (error) {
      res.status(400).json({ status: 400, message: error.message, error: true });
    }
  });

module.exports = router;