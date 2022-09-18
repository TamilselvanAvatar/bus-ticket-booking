const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age : {
        required: true,
        type: Number
    },
    phNo :{
        required: true,
        type: Number
    },
    gender:{
        required: true,
        type: String
    },
    origin: {
        required: true,
        type: String
    },
    destination:{
        required : true,
        type : String
    },
    arrivalTime :{
        required : true,
        type : String
    },
    busNo:{
        required : true,
        type : String
    }
})

module.exports = mongoose.model("personModel",personSchema)