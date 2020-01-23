const fs = require('fs');
const inquirer = require('inquirer');

const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");

let team = [];
let teamName;

//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//              NPM Packages
//=========================================
//  Question bank for Manager Generation  
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

mgrQ = [
    // Confirm if they are a manger before starting.
    {
        type: "confirm",
        name: "mgrConfirm",
        message: "Are you the team Mangager?"
    },

    {
        type: "input",
        name: "teamName",
        message: "What is your Team's name?",
        when: (data) => data.mgrConfirm
    },

    {
        type: "input",
        name: "mgrName",
        message: "What is your name?",
        when: (data) => data.mgrConfirm
    },

    {
        type: "input",
        name: "mgrEmail",
        message: "What is your email address?",
        when: (data) => data.mgrConfirm
    },

    {
        type: "input",
        name: "mgrId",
        message: "What is your ID number?",
        when: (data) => data.mgrConfirm
    },

    {
        type: "input",
        name: "officeNum",
        message: "What is your office number?",
        when: (data) => data.mgrConfirm
    }
];


//===============================================
// Question bank for New Team Member Generation
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
teamQ = [
    {
        type: "list",
        name: "role",
        message: "What is the new team member's role?",
        choices: ["Intern", "Engineer"]
    },

    {
        type: "input",
        name: "teamName",
        message: "What is the new team member's name?",
    },

    {
        type: "input",
        name: "teamId",
        message: "What is new team member's ID# ?"
    },

    {
        type: "input",
        name: "teamEmail",
        message: "What is new team member's email?"
    },

    {
        type: "input",
        name: "github",
        message: "What is new team member's github username?",
        when: (teamData) => teamData.role === "Engineer"
    },

    {
        type: "input",
        name: "school",
        message: "What is new team member's School Name?",
        when: (teamData) => teamData.role === "Intern"
    },

    {
        type: "confirm",
        name: "addTeammate",
        message: "Do you want to add another member to the team?"
    },
];



//=========================================
//     Inititate Manager Questions
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

function mgrGen() {
    inquirer.prompt(mgrQ).then((mgrData) => {
        console.log(mgrData);

        const role = mgrData.mgrConfirm;
        const mgrName = mgrData.mgrName;
        const mgrId = mgrData.mgrId;
        const mgrEmail = mgrData.mgrEmail;
        const officeNum = mgrData.officeNum;

        if (mgrData.mgrConfirm === true) {
            mgrData.mgrConfirm === "Manager";
        }

        // Assign these answers to Manager 
        mgr = new Manager(mgrName, mgrId, mgrEmail, officeNum);
        team.push(mgr);

        // Fill teamName var
        teamName = mgrData.teamName;

        // After Manager is created, run team questions.
        teamGen(mgr);

    })

};


//=========================================
//       Inititate Team Questions
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

function teamGen(mgr) {
    inquirer.prompt(teamQ).then((teamData) => {
        console.log(teamData);

        const role = teamData.role;
        const teamName = teamData.teamName;
        const teamId = teamData.teamId;
        const teamEmail = teamData.teamEmail;
        const github = teamData.github;
        const school = teamData.school;
        const addTeammate = teamData.addTeammate;

        if (role === "Intern") {
            const intern = new Intern(teamName, teamId, teamEmail, school);
            team.push(intern);
        }
        else if (role === "Engineer") {
            const engineer = new Engineer(teamName, teamId, teamEmail, github);
            team.push(engineer);
        };


        if (addTeammate === true) {
            teamGen();
        }
        else {
            console.log(mgr);
            let mgrCard = fs.readFileSync('./templates/manager.html', 'utf8');
            mgrCard = mgrCard.replace('{{name}}', mgr.getName());
            mgrCard = mgrCard.replace('{{role}}', mgr.getRole());
            mgrCard = mgrCard.replace('{{id}}', mgr.getId());
            mgrCard = mgrCard.replace('{{email}}', mgr.getEmail());
            mgrCard = mgrCard.replace('{{officeNumber}}', mgr.getOfficeNumber());
            mgrCard = mgrCard.replace('{{role}}', mgr.getRole());

            fs.writeFileSync("./team.html", teamGen(mgr));

            //Loop thru and grap other team members
            for (i = 0; i < team.length; i++) {
                let teamMember = team[i];
                // cards += teamCard(teamMember);
                console.log("before card")
                fs.writeFileSync("./team.html", teamCard(teamMember))
            }

            // main = main.replace('{{cards}}', cards);

            // fs.writeFileSync('./team.html')

        };


    });

};


// Starts manager questions
mgrGen();



function teamCard(member) {

    if (member.getRole() === "Engineer") {
        let engCard = fs.readFileSync('./templates/engineer.html', 'utf8');
        engCard = engCard.replace('{{name}}', member.getName());
        engCard = engCard.replace('{{role}}', member.getRole());
        engCard = engCard.replace('{{id}}', member.getId());
        engCard = engCard.replace('{{email}}', member.getEmail());
        engCard = engCard.replace('{{github}}', member.getGithub());
        return engCard
    }

    else if (member.getRole() === "Intern") {
        var intCard = fs.readFileSync('./templates/intern.html', 'utf8');
        intCard = intCard.replace('{{name}}', member.getName());
        intCard = intCard.replace('{{role}}', member.getRole());
        intCard = intCard.replace('{{id}}', member.getId());
        intCard = intCard.replace('{{email}}', member.getEmail());
        intCard = intCard.replace('{{school}}', member.getSchool());
        return intCard;
    }
};