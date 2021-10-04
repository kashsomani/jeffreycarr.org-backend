const express = require('express');
const db = require('./config/db');
let mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
let connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
connection.connect();
console.log("Connected to database successful");

function performQuery(query, res) {
    connection.query(query, (err, result) => {
        if(err) {
            console.log(err);
        }

        res.send(result);
    });
}

// Route to get all recipes
app.get("/api/get", (req,res) => {
    let q = performQuery("SELECT * FROM recipes", res);
});


// Route to get one recipe
app.get("/api/get/:id", (req,res) => {
    const id = req.params.id;
    const query = "SELECT * FROM recipes WHERE id=" + id;
    let q = performQuery(query, res);
});

// Get all categories
app.get("/api/getCategories", (req, res) => {
    let q = performQuery("SELECT * FROM categories", res);
})

// Route to get directions for a recipe
app.get("/api/getDirections/:id", (req, res) => {
    const id = req.params.id;
    let query = "SELECT * FROM directions WHERE id=" + id + " ORDER BY step_num";
    let q = performQuery(query, res);
});

// Route to get ingredients for a recipe
app.get("/api/getIngredients/:id", (req, res) => {
    const id = req.params.id;
    const query = ("SELECT * FROM ingredients, rIngredients WHERE rIngredients.id=" + id + " AND rIngredients.ingredient_id=ingredients.id_ingredient;");
    let q = performQuery(query, res);
});

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});