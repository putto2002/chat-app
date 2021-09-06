const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "chatAppAdmin",
    password: "Putto_2002",
    database: "chatApp"
});

module.exports = db;