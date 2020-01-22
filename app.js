const fs = require('fs');
const inquirer = require('inquirer');
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");

let mgr;
let teamName;

function mgrTeamGen() {
    inquirer.prompt([

        // Confirm they are a manger
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

        // Ask user for name
        {
            type: "input",
            name: "mgrName",
            message: "What is your name?",
            when: (data) => data.mgrConfirm
        },

        // Ask for user email
        {
            type: "input",
            name: "mgrEmail",
            message: "What is your email address?",
            when: (data) => data.mgrConfirm
        },

        // Ask for user ID#
        {
            type: "input",
            name: "mgrId",
            message: "What is your ID number?",
            when: (data) => data.mgrConfirm
        },

        // Ask user for office #
        {
            type: "input",
            name: "officeNum",
            message: "What is your office number?",
            when: (data) => data.mgrConfirm
        }



    ]).then((mgrData) => {
        console.log(mgrData);

        // Assign these answers to Manager 
        mgr = new Manager(mgrData);
        let teamName = mgrData.teamName;
        // console.log(teamName);

    })
}; mgrTeamGen();




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