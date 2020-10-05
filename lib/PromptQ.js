// REQUIRE INQUIRER
// REQUIRE FS?
// REQUIRE MYSQL
const inquirer = requirer("inquirer");
const fs = require(fs);

// BUILD COMMAND-LINE PROMPTS
// TO ADD DEP, ROLE, AND EMPLOYEES
// VIEW DEP, ROLE, AND EMPLOYEES
// UPDATE EMP ROLES
function startingQuestion() {
  const start = [
    {
      type: "list",
      message: "What would you like to do?",
      name: "whatToDo",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees by Manager",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
      ],
    },
  ];
}

// FUNCTION FOR VIEWING ALL EMPLOYEES
function viewAllEmployees() {
  inquirer
    .prompt([
      {
        type: "",
        message: "",
        name: "",
      },
    ])
    .then(({}) => {});
  startingQuestion();
}
// FUNCTION FOR VIEWING ALL EMPLOYEES BY DEP
// FUNCTION FOR VIEWING ALL EMP BY MANAGER
// FUNCTION FOR ADDING DEP
// FUNCTION FOR ADDING ROLE
// FUNCTION FOR ADDING EMPLOYEE
// FUNCTION FOR REMOVING EMPLOYEE
// FUNCTION FOR UPDATING EMPLOYEE
// FUNCTION FOR UPDATING EMP MANAGER
