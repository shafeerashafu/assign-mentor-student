import express from 'express';
import { mentor } from '../Database/models.js';
const mentorrouter = express.Router();


//Promise call for 1 second
const samPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Sample");
    }, 1000);
  });

//getting all mentor api
mentorrouter.get("/", async (req, res) => {
    try {
      const users = await mentor.find({}, { _id: 0, __v: 0 });
      await samPromise;
      res.send(users);
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Error in fetching the mentor data" });
    }
});

//getting a single mentor api
mentorrouter.get("/:mentorId", async (req, res) => {
    const { mentorId } = req.params;
    try {
      const user = await mentor.findOne({ mentorId }, { _id: 0, __v: 0 });
      res.send(user);
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Error in fetching the single mentor data" });
    }
  });

//creating a mentor api
mentorrouter.post("/", async (req, res) => {
    const { body } = req;
  
    try {
      const newuser = await new mentor({
        ...body,
        mentorId: Date.now().toString(),
      });
      await newuser.save(); // validate & insert a new mentor
      res.send(newuser);
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Error Occured while Creating an mentor" });
    }
});

export default mentorrouter;
