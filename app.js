const fs = require('fs');
const inquirer = require('inquirer');

//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//              NPM Packages
//=========================================
//       Importing lib js files  
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");



//=========================================
//  Question bank for Manager Generation  
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
mgrQ = [

    // {
    //     type: "input",
    //     name: "teamName",
    //     message: "What is your Team's name?",
    //     // when: (data) => data.mgrConfirm
    // },

    {
        type: "input",
        name: "mgrName",
        message: "What is your name?",
        // when: (data) => data.mgrConfirm
    },

    {
        type: "input",
        name: "mgrEmail",
        message: "What is your email address?",
        // when: (data) => data.mgrConfirm
    },

    {
        type: "input",
        name: "mgrId",
        message: "What is your ID number?",
        // when: (data) => data.mgrConfirm
    },

    {
        type: "input",
        name: "officeNum",
        message: "What is your office number?",
        // ç
    },

    {
        type: "number",
        name: "engineers",
        message: "How many Engineers are on the team?"
    },

    {
        type: "number",
        name: "interns",
        message: "How many Interns are on the team?"
    }
];


//===============================================
// Question bank for New Intern Member Generation
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
intQ = [

];





//=========================================
//     Inititate Manager Questions
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

async function teamGen() {
    inquirer.prompt(mgrQ)
        .then(async function (mgrData) {

            let { mgrName, mgrId, mgrEmail, officeNum, engineers, interns } = mgrData;


            let genMgr = new Manager(mgrName, mgrId, mgrEmail, officeNum)
            console.log(genMgr);

            let eng = [];
            for (let i = 0; i < engineers; i++) {
                await inquirer.prompt([

                    {
                        type: "input",
                        name: "engName",
                        message: "What is the new Engineer's name?"
                    },

                    {
                        type: "input",
                        name: "engId",
                        message: "What is new Engineer's ID# ?"
                    },

                    {
                        type: "input",
                        name: "engEmail",
                        message: "What is new Engineer's email?"
                    },

                    {
                        type: "input",
                        name: "github",
                        message: "What is new Engineer's github username?"
                    }

                ]).then((engData) => {

                    let { engName, engId, engEmail, github } = engData;
                    let genEng = new Engineer(engName, engId, engEmail, github)
                    console.log(genEng);

                    eng.push(genEng);
                })
            }

            let int = [];
            for (let j = 0; j < interns; j++) {
                await inquirer.prompt([

                    {
                        type: "input",
                        name: "intName",
                        message: "What is the new team member's name?"
                    },

                    {
                        type: "input",
                        name: "intId",
                        message: "What is new team member's ID# ?"
                    },

                    {
                        type: "input",
                        name: "intEmail",
                        message: "What is new team member's email?"
                    },

                    {
                        type: "input",
                        name: "school",
                        message: "What school is the Intern from?"
                    }

                ]).then((intData) => {

                    let { intName, intId, intEmail, school } = intData;

                    let genInt = new Intern(intName, intId, intEmail, school)
                    console.log(genInt);

                    int.push(genInt);


                })

            }
            let { Name, Id, Email, OfficeNum, Role } = genMgr

            let mgrCard = fs.readFileSync('./templates/manager.html', 'utf8');
            mgrCard = mgrCard.replace('{{name}}', Name);
            mgrCard = mgrCard.replace('{{role}}', Role);
            mgrCard = mgrCard.replace('{{id}}', Id);
            mgrCard = mgrCard.replace('{{email}}', Email);
            mgrCard = mgrCard.replace('{{officeNumber}}', OfficeNum);
            console.log(mgrCard);

            let engHTML = [];
            for (let i = 0; i < eng.length; i++) {

                let { engName, engId, engEmail, github, role } = eng[i];

                let engCard = fs.readFileSync('./templates/engineer.html', 'utf8');

                engCard = engCard.replace('{{name}}', engName);
                engCard = engCard.replace('{{id}}', engId);
                engCard = engCard.replace('{{email}}', engEmail);
                engCard = engCard.replace('{{github}}', github);
                engCard = engCard.replace('{{role}}', role);
                engHTML.push(engCard);

            }

            let intHTML = [];
            for (let j = 0; j < int.length; j++) {

                let { intName, intId, intEmail, school, role } = int[j];

                let intCard = fs.readFileSync('./templates/intern.html', 'utf8');

                intCard = intCard.replace('{{name}}', intName);
                intCard = intCard.replace('{{id}}', intId);
                intCard = intCard.replace('{{email}}', intEmail);
                intCard = intCard.replace('{{school}}', school);
                intCard = intCard.replace('{{role}}', role);
                intHTML.push(intCard);

            }

            let mainHtml = fs.readFileSync('./templates/main.html', 'utf8');
            mainHtml = mainHtml.replace('{{manager}}', mgrCard);
            mainHtml = mainHtml.replace('{{engineers}}', engHTML);
            mainHtml = mainHtml.replace('{{interns}}', intHTML);

            fs.writeFileSync('.outputs.html', mainHtml);
        })

}

teamGen()
//     function teamCard(member) {



//         if (Employee.getRole() === "Engineer") {
//             let engCard = fs.readFileSync('./templates/engineer.html', 'utf8');
//             engCard = engCard.replace('{{name}}', member.getName());
//             engCard = engCard.replace('{{role}}', member.getRole());
//             engCard = engCard.replace('{{id}}', member.getId());
//             engCard = engCard.replace('{{email}}', member.getEmail());
//             engCard = engCard.replace('{{github}}', member.getGithub());
//             return engCard
//         }

//         else if (Employee.getRole() === "Intern") {
//             var intCard = fs.readFileSync('./templates/intern.html', 'utf8');
//             intCard = intCard.replace('{{name}}', member.getName());
//             intCard = intCard.replace('{{role}}', member.getRole());
//             intCard = intCard.replace('{{id}}', member.getId());
//             intCard = intCard.replace('{{email}}', member.getEmail());
//             intCard = intCard.replace('{{school}}', member.getSchool());
//             return intCard;
//         }
//     };

// })

// };

// teamGen();

// //=========================================
// //       Inititate Team Questions
// //↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

// function teamGen(mgr) {
//     console.log(mgr);
//     inquirer.prompt(teamQ).then((teamData) => {
//         console.log(teamData);

//         const role = teamData.role;
//         const firstName = teamData.firstName;
//         const teamId = teamData.teamId;
//         const teamEmail = teamData.teamEmail;
//         const github = teamData.github;
//         const school = teamData.school;
//         const addTeammate = teamData.addTeammate;

//         if (role === "Intern") {
//             const intern = new Intern(firstName, teamId, teamEmail, school);
//             team.push(intern);
//         }
//         else if (role === "Engineer") {
//             const engineer = new Engineer(firstName, teamId, teamEmail, github);
//             team.push(engineer);
//         };


//         if (addTeammate === true) {
//             teamGen();
//         }
//         else {
//             managerCard(mgr);
//             console.log(mgr);




//             //Loop thru and grab team members
//             for (i = 0; i < team.length; i++) {
//                 member = team[i];
//                 cards += teamCard(member);
//                 fs.writeFileSync("./team.html", managerCard(mgr))
//                 fs.writeFileSync("./team.html", teamCard(member));




//             }

//             let main = fs.readFileSync('./templates/main.html', 'utf8');
//             main = main.replace("{{teamName}}", teamName);
//             main = main.replace("{{cards}}", teamCard);

//         };


//     });

// };




