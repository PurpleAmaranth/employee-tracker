-- Setting up database session. --
DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

-- Creating database tables. --
CREATE TABLE department(
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role(
    id INTEGER AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(20, 2),
    department_id INTEGER,
    PRIMARY KEY(id)
);

CREATE TABLE employee(
    id INTEGER AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    PRIMARY KEY(id)
);

-- Inserting values into database. --
Insert Into department (name)
