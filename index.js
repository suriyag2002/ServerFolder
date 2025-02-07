require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const uri = process.env.MONGO_URI || "mongodb+srv://suriyagunasekaran2002:suriyagunasekaran2002@cluster.1i07b.mongodb.net/studentdb?retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Error connecting to MongoDB: ", err));

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    res.json("Success");
});

// Example of a POST route for registration
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    // Here, you should handle the registration logic (e.g., save to MongoDB)
    
    // Example response (you can replace this with actual registration logic)
    if (name && email && password) {
        return res.json({ message: "User registered successfully" });
    } else {
        return res.status(400).json({ message: "Missing required fields" });
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
