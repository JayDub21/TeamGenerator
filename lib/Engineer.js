const Employee = require('./Employee');

// Import Employee Properties and add/replace properties for Engineer

class Engineer extends Employee {

    constructor(name, id, email, github) {
        super(name, id, email, github);
        this.github = github;
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return "Engineer";
    }

};

module.exports = Engineer;