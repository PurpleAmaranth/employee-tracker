// Define basic requirements
const util = require("util");
const mysql = require("mysql");

// Setup connection with user credentials
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  // No password set
  password: "",
  database: "employees"
});

// Establish connection, then define queries using promisify
connection.connect();
connection.query = util.promisify(connection.query);

module.exports = connection;