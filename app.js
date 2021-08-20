// Define app dependencies
const inquirer = require("inquirer")
const mysql = require("mysql")
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_tracker_db"
  });

// Establish connection with unique id
connection.connect(function(err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    startPrompt();
});

// Set-up program prompts
function startPrompt() {
    inquirer.prompt([
    {
        type: "list",
        message: "Choose Action:",
        name: "choice",
        choices: [
                "List All Employees By Department",
                "List All Employees By Role",
                "List All Employees",
                "Update Employee Information",
                "Add Department",
                "Add Role",
                "Add Employee"
                ]
    }
]).then(function(val) {
        switch (val.choice) {
            case "List All Employees By Department":
                listAllDepartments();
                break;

            case "List All Employees By Role":
                listAllRoles();
                break;
            
            case "List All Employees":
                listAllEmployees();
                break;
            
            case "Update Employee Information":
                updateEmployee();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "Add Role":
                addRole();
                break;
            
            case "Add Employee":
                addEmployee();
                break;
        }
})
}

// Function to see all available departments
function listAllDepartments() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
    })
}

// Function to see all available roles
function listAllRoles() {
  connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
  function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
  })
}

// Function to see all available employees
function listAllEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
  })
}

// Function to select from employee roles
function selectRole() {
    var roles = [];
    connection.query("SELECT * FROM role", 
    function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roles.push(res[i].title);
        }
    })
    return roles;
}

// Function to select from managers
function selectManager() {
    var managers = [];
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", 
    function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managers.push(res[i].first_name);
        }
    })
    return managers;
}

// Function to add new employee
function addEmployee() { 
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "Enter First Name "
        },
        {
            name: "lastname",
            type: "input",
            message: "Enter Last Name "
        },
        {
            name: "role",
            type: "list",
            message: "Enter Role ",
            choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Enter Manager Name",
            choices: selectManager()
        }
    ]).then(function (val) {
        var roleId = selectRole().indexOf(val.role) + 1
        var managerId = selectManager().indexOf(val.choice) + 1
        connection.query("INSERT INTO employee SET ?", 
        {
            first_name: val.firstName,
            last_name: val.lastName,
            manager_id: managerId,
            role_id: roleId
            
        }, function(err){
            if (err) throw err
            console.table(val)
            startPrompt()
        })
    })
}

// Function to update employee information
function updateEmployee() {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", 
    function(err, res) {
        if (err) throw err
        console.log(res)
        inquirer.prompt([
            {
                name: "lastName",
                type: "rawlist",
                choices: function() {
                    var lastName = [];
                    for (var i = 0; i < res.length; i++) {
                        lastName.push(res[i].last_name);
                    }
                    return lastName;
                },
                message: "Select Employee ",
            },
            {
                name: "role",
                type: "rawlist",
                message: "Select New Role ",
                choices: selectRole()
            }
        ]).then(function(val) {
            var roleId = selectRole().indexOf(val.role) + 1
            connection.query("UPDATE employee SET WHERE ?", 
            {
                last_name: val.lastName
            }, 
            {
                role_id: roleId
            }, 
            function(err){
                if (err) throw err
                console.table(val)
                startPrompt()
            })
        });
    });
}

// Function to add new role to list
function addRole() { 
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role", 
    function(err, res) {
        inquirer.prompt([
            {
                name: "Title",
                type: "input",
                message: "Enter Role"
            },
            {
                name: "Salary",
                type: "input",
                message: "Enter Salary"
            } 
        ]).then(function(res) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: res.title,
                    salary: res.salary,
                },
                function(err) {
                    if (err) throw err
                    console.table(res);
                    startPrompt();
                }
            )
        });
    });
}

// Function to add new department
function addDepartment() { 
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What Department would you like to add?"
        }
    ]).then(function(res) {
        connection.query("INSERT INTO department SET ? ",
            {
                name: res.name
            
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startPrompt();
            }
        )
    })
}

  
