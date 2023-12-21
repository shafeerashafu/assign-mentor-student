Github repo url : https://github.com/shafeerashafu/assign-mentor-student.git


Backend deployed url : https://assign-mentor-student-4xgj.onrender.com

1. Creating a mentor.
Method : POST

BE URL : https://assign-mentor-student-4xgj.onrender.com/mentor

2. Creating a student.
Method : POST

BE URL : https://assign-mentor-student-4xgj.onrender.com/student

3. Assigning a student to a mentor [by parallely updating studentAssigned in mentor schema]
Method : POST

BE URL : https://assign-mentor-student-4xgj.onrender.com/assignserver/assign-mentor-to-student

4. Changing mentor for a student [such that updating currentMentor field and prevMentor field and also studentAssigned field in schema]
Method : POST

BE URL : https://assign-mentor-student-4xgj.onrender.com/assignserver/assignmentortostudent

5. Showing all students for a particular mentor.
Method : GET with path param(mentorId)

BE URL : https://assign-mentor-student-4xgj.onrender.com/assignserver/students-for-mentor/:mentorId

6. Showing the previously assigned mentor for a particular student.
Method : GET with path param(studentId)

BE URL : https://assign-mentor-student-4xgj.onrender.com/assignserver/previous-mentor-for-student/:studentId

