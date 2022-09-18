require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const mongoString = process.env.DATABASE_URL;
const routes = require('./routes/routes');


// Connect Database

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

// Express Logics 

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes)


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})