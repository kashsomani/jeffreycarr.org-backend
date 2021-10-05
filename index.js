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

let pool = mysql.createPool(process.env.CONN);

require('./routes/getRoutes')(app, pool);

app.listen(PORT, () => {
    console.log("Listening on port: ", PORT);
});