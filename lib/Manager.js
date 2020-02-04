const Employee = require('./Employee');

// Import Employee Properties and add/replace properties for Manager

class Manager extends Employee {

    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
        this.role = "Manager"
    }

}


module.exports = Manager;