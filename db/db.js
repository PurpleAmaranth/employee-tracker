// Define DB class dependencies
const connection = require("./connection");

// Define DB class and methods to handle data
class DB {
    constructor (connection) {
        this.connection = connection;
    }

    // Create methods for all objects
    createRole() {
        return this.connection.query(
            "INSERT INTO role SET ?", 
            role
        );
    }

    createDepartment() {
        return this.connection.query(
            ""
        );

    }

    createEmployee(employee) {
        return this.connection.query(
            "INSERT INTO employee SET ?", 
            employee
        );
    }

    // Find methods for all objects
    findRoles() {
        return this.connection.query(
            
        );
    }

    findDepartment() {
        return this.connection.query(
            
        );
    }

    findDepartmentEmployees() {
        return this.connection.query(
            
        );
    }

    findManagerEmployees() {
        return this.connection.query(
            
        );
    }

    findEmployees() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }

    findManagers(employeeId) {
        return this.connection.query(
        "SELECT id, first_name, last_name FROM employee WHERE id != ?",
        employeeId
        );
    }

    // Update methods for all objects
    updateRole(employeeId, roleId) {
        return this.connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [employeeId, roleId]
        );
    }

    updateManager(employeeId, managerId) {
        return this.connection.query(
            "UPDATE employee SET manager_id = ? WHERE id = ?",
            [employeeId, managerId]
        );
    }

     // Remove methods for all objects
     removeRole() {
        return this.connection.query(
            
        );
    }

    removeDepartment() {
        return this.connection.query(
            
        );
    }

    removeEmployee() {
        return this.connection.query(
            "DELETE FROM employee WHERE id = ?",
            employeeId
        );
    }
}

module.exports = new DB(connection);