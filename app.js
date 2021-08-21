// Define app dependencies
const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

// Function to begin program prompts
async function startPrompt() {
    const { choice } = await prompt([
        {
            type: "list",
            name: "choice",
            message: "Choose Action:",
            choices: [
                "List Employees",
                "List Department Employees",
                "List Manager Employees",
                "List Departments",
                "Add Department",
                "Remove Department",
                "List Roles",
                "Add Role",
                "Remove Role",
                "Add Employee",
                "Remove Employee",
                "Update Role",
                "Update Manager",
                "Quit"
            ]
        }
    ])
    switch (choice) {
        case "List Employees":
            return listEmployees();
        case "List Department Employees":
            return listDepartmentEmployees();
        case "List Manager Employees":
            return listManagerEmployees();
        case "List Departments":
            return listDepartments();
        case "Add Department":
            return addDepartment();
        case "Remove Department":
            return removeDepartment();
        case "List Roles":
            return listRoles();
        case "Add Role":
            return addRole();
        case "Remove Role":
            return removeRole();
        case "Add Employee":
            return addEmployee();
        case "Remove Employee":
            return removeEmployee();
        case "Update Role":
            return updateRole();
        case "Update Manager":
            return updateManager();
        default:
            return quit();
    }
}

// Function to list all employees
async function listEmployees() {
    // Find and list employees
    const employees = await db.findEmployees();
    console.log("\n");
    console.table(employees);
    startPrompt();
}

// Function to list all department employees
async function listDepartmentEmployees() {
    // List department
    const departments = await db.findDepartments();
    const departmentList = departments.map(({ id, name }) => (
        {
            name: name,
            value: id
        }
    ));

    // Select department
    const { departmentId } = await prompt([
        {
            type: "list",
            name: "departmentId",
            message: "Select Department: ",
            choices: departmentList 
        }
    ]);

    // List employees
    const employees = await db.findDepartmentEmployees(departmentId);
    console.log("\n");
    console.table(employees);
    startPrompt();
}

// function to list all manager employees
async function listManagerEmployees() {
    // Find and list managers 
    // TODO: filter only managers, may need to change schema
    const managers = await db.findEmployees();
    const managerList = managers.map(({ id, first_name, last_name }) => (
        {
            name: `${first_name} ${last_name}`,
            value: id
        }
    ));

    //Select Manager
    const { managerId } = await prompt([
        {
        type: "list",
        name: "managerId",
        message: "Select Manager: ",
        choices: managerList
        }
    ]);

    //List employees under manager or that they are not a manager
    const employees = await db.findManagerEmployees(managerId);
    console.log("\n");
    if (employees.length === 0) {
        console.log("Nothing to report.");
    } else {
        console.table(employees);
    }
    startPrompt();
}

// Function to list departments
async function listDepartments() {
    // Find and list departments
    const departments = await db.findDepartments();
    console.log("\n");
    console.table(departments);
    startPrompt();
}
  
// Function to create new departments
async function addDepartment() {
    // Prompt for department name
    const department = await prompt([
        {
            name: "name",
            message: "Department Name: "
        }
    ]);
    await db.createDepartment(department);

    // Log Feedback
    console.log(`Created ${department.name}.`);
    startPrompt();
}
  
// Function to remove a department
async function removeDepartment() {
    // Find and list departments
    const departments = await db.findDepartments();
    const departmentList = departments.map(({ id, name }) => (
        {
            name: name,
            value: id
        }
    ));

    // Select department to remove
    const { departmentId } = await prompt(
        {
            type: "list",
            name: "departmentId",
            message: "Remove Entire Department Contents: ",
            choices: departmentList
        }
    );
    await db.removeDepartment(departmentId);

    //Feedback on removal
    console.log(`Removal Complete.`);
    startPrompt();
}

// Function to list all roles
async function listRoles() {
    //Find and list all roles
    const roles = await db.findRoles();
    console.log("\n");
    console.table(roles);
    startPrompt();
}

// Function to add a new role
async function addRole() {
    // Find and list departments
    const departments = await db.findDepartments();
    const departmentList = departments.map(({ id, name }) => (
        {
            name: name,
            value: id
        }
    ));
    
    // Name new role
    const role = await prompt([
        {
            name: "title",
            message: "Enter Name: "
        },
        {
            name: "salary",
            message: "Enter Salary:"
        },
        {
             type: "list",
             name: "department_id",
            message: "Select Department:",
             choices: departmentList
        }
    ]);

    // Feedback on add
    await db.createRole(role);
    console.log(`Added ${role.title}.`);
    startPrompt();
}

