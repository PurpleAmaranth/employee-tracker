// Define dependencies
const connection = require("./connection");

class DB {
    constructor (connection) {
        this.connection = connection;
    }

    // Create methods for all objects
    createRole() {

    }

    createDepartment() {

    }

    createEmployee() {

    }

    // Find methods for all objects
    findRoles() {

    }

    findDepartment() {

    }

    findDepartmentEmployees() {

    }

    findManagerEmployees() {

    }

    findEmployees() {
        return this.connection.query(
            ""
        );
    }

    findManagers() {

    }

    // Update methods for all objects
    updateRole() {

    }

    updateManager() {

    }

     // Remove methods for all objects
     removeRole() {

    }

    removeDepartment() {

    }

    removeEmployee() {

    }
}

module.exports = new DB(connection);