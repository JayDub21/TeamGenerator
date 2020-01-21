const fs = require('fs');
const inquirer = require('inquirer');


function teamAppForm() {
    inquirer.prompt([

        // Ask user for name


        // Ask for user email


        // Ask for user ID#


        // Ask user for team role


        // Ask user which school


        // Ask user for office #


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