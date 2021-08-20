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

    // Remove methods for all objects
    removeRole() {

    }

    removeDepartment() {

    }

    removeEmployee() {

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

    }

    findManagers() {

    }

    // Update methods for all objects
    updateRole() {

    }

    updateManager() {

    }

}

module.exports = new DB(connection);