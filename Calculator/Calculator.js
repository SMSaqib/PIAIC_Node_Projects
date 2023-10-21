#!/usr/bin/env node
//npm init -y for crerating project
// tsc -w watch window
//tsc --init (for ts.configutaion) 
import inquirer from "inquirer";
console.log("Calculator App");
let answer = await inquirer.prompt([
    {
        message: "Enter your first number",
        type: "number",
        name: "num1",
    },
    {
        message: "Enter your second number",
        type: "number",
        name: "num2",
    },
    {
        message: "Select operator",
        type: "list",
        choices: ["+", "-", "*", "/"],
        name: "operator",
    },
]);
let num1 = answer.num1;
let num2 = answer.num2;
let operator = answer.operator;
let result = 0;
switch (operator) {
    case "+":
        result = num1 + num2;
        break;
    case "-":
        result = num1 - num2;
        break;
    case "*":
        result = num1 * num2;
        break;
    case "/":
        result = num1 / num2;
        break;
    default:
        console.log("Invalid operator");
}
console.log(`Result: ${num1} ${operator} ${num2} = ${result}`);
