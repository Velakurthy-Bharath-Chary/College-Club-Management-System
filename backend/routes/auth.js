const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/*
TEST ROUTE
*/
router.get("/", (req, res) => {
    res.send("Auth Route Working");
});

/*
REGISTER
*/
router.post("/register", async (req, res) => {

    try {

        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }

        const existingUser =
            await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        await User.create({

            name,
            email,
            password: hashedPassword,
            role: role || "student"

        });

        res.status(201).json({
            message: "User Registered Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/*
LOGIN
*/
router.post("/login", async (req, res) => {

    try {
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                message: "JWT_SECRET is missing in environment variables"
            });
        }

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                message: "Email and Password required"
            });

        }

        const user =
            await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "Invalid Email or Password"
            });

        }

        const match =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!match) {

            return res.status(400).json({
                message: "Invalid Email or Password"
            });

        }

        const token = jwt.sign(

            {
                id: user._id,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );

        res.json({

            message: "Login Successful",
            token,
            role: user.role,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/*
PROFILE (PROTECTED)
*/
router.get(
    "/profile",
    authMiddleware,
    async (req, res) => {

        try {

            const user = await User.findById(
                req.user.id
            ).select("-password");

            res.json(user);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);

module.exports = router;
