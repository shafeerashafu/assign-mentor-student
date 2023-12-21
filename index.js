import  express  from "express";
import connectToDb from "./Database/mongoose-connection.js";
import mentorrouter from "./Routes/mentor.js";
import studentrouter from "./Routes/student.js";
import assignmentRouter from "./Routes/assignMentortoStudent.js";

const server =express();

//db connection
await connectToDb();

//middleware to process the body of the request
server.use(express.json());

//express router
server.use("/mentor",mentorrouter);
server.use("/student",studentrouter);
server.use("/assignserver",assignmentRouter);


//port creation
const port = 4000;

server.listen(port, () => {
  console.log("listening on port " + port);
});
