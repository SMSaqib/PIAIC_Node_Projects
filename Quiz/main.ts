#!/usr/bin/env node
import {answer} from "./functions.js"
import {getValue,getQuestions,createTableFromFourArrays,filterIndex,shuffleArray,select_ques} from "./Qbase.js"
import chalk from "chalk"

console.log(answer)

console.log("Welcome to Quiz App")


console.log("Please wait to load the Quiz")
let main=async () => {

let MCQS_FromDB:any=await getQuestions();
let MCQS_FromDB_shuff = shuffleArray(MCQS_FromDB);
//console.table(MCQS_FromDB_shuff)
let Answer_Store:string[]=[];
let Corr:string[]=[];
let result:number[]=[]
for(let i of MCQS_FromDB_shuff){
//  console.log(MCQS_FromDB_shuff.length)    
let answer = await select_ques(<string>i);
//let core:any= await getValue(<string>i);
let Actual:string= answer.Correct_Answer;
let Provided:string= answer.inputQ;
Answer_Store.push(Provided);
Corr.push(Actual);
if(Actual.trim() == Provided.trim()){
  
  result.push(5)  
}
else{
  result.push(0)
}
};


let failure =filterIndex(result,0)

console.table(`please check your wrong answeres: ${failure}`)
let Pass = filterIndex(result,5)
//console.log(Pass)
let b:number=Pass.length/result.length
let x:number= b*100 
if(x<40){
console.log(`Sorry you have been failed you have obtained ${x}% and minimum requirement is 80%`)
}
else{
  console.log(`Congratulations!! you have obtained ${x}%`)

}
let  table_data = createTableFromFourArrays(
  MCQS_FromDB_shuff,
  Answer_Store,
  Corr,
  result
);
console.table(table_data);


}
if(answer===0){
setTimeout(() => {
  
  main()  
}, 20000);
}
else{
   await main()
}
