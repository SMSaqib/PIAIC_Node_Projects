#!/usr/bin/env node
import sqlite3 from 'sqlite3';
import inquirer from 'inquirer';
let db = new sqlite3.Database('Quiz_db.db');
async function getValue(x) {
    const db = new sqlite3.Database('Quiz_db.db');
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM Question_table WHERE Question = ?', [x], (err, row) => {
            if (err) {
                console.error('Error executing query:', err.message);
                db.close();
                reject(err);
            }
            else if (!row) {
                console.log('No matching question found.');
                db.close();
                resolve(null);
            }
            else {
                db.close();
                resolve(row);
            }
        });
    });
}
async function getQuestions() {
    let db = new sqlite3.Database('Quiz_db.db');
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM Question_table WHERE Question IS NOT Null AND Question <>'' ", [], (err, rows) => {
            let questions = [];
            if (err) {
                console.error('Error executing query:', err.message);
                db.close();
                reject(err);
            }
            else if (!rows) {
                console.log('No matching question found.');
                db.close();
                resolve(null);
            }
            else {
                for (let row of rows) {
                    // console.table(row.Question)            
                    questions.push(row.Question);
                }
                // Return the array from the function.
                db.close();
                resolve(questions);
            }
        });
    });
}
function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}
async function select_ques(x) {
    let options = await getValue(x);
    let Option_A = options.Option_A;
    let Option_B = options.Option_B;
    let Option_C = options.Option_C;
    let Option_D = options.Option_D;
    let Correct_Answer = options.Correct_Answer;
    let q = await inquirer.prompt([{
            name: "inputQ",
            type: "list",
            message: x,
            choices: [Option_A, Option_B, Option_C, Option_D]
        }]);
    return { inputQ: q.inputQ, Correct_Answer };
}
function filterIndex(array, criteria) {
    let FailQues = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] === criteria) {
            FailQues.push(i + 1);
        }
    }
    return FailQues;
}
function createTableFromFourArrays(array1, array2, array3, array4) {
    const tableData = [];
    for (let i = 0; i < array1.length; i++) {
        const tableRow = [];
        tableRow.push(array1[i]);
        tableRow.push(array2[i]);
        tableRow.push(array3[i]);
        tableRow.push(array4[i]);
        tableData.push(tableRow);
    }
    return tableData;
}
export { getValue, getQuestions, createTableFromFourArrays, filterIndex, shuffleArray, select_ques };
