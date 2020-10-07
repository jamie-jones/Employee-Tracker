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

// ARRAY FOR ALL ROLES

// ARRAY FOR ALL EMPLOYEES

// ARRAY FOR ALL MANAGERS

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
          "View All Employees By Department",
          "View All Employees by Manager",
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
      } else if (data.whatToDo === "Remove Employee") {
        removeEmployee();
      } else if (data.whatToDo === "View All Employees By Department") {
        viewEmployeesByDep();
      } else if (data.whatToDo === "View All Employees by Manager") {
        viewEmployeesByManager();
      }
    });
}

// FUNCTION FOR VIEWING ALL EMPLOYEES
function viewAllEmployees() {
  connection.query(
    `SELECT employee.empID, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager
    FROM employee
  INNER JOIN role ON employee.roleID = role.roleID
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
function viewEmployeesByDep() {
  connection.query(
    `SELECT department.name, employee.first_name, employee.last_name FROM employee
    INNER JOIN role ON employee.roleID = role.roleID
    INNER JOIN department ON role.depID = department.depID;`,
    function (err, data) {
      if (err) throw err;
      console.table(data);
      // CALL STARTING QUESTION AGAIN
      startingQuestion();
    }
  );
}
// FUNCTION FOR VIEWING ALL EMP BY MANAGER
function viewEmployeesByManager() {
  connection.query(
    `SELECT employee.manager, employee.first_name, employee.last_name FROM employee
    WHERE employee.manager IS NOT NULL;`,
    function (err, data) {
      if (err) throw err;
      console.table(data);
      // CALL STARTING QUESTION AGAIN
      startingQuestion();
    }
  );
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
      connection.query(`INSERT INTO department SET ?;`, {
        name: data.addingDep,
      });
      // CALL STARTING QUESTION AGAIN
      startingQuestion();
    })
    .catch((err) => {
      console.log(err);
    });
}

// FUNCTION FOR ADDING ROLE
function addRole() {
  // ARRAY FOR ALL DEPARTMENTS
  connection.query(`SELECT name, depID FROM department;`, (err, results) => {
    if (err) throw err;
    const allDepArray = [];
    for (let i = 0; i < results.length; i++) {
      const departmentID = {
        name: results[i].name,
        id: results[i].depID,
      };
      allDepArray.push(departmentID);
    }
    inquirer
      .prompt([
        {
          type: "input",
          message: "What role would you like to add?",
          name: "addingRole",
        },
        {
          type: "input",
          message: "What do you want the annual salary to be?",
          name: "addSalary",
        },
        {
          type: "list",
          message: "Which department would you like to add this role to?",
          name: "addRoleToDep",
          choices: allDepArray,
        },
      ])
      .then((data) => {
        connection.query(
          `INSERT INTO role(title, salary, depID) VALUE (?, ?, ?);`,
          [data.addingRole, data.addSalary, data.allDepArray],
          (err, res) => {
            if (err) throw err;

            // CALL STARTING QUESTION AGAIN
            startingQuestion();
          }
        );
      });
  });
}
// FUNCTION FOR ADDING EMPLOYEE

function addEmployee() {
  connection.query(`SELECT title, roleID FROM role;`, (err, results) => {
    if (err) throw err;
    const allRolesArray = [];
    for (let i = 0; i < results.length; i++) {
      const roleID = {
        name: results[i].title,
        value: results[i].roleID,
      };
      allRolesArray.push(roleID);
    }
    // console.log(allEmpsArray);
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
          choices: allRolesArray,
        },
        {
          type: "list",
          message: "Who is the employee's manager?",
          name: "empManager",
          choices: [
            "Lexa Woods",
            "Anacostia Quartermaine",
            "Santana Lopez",
            "Clarke Griffin",
          ],
        },
      ])
      .then((data) => {
        console.log(data);
        connection.query(
          `INSERT INTO employee(first_name, last_name, roleID, manager) VALUES (?, ?, ?, ?);`,
          [data.empFirstName, data.empLastName, data.empRole, data.empManager],
          (err, res) => {
            if (err) throw err;
            startingQuestion();
          }
        );
      });
  });
}

// FUNCTION FOR REMOVING EMPLOYEE
function removeEmployee() {
  connection.query(
    `SELECT first_name, last_name FROM employee;`,
    (err, results) => {
      if (err) throw err;
      const allEmpsArray = [];
      for (let i = 0; i < results.length; i++) {
        const employeeID = {
          name: results[i].first_name,
          value: results[i].last_name,
        };
        allEmpsArray.push(employeeID);
      }
      inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee do you want to remove?",
            name: "removingEmployee",
            choices: allEmpsArray,
          },
        ])
        .then((data) => {
          console.log(data);
          connection.query(
            `DELETE FROM employee WHERE empID = ?`,
            [data.empID],
            (err, res) => {
              if (err) throw err;
              startingQuestion();
            }
          );
        });
    }
  );
}
// FUNCTION FOR UPDATING EMPLOYEE
function updateEmployeeRole() {
  connection.query(
    `SELECT first_name, last_name FROM employee;`,
    (err, results) => {
      if (err) throw err;
      const allEmpsArray = [];
      for (let i = 0; i < results.length; i++) {
        const employeeID = {
          name: results[i].first_name,
          value: results[i].last_name,
        };
        allEmpsArray.push(employeeID);
      }
      console.log(allEmpsArray);
      connection.query(`SELECT title, roleID FROM role;`, (err, results) => {
        if (err) throw err;
        const allRolesArray = [];
        for (let i = 0; i < results.length; i++) {
          const roleID = {
            name: results[i].title,
            value: results[i].roleID,
          };
          allRolesArray.push(roleID);
        }
        inquirer
          .prompt([
            {
              type: "list",
              message: "Which employee's role do you want to update",
              name: "pickEmployeeForRole",
              choices: allEmpsArray,
            },
            {
              type: "list",
              message: "What role do you want to give the employee?",
              name: "giveEmpRole",
              choices: allRolesArray,
            },
          ])
          .then((data) => {
            console.log(data);
            connection.query(
              `UPDATE employee SET roleID = ?
            WHERE empID = 5;`,
              [data.empID],
              (err, res) => {
                if (err) throw err;
                startingQuestion();
              }
            );
          });
      });
    }
  );
}
