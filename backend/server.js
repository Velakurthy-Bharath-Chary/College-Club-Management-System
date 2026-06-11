require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const userRoutes = require("./routes/users");
const clubRoutes = require("./routes/clubs");
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const membershipRoutes = require("./routes/memberships");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/memberships",membershipRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

connectDB().then(() => {
    app.listen(5000, () => {
        console.log("Server running on port 5000");
    });
});
