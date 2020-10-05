const inquirer = requirer("inquirer");
const fs = require(fs);

function startingQ() {
  const start = [
    {
      type: "list",
      message: "What would you like to do?",
      name: "whatToDo",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees by Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
      ],
    },
  ];
}

const viewAll = [
  {
    type: "",
    message: "",
    name: "",
  },
];
