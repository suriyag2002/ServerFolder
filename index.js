// Load environment variables from the .env file
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./model/Employee");

const app = express();

// Middleware
app.use(express.json());  // Parses incoming JSON data
app.use(cors());  // Enable CORS for all domains (you can specify domains if needed)

// MongoDB Atlas URI from environment variables or fallback to the hardcoded string
const uri = process.env.MONGO_URI || "mongodb+srv://suriyagunasekaran2002:yqpATOF7PHoeScSJ@cluster.1i07b.mongodb.net/employee?retryWrites=true&w=majority";

// Connect to MongoDB Atlas
mongoose.connect(uri)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Error connecting to MongoDB: ", err));

// Routes
// Login Route
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Find the employee by email
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("The password is incorrect");
                }
            } else {
                res.json("No record found");
            }
        })
        .catch(err => res.json("Error: " + err));
});

// Register Route
app.post("/register", (req, res) => {
    const newEmployee = new EmployeeModel(req.body);
    
    // Save new employee to the database
    newEmployee.save()
        .then(employee => res.json(employee))
        .catch(err => res.json("Error: " + err));
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
