#!/usr/bin/env node
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, 'bank_data.json');
console.log(`${__filename} , ${__dirname}`);
class BankCustomer {
    constructor(customerName, initialBalance, pin) {
        this.customerName = customerName;
        this._accountBalance = initialBalance;
        this.pin = pin;
    }
    get accountBalance() {
        return this._accountBalance;
    }
    set accountBalance(newBalance) {
        if (newBalance >= 0) {
            this._accountBalance = newBalance;
        }
        else {
            console.log('Invalid balance. Please enter a non-negative value.');
        }
    }
    deposit(amount) {
        if (amount > 0) {
            this.accountBalance += amount;
            console.log(`Deposited ${amount} units. New balance: ${this.accountBalance} units`);
            const transactionType = 'Deposit';
            this.saveData(transactionType, amount); // Pass 'Deposit', amount, and pin
        }
        else {
            console.log('Invalid deposit amount. Please enter a positive value.');
        }
    }
    withdraw(amount) {
        if (amount > 0) {
            if (amount <= this.accountBalance) {
                this.accountBalance -= amount;
                console.log(`Withdrawn ${amount} units. New balance: ${this.accountBalance} units`);
                const transactionType = 'Withdraw';
                this.saveData(transactionType, amount); // Pass 'Withdraw', amount, and pin
            }
            else {
                console.log('Insufficient funds. Unable to withdraw.');
            }
        }
        else {
            console.log('Invalid withdrawal amount. Please enter a positive value.');
        }
    }
    saveData(transactionType, transactionAmount) {
        try {
            let existingData = [];
            if (fs.existsSync(dataFilePath)) {
                const fileContent = fs.readFileSync(dataFilePath, 'utf8');
                existingData = JSON.parse(fileContent);
            }
            if (!Array.isArray(existingData)) {
                existingData = [];
            }
            existingData.push({
                customerName: this.customerName,
                transactionType,
                transactionAmount,
                transactionDate: new Date().toISOString(),
                accountBalance: this.accountBalance,
                pin: this.pin, // Add "pin" field
            });
            fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));
        }
        catch (error) {
            console.log('Error saving data:', error.message);
        }
    }
    loadData() {
        try {
            const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
            if (Array.isArray(data) && data.length > 0) {
                // Filter transactions based on the customer name
                const filteredTransactions = data.filter((entry) => entry.customerName === this.customerName && entry.pin === this.pin);
                // Extract the relevant transaction data
                const transactions = filteredTransactions.map((entry) => ({
                    customerName: entry.customerName,
                    transactionType: entry.transactionType,
                    transactionAmount: entry.transactionAmount,
                    transactionDate: entry.transactionDate,
                    transactionBalance: entry.accountBalance,
                    pin: entry.pin, // Add "pin" field
                }));
                console.log('Transaction History for', this.customerName);
                console.table(transactions);
            }
        }
        catch (error) {
            console.log('Error loading data:', error.message);
        }
    }
    async interactWithCustomer() {
        console.log(`Welcome, ${this.customerName}!`);
        while (true) {
            const action = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'Choose an action:',
                    choices: ['Deposit', 'Withdraw', 'Exit'],
                },
            ]);
            if (action.action === 'Exit') {
                console.log('Goodbye!');
                break;
            }
            if (action.action === 'Deposit') {
                const depositAmount = await inquirer.prompt({
                    type: 'input',
                    name: 'amount',
                    message: 'Enter the deposit amount:',
                    validate: function (value) {
                        const valid = !isNaN(parseFloat(value)) && parseFloat(value) > 0;
                        return valid || 'Please enter a valid positive number.';
                    },
                });
                // const pin: { pin: string } = await inquirer.prompt({
                //     type: 'password',
                //     name: 'pin',
                //     message: 'Enter your PIN:',
                // });
                this.deposit(parseFloat(depositAmount.amount));
            }
            if (action.action === 'Withdraw') {
                const withdrawAmount = await inquirer.prompt({
                    type: 'input',
                    name: 'amount',
                    message: 'Enter the withdrawal amount:',
                    validate: function (value) {
                        const valid = !isNaN(parseFloat(value)) && parseFloat(value) > 0;
                        return valid || 'Please enter a valid positive number.';
                    },
                });
                // const pin: { pin: string } = await inquirer.prompt({
                //     type: 'password',
                //     name: 'pin',
                //     message: 'Enter your PIN:',
                // });
                this.withdraw(parseFloat(withdrawAmount.amount));
            }
        }
    }
}
(async () => {
    const customerNameInput = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter your name:',
        },
        {
            type: 'input',
            name: 'pin',
            message: 'Enter your pin:',
        }
    ]);
    let newCusotmer = new BankCustomer(customerNameInput.name, 1000, customerNameInput.pin);
    try {
        newCusotmer.loadData();
    }
    catch (error) {
        console.log('No existing data found. Starting with a balance of 1000.');
    }
    await newCusotmer.interactWithCustomer();
})();
