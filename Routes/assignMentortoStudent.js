import express from 'express';

import { mentor, student } from '../Database/models.js';

const assignmentRouter = express.Router();


// Assigning  mentor for a student by parallely updating studentAssigned in mentor schema.
assignmentRouter.post('/assign-mentor-to-student', async (req, res) => {
  const { studentId, mentorId } = req.body;

  try {
    const studentData = await student.findOne({ studentId });
    const mentorData = await mentor.findOne({ mentorId });

    if (!studentData || !mentorData) {
      return res.status(404).json({ error: 'Student or Mentor not found' });
    }

    if (studentData.currentMentor) {
      return res.status(400).json({ error: 'Student already has a mentor' });
    }

    studentData.currentMentor = mentorData._id;
    await studentData.save();

    // Update the studentsAssigned field in the mentor schema
    mentorData.studentsAssigned.push(studentData._id);
    await mentorData.save();

    return res.status(200).json({ success: 'Mentor assigned to student successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error assigning mentor to student' });
  }
});



//Change mentor for student such that updating currentMentor field and prevMentor field and also studentAssigned field in schema.
assignmentRouter.post('/assignmentortostudent', async (req, res) => {
  const { studentId, mentorId } = req.body;

  try {
    const studentData = await student.findOne({ studentId });
    const mentorData = await mentor.findOne({ mentorId });

    if (!studentData || !mentorData) {
      return res.status(404).json({ error: 'Student or Mentor not found' });
    }

    // If the student already has a mentor, update fields accordingly
    if (studentData.currentMentor) {
      const previousMentorId = studentData.currentMentor;
      studentData.previousMentor = previousMentorId;
      mentorData.studentsAssigned = mentorData.studentsAssigned.filter(
        (student) => !student.equals(studentData._id)
      );
    }

    studentData.currentMentor = mentorData._id;
    await studentData.save();

    mentorData.studentsAssigned.push(studentData._id);
    await mentorData.save();

    return res.status(200).json({ success: 'Mentor assigned to student successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error assigning mentor to student' });
  }
});




// Showing all students for a particular mentor
assignmentRouter.get('/students-for-mentor/:mentorId', async (req, res) => {
  const { mentorId } = req.params;

  try {
    const mentorData = await mentor.findOne({ mentorId }).populate('studentsAssigned');

    if (!mentorData) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    return res.status(200).json(mentorData.studentsAssigned);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching students for mentor' });
  }
});




// Showing the previously assigned mentor for a particular student
assignmentRouter.get('/previous-mentor-for-student/:studentId', async (req, res) => {
  const { studentId } = req.params;

  try {
    const studentData = await student.findOne({ studentId });

    if (!studentData) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const previousMentorId = studentData.previousMentor;
    const previousMentor = await mentor.findById(previousMentorId);

    return res.status(200).json(previousMentor);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching previous mentor for student' });
  }
});




export default assignmentRouter;
