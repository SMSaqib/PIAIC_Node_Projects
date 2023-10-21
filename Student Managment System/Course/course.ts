import * as path from 'path';
import inquirer from 'inquirer';
import  sqlite3  from "sqlite3";
import { setInterval } from "timers/promises";

let courseColumnName=["ProgramId", "CourseId", "Program", "Semester", "DurationYears","CourseName", "Degree", "AffiliatedFaculty", "CreditHours", "LabRequired", "CourseCharges"]
interface Course {
    ProgramId: string;
    CourseId: string;
    Program: string;
    Semester: number;
    DurationYears: number;
    CourseName: string;
    Degree: string;
    AffiliatedFaculty: string;
    CreditHours: number;
    LabRequired: string;
    CourseCharges: number;
  }
  
  
  let courses_array= [
    ["BBA", "POM8", "Business (BBA)", 1, 4, "Principles of Management", "BBA", "Prof. Smith", 3, "Yes", 1200],
    ["BBA", "BCOM15", "Business (BBA)", 1, 4, "Business Communication", "BBA", "Prof. Johnson", 3, "No", 1100],
    ["BBA", "MICO12", "Business (BBA)", 2, 4, "Microeconomics", "BBA", "Prof. Williams", 3, "No", 1150],
    ["BBA", "FIAC12", "Business (BBA)", 2, 4, "Financial Accounting", "BBA", "Prof. Davis", 3, "Yes", 1250],
    ["BBA", "MAMA12", "Business (BBA)", 3, 4, "Marketing Management", "BBA", "Prof. Anderson", 3, "No", 1300],
    ["BBA", "ORBE12", "Business (BBA)", 3, 4, "Organizational Behavior", "BBA", "Prof. Taylor", 3, "No", 1200],
    ["BBA", "BUET12", "Business (BBA)", 4, 4, "Business Ethics", "BBA", "Prof. Martinez", 3, "No", 1100],
    ["BBA", "OPMA12", "Business (BBA)", 4, 4, "Operations Management", "BBA", "Prof. Brown", 3, "Yes", 1150],
    ["BBA", "BULA12", "Business (BBA)", 5, 4, "Business Law", "BBA", "Prof. Garcia", 3, "No", 1250],
    ["BBA", "FIMA12", "Business (BBA)", 5, 4, "Financial Management", "BBA", "Prof. Rodriguez", 3, "No", 1300],
    ["BBA", "INBU12", "Business (BBA)", 6, 4, "International Business", "BBA", "Prof. Lee", 3, "No", 1200],
    ["BBA", "ENTR12", "Business (BBA)", 6, 4, "Entrepreneurship", "BBA", "Prof. White", 3, "Yes", 1100],
    ["BBA", "SUMA12", "Business (BBA)", 7, 4, "Supply Chain Management", "BBA", "Prof. Hernandez", 3, "No", 1150],
    ["CSBS", "INTP16", "Computer Science (BS)", 1, 4, "Introduction to Programming", "BS", "Prof. Adams", 4, "Yes", 1500],
    ["CSBS", "DSA16", "Computer Science (BS)", 1, 4, "Data Structures and Algorithms", "BS", "Prof. Brown", 4, "No", 1600],
    ["CSBS", "DBMS16", "Computer Science (BS)", 2, 4, "Database Management", "BS", "Prof. Carter", 3, "No", 1450],
    ["CSBS", "WEBD16", "Computer Science (BS)", 2, 4, "Web Development", "BS", "Prof. Davis", 3, "Yes", 1550],
    ["CSBS", "SOFT16", "Computer Science (BS)", 3, 4, "Software Engineering", "BS", "Prof. Edwards", 4, "No", 1650],
    ["CSBS", "OSYS16", "Computer Science (BS)", 3, 4, "Operating Systems", "BS", "Prof. Fisher", 3, "No", 1400],
    ["CSBS", "AINT16", "Computer Science (BS)", 4, 4, "Artificial Intelligence", "BS", "Prof. Green", 3, "No", 1700],
    ["CSBS", "CYBS16", "Computer Science (BS)", 4, 4, "Cybersecurity", "BS", "Prof. Harris", 3, "Yes", 1750],
    ["PSYBA", "INTPSY9", "Psychology (BA)", 1, 3, "Introduction to Psychology", "BA", "Prof. Jackson", 3, "No", 900],
    ["PSYBA", "REMEPSY9", "Psychology (BA)", 1, 3, "Research Methods", "BA", "Prof. King", 4, "Yes", 950],
    ["PSYBA", "ABPSY9", "Psychology (BA)", 2, 3, "Abnormal Psychology", "BA", "Prof. Lewis", 3, "No", 850],
    ["PSYBA", "DEVPSY9", "Psychology (BA)", 2, 3, "Developmental Psychology", "BA", "Prof. Miller", 3, "No", 875],
    ["PSYBA", "SOPSY9", "Psychology (BA)", 3, 3, "Social Psychology", "BA", "Prof. Nelson", 3, "No", 925],
    ["PSYBA", "COGPSY9", "Psychology (BA)", 3, 3, "Cognitive Psychology", "BA", "Prof. Oliver", 3, "Yes", 950],
    ["PSYBA", "CLIPSY9", "Psychology (BA)", 4, 3, "Clinical Psychology", "BA", "Prof. Parker", 4, "No", 975],
    ["PSYBA", "IOPSY9", "Psychology (BA)", 4, 3, "Industrial-Organizational Psychology", "BA", "Prof. Quinn", 3, "No", 900],
    ["DIPLOMA", "INTRODIP", "Diploma (Various)", 1, 1, "Introductory Course", "Dip", "Prof. Taylor", 2, "No", 500],
    ["DIPLOMA", "COREDIP", "Diploma (Various)", 1, 1, "Core Skills Development", "Dip", "Prof. Davis", 2, "No", 550],
    ["DIPLOMA", "SPEDIP1", "Diploma (Various)", 2, 1, "Specialization Elective 1", "Dip", "Prof. Johnson", 3, "No", 600],
    ["DIPLOMA", "SPEDIP2", "Diploma (Various)", 2, 1, "Specialization Elective 2", "Dip", "Prof. Adams", 3, "No", 650],
    ["DIPLOMA", "SPEDIP3", "Diploma (Various)", 3, 1, "Specialization Elective 3", "Dip", "Prof. Green", 3, "No", 700],
    ["DIPLOMA", "SPEDIP4", "Diploma (Various)", 3, 1, "Specialization Elective 4", "Dip", "Prof. Harris", 3, "No", 750],
    ["MA", "RESMAMA", "Master's (Various)", 1, 2, "Research Methodology", "MA", "Prof. Jackson", 3, "No", 1900],
    ["MA", "DISSMAMA", "Master's (Various)", 1, 2, "Dissertation Seminar", "MA", "Prof. King", 3, "No", 1800],
    ["MA", "SPESMAMA", "Master's (Various)", 2, 2, "Specialization Elective Seminar", "MA", "Prof. Lewis", 3, "No", 1700],
    ["MA", "ADMSMAMA", "Master's (Various)", 2, 2, "Administrative Issues", "MA", "Prof. Miller", 3, "No", 1600],
    ["MA", "POLSIMAMA", "Master's (Various)", 3, 2, "Politics and International Relations", "MA", "Prof. Nelson", 3, "No", 1500],
    ["MA", "ADVOMAMA", "Master's (Various)", 3, 2, "Advertising and Communication", "MA", "Prof. Oliver", 3, "No", 1400],
    ["MA", "LAWMAMA", "Master's (Various)", 4, 2, "Law and Ethics", "MA", "Prof. Parker", 3, "No", 1300],
    ["MA", "CULTMAMA", "Master's (Various)", 4, 2, "Culture and Society", "MA", "Prof. Quinn", 3, "No", 1200],
    ["MA", "SPESMAMB", "Master's (Various)", 5, 2, "Specialization Elective Seminar 2", "MA", "Prof. Smith", 3, "No", 1100],
    ["MA", "DISSMAMB", "Master's (Various)", 5, 2, "Dissertation Seminar 2", "MA", "Prof. Johnson", 3, "No", 1000],
    ["MA", "TAMAMA", "Master's (Various)", 6, 2, "Theory and Methodology", "MA", "Prof. Williams", 3, "No", 900],
    ["MA", "ADVDMAMA", "Master's (Various)", 6, 2, "Advanced Research and Data Analysis", "MA", "Prof. Davis", 3, "No", 800],
    ["MA", "INTMAMA", "Master's (Various)", 7, 2, "International Relations", "MA", "Prof. Anderson", 3, "No", 700],
    ["MA", "COMMMAMA", "Master's (Various)", 7, 2, "Comparative Politics", "MA", "Prof. Taylor", 3, "No", 600],
    ["MA", "SPESMAMC", "Master's (Various)", 8, 2, "Specialization Elective Seminar 3", "MA", "Prof. Martinez", 3, "No", 500],
    ["MA", "DISSMAMC", "Master's (Various)", 8, 2, "Dissertation Seminar 3", "MA", "Prof. White", 3, "No", 550],
    ["MA", "SPESMAMD", "Master's (Various)", 9, 2, "Specialization Elective Seminar 4", "MA", "Prof. Hernandez", 3, "No", 600],
    ["MA", "DISSMAMD", "Master's (Various)", 9, 2, "Dissertation Seminar 4", "MA", "Prof. Adams", 3, "No", 650],
    ["MA", "SPESMAME", "Master's (Various)", 10, 2, "Specialization Elective Seminar 5", "MA", "Prof. Green", 3, "No", 700],
    ["MA", "DISSMAME", "Master's (Various)", 10, 2, "Dissertation Seminar 5", "MA", "Prof. Harris", 3, "No", 750]
];



