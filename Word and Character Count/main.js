#!/usr/bin/env node 
import chalk from 'chalk';
import * as fs from 'fs';
import { sentence, askUserToUploadFile, askUSerPRefrnce, reciveText_para } from "./function.js";
let ask_Prefernce_From_user = await askUSerPRefrnce();
//let rows:undefined
if (ask_Prefernce_From_user === `Do you wish to load ".txt" File `) {
    console.log(ask_Prefernce_From_user);
    //    let fileName = ;
    let data = fs.readFileSync(await askUserToUploadFile(), "utf-8");
    let rows = data.split('\n');
    console.log(rows);
    console.log(chalk.bgGreen(rows.length));
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].length !== 1) {
            //    console.log(`${i}: and lenght :${rows[i].toLocaleString().length}`,rows[i])
            console.log(chalk.bgRed(rows[i]));
            await sentence(rows[i]);
        }
        //console.log(`chalo dekhte he chamatkar: ${rows[i]}`)
    }
}
else {
    // let fileName = await askUserToUploadFile();
    let data = await reciveText_para(); // fs.readFileSync(fileName,"utf-8");
    let rows = data.split('\n');
    console.log(rows);
    console.log(chalk.bgGreen(rows.length));
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].length !== 1) {
            //    console.log(`${i}: and lenght :${rows[i].toLocaleString().length}`,rows[i])
            console.log(chalk.bgRed(rows[i]));
            await sentence(rows[i]);
        }
        //console.log(`chalo dekhte he chamatkar: ${rows[i]}`)
    }
    // break;
}
;
