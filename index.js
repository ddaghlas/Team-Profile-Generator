// node modules 
const inquirer = require('inquirer');
const fs = require('fs');

// Link to page creation
const generatePage = require('./src/page-template.js')

// Link to helper.js
const formatName = require('./utils/helper');

// Employee array
const allEmployees = [];

// Created a const for question prompts generated in the command-line
const questions = [
    {
        type: 'list',
        name: 'role',
        message: 'What is the employee\'s role?',
        choices: // function to allow only one manager to be created
            () => {
            if (allEmployees.some(employee => employee.role === 'Manager')) {
                return ['Engineer', 'Intern']    
            } else {
                return ['Manager', 'Engineer', 'Intern']
            }
        }
    },
    {
        type: 'input',
        name: 'firstName',
        message: ({ role }) => `What is the ${role.toLowerCase()}'s first name?`,
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter the first name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'lastName',
        message: ({ firstName }) => `What is ${formatName(firstName)}'s last name?`,
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter the last name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: ({ firstName }) => `What is ${formatName(firstName)}'s ID number?`,
        validate: idInput => {
            if (!isNaN(parseInt(idInput))) {
                return true;
            } else {
                console.log('Please enter a valid ID number!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'officeNumber',
        message:  ({ firstName }) => `What is ${formatName(firstName)}'s office number?`,
        when: ({ role }) => {
            if (role === 'Manager') {
                return true;
            } else {
                return false;
            }
        },
        validate: officeNumberInput => {
            if (!isNaN(parseInt(officeNumberInput))) {
                return true;
            } else {
                console.log('Please enter a valid number!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: ({ firstName }) => `What is ${formatName(firstName)}'s GitHub userame?`,
        when: ({ role }) => {
            if (role === 'Engineer') {
                return true;
            } else {
                return false;
            }
        },
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter a username!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'school',
        message: ({ firstName }) => `What school does ${formatName(firstName)} go to?`,
        when: ({ role }) => {
            if (role === 'Intern') {
                return true;
            } else {
                return false;
            }
        },
        validate: schoolInput => {
            if (schoolInput) {
                return true;
            } else {
                console.log('Please enter a school name!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'addEmployee',
        message: 'Would you like to add another employee?',
        default: true
    }
]

// Prompts the user in the command line -- start of the application
const promptUser = () => {

    return inquirer.prompt(questions)
    .then(userResponse => {

        // adds to employee data array
        allEmployees.push(userResponse);

        // adds another employee based on user selection
        if (userResponse.addEmployee) {
            return promptUser();
        } else {
            return allEmployees;
        };
    });
};

// Function to generate HTML page file using file system
const writePage = (htmlContent) => {
    fs.writeFile('./dist/index.html', htmlContent, err => {
        // if there is an error
        if (err) {
            throw err
        };
        // when the profile has been created
        console.log('Page created successfully!');
    });
};

console.log(`
Welcome to the Team Profile Generator!  Let's add some employees!
`);

// Calling the function to then transfer that data and generate an HTML page -- HTML file in the dist folder
promptUser()
    .then(data => generatePage(data))
    .then(generatedHtml => writePage(generatedHtml))
    .catch(err => console.log(err));