// this is the function 


  class CourseRepository {
    
      private db: sqlite3.Database;; // SQLite database connection
  

    constructor(db: any) {
      this.db = db ;
     this.createTable();
    }
  
    //Create the Course table if it doesn't exist
    private createTable() {
      const sql = `
        CREATE TABLE IF NOT EXISTS Tcourse (
    ProgramId VARCHAR(255),
    CourseId VARCHAR(255) PRIMARY KEY,
    Program VARCHAR(255),
    Semester INT,
    DurationYears INT,
    CourseName VARCHAR(255),
    Degree VARCHAR(255),
    AffiliatedFaculty VARCHAR(255),
    CreditHours INT,
    LabRequired VARCHAR(3),
    CourseCharges DECIMAL(10, 2))        
      `;
      this.db.run(sql, (err) => {
        if (err) {
          console.error('Table creation error:', err);
        } else {
          console.log('Table created successfully.');
        }
      });
    }
  

    async addCourse() {
      let sql = `
        INSERT OR IGNORE INTO Tcourse (
          ProgramId, CourseId, Program, Semester, DurationYears,
          CourseName, Degree, AffiliatedFaculty, CreditHours, LabRequired, CourseCharges
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      
      for (let crs of courses_array) {
        await new Promise<void>((resolve, reject) => {
          this.db.run(sql, [crs[0], crs[1], crs[2], crs[3], crs[4], crs[5], crs[6], crs[7], crs[8], crs[9], crs[10],], (err: Error | null) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        }).catch((error) => {
          console.error("Error inserting record:", error);
        });
      }
    }    
    getAllcourse(): Promise<Course[]> {
      return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Tcourse`;
        this.db.all(sql, (err: any, rows: Course[]) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    }
    
     prg_list(): Promise<string[]> {
      return new Promise((resolve, reject) => {
        const sql = `SELECT DISTINCT ProgramId FROM Tcourse`;
        this.db.all(sql, [], (err: any, rows: { ProgramId: string }[]) => {
          if (err) {
            reject(err);
          } else {
            const programIds = rows.map(row => row.ProgramId); // Extract just the ProgramId values
            resolve(programIds);
          }
        });
      });
    }


    Semester_list(x:string): Promise<number[]> {
      return new Promise((resolve, reject) => {
        const sql = `SELECT DISTINCT Semester FROM Tcourse WHERE ProgramId = ? `;
        this.db.all(sql,[x], (err: any, rows:{Semester:number}[]) => {
          if (err) {
            reject(err);
          } else {
             const Semester = rows.map(row => row.Semester); // Extract just the ProgramId values
            resolve(Semester);
          }
        });
      });
    }

    Courses_list_bySemester(x:string,y:number): Promise<Course[]> {
      return new Promise((resolve, reject) => {
        const sql = `SELECT CourseId, Program,  DurationYears,
        CourseName,  AffiliatedFaculty, CreditHours, LabRequired, CourseCharges
FROM Tcourse WHERE ProgramId = ?  AND Semester = ? `;
        this.db.all(sql,[x,y], (err: any, rows:Course[]) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    }

    Courses_Charges_bySemester(x:string,y:number): Promise<number> {
      return new Promise((resolve, reject) => {
        const sql = `SELECT SUM(CourseCharges) as t
FROM Tcourse WHERE ProgramId = ?  AND Semester = ? `;
        this.db.get(sql,[x,y], (err: any, rows:{t:number}) => {
          if (err) {
            reject(err);
          } else {
            let t =rows.t;
            resolve(t)
          }
        });
      });
    }


    getProgram(prg?:string): Promise<Course[]> {
      return new Promise((resolve, reject) => {

        const sql = `SELECT * FROM Tcourse WHERE ProgramId =? `;
        this.db.all(sql,[prg], (err: any, rows: Course[]) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    }
  }

// let db = new sqlite3.Database('../students.db'); // db access for student table
// let Coursedetail_repository= new CourseRepository(db)
// await Coursedetail_repository.addCourse()
// let x = await Coursedetail_repository.getProgram("BBA")
// console.table(x)
  export {Course, CourseRepository,courseColumnName,courses_array}