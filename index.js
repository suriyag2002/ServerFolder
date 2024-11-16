const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./model/Employee");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Atlas URI with your username and password directly
const uri = "mongodb+srv://suriyagunasekaran2002:yqpATOF7PHoeScSJ@cluster.1i07b.mongodb.net/employee?retryWrites=true&w=majority";

// Connect to MongoDB Atlas
mongoose.connect(uri)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Error connecting to MongoDB: ", err));

// Routes
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
