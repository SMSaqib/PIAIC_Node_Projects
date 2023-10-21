import inquirer from 'inquirer';
import chalk from 'chalk';
import * as fs from 'fs';


async function sentence(x){ 

    let count:number=0  
    let words = x.trim().split(" ")
    
    if(words.lenght=1 && words[0]=="" ){
    
      console.log(chalk.bgRedBright(`you just hit enter or "" / blank Value!you are requested to enter the correct text`))
    
    }
    else
    {
    console.log(chalk.bgBlack(`Total Number of words are available in the sentence/paragraph are: ${words.length}`))
    for(let i of words){
    let x = i.toLocaleString().length
    count = count+x
    //  return count
    }
      console.log(`Total character are  available in the sentence/paragraph are: ${count}`)
    }
    }
    



    async function askUserToUploadFile() {
        let  questions = await inquirer.prompt([
          {
            name: 'file',
            type: 'input',
            message: 'Please upload a .txt/doc file:'
          },
        ]);
      //  console.log(questions)
        return questions.file;
       
      }

      async function askUSerPRefrnce() {
        let  para_prefr = await inquirer.prompt([
          {
            name: 'document',
            type: 'list',
            message: 'Select your Prefernce',
            choices:["Do you want to enter paragraph?",`Do you wish to load ".txt" File `]
          },
        ]);
      //  console.log(questions)
        return para_prefr.document;
       
      }

      async function reciveText_para() {
        let  Reciv_para = await inquirer.prompt([
          {
            name: 'document',
            type: 'input',
            message: 'Enter your Para/Sentence here'
                  },
        ]);
      //  console.log(questions)
        return Reciv_para.document;
       
      }
     
      
export{sentence,askUserToUploadFile,askUSerPRefrnce,reciveText_para}