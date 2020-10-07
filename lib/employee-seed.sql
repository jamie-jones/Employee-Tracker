DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;

use employeeTracker_db;

CREATE TABLE department(
	depID INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    PRIMARY KEY (depID)
);

CREATE TABLE role(
	roleID INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2) NULL,
    depID int,
    PRIMARY KEY(roleID),
    FOREIGN KEY (depID) REFERENCES department(depID)
);

CREATE TABLE employee(
	empID INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
	manager VARCHAR(50),
    roleID int,
    PRIMARY KEY (empID),
--     CONSTRAINT FOREIGN KEY (managerID) REFERENCES employee(empID),
    CONSTRAINT FOREIGN KEY (roleID) REFERENCES role(roleID)
);

INSERT INTO department(name)
VALUES ("Legal"),
("Sales"),
("Engineering"),
("Finance");

INSERT INTO role(title, salary, depID)
VALUES ("Sales Lead", 100000, 2),
("Salesperson", 80000, 2),
("Lead Engineer", 150000, 3),
("Software Engineer", 120000, 3),
("Account Manager", 160000, 4),
("Accountant", 125000, 4),
("Legal Team Lead", 250000, 1),
("Lawyer", 190000, 1);

INSERT INTO employee(first_name, last_name, roleID, manager)
VALUES ("Lexa", "Woods", 5, null),
("Anacostia", "Quartermaine", 1, null),
("Clarke", "Griffin", 3, null),
("Brittany", "Pearse", 6, "Lexa Woods"),
("Abigail", "Bellweather", 2, "Santana Lopez"),
("Tally", "Craven", 8, "Santana Lopez"),
("Quinn", "Fabray", 2, "Lexa Woods"),
("Blaise", "Zabini", 4, "Clarke Griffin"),
("Raelle", "Collar", 6, "Anacostia Quartermaine"),
("Doc", "Holliday", 2, "Santana Lopez"),
("Santana", "Lopez", 7, null);

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;

-- SELECT managerID FROM employee GROUP BY manager;

SELECT employee.empID, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager
FROM employee
INNER JOIN role ON employee.roleID = role.roleID
INNER JOIN department ON role.depID = department.depID;

SELECT department.name, employee.first_name, employee.last_name FROM employee
INNER JOIN role ON employee.roleID = role.roleID
INNER JOIN department ON role.depID = department.depID;

SELECT employee.manager, employee.first_name, employee.last_name FROM employee
WHERE employee.manager IS NOT NULL;

DELETE FROM employee WHERE empID = 10;

UPDATE employee SET roleID = 4 WHERE empID = 2;

INSERT INTO employee (first_name, last_name, roleID, manager)
VALUES ("Waverly", "Earp", 4, "Lexa Woods");