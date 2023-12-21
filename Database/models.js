import mongoose from "mongoose";

//creating mentor-object-schema
const mentorSchema = new mongoose.Schema({
    mentorId: {
        type: "string",
        required: true,
    },
    name: {
        type: "string",
        required: true,
    },
    email: {
        type: "string",
        required: true,
    },
    course : {
        type : "string",
        required : true
    },
    studentsAssigned: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        default: [],
      }],
});

const mentor = new mongoose.model("mentor",mentorSchema,"mentordata");

//creating student-object-schema
const studentSchema = new mongoose.Schema({
    studentId: {
        type: "string",
        required: true,
    },
    name: {
        type: "string",
        required: true,
    },
    email: {
        type: "string",
        required: true,
    },
    currentMentor :  
        {
          type:"string",
        },
    
    previousMentor : {
        type: "string",
    }
});

const student = new mongoose.model("student",studentSchema,"studentdata");

export {mentor,student};

