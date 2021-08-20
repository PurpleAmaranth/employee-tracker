-- Setting up database session. --
DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

-- Creating database tables. --
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
 
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- Inserting values into database. --
INSERT INTO department
    (name)
VALUES
    ('Customer Service'),
    ('Accounting'),
    ('Human Resources');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Customer Service Associate', 30000, 1),
    ('Customer Service Lead', 45000, 1),
    ('Accountant', 56000, 2),
    ('Finance Specialist', 65000, 2),
    ('Human Resources Manager', 72000, 3);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Carlos', 'Rodgriguez', 1, NULL),
    ('Rudy', 'Just Rudy', 2, Null),
    ('Armin', 'Souvaneeeechez', 4, NULL),
    ('Helen', 'Keller', 5, 4);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

