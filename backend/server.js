const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔗 Connect MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected 🚀"))
.catch(err => console.log(err));

// 📦 Create Schema
const projectSchema = new mongoose.Schema({
    name: String,
    tech: String
});

// 📦 Create Model
const Project = mongoose.model("Project", projectSchema);

// 🟢 Test Route
app.get("/", (req, res) => {
    res.send("Backend with MongoDB running 🚀");
});

// 🟢 Get all projects from DB
app.get("/api/projects", async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});

// 🟢 Add project to DB
app.post("/api/projects", async (req, res) => {
    const newProject = new Project(req.body);
    await newProject.save();
    res.json(newProject);
});

// 🚀 Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});