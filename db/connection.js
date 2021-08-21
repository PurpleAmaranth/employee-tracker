// Define connection dependencies
const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    // No password set
    password: "",
    database: "employee_tracker_db"
});

// Establish connection using promisify
connection.connect();
connection.query = util.promisify(connection.query);

module.exports = connection;