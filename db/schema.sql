-- Setting up database session. --
DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;
USE employees;

-- Creating database tables. --
CREATE TABLE department(
    id INTEGER UNSIGNED AUTO_INCREMENT,
    name VARCHAR(30) UNIQUE NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role(
    id INTEGER UNSIGNED AUTO_INCREMENT,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL(20, 2) UNSIGNED NOT NULL,
    department_id INTEGER,
    PRIMARY KEY(id),
    INDEX department_ind (department_id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee(
    id INTEGER UNSIGNED AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER UNSIGNED NOT NULL,
    manager_id INTEGER UNSIGNED,
    PRIMARY KEY(id),
    INDEX manager_ind (manager_id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
    
);

-- Inserting values into database. --
Insert Into department (name)
