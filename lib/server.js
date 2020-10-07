const inquirer = require("inquirer");

function addEmployee(){
  RTCPeerConnection.query(
    `SELECT first_name, last_name, roleID, manager FROM employee;`,
    (err, results) => {
      if (err) throw err;
      const allEmpsArray = [];
      for(let i=0; i < results.length; i++) {
        const employeeID = {
          first_name: results[i].empFirstName,
          last_name: results[i].empLastName,
          roleID: results[i].empRole,
          manager: results[i].empManager,
        };
        allEmpsArray.push(employeeID);
        inquirer.prompt([
          {
            type: "input",
            message: "What is the employee's first name?",
            name: "empFirstName",
          }
          {
            type: "input",
            message: "What is the employee's last name?",
            name: "empLastName",
          },
          {
            type: "list",
            message: "What is the employee's role?",
            name: "empRole",
            choices: [allEmpsArray],
          },
          {
            type: "list",
            message: "Who is the employee's manager?",
            name: "EmpManager",
            choices: [
              "Lexa Woods",
              "Anacostia Quartermaine",
              "Santana Lopez",
              "Clarke Griffin",
            ],
          }
        ])
        .then((data)=>{
        connection.query(
          `INSERT INTO employee(first_name, last_name, roleID, manager) VALUE (?, ?, ?, ?);`,
          `INSERT INTO employee(first_name, last_name, roleID, manager) VALUE (?, ?, ?, ?);`,
          [
            data.empFirstName,
            data.empLastName,
            data.empRole,
            data.empManager,
          ],
          (err, res) => {
            if (err) throw err;
            startingQuestions();
          }
        );
        });
      }
    }
  )
}