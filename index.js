const express = require('express');
const db = require('./config/db');
const cors = require('cors');

const app = express();
const PORT = 3002;
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
    const q = ("SELECT * FROM sys.ingredients, sys.rIngredients WHERE sys.rIngredients.id=1 AND sys.rIngredients.ingredient_id=sys.ingredients.ingredient_id;");
    db.query(q, id, (err,result) => {
        if(err) {
            console.log(err);
        }

        res.send(result);
    });
});


// TODO
// Route to create a recipe
// app.post('/api/create', (req,res) => {
//     const name = req.body.name;
//     const details = req.body.details;
//     const category = req.body.category;
//     const crockpot = req.body.crockpot;
// });

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})