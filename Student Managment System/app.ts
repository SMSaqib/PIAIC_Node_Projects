#!/usr/bin/env node
import * as path from 'path';
import  sqlite3 from 'sqlite3';
import inquirer from 'inquirer';
import {Course, CourseRepository,courseColumnName,courses_array} from "./Course/course.js"
import {login,ForgetPAssword,std_options,getStudentInput,FurtherAction,Std_remove_record,Std_update_record,verifyStudent,get_Student_Porgamm_Input, get_Student_Semester_Input} from './functions/student_fucntions.js'
import { StudentRepository} from './student/student.js';
import chalkanimation from "chalk-animation"
import { fileURLToPath } from 'url';
import { promises } from 'dns';
import { count } from 'console';
const __filename = fileURLToPath(import.meta.url);
console.log(__filename)
const __dirname = path.dirname(__filename);
console.log(__dirname)
const relativeFilePath: string = 'students.db';
const absoluteFilePath: string = path.join(__dirname, relativeFilePath);
let db = new sqlite3.Database(absoluteFilePath); // db access for student table
let studentRepo = new StudentRepository(db);
let Coursedetail_repository= new CourseRepository(db)
const allStudents = await studentRepo.getAllStudents();
console.log("this table shows only for learning purpose")
console.table(allStudents)
// App Start  here


let confirmation=await inquirer.prompt([
  { message:"Please Select Your Operation",
    type:"list",
 choices:["Register","Login","Forget Password"],
name:"IConfirmation"
}
])

switch(confirmation.IConfirmation){
case "Register":
 await studentRepo.addStudent()
 console.log("please continue to login and select your course details ")
 
await login(studentRepo)   
//await Coursedetail_repository.addCourse()
let CourseList_choose = await Coursedetail_repository.prg_list();
//console.log(CourseList_choose)
let course_selection=await get_Student_Porgamm_Input(CourseList_choose)
// console.log(course_selection.IProgm);
let semeseter_selection=await  Coursedetail_repository.Semester_list(<string>course_selection.IProgm)
// console.log(semeseter_selection)
let Semester_selection_01=await get_Student_Semester_Input(semeseter_selection)

let coruseSelectionsDetails=await Coursedetail_repository.Courses_list_bySemester(course_selection.IProgm,Semester_selection_01.ISemester)
//console.table(coruseSelectionsDetails)
let total_Charges=await Coursedetail_repository.Courses_Charges_bySemester(course_selection.IProgm,Semester_selection_01.ISemester)
console.log("Your Total Charges which you have to Pay:",total_Charges ,"PKR.")

break;

case "Forget Password":    
    let input_id= await ForgetPAssword()
    let get_password=await studentRepo.getStudentPasswordById(input_id.IForgetPAsswordID,"id")
    console.log("your Password is :"+get_password)
    break;
    case "Login":

    await login(studentRepo)
      let b= await FurtherAction()
      switch(b.IFurtherAction){
      
            case"Remove Record":
    
                let x=  await Std_remove_record()
                await studentRepo.deleteStudent(x.IEnterColumntoDelete,x.IEnterValuetoDelete)
                break;
    
      case "Modify your Record":    
      let Update_Std_record= await  Std_update_record()
      await studentRepo.updateStudent(
        Update_Std_record.IUpdate_Crit_column,
        Update_Std_record.IUpdate_Crit_Val,
        Update_Std_record.IUpdate_update_column,
        Update_Std_record.IUpdate_update_Val)
        break;
      }
  
  }





