import inquirer from "inquirer";
// Define an interface for a Student
let Std_columnName = ["id", "firstName", "lastName", "age", "grade", "password", "email"];
let std_options = ["Remove Record", "Modify your Record"];
async function Std_remove_record() {
    let EnterIDtoDelete = await inquirer.prompt([
        {
            message: "Please Enter  Column Name",
            type: "list",
            name: "IEnterColumntoDelete",
            choices: Std_columnName
            // validate: (x) => {
            //   if (typeof x === "string" && x.match(/^\d{1,4}$/)) {
            //     return true;
            //   } else {
            //     return false;
            //   }
            // },
        },
        { message: "Please Enter Value",
            type: "input",
            name: "IEnterValuetoDelete",
        }
    ]);
    return EnterIDtoDelete;
}
async function Std_update_record() {
    let Update_Std_record = await inquirer.prompt([
        { message: "Please Enter Criteria Column Name",
            type: "list",
            name: "IUpdate_Crit_column",
            choices: Std_columnName
        },
        { message: "Please Enter lookup/Criteria Value",
            type: "input",
            name: "IUpdate_Crit_Val",
        },
        { message: "Please Select Filed for update ",
            type: "list",
            name: "IUpdate_update_column",
            choices: Std_columnName
        },
        { message: "Please Enter  Value to update",
            type: "input",
            name: "IUpdate_update_Val",
        }
    ]);
    return Update_Std_record;
}
async function FurtherAction() {
    let x = await inquirer.prompt([{ message: "Please select your action properly",
            type: "list",
            choices: std_options,
            name: "IFurtherAction"
        }
    ]);
    return { IFurtherAction: x.IFurtherAction };
}
async function getStudentInput() {
    let dat = await inquirer.prompt([{
            message: "Enter First Name",
            name: "Ifirstname",
            type: "input"
        },
        {
            message: "Enter Last Name",
            name: "Ilastname",
            type: "input"
        }, {
            message: "Enter Age ",
            name: "Iage",
            type: "input"
        },
        {
            message: "Enter grade",
            name: "Igrade",
            type: "input"
        },
        {
            message: "Enter Password",
            name: "Ipassword",
            type: "input"
        },
        {
            message: "Enter email",
            name: "Iemail",
            type: "input"
        }
    ]);
    return dat;
}
async function get_Student_Porgamm_Input(programm) {
    let question = inquirer.prompt([{
            message: "Choose Your Programm",
            name: "IProgm",
            type: "list",
            choices: programm
        },
    ]);
    return question;
}
async function get_Student_Semester_Input(programm) {
    let question = inquirer.prompt([{
            message: "Choose Your Semester",
            name: "ISemester",
            type: "list",
            choices: programm
        },
    ]);
    return question;
}
async function verifyStudent() {
    let student_log_in_verification = await inquirer.prompt([{
            message: "Enter ID:",
            name: "IVerify_id",
            type: "input"
        },
        {
            message: "Enter Password:",
            name: "IVerify_password",
            type: "input"
        }
    ]);
    return student_log_in_verification;
}
async function ForgetPAssword() {
    let ForgetPAssword = await inquirer.prompt([{
            message: "Please Enter Your ID to recover your Password:",
            name: "IForgetPAsswordID",
            type: "input"
        },
    ]);
    return ForgetPAssword;
}
async function login(x) {
    let verifyStudent_details = await verifyStudent();
    let singleStudents = await x.getStudentPasswordById(verifyStudent_details.IVerify_id, "id");
    if (singleStudents == verifyStudent_details.IVerify_password) {
        const password = singleStudents;
        console.log(`Welcome ${verifyStudent_details.IVerify_id}`);
    }
    else {
        console.log('Password is not available or the object is null.');
    }
}
export { login, ForgetPAssword, getStudentInput, FurtherAction, Std_remove_record, Std_update_record, verifyStudent, get_Student_Porgamm_Input, get_Student_Semester_Input, std_options };
