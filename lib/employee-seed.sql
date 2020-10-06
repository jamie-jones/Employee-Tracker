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
    FOREIGN KEY (roleID) REFERENCES role(roleID)
);

INSERT INTO department(name)
VALUES ("Legal"),
("Sales"),
("Engineering"),
("Finance");

INSERT INTO role(title, salary, depID)
VALUES ("Sales Lead", "100000", "2"),
("Salesperson", "80000", "2"),
("Lead Engineer", "150000", "3"),
("Software Engineer", "120000", "3"),
("Account Manager", "160000", "4"),
("Accountant", "125000", "4"),
("Legal Team Lead", "250000", "1"),
("Lawyer", "190000", "1");

INSERT INTO employee(first_name, last_name, roleID, manager)
VALUES ("Macie", "Gomez", "5", "Lexa Woods"),
("Bryn", "Hughes", "1", "Santana Lopez"),
("Matas", "Terry", "3", "Clarke Griffin"),
("Caden", "Garrett", "6", "Lexa Woods"),
("Marlene", "Edgars", "2", "Santana Lopez"),
("Parvati", "Malak", "8", "Raelle Collar"),
("Charlene", "Iria", "2", "Santana Lopez"),
("Blaise", "Zabini", "4", "Clarke Griffin"),
("Samuel", "Bowers", "6", "Lexa Woods"),
("Blake", "Flemming", "2", "Santana Lopez"),
("Libba", "Swyth", "7", "Raelle Collar");

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;

SELECT employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager FROM ((employee
INNER JOIN role ON employee.roleID = roleID)
INNER JOIN department ON role.depID = depID);