const fs = require('fs');
const inquirer = require('inquirer');


function teamAppForm() {
    inquirer.prompt([

        // Ask user for name
        {
            type: "input",
            name: "name",
            message: "What is your name"
        },

        // Ask for user email
        {
            type: "input",
            name: "email",
            message: "What is your email address?"
        },

        // Ask for user ID#
        {
            type: "input",
            name: "id",
            message: "What is your ID number?"
        },

        // Ask user for team role
        {
            type: "rawlist",
            name: "role",
            message: "What is your team role?",
            choices: [
                "manager",
                "intern",
                "engineer"
            ]
        },

        // Ask user which school
        {
            type: "input",
            name: "school",
            message: "What school did/do you attend?"

        },

        // Ask user for office #
        {
            type: "input",
            name: "officeNum",
            message: "What is your office number?"
        }

        // Ask for GH username


        // What is new team name?


        // Want to add another team member?
    ]).then((data) => {
        console.log(data);

        // create variables to store specific data
        // put properties in object?

        //if manager, assign data (create new manager)

        //if student, assign data (create new intern)

        // if engineer, assign data (createnew engineer)

        //if want another member = true, restart teamAppForm();

        //if want another member = false, return 

    })
}; teamAppForm();


//function to create new user profile/card

