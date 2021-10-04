const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.db,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    ssl: {
        ca: '../app/rds-combined-ca-bundle.pem'
    }
}).then(console.log("Successful connection to database!"));

module.exports = db;