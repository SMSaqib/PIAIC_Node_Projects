#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log("Number Guess App");
let score = 0;
let x = Math.round(Math.random() * 10); // Randomly generated secret number
let tries = 0;
let cont;
do {
    let guess = await inquirer.prompt([
        {
            name: "gnumb",
            type: "input",
            message: "Enter a number to guess between 0 and 10:",
            validate: (input) => {
                let num = parseInt(input);
                if (!isNaN(num) && num >= 0 && num <= 10) {
                    return true;
                }
                return "Please enter a valid number between 0 and 10.";
                process.stdout.clearLine(0);
                process.stdout.cursorTo(0);
                process.stdout.write(`Enter a number to guess between 0 and 10: ${num}`);
            },
        },
    ]);
    let result = guess.gnumb;
    if (result == x) {
        score = score + 10;
        console.log(chalk.green(`Congratulations! Your guess is correct: ${result} || system guessed number is ${x} and your score is ${score}`));
        cont = await inquirer.prompt([
            {
                name: "con",
                type: "list",
                choices: ["Y", "N"],
                message: "Do you want to continue playing? (Y/N)",
            },
        ]);
        if (cont.con == "Y") {
            x = Math.round(Math.random() * 10); // Generate a new random number
            // tries = 0; // Reset the number of tries
        }
    }
    else {
        console.log(chalk.bgRedBright(`Sorry, your guess ${result} is incorrect. The actual number is ${x}`));
        tries++;
        x = Math.round(Math.random() * 10); // Generate a new random number
        if (tries < 3) {
            cont = await inquirer.prompt([
                {
                    name: "con",
                    type: "list",
                    choices: ["Y", "N"],
                    message: `Do you want to retry? (Y/N) Tries Left: ${3 - tries}`,
                },
            ]);
        }
        else {
            console.log(chalk.yellow(`Out of tries. Game over! `));
            cont = { con: "N" }; // Automatically exit if out of tries
        }
    }
} while (cont.con === "Y");
console.log(chalk.green(`Thanks for playing! and total score is ${score} :) `));
