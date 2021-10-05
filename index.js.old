/* Express */
const express = require('express');
const app = express();
app.use(express.json());
/* CORS */
const cors = require('cors');
let corsOptions = {
    origin: '*'
}
app.use(cors(corsOptions));
/* MySQL */
const mysql = require('mysql');
/* Other */
const PORT = process.env.PORT || 5000;

// Get a promise from aws so pool is not created before
// The certificate authority is received
const aws = require('./services/aws');
aws.loadCA().then((data) => {
    let ca = data.Body.toString('utf-8');

    let pool = mysql.createPool({
        connectionLimit: 100,
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PWD,
        database: process.env.DB,
        waitForConnections: true,
        ssl: {
            ca: ca
        }
    });

    require('./routes/getRoutes')(app, pool);
})

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});