
class Employee {
    // We build a constructor that creates new employee information. 

    constructor(name, id, email) {

        this.name = name;
        this.id = id;
        this.email = email;

    }
    // These are all Getters
    getName() {
        // console.log(`Employee Name: ${this.name} `);
        return this.name;
    };

    getId() {
        // console.log(`Employee ID: ${this.id}`);
        return this.id;
    };

    getEmail() {
        // console.log(`Employee Email: ${this.email}`);
        return this.email;
    }

}


module.exports = Employee;