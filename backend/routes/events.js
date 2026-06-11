const express = require("express");
const Event = require("../models/Event");

const router = express.Router();

/*
CREATE EVENT
*/
router.post("/", async(req,res)=>{

    try{

        const event =
        await Event.create(req.body);

        res.status(201).json(event);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});

/*
GET EVENTS
*/
router.get("/", async(req,res)=>{

    try {
        const events =
        await Event.find().populate("club");

        res.json(events);
    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }

});

module.exports = router;
