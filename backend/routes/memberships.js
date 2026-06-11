const express = require("express");
const Membership = require("../models/Membership");

const router = express.Router();

/*
JOIN CLUB
*/
router.post("/", async (req, res) => {
    try {
        const membership = await Membership.create(req.body);
        res.status(201).json(membership);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/*
GET MEMBERSHIPS
*/
router.get("/", async (req, res) => {
    try {
        const memberships = await Membership.find()
            .populate("student", "name email role")
            .populate("club");

        res.json(memberships);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/*
APPROVE MEMBERSHIP
*/
router.put("/:id/approve", async (req, res) => {
    try {
        const membership = await Membership.findByIdAndUpdate(
            req.params.id,
            { status: "approved" },
            { new: true }
        );

        res.json(membership);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
