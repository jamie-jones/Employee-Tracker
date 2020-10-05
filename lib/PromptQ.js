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
function viewAllEmployees() {}
// FUNCTION FOR VIEWING ALL EMPLOYEES BY DEP
function viewEmployeesByDep() {}
// FUNCTION FOR VIEWING ALL EMP BY MANAGER
function viewEmployeesByManager() {}
// FUNCTION FOR ADDING DEP
function addDepartment() {
  inquirer.prompt([
    {
      type: "",
      message: "",
      name: "",
    },
  ]);
}
// FUNCTION FOR ADDING ROLE
function addRole() {
  inquirer.prompt([
    {
      type: "",
      message: "",
      name: "",
    },
  ]);
}
// FUNCTION FOR ADDING EMPLOYEE
function addEmployee() {
  inquirer.prompt([
    {
      type: "",
      message: "",
      name: "",
    },
  ]);
}
// FUNCTION FOR REMOVING EMPLOYEE
function removeEmployee() {
  inquirer.prompt([
    {
      type: "",
      message: "",
      name: "",
      choices: [],
    },
  ]);
}
// FUNCTION FOR UPDATING EMPLOYEE
function updateEmployee() {
  inquirer.prompt([
    {
      type: "",
      message: "",
      name: "",
      choices: [],
    },
  ]);
}
// FUNCTION FOR UPDATING EMP MANAGER
function updateEmployeeManager() {
  inquirer.prompt([
    {
      type: "",
      message: "",
      name: "",
      choices: [],
    },
  ]);
}
