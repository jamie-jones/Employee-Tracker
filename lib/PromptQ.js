// REQUIRE INQUIRER
// REQUIRE FS?
// REQUIRE MYSQL
// const fs = require("fs");
const inquirer = require("inquirer");
const mysql = require("mysql");
// const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Ellie20",
  database: "employeeTracker_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  // connection.end();
});

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
          "View All Roles",
          "View All Departments",
          // "View All Employees By Department",
          // "View All Employees by Manager",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          // "Update Employee Manager",
        ],
      },
    ])
    .then((data) => {
      console.log(data);
      if (data.whatToDo === "View All Employees") {
        viewAllEmployees();
      } else if (data.whatToDo === "View All Roles") {
        viewAllRoles();
      } else if (data.whatToDo === "View All Departments") {
        viewAllDepartments();
      } else if (data.whatToDo === "Add Department") {
        addDepartment();
      } else if (data.whatToDo === "Add Role") {
        addRole();
      } else if (data.whatToDo === "Add Employee") {
        addEmployee();
      } else if (data.whatToDo === "Update Employee Role") {
        updateEmployeeRole();
        // } else if (data.whatToDo === "Update Employee Manager") {
        //   updateEmployeeManager();
      } else if (data.whatToDo === "Remove Employee") {
        removeEmployee();
      }
    });
}

// FUNCTION FOR VIEWING ALL EMPLOYEES
function viewAllEmployees() {
  connection.query(
    `SELECT employee.empID, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager FROM employee
  INNER JOIN role ON employee.empID = role.roleID
  INNER JOIN department ON role.depID = department.depID;`,
    function (err, data) {
      if (err) throw err;
      console.table(data);
      // CALL STARTING QUESTION AGAIN
      startingQuestion();
    }
  );
}

// FUNCTION FOR VIEWING ALL ROLES
function viewAllRoles() {
  connection.query(`SELECT * FROM role;`, function (err, data) {
    if (err) throw err;
    console.table(data);
    // CALL STARTING QUESTION AGAIN
    startingQuestion();
  });
}

// FUNCTION FOR VIEWING ALL DEPARTMENT
function viewAllDepartments() {
  connection.query(`SELECT * FROM department;`, function (err, data) {
    if (err) throw err;
    console.table(data);
    // CALL STARTING QUESTION AGAIN
    startingQuestion();
  });
}

// FUNCTION FOR VIEWING ALL EMPLOYEES BY DEP
// function viewEmployeesByDep() {
//   connection.query(
//     `SELECT department.name, employee.first_name, employee.last_name FROM employee
//     INNER JOIN role ON employee.roleID = role.roleID
//     INNER JOIN department ON role.depID = department.depID;`,
//     function (err, data) {
//       if (err) throw err;
//       console.table(data);
//       // CALL STARTING QUESTION AGAIN
//       startingQuestion();
//     }
//   );
// }
// FUNCTION FOR VIEWING ALL EMP BY MANAGER
// function viewEmployeesByManager() {
//   connection.query(
//     `SELECT employee.manager, employee.first_name, employee.last_name FROM employee
//     WHERE employee.manager IS NOT NULL;`,
//     function (err, data) {
//       if (err) throw err;
//       console.table(data);
//       // CALL STARTING QUESTION AGAIN
//       startingQuestion();
//     }
//   );
// }
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
function addRole(res) {
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
    .then((data) => {
      var query = connection.query(
        `INSERT INTO employee (first_name)
      SET ?;`,
        {
          item: res.item,
          min_bid: res.startingBid,
        }
      );
      console.log(query.sql);
      // CALL STARTING QUESTION AGAIN
      startingQuestion();
    })
    .catch((err) => {
      console.log(err);
    });
}
// FUNCTION FOR ADDING EMPLOYEE
function addEmployee() {
  // viewAllEmployees();
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
        choices: ["1", "2", "3"],
      },
      {
        type: "list",
        message: "Who is the employee's manager?",
        name: "EmpManager",
        choices: ["Manager 1", "Manager 2", "Manager 3"],
      },
    ])
    .then((data) => {
      connection.query(`INSERT INTO employee SET ?;`, {
        first_name: data.empFirstName,
        last_name: data.empLastName,
        roleID: data.empRole,
        manager: data.empManager,
      });
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
