const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    busName: {
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
    rate :{
        required : true,
        type : Number
    },
    seatAvaivable : {
        required : true,
        type : Number
    },
    originTime : {
        require : true,
        type : String
    },
    destinationTime : {
        require : true,
        type : String
    },
    availableDay : {
        require: true,
        type : Array
    },
    busNo:{
        required : true,
        type : String
    }


})

module.exports = mongoose.model('Data', dataSchema)