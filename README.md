# MySQL Homework: Employee Tracker
# employee-tracker

## Description

This app is practice on making, viewing, and interacting with information stored in databases easier using a text-based interface. The concept known as a **C**ontent **M**anagement **S**ystems interface. This build resembles a solution for managing a company's employees using node, inquirer, and MySQL.

## Concept

The database design follows this schema containing three tables:

![Database Schema](assets/images/schema.png)

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager

## Instructions

Run the program using "node app.js" or "npm run start"

Use the arrow keys to navigate the command-line application.

Use the command-line application to:

  * Add departments, roles, employees
  * View departments, roles, employees
  * Update employee roles

## User Story

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

## Technologies

* Uses the [MySQL](https://www.npmjs.com/package/mysql) NPM package to connect to the MySQL database and perform queries.

* Uses [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3) NPM package to interact with the user via the command-line.

* Uses [console.table](https://www.npmjs.com/package/console.table) to print MySQL rows to the console. There is a built-in version of `console.table`, but the NPM package formats the data a little better.

## Example Mock-Up

![Employee Tracker](assets/images/employee-tracker.gif)

## Walkthrough Video
![Employee Tracker]{https://github.com/PurpleAmaranth/employee-tracker/blob/main/assets/videos/employee-tracker.mp4}
