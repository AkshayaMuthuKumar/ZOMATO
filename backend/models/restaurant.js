const mongoose = require('mongoose');

const restaurant = new mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    city :{
        type : String,
        required : true,
    },
    location_id :{
        type : Number,
        required : true,
    },
    city_id :{
        type : Number,
        required : true,
    },
    thumb :{
        type : Array,
        required : true,
    },
    aggregate_rating :{
        type : Number,
        required : true,
    },
    rating_text :{
        type : String,
        required : true,
    },
    min_price :{
        type : Number,
        required : true,
    },
    contact_number :{
        type : Number,
        required : true,
    },
    cuisine :{
        type : Array,
        required : true,
    },
    image :{
        type : String,
        required : true,
    },
    mealtype_id :{
        type : Number,
        required : true,
    },
    meal_name :{
        type : Array,
        required : true,
    },
    description :{
        type : Array,
        required : true,
    },
    meal_image :{
        type : Array,
        required : true,
    },
    price :{
        type : Array,
        required : true,
    }
});

restaurant.virtual('mealitems').get(function () {
    const mealitems = [];
    for (let i = 0; i < this.meal_name.length; i++) {
        mealitems.push({
            meal_name: this.meal_name[i],
            price: this.price[i],
            description: this.description[i],
            meal_image: this.meal_image[i],
            qty : 0
        });
    }
    return mealitems;
});

module.exports = mongoose.model('restaurant', restaurant);