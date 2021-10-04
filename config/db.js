const mysql = require('mysql');
const fs = require('fs');

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PWD,
    database: process.env.DB,
    ssl: {
        ca: fs.readFileSync('app/global-bundle.pem')
    }
});

module.exports = db;