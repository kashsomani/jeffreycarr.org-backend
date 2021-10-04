const mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.db,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

module.exports = db;