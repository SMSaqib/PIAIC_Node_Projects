import inquirer from "inquirer"
import {getStudentInput,FurtherAction,Std_remove_record,Std_update_record} from '../functions/student_fucntions.js'// Define an interface for a Student
import {generateUniqueId} from './UniqueStudentID.js'

interface Student {
    id?: string|number;
    firstName: string;
    lastName: string;
    age: number;
    grade: string;
    password:string;
    email:string
  }

// this is the function 


  class StudentRepository {
    
    private db: any; // SQLite database connection
  
    constructor(db: any) {
      this.db = db || "students.db";
      this.createTable();
      this.createTable1()
    }
  
    // Create the Student table if it doesn't exist
    private createTable1() {
      const sql = `
        CREATE TABLE IF NOT EXISTS studentsCourse (
          courseid TEXT PRIMARY KEY ,
          programid TEXT,
          student_id TEXT,
          date INTEGER,
          fee_deposit float,
          Arears float
        )
      `;
      this.db.run(sql);
    }

    private createTable() {
      const sql = `
        CREATE TABLE IF NOT EXISTS students (
          id TEXT PRIMARY KEY ,
          firstName TEXT,
          lastName TEXT,
          age INTEGER,
          grade TEXT,
          Password TEXT,
          email TEXT
        )
      `;
      this.db.run(sql);
    }

  
    // Add a new student to the database
    async addStudent() {
      
    let studentDetail= await  getStudentInput()
    let id=generateUniqueId()


      const sql = `INSERT INTO students (id,firstName, lastName, age, grade,password,email) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      
      this.db.run(sql, [id,studentDetail.Ifirstname, studentDetail.Ilastname, studentDetail.Iage, studentDetail.Igrade,studentDetail.Ipassword,studentDetail.Iemail])
      console.log(`your Enrollment ID is "${id} please note it`);
    }

    
  
    // Retrieve a student by ID
    getStudentById(value: number|string,column:string): Promise<Student | null> {
      return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM students WHERE ${column} = ?`;
        this.db.get(sql, [value], (err: any, row: Student) => {
          if (err) {
            reject(err);
          } else {
            resolve(row ? row : null);
          }
        });
      });
    }
    getStudentPasswordById(value: number|string,column:string): Promise<Student | null> {
      return new Promise((resolve, reject) => {
        const sql = `SELECT Password  as Pswd FROM students WHERE ${column} = ?`;
        this.db.get(sql, [value], (err: any, row: {Pswd:any} ) => {
          if (err) {
            reject(err);
          } else {
            let Pswd = row?.Pswd || "Not Found"
            resolve(Pswd);
          }
        });
      });
    }
  
    
    // Retrieve all students from the database
    getAllStudents(): Promise<Student[]> {
      return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM students`;
        this.db.all(sql, (err: any, rows: Student[]) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    }
  
    // Update a student's information
    updateStudent(Crit_column:string ,Crit_column_val:string|number|boolean,Update_column:string,Update_val:string|number|boolean) {
//      const { id, firstName, lastName, age, grade } = student;
      const sql = `UPDATE students SET ${Update_column} = ?  WHERE ${Crit_column} = ?`;
      console.log(Update_column, Update_val, Crit_column, Crit_column_val)
      this.db.run(sql, [ Update_val,Crit_column_val]);
    }
  
    // Delete a student by ID
    deleteStudent(column:string,value: number|string|boolean,) {
      const sql = `DELETE FROM students WHERE ${column} = ?`;
      this.db.run(sql, [value]);
    }
  }


  export {Student, StudentRepository}