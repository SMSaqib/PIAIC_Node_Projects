#!/usr/bin/env node
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, 'Questions.json');
class personalityDetector {
    constructor() {
    }
    loadData() {
        try {
            const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
            if (Array.isArray(data) && data.length > 0) {
                // Extract the relevant transaction data
                const transactions = data.map((entry) => ({
                    Question: entry.text,
                    Option_A: entry.options[0],
                    Option_B: entry.options[1],
                    // Other properties you want to extract
                }));
                console.log(transactions.length);
                return transactions;
            }
            else {
                return [];
            }
        }
        catch (error) {
            console.log('Error loading data:', error.message);
            return [];
        }
    }
    async Ask_question() {
        const introvertThreshold = -1;
        const extrovertThreshold = 4;
        const transactions = this.loadData(); // Get the transactions data
        let collect_answer = [];
        let score = 0;
        for (let i = 0; i < transactions.length; i++) {
            const answer = await inquirer.prompt([
                {
                    message: `Que_${i + 1}: ${transactions[i].Question}`,
                    type: 'list',
                    name: 'Collect_answer',
                    choices: [transactions[i].Option_A, transactions[i].Option_B],
                },
            ]);
            if (transactions[i].Option_A == answer.Collect_answer) {
                //console.log(`${transactions[i].Option_A}==${answer.Collect_answer}`)
                score = score + 1;
            }
            else {
                score = score - 1;
            }
            collect_answer.push(answer.Collect_answer);
            console.log('Answer:', answer.Collect_answer);
            //console.log(`your total score is : ${score}`)
            //        return collect_answer 
        }
        return { collect_answer, score };
    }
    determinePersonality(score) {
        const introvertThreshold = -3; // Adjust as needed
        const extrovertThreshold = 3; // Adjust as needed
        if (score < introvertThreshold) {
            return "You are Introvert Person";
        }
        else if (score > extrovertThreshold) {
            return "You are Extrovert Person";
        }
        else {
            return "Yopu have Balanced Personality";
        }
    }
}
let x = new personalityDetector();
let d = await x.Ask_question();
console.table(d.collect_answer);
let b = x.determinePersonality(d.score);
console.log(b);
