#!/usr/bin/env node
import  fs from 'fs';
import sqlite3 from 'sqlite3';
//import { getQuestions} from"./Qbase.js"
let db = new sqlite3.Database('Quiz_db.db');
export function checkDatabaseExists(databasePath: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(databasePath);

    db.on('open', () => {
      resolve(true);

    });

    db.on('error', (err
        :any) => {
      if (err.code === 'SQLITE_ERROR') {
        resolve(false);
      } else {
        reject(err);
      }
    });
  });
}

function create_table(databasePath: string): Promise<boolean> {
    return new Promise((resolve,reject)=>{
        let db = new sqlite3.Database(databasePath);
        db.run('CREATE TABLE IF NOT EXISTS Question_table (ID INTEGER PRIMARY KEY, Question TEXT, Option_A TEXT, Option_B TEXT, Option_C TEXT, Option_D TEXT, Correct_Answer TEXT)')

        db.on('open', () => {
            resolve(true);
            db.run('CREATE TABLE IF NOT EXISTS Question_table (ID INTEGER PRIMARY KEY, Question TEXT, Option_A TEXT, Option_B TEXT, Option_C TEXT, Option_D TEXT, Correct_Answer TEXT)')
      
          });
      
          db.on('error', (err
              :any) => {
            if (err.code === 'SQLITE_ERROR') {
              resolve(false);
            } else {
              reject(err);
            }
          });
    })
}

  

export function insertData(db: sqlite3.Database, fileName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    let data = fs.readFileSync(fileName, 'utf8');
    let rows = data.split('\n');

    let insertStatement = db.prepare('INSERT INTO Question_table (Question, Option_A, Option_B, Option_C, Option_D, Correct_Answer) VALUES (?, ?, ?, ?, ?, ?)');

    for (let row of rows) {
      let [Question, Option_A, Option_B, Option_C, Option_D, Correct_Answer] = row.split('\t');

      insertStatement.run(Question, Option_A, Option_B, Option_C, Option_D, Correct_Answer);
    }

    insertStatement.finalize();

    resolve();
  });
}

 let databaseExists = await checkDatabaseExists('Quiz_db.db');
 let tablcrreated =await create_table('Quiz_db.db')

let tableExist = async  () => {
    try{
        setTimeout(() => {
             insertData(new sqlite3.Database('Quiz_db.db'),"MCQs.txt")
            console.log("your quiz will start soon!")
                        
        }, 5000);
     
    }
catch(error){
    console.log(error)
}

}

async function getcheck(): Promise<number> {
  let db = new sqlite3.Database('Quiz_db.db');

  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM Question_table WHERE Question IS NOT Null", [], (err, rows) => {
      if (err) {
        console.error('Error executing query:', err.message);
        db.close();
        resolve(0);
      } else if (!rows) {
        console.log('No matching question found.');
        db.close();
        resolve(0);
      } else {
        db.close();
        resolve(rows.length);
      }
    });
  });
}

let answer = await getcheck()

if(databaseExists && tablcrreated && answer===0){
setTimeout(() => {
     tableExist()
        
}, 5000);
}



//console.table(answer)



export{answer}