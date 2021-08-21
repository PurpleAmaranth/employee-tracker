// Define connection dependencies
const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  // No password set
  password: "",
  database: "employee_tracker_db"
});

// Set up initial connection with promisify
connection.connect();
connection.query = util.promisify(connection.query);

module.exports = connection;