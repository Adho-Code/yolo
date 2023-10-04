const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const upload = multer();

const productRoute = require('./routes/api/productRoute');

// Connect to the MongoDB database
// connecting the database
let mongodb_url = 'mongodb+srv://adhogalgallo:uXxUdeqrE7LWgwFD@cluster0.wge4lfn.mongodb.net/';
let dbName = 'yolomy';
mongoose.connect(`${mongodb_url}${dbName}`,{ useNewUrlParser: true , useUnifiedTopology: true }, (err)=>{
    if (err) console.log(err)
});

// Check Connection
const db = mongoose.connection;
db.once('open', () => {
  console.log('Database connected successfully');
});


// Check for DB Errors
db.on('error', (error)=>{
    console.log(error);
})

// Initializing express
const app = express()

// Body parser middleware
app.use(express.json())

// 
app.use(upload.array()); 

// Cors 
app.use(cors());

// Use Route
app.use('/api/products', productRoute)

// Define the PORT
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})



















