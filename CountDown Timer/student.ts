import inquirer from "inquirer"
// Define an interface for a Student


interface Student {
    id?: number;
    firstName: string;
    lastName: string;
    age: number;
    grade: string;
  }

  async function FurtherAction(){
  let x=await inquirer.prompt([{message:"Please select your action properly",
   type:"list",
   choices:["Remove Record","Update Record"],
  name:"IFurtherAction"
  }
  ]
  )
return {IFurtherAction:x.IFurtherAction}}
  


 async function getStudentInput(){
 let dat =await inquirer.prompt([{
      message:"Enter First Name",
      name:"Ifirstname", 
      type:"input"
    },
    {
      message:"Enter Last Name",
      name:"Ilastname", 
      type:"input"
    },{
      message:"Enter Age ",
      name:"Iage", 
      type:"input"
    },
    {
      message:"Enter grade",
      name:"Igrade", 
      type:"input"
    }

  ])  
    return dat
  }
  class StudentRepository {
    
    private db: any; // SQLite database connection
  
    constructor(db: any) {
      this.db = db || "students.db";
      this.createTable();
    }
  
    // Create the Student table if it doesn't exist
    private createTable() {
      const sql = `
        CREATE TABLE IF NOT EXISTS students (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          firstName TEXT,
          lastName TEXT,
          age INTEGER,
          grade TEXT
        )
      `;
      this.db.run(sql);
    }
  
    // Add a new student to the database
    async addStudent() {
      
    let studentDetail= await  getStudentInput()

      const sql = `INSERT INTO students (firstName, lastName, age, grade) VALUES (?, ?, ?, ?)`;
      
      this.db.run(sql, [studentDetail.Ifirstname, studentDetail.Ilastname, studentDetail.Iage, studentDetail.Igrade]);
    }
  
    // Retrieve a student by ID
    getStudentById(value: number,column:string): Promise<Student | null> {
      return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM students WHERE ? = ?`;
        this.db.get(sql, [column,value], (err: any, row: Student) => {
          if (err) {
            reject(err);
          } else {
            resolve(row ? row : null);
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
      this.db.run(sql, [ Crit_column_val,Update_val]);
    }
  
    // Delete a student by ID
    deleteStudent(column:string,value: number|string|boolean,) {
      const sql = `DELETE FROM students WHERE ? = ?`;
      this.db.run(sql, [column,value]);
    }
  }
  export {Student, StudentRepository,getStudentInput,FurtherAction}