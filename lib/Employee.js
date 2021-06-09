// Creating Employee class
// adding constructor with hard parameters and additional properties to the object
class Employee {
    constructor(firstName, lastName, id) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
        this.email = `${firstName}.${lastName}@company.com`;
        this.role = 'Employee';
        this.icon = 'fas fa-briefcase'
    };

    // Returning the Employee input first and last name
    getName() {
        return `${this.firstName} ${this.lastName}`;
    };

    // Returning the Employee input id
    // Generating CSS styling for all functions
    getId() {
        return `<span class="has-text-weight-bold">ID:</span> ${this.id}`;
    };

    // Returning the Employee input email
    getEmail() {
        return `<span class="has-text-weight-bold">Email:</span> <a href="mailto:${
            this.email}" class="has-text-primary">${this.email}</a>`;
    };

    // Returning the Employee input role
    getRole() {  
        return this.role;
    };
    
    // Generates an icon for each specific role
    getIcon() {
        return `<i class="${this.icon} fa-3x"></i>`
    };
};

module.exports = Employee;