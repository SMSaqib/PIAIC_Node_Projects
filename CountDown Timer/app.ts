#!usr/bin/env node
import  sqlite3 from 'sqlite3';
import inquirer from 'inquirer';
import { Student, StudentRepository,FurtherAction } from './student.js';
import chalkanimation from "chalk-animation"
// Create a SQLite database connection
let db = new sqlite3.Database('students.db');

// Initialize the StudentRepository
let studentRepo = new StudentRepository(db);

const allStudents = await studentRepo.getAllStudents();
console.table(allStudents);


let confirmation=await inquirer.prompt([
  {message:"Are You Registered Student",
 type:"list",
 choices:["Yes","NO"],
name:"IConfirmation"
}
])

switch(confirmation.IConfirmation){
case "Yes":
 await studentRepo.addStudent()
break;
case "NO":
  let b= await FurtherAction()
  switch(b.IFurtherAction){
  case"Remove Record":
  let EnterIDtoDelete=await inquirer.prompt([
  {message:"Please Enter  Column Name",
 type:"list",
name:"IEnterColumntoDelete",
choices:["firstName", "lastName", "age", "grade"]
// validate: (x) => {
//   if (typeof x === "string" && x.match(/^\d{1,4}$/)) {
//     return true;
//   } else {
//     return false;
//   }
// },
  },
  {message:"Please Enter Value",
  type:"input",
 name:"IEnterValuetoDelete",
 }
])
await studentRepo.deleteStudent(EnterIDtoDelete.IEnterColumntoDelete,EnterIDtoDelete.IEnterValuetoDelete)
break;
case "Update Record":
  let Update_Std_record=await inquirer.prompt([
    {message:"Please Enter Criteria Column Name",
   type:"list",
  name:"IUpdate_Crit_column",
  choices:["ID","firstName", "lastName", "age", "grade"]
    },
    {message:"Please Enter lookup/Criteria Value",
    type:"input",
   name:"IUpdate_Crit_Val",
   },
   {message:"Please Select Filed for update ",
   type:"list",
  name:"IUpdate_update_column",
  choices:["ID","firstName", "lastName", "age", "grade"]
    },
    {message:"Please Enter  Value to update",
    type:"input",
   name:"IUpdate_update_Val",
   }

  ])

  console.table(Update_Std_record)
  await studentRepo.updateStudent(Update_Std_record.IUpdate_Crit_column,Update_Std_record.IUpdate_Crit_Val,Update_Std_record.IUpdate_update_column,Update_Std_record.IUpdate_update_Val)

}



}

(async () => {
  // Add a new student
  //  await studentRepo.addStudent()

  // // Retrieve a student by ID
  // const student = await studentRepo.getStudentById(1);
  // console.log('Retrieved student:', student);

  // // Update a student's information
  // if (student) {
  //   student.grade = 'B';
  //   studentRepo.updateStudent(student);
  // }

  // Retrieve all students
  let allStudents = await studentRepo.getAllStudents();
  console.log('All students:', allStudents);

  // // Delete a student by ID
  // studentRepo.deleteStudent(1);
})();