// Function to remove a role
async function removeRole() {
    // Find and list roles
    const roles = await db.findRoles();
    const roleList = roles.map(({ id, title }) => (
        {
            name: title,
            value: id
        }
    ));

    // Select role to remove
    const { roleId } = await prompt([
        {
            type: "list",
            name: "roleId",
            message: "Select And Remove Entire Role Contents: ",
            choices: roleList
        }
    ]);

    // Feedback on removal
    await db.removeRole(roleId);
    console.log("Removal Complete.");
    startPrompt();
}

// Function to add employees
async function addEmployee() {
    // Define roles and employees
    const roles = await db.findRoles();
    const employees = await db.findEmployees();

    // Collect inputs
    const employee = await prompt([
        {
            name: "first_name",
            message: "Enter First Name: "
        },
        {
            name: "last_name",
            message: "Enter Last Name: "
        }   
    ]);

    // Show roles
    const roleList = roles.map(({ id, title }) => (
        {
            name: title,
            value: id
        }
    ));

    // Select roles
    const { roleId } = await prompt(
        {
            type: "list",
            name: "roleId",
            message: "Select Role: ",
            choices: roleList
        }
    );
    employee.role_id = roleId;
    
    // Show managers
    const managerList = employees.map(({ id, first_name, last_name }) => (
        {
            name: `${first_name} ${last_name}`,
            value: id
        }
    ));
    managerList.unshift({ name: "None", value: null });
    
    //Select manager
    const { managerId } = await prompt(
        {
            type: "list",
            name: "managerId",
            message: "Select Manager",
            choices: managerList
        }
    );
    employee.manager_id = managerId;

    // Feedback after addition
    await db.createEmployee(employee);
    console.log(`Added ${employee.first_name} ${employee.last_name}.`);
    startPrompt();
}

// Function to remove employees
async function removeEmployee() {
    //Find and list employees
    const employees = await db.findEmployees();
    const employeeList = employees.map(({ id, first_name, last_name }) => (
        {
            name: `${first_name} ${last_name}`,
            value: id
        }
    ));

    // Select employee to remove
    const { employeeId } = await prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Select Employee: ",
            choices: employeeList
        }
    ]);

    // Feedback on removal
    await db.removeEmployee(employeeId);
    console.log("Removal Complete.");
    startPrompt();
}

// Function to update a role
async function updateRole() {
    // Find and list employees
    const employees = await db.findEmployees();
    const employeeList = employees.map(({ id, first_name, last_name }) => (
        {
            name: `${first_name} ${last_name}`,
            value: id
        }
    ));

    //Select employee
    const { employeeId } = await prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Select Employee: ",
            choices: employeeList
        }
    ]);

    // Find and list available roles
    const roles = await db.findRoles();
    const roleList = roles.map(({ id, title }) => (
        {
            name: title,
            value: id
        }
    ));

    // Select role
    const { roleId } = await prompt([
        {
            type: "list",
            name: "roleId",
            message: "Select Role: ",
            choices: roleList
        }
    ]);

    // Feedback on update completion
    await db.updateRole(employeeId, roleId);
    console.log("Update Complete.");
    startPrompt();
}

// Function to update a manager
async function updateManager() {
    // Find and list employees
    const employees = await db.findEmployees();
    const employeeList = employees.map(({ id, first_name, last_name }) => (
        {
            name: `${first_name} ${last_name}`,
            value: id
        }
    ));

    // Select employee to update
    const { employeeId } = await prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Select Employee: ",
            choices: employeeList
        }
    ]);

    // Find and list managers
    const managers = await db.findManagers(employeeId);
    const managerList = managers.map(({ id, first_name, last_name }) => (
        {
            name: `${first_name} ${last_name}`,
            value: id
        }
    ));

    // Select manager
    const { managerId } = await prompt([
        {
            type: "list",
            name: "managerId",
            message:
                "Select Manager: ",
            choices: managerList
        }
    ]);

    // Feedback on update
    await db.updateManager(employeeId, managerId);
    console.log("Update Complete.");
    startPrompt();
}

// Function to init logo text art
function initLogo() {
    const logoText = logo({ name: "Employee-Tracker" }).render();
    console.log(logoText);
}

// Function to start program
function initMain() {
    initLogo();
    startPrompt();
}

// Function to quit main program
function quit() {
    console.log("Exiting Program");
    process.exit();
}

// Main Program
initMain();
