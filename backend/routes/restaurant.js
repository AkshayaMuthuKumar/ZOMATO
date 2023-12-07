const express = require ('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());

const Restaurant = require('../models/restaurant.js')

const router = express.Router()

router.post('/postrestaurant', async (req,res) =>{
    const reqdata = req.body;
    console.log("reqbody",req.body);

    let userdata = new Restaurant({

      name : reqdata.name,
      city : reqdata.city,
      location_id : reqdata.location_id,
      city_id :reqdata.city_id,
      thumb :reqdata.thumb,
      aggregate_rating : reqdata.aggregate_rating,
      rating_text : reqdata.rating_text,
      min_price : reqdata.min_price,
      contact_number : reqdata.contact_number,
      cuisine : reqdata.cuisine,
      image : reqdata.image,
      mealtype_id : reqdata.mealtype_id
        })

    try {
        let finaluserdata = await userdata.save()
        res.status(200).json({"status":200, "data":finaluserdata, "message":"Restaurant added successfully","error": false})
    }
    catch(error){
        res.status(400).json({"status":400, "message":error.message,"error": true})
    }
})

  router.get('/restaurant', async (req, res) => {
    try {
      let getuserdata = await Restaurant.find();
      var userdata = {
        "restaurant" : getuserdata
      }
      res.status(200).json({"status":200, "data":userdata, "message":"User fetch successfully","error": false})
    } catch (error) {
      res.status(400).json({ status: 400, message: error.message, error: true });
    }
  });

  router.get('/restaurant/:id', async (req, res) => {
    const resId = req.params.id; 
    if (!mongoose.Types.ObjectId.isValid(resId)) {
        return res.status(400).json({ error: "Invalid 'id' parameter" });
    }
    try {
        const restaurant = await Restaurant.findById(resId);

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        const mealitems = restaurant.mealitems;

        res.status(200).json({
            message: "Restaurant fetched successfully",
            restaurant: restaurant,
            mealitems: mealitems, // Include mealitems in the response
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/restaurantslocation/:id', async (req, res) => {
  try {
      var filter = req.params.id.length > 5 ? { _id: req.params.id } : { location_id: req.params.id }
      let getuserdata = await Restaurant.find(filter);
      var restaurantData = {
          "restaurant": getuserdata
      }
      res.status(200).json({ "status": 200, "data": restaurantData, "message": "Successfully", "error": false })
  }
  catch (error) {
      res.status(400).json({ "status": 400, "message": error.message, "error": true })
  }
})
  
router.post('/filter', async (req, res) => {
  let { meal_type, locations, cuisine, lcost, hcost, sort, page } = req.body;
  console.log("data is", req.body);

  sort = sort ? sort : 1;
  page = page ? page : 1;

  const ItemsPerPage = 2;

  let startIndex = ItemsPerPage * page - ItemsPerPage;
  let endIndex = ItemsPerPage * page + 1;

  let filterObj = {};

  meal_type && (filterObj['mealtype_id'] = meal_type);
  locations && (filterObj['location_id'] = locations);
  cuisine && (filterObj['cuisine'] = { $in: cuisine });
  lcost && hcost && (filterObj['min_price'] = { $lte: hcost, $gte: lcost });

  Restaurant.find(filterObj).sort({ min_price: sort }).then(response => {
      const paginatedResponse = response.slice(startIndex, endIndex);
      let arr = [];
      for (let i=1; i<=Math.ceil(response.length / ItemsPerPage); i++){
          arr.push(i);
      }

      res.status(200).json({
        message: "Restaurants added successfully",
        restaurants: paginatedResponse, 
        pageCount: arr,
        currentPage: page
      });
    })

    .catch(err => {
      res.status(500).json({ error: err });
    });
  });

module.exports = router; 