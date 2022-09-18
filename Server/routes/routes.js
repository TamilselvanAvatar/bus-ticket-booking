const express = require("express");
const Model = require("../models/busModel");
const router = express.Router();
var bodyParser = require('body-parser');
const personModel = require("../models/personModel");

var jsonParser = bodyParser.json()

// Insert Bus Information
router.post("/postBusInfo",jsonParser, (req, res) => {
  console.log(req);
  const data = new Model({
    busName: req.body["busName"],
    origin: req.body.origin,
    destination: req.body.destination,
    rate: req.body.rate,
    seatAvaivable: req.body.seatAvaivable,
    originTime: req.body.originTime,
    destinationTime: req.body.destinationTime,
    availableDay: [...req.body.availableDay],
    busNo : "TN-"+req.body.busNo
  });

  data.save().then(
    (dt) => res.status(200).json(dt),
    (err) => res.status(400).json({ message: err.message })
  );
});

// Get All Bus Details
router.get("/getBusDetails", (req, res) => {
  Model.find().then(
    (data) => res.json(data),
    (error) => res.status(500).json({ message: error.message })
  );
});

// Get Particular Bus Detail
router.get("/getBusDetail/:id", (req, res) => {
    Model.findById(req.params.id).then(
        (data) =>  res.json(data),
        (error) => res.status(500).json({ message: error.message })
      );
});

// Update Particular Bus Detail
router.patch("/updateBusDetail/:id", jsonParser, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send("Updated")
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

// Delete Bus Info
router.delete("/deleteBusDetail/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send("Deleted");
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
  
});

// Insert Person details
router.post("/postPersonInfo",jsonParser, (req, res) => {
    console.log(req);
    const data = new personModel({
      name: req.body.name,
      age:req.body.age,
      phNo:req.body.phNo,
      gender:req.body.gender,
      origin: req.body.origin,
      destination: req.body.destination,
      arrivalTime:req.body.arrivalTime,
      busNo : req.body.busNo
    });
  
    data.save().then(
      (dt) => res.status(200).json(dt),
      (err) => res.status(400).json({ message: err.message })
    );
  });


// Get Person Details
router.get("/getPersonDetails", (req, res) => {
  personModel.find().then(
    (data) => res.json(data),
    (error) => res.status(500).json({ message: error.message })
  );
});

module.exports = router;
