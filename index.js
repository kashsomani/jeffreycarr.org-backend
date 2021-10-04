const express = require('express');
const db = require('./config/db');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


// Route to get all recipes
app.get("/api/get", (req,res) => {
    db.query("SELECT * FROM recipes", (err,result) => {
        if(err) {
            console.log(err);
        }

        res.send(result);
    });
});


// Route to get one recipe
app.get("/api/get/:id", (req,res) => {
    const id = req.params.id;
    db.query("SELECT * FROM recipes WHERE id = ?", id, (err,result) => {
        if(err) {
            console.log(err);
        }

        res.send(result);
    });
});

// Get all categories
app.get("/api/getCategories", (req, res) => {
    db.query("SELECT * FROM categories", (err, result) => {
        if(err) {
            console.log(err);
        }

        res.send(result);
    });
})

// Route to get directions for a recipe
app.get("/api/getDirections/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM directions WHERE id = ? ORDER BY step_num", id, (err,result) => {
        if(err) {
            console.log(err);
        }

        res.send(result);
    });
});

// Route to get ingredients for a recipe
app.get("/api/getIngredients/:id", (req, res) => {
    const id = req.params.id;
    const q = ("SELECT * FROM ingredients, rIngredients WHERE rIngredients.id=" + id + " AND rIngredients.ingredient_id=ingredients.id_ingredient;");
    db.query(q, id, (err,result) => {
        if(err) {
            console.log(err);
        }

        res.send(result);
    });
});

app.listen(process.env.PORT || 5000);