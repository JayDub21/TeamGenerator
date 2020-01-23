const fs = require('fs');
const inquirer = require('inquirer');
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");

let team = [];
let teamName;

// Initiate manager Questions
function mgrGen() {
    inquirer.prompt(mgrQ).then((mgrData) => {
        console.log(mgrData);

        // Assign these answers to Manager 
        mgr = new Manager(mgrData);

        // Asign team name to its own Variable
        let teamName = mgrData.teamName;
        // console.log(teamName);

        // After Manager is created, run team questions.
        teamGen();

    })
};


function teamGen() {
    inquirer.prompt(teamQ).then((teamData) => {
        console.log(teamData);

        const role = teamData.role;

    })

};

mgrGen();



mgrQ = [
    // Confirm they are a manger before moving on.
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
        message: "What is" + teamData.teamName + "'s ID# ?"
    },

    {
        type: "input",
        name: "teamEmail",
        message: "What is" + teamData.teamName + "'s email?"
    },

    {
        type: "input",
        name: "github",
        message: "What is" + teamData.teamName + "'s github username?",
        when: (teamData) => teamData.role === "Engineer"
    },

    {
        type: "input",
        name: "school",
        message: "What is" + teamData.teamName + "'s School Name?",
        when: (teamData) => teamData.role === "Intern"
    },

    {
        type: "confirm",
        name: "addTeammate",
        message: "Do you want to add another member to the team?"
    },
];


// Ask for GH username

// create variables to store specific data
// put properties in object?

//if manager, assign data (create new manager)

//if student, assign data (create new intern)

// if engineer, assign data (createnew engineer)

//if want another member = true, run inter/engineer question function();

//if want another member = false, return 

//function to create new user profile/card


        // Ask user for team role
        // {
        //     type: "rawlist",
        //     name: "role",
        //     message: "What is your team role?",
        //     choices: [
        //         "intern",
        //         "engineer"
        //     ]
        // },


        // Ask user which school
        // {
        //     type: "input",
        //     name: "school",
        //     message: "What school did/do you attend?"

        // },