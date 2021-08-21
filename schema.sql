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
    ('Human Resources'),
    ('Sales');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Customer Service Associate', 35000, 1),
    ('Customer Service Lead', 45000, 1),
    ('Customer Service Manager', 65000, 1),
    ('Accountant', 56000, 2),
    ('Account Specialist', 66000, 2),
    ('Accounting Manager', 86000, 2),
    ('Human Resources Specialist', 45000, 3),
    ('Human Resources Manager', 65000, 3),
    ('Sales Specialist', 55000, 4),
    ('Sales Manager', 75000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Carlos', 'Rodgriguez', 1, NULL),
    ('Rudy', 'Just Rudy', 2, Null),
    ('Emily', 'Berger', 3, 1),
    ('Mr.', 'Tims', 4, Null),
    ('Spider', 'Man', 5, Null),
    ('Melissa', 'Jergins', 6, 2),
    ('Pam', 'Poovey', 7, Null),
    ('Sun', 'Baby', 8, 3),
    ('Armin', 'Souvaneeeechez', 9, NULL),
    ('Helen', 'Keller', 10, 4);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

