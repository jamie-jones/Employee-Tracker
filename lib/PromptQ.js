// REQUIRE INQUIRER
// REQUIRE FS?
// REQUIRE MYSQL
const inquirer = require("inquirer");
const fs = require("fs");

// CALL BEGINNING FUNCTION
startingQuestion();

// BUILD COMMAND-LINE PROMPTS
// TO ADD DEP, ROLE, AND EMPLOYEES
// VIEW DEP, ROLE, AND EMPLOYEES
// UPDATE EMP ROLES
function startingQuestion() {
  inquirer
    .prompt([
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
    ])
    .then((data) => {
      console.log(data);
      if (data.whatToDo === "View All Employees") {
        viewAllEmployees();
      } else if (data.whatToDo === "View All Employees By Department") {
        viewEmployeesByDep();
      } else if (data.whatToDo === "View All Employees By Manager") {
        viewEmployeesByManager();
      } else if (data.whatToDo === "Add Department") {
        addDepartment();
      } else if (data.whatToDo === "Add Role") {
        addRole();
      } else if (data.whatToDo === "Add Employee") {
        addEmployee();
      } else if (data.whatToDo === "Update Employee Role") {
        updateEmployeeRole();
      } else if (data.whatToDo === "Update Employee Manager") {
        updateEmployeeManager();
      } else if (data.whatToDo === "Remove Employee") {
        removeEmployee();
      }
    });
}

// FUNCTION FOR VIEWING ALL EMPLOYEES
function viewAllEmployees() {
  // CALL STARTING QUESTION AGAIN
  startingQuestion();
}
// FUNCTION FOR VIEWING ALL EMPLOYEES BY DEP
function viewEmployeesByDep() {
  // CALL STARTING QUESTION AGAIN
  startingQuestion();
}
// FUNCTION FOR VIEWING ALL EMP BY MANAGER
function viewEmployeesByManager() {
  // CALL STARTING QUESTION AGAIN
  startingQuestion();
}
// FUNCTION FOR ADDING DEP
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What department would you like to add?",
        name: "addingDep",
      },
    ])
    .then((data) => {
      console.data(data);
      // CALL STARTING QUESTION AGAIN
      startingQuestion();
    })
    .catch((err) => {
      console.log(err);
    });
}
// FUNCTION FOR ADDING ROLE
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What role would you like to add?",
        name: "addingRole",
      },
      {
        type: "list",
        message: "Which department would you like to add this role to?",
        name: "addRoleToDep",
      },
    ])
    .prompt((data) => {
      console.log(data);
      // CALL STARTING QUESTION AGAIN
      startingQuestion();
    })
    .catch((err) => {
      console.log(err);
    });
}
// FUNCTION FOR ADDING EMPLOYEE
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "empFirstName",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "empLastName",
      },
      {
        type: "list",
        message: "What is the employee's role?",
        name: "empRole",
        choices: ["Role 1", "Role 2", "Role 3"],
      },
      {
        type: "list",
        message: "Who is the employee's manager?",
        name: "EmpManager",
        choices: ["Manager 1", "Manager 2", "Manager 3"],
      },
    ])
    .prompt((data) => {
      console.log(data);
      // CALL STARTING QUESTION AGAIN
      startingQuestion();
    })
    .catch((err) => {
      console.log(err);
    });
}
// FUNCTION FOR REMOVING EMPLOYEE
function removeEmployee() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee do you want to remove?",
        name: "removingEmployee",
        choices: ["Employee1", "Employee 2", "Employee 3"],
      },
    ])
    .prompt((data) => {
      console.log(data);
      // CALL STARTING QUESTION AGAIN
      startingQuestion();
    })
    .catch((err) => {
      console.log(err);
    });
}
// FUNCTION FOR UPDATING EMPLOYEE
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee's role do you want to update",
        name: "pickEmployeeForRole",
        choices: ["Employee 1", "Employee 2", "Employee 3"],
      },
      {
        type: "input",
        message: "What role do you want to give the employee?",
        name: "giveEmpRole",
      },
    ])
    .prompt((data) => {
      console.log(data);
      // CALL STARTING QUESTION AGAIN
      startingQuestion();
    })
    .catch((err) => {
      console.log(err);
    });
}
// FUNCTION FOR UPDATING EMP MANAGER
function updateEmployeeManager() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee's manager do you want to update?",
        name: "updateEmployee",
        choices: ["Employee 1", "Employee 2", "Employee 3"],
      },
      {
        type: "list",
        message:
          "Which employee do you want to set as manager for the selected employee?",
        name: "underWhichManager",
        choices: ["Manager 1", "Manager 2", "Manager 3"],
      },
    ])
    .prompt((data) => {
      console.log(data);
      // CALL STARTING QUESTION AGAIN
      startingQuestion();
    })
    .catch((err) => {
      console.log(err);
    });
}
