const mysql = require('mysql');
const db = mysql.createConnection({
    host: "recipe-book.cg3bjd4dgyaa.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "DPJrAfoUWR7uRQ.6*TA*NWuW",
    database: "book"
});

module.exports = db;