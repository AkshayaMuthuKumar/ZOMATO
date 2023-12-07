const express = require ('express');
const mongoose = require ('mongoose');
const cors = require ('cors');
const userroute = require('./routes/location.js')
const userroute2 = require('./routes/restaurant.js')
const userroute3 = require('./routes/mealtypes.js')
const userroute4 = require('./routes/user.js')


const mongoString = "mongodb://0.0.0.0:27017/location"

mongoose.connect(mongoString)

let database = mongoose.connection;
database.on('error',(error)=>{
    console.log(error);
})

database.once('connected', () =>{
    console.log("Database Connected");
})

const app = express()
app.use(cors());
                                         
app.use(express.json());

app.use('/location', express.static('location'));
app.use('/restaurant', express.static('restaurant'));
app.use('/mealtypes', express.static('mealtypes'));
app.use('/restaurant/filter', express.static('restaurant'));
app.use('/payment', express.static('payment'));
app.use('/register', express.static('user'));
app.use('/login', express.static('user'));

app.use('/common', userroute);
app.use('/common', userroute2);
app.use('/common', userroute3);
app.use('/common', userroute4);

app.use((req,res,next) => {
    res.status (404).send({"status":404,"message":"Api url not found","error":true})
})

app.listen(5000,()=>{
    console.log(`server started at ${5000}`)
})
    
