const express = require("express");
const Club = require("../models/Club");

const router = express.Router();

/*
CREATE CLUB
*/
router.post("/", async (req, res) => {

    try {

        const club = await Club.create(req.body);

        res.status(201).json(club);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/*
GET ALL CLUBS
*/
router.get("/", async (req, res) => {

    try {

        const clubs = await Club.find();

        res.json(clubs);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/*
UPDATE CLUB
*/
router.put("/:id", async (req, res) => {

    try {

        const club = await Club.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(club);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/*
DELETE CLUB
*/
router.delete("/:id", async (req, res) => {

    try {

        await Club.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Club Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;