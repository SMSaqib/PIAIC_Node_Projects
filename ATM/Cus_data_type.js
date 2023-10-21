import { db } from "./db.js";
import inquirer from "inquirer";
let PinVer = 0;
// types of transaction that can be performed
async function Transaction_list() {
    let FT = await inquirer.prompt([
        {
            type: 'list',
            name: 'trnx',
            choices: ["Fund Transfer", "Bill Payment", "Cash Withdrawl", "Balance", "Mini Statement", "Change Pin"],
            message: 'Select Operation to Perfrom:',
        }
    ]);
    return FT.trnx;
}
// Account number required for Fund transfer Transaction
async function FT_Account_Number() {
    // let balance = await blancequery(1 || 0)
    let FT = await inquirer.prompt([
        {
            type: 'input',
            name: 'trnx',
            message: `Enter 14-Digit Account Number (Don't use any Special character):`,
            validate: (x) => {
                let regex = /^[0-9]{14}$/;
                if (regex.test(x)) {
                    return true;
                }
                else {
                    return `Please enter a valid fourteen-digit number.you enetered ${x.length}`;
                }
            },
        },
        {
            type: 'input',
            name: 'Amt',
            message: `Enter Amount: your limit is 1 Lac per day `,
            validate: (y) => {
                let regex = /^[0-9]{4,5}$/;
                if (regex.test(y) && y.length >= 3 && y.length <= 6 && Number(y) >= 5000 && Number(y) <= 100000) {
                    return true;
                }
                else {
                    return 'Please enter valid amount minimum 5,000 Rs/- and maximum 100,000 Rs/-.';
                }
            },
        }
    ]);
    let dp = await inquirer.prompt([
        {
            type: 'Input',
            name: 'confir',
            message: `Do you really want to transfer ${FT.Amt}/PKR. to A/C No#: ${FT.trnx}:(Y/N)`,
            validate: (x) => {
                if (x.toLowerCase() === "y" || x.toLowerCase() == "n") {
                    return true;
                }
                else {
                    return 'Please enter "Y" for acceptance and "N" for decline.';
                }
            },
        },
    ]);
    return { trnx: FT.trnx, Amt: FT.Amt, confir: dp.confir };
}
async function pinVerification() {
    let FT = await inquirer.prompt([
        {
            type: 'input',
            name: 'pinVal',
            message: 'Enter your PIN:',
            validate: (x) => {
                let regex = /^[0-9]{4}$/;
                if (regex.test(x)) {
                    return true;
                }
                else {
                    return 'Please enter a valid four-digit number.';
                }
            }
        }
    ]);
    return FT.pinVal;
}
async function ReattemptV(x) {
    let FT = await inquirer.prompt([
        {
            name: "conf",
            type: "list",
            choices: ["Y", "N"],
            message: `Do you want to retry? (Y/N) Tries Left: ${3 - x}`,
        },
    ]);
    return FT.conf;
}
async function Data_collection() {
    let userDataColl = await inquirer.prompt([
        // {
        //   type: 'input',
        //   name: 'id',
        //   message: 'Enter your ID:',
        // },
        {
            type: 'input',
            name: 'name',
            message: 'Enter your name:',
        },
        {
            type: 'input',
            name: 'father',
            message: "Enter your father's name:",
        },
        {
            type: 'password',
            name: 'password',
            message: 'Enter your password:',
        },
        {
            type: 'input',
            name: 'pin',
            message: 'Generate four-digit Pin',
            validate: (x) => {
                let regex = /^[0-9]{4}$/;
                if (regex.test(x)) {
                    return true;
                }
                else {
                    return 'Please enter a valid four-digit number.';
                }
            },
        },
    ]);
    return userDataColl;
}
// let x = await Data_collection()
// console.log(x.id)
// console.log(x.name)
// console.log(x.father)
// console.log(x.pin)
async function new_User_Regs() {
    let id_in;
    let name_in;
    let father_in;
    let password_in;
    let pin_in;
    let userData_Collection;
    do {
        /// New User data collection Point
        userData_Collection = await Data_collection();
    } while (!userData_Collection.pin); // Loop until a valid PIN is provided
    console.log(!userData_Collection.pin);
    // You can add further validation here if needed
    ////////////////////////////////////////////////////
    //id_in = Number(userData_Collection.id);
    name_in = String(userData_Collection.name);
    father_in = String(userData_Collection.father);
    password_in = String(userData_Collection.password);
    pin_in = String(userData_Collection.pin);
    console.log('User data:', { name_in, father_in, password_in, pin_in });
    db.run('INSERT INTO users ( name, father, password,pin) VALUES ( ?, ?, ?, ?)', [name_in, father_in, password_in, pin_in], (err) => {
        if (err) {
            console.error('Error inserting data into the database:', err);
        }
        else {
            //console.log('User data saved to the database.');
        }
    });
    return { pin_in };
}
// async function TrnX_log(x,y,z,) {    
// db.run(
//  'INSERT INTO users ( name, father, password,pin) VALUES ( ?, ?, ?, ?)',
//  [, , password_in, pin_in],
//  (err) => {
//    if (err) {
//      console.error('Error inserting data into the database:', err);
//    } else {
//      console.log('User data saved to the database.');
//    }
//  }
// );
// }
async function BP_Customer_Info() {
    let BP = await inquirer.prompt([
        {
            type: 'list',
            name: 'customer',
            message: `Select Compnay From List:`,
            choices: ["KESC", "SSGC", "Mobile", "Broadbrand"]
        },
        {
            type: 'input',
            name: 'BillAmount',
            message: `Enter Amount:`,
            validate: (y) => {
                let regex = /^[0-9]{2,5}$/;
                if (regex.test(y) && y.length >= 2 && y.length < 6 && Number(y) >= 10 && Number(y) <= 100000) {
                    return true;
                }
                else {
                    return 'Please enter valid amount minimum 10 Rs/- and maximum 100,000 Rs/-.';
                }
            }
        },
    ]);
    let dp = await inquirer.prompt([
        {
            type: 'Input',
            name: 'confirmationBP',
            message: `Do you really want to Pay ${BP.BillAmount}/PKR. to company : ${BP.customer}:(Y/N)`,
            validate: (x) => {
                if (x.toLowerCase() === "y" || x.toLowerCase() == "n") {
                    return true;
                }
                else {
                    return 'Please enter "Y" for acceptance and "N" for decline.';
                }
            },
        },
    ]);
    return { customer: BP.customer, BillAmount: BP.BillAmount, confirmationBP: dp.confirmationBP };
}
async function Withdrawl() {
    let wthdr = await inquirer.prompt([
        {
            type: 'input',
            name: 'withdrawl',
            message: `Please Enter Withdrawl Amount:`,
            validate: (y) => {
                let regex = /^[0-9]{4,5}$/;
                if (regex.test(y) && y.length >= 3 && y.length <= 6 && Number(y) >= 10000 && Number(y) <= 100000) {
                    return true;
                }
                else {
                    return 'Please enter valid amount minimum 10,000 Rs/- and maximum 100,000 Rs/-.';
                }
            },
        }
    ]);
    let dp = await inquirer.prompt([
        {
            type: 'Input',
            name: 'withdrawl_confir',
            message: `Do you really want to withdraw the  ${wthdr.withdrawl}:(Y/N)`,
            validate: (x) => {
                if (x.toLowerCase() === "y" || x.toLowerCase() == "n") {
                    return true;
                }
                else {
                    return 'Please enter "Y" for acceptance and "N" for decline.';
                }
            },
        },
    ]);
    return { withDrawl_Amount: wthdr.withdrawl, withdrawl_confirmation: dp.withdrawl_confir };
}
export { Transaction_list, FT_Account_Number, pinVerification, ReattemptV, Data_collection, new_User_Regs, BP_Customer_Info, Withdrawl };
