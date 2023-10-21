#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";


let Link=  "https://v6.exchangerate-api.com/v6/8bff66626c557673b2099379/latest/USD";

let fetchData = async(data:any) =>
    {
        let fetchData = await fetch(data);
        let res = await fetchData.json();
        return res.conversion_rates;

    };
let data = await fetchData(Link);
//console.table(data)

let countries = Object.keys(data);


let firstCountry = await inquirer.prompt(
    {
       type: "list",
       name: "countryOne",
       message: " Converting from",
       choices: countries,
    }
);


let userAmount = await inquirer.prompt(
    {
       type: "number",
       name: "amount",
       message: `please enter your amount in  ${ chalk.greenBright.bold.italic(firstCountry.countryOne)}`
    }
);


let secondCountry = await inquirer.prompt(
    {
       type: "list",
       name: "countryTwo",
       message: " Converting to",
       choices: countries,
    }
);



let conversionAPI_Rates=  `https://v6.exchangerate-api.com/v6/8bff66626c557673b2099379/pair/${firstCountry.countryOne}/${secondCountry.countryTwo}`;


let conversionRate = async(data:any) =>
    {
        let conversionRate = await fetch(data);
        let res = await conversionRate.json();
        return res.conversion_rate;

    };
let cnv = await conversionRate(conversionAPI_Rates);

let cnvRate = userAmount.amount * cnv;
 

console.log (`Your Currency value of ${chalk.greenBright.bold(userAmount.amount)} ${chalk.greenBright.bold(firstCountry.countryOne)} will be ${chalk.greenBright.bold(cnvRate)} ${chalk.greenBright.bold(secondCountry.countryTwo)}`);
