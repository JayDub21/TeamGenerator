const fs = require('fs');
const inquirer = require('inquirer');

//↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
//              NPM Packages
//=========================================
//       Importing lib js files
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');

//=========================================
//  Question bank for Manager Generation
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
mgrQ = [
  {
    type: 'input',
    name: 'teamName',
    message: "What is your Team's name?",
    //     // when: (data) => data.mgrConfirm
  },

  {
    type: 'input',
    name: 'mgrName',
    message: 'What is your name?',
    // when: (data) => data.mgrConfirm
  },

  {
    type: 'input',
    name: 'mgrEmail',
    message: 'What is your email address?',
    // when: (data) => data.mgrConfirm
  },

  {
    type: 'input',
    name: 'mgrId',
    message: 'What is your ID number?',
    // when: (data) => data.mgrConfirm
  },

  {
    type: 'input',
    name: 'officeNum',
    message: 'What is your office number?',
    // ç
  },

  {
    type: 'number',
    name: 'engineers',
    message: 'How many Engineers are on the team?',
  },

  {
    type: 'number',
    name: 'interns',
    message: 'How many Interns are on the team?',
  },
];

//=========================================
//     Inititate Manager Questions
//↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

async function teamGen() {
  inquirer.prompt(mgrQ).then(async function (mgrData) {
    let {
      teamName,
      mgrName,
      mgrId,
      mgrEmail,
      officeNum,
      engineers,
      interns,
    } = mgrData;

    let genMgr = new Manager(mgrName, mgrId, mgrEmail, officeNum);
    console.log(genMgr);

    let eng = [];
    for (let i = 0; i < engineers; i++) {
      await inquirer
        .prompt([
          {
            type: 'input',
            name: 'engName',
            message: "What is the new Engineer's name?",
          },

          {
            type: 'input',
            name: 'engId',
            message: "What is new Engineer's ID# ?",
          },

          {
            type: 'input',
            name: 'engEmail',
            message: "What is new Engineer's email?",
          },

          {
            type: 'input',
            name: 'github',
            message: "What is new Engineer's github username?",
          },
        ])
        .then((engData) => {
          let { engName, engId, engEmail, github } = engData;
          let genEng = new Engineer(engName, engId, engEmail, github);
          console.log(genEng);

          eng.push(genEng);
        });
    }

    let int = [];
    for (let j = 0; j < interns; j++) {
      await inquirer
        .prompt([
          {
            type: 'input',
            name: 'intName',
            message: "What is the new Intern's name?",
          },

          {
            type: 'input',
            name: 'intId',
            message: "What is new Intern's ID# ?",
          },

          {
            type: 'input',
            name: 'intEmail',
            message: "What is new Intern's email?",
          },

          {
            type: 'input',
            name: 'school',
            message: 'What school is the Intern from?',
          },
        ])
        .then((intData) => {
          let { intName, intId, intEmail, school } = intData;

          let genInt = new Intern(intName, intId, intEmail, school);
          console.log(genInt);

          int.push(genInt);
        });
    }

    let { name, id, email, officeNumber, role } = genMgr;

    let mgrCard = fs.readFileSync('./templates/manager.html', 'utf8');
    mgrCard = mgrCard.replace('{{name}}', name);
    mgrCard = mgrCard.replace('{{role}}', role);
    mgrCard = mgrCard.replace('{{id}}', id);
    mgrCard = mgrCard.replace('{{email}}', email);
    mgrCard = mgrCard.replace('{{officeNumber}}', officeNumber);
    console.log(mgrCard);

    let engHTML = [];
    for (let i = 0; i < eng.length; i++) {
      let { name, id, email, github, role } = eng[i];

      let engCard = fs.readFileSync('./templates/engineer.html', 'utf8');

      engCard = engCard.replace('{{name}}', name);
      engCard = engCard.replace('{{id}}', id);
      engCard = engCard.replace('{{email}}', email);
      engCard = engCard.replace('{{github}}', github);
      engCard = engCard.replace('{{role}}', role);
      engHTML.push(engCard);
    }

    let intHTML = [];
    for (let j = 0; j < int.length; j++) {
      let { name, id, email, school, role } = int[j];

      let intCard = fs.readFileSync('./templates/intern.html', 'utf8');

      intCard = intCard.replace('{{name}}', name);
      intCard = intCard.replace('{{id}}', id);
      intCard = intCard.replace('{{email}}', email);
      intCard = intCard.replace('{{school}}', school);
      intCard = intCard.replace('{{role}}', role);
      intHTML.push(intCard);
    }

    let mainHtml = fs.readFileSync('./templates/main.html', 'utf8');
    mainHtml = mainHtml.replace('{{teamName}}', teamName);
    mainHtml = mainHtml.replace('{{manager}}', mgrCard);
    mainHtml = mainHtml.replace('{{engineers}}', engHTML);
    mainHtml = mainHtml.replace('{{interns}}', intHTML);

    fs.writeFileSync('outputs.html', mainHtml);
  });
}

teamGen();
