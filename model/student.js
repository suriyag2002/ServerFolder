const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

const Student = mongoose.model("Student", studentSchema);

// Save a new student
const newStudent = new Student({
  name: "John Doe",
  email: "john.doe@example.com"
});

newStudent.save()
  .then(() => console.log("Student added"))
  .catch(err => console.log("Error adding student:", err));
