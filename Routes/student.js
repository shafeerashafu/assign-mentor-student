import express from 'express';
import { student } from '../Database/models.js';
const studentrouter = express.Router();

const samPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Sample");
    }, 1000);
});

//getting all student api
studentrouter.get("/", async (req, res) => {
    try {
      const users = await student.find({}, { _id: 0, __v: 0 });
      await samPromise;
      res.send(users);
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Error in fetching the student data" });
    }
});

//getting a single student api
studentrouter.get("/:studentId", async (req, res) => {
    const { studentId } = req.params;
    try {
      const user = await student.findOne({ studentId }, { _id: 0, __v: 0 });
      res.send(user);
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Error in fetching the single student data" });
    }
});

//creating a student api
studentrouter.post("/", async (req, res) => {
    const { body } = req;
  
    try {
      const newuser = await new student({
        ...body,
        studentId: Date.now().toString(),
      });
      await newuser.save(); // validate & insert a new student
      res.send(newuser);
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Error Occured while Creating a student" });
    }
});

// updating student details
studentrouter.put("/:studentId", async (req, res) => {
    const { body } = req;
    const { studentId } = req.params;
  
    try {
      const newBody = {
        ...body,
        studentId,
      };
      await new student(newBody).validate(); // manually validate
  
      const user = await student.findOne({ studentId: studentId });
  
      if (user) {
        await student.updateOne({ studentId }, { $set: newBody });
  
        res.send({ msg: "User Updated Successfully" });
      } else {
        res.status(404).send({ msg: "User Not Found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Error Occured while updating an user" });
    }
});




export default studentrouter;