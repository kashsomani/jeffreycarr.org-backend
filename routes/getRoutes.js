module.exports = (app, pool) => {
    // Perform general GET query
    function performQuery(query, res) {
        pool.query(query, (err, result) => {
            if(err) {
                console.log(err);
            }
    
            res.send(result);
        });
    }

    // Route to get all recipes
    app.get("/api/get", (req,res) => {
        let q = performQuery("SELECT * FROM recipes ORDER BY name", res);
    });

    // Route to get one recipe
    app.get("/api/get/:id", (req,res) => {
        const id = req.params.id;
        const query = "SELECT * FROM recipes WHERE id=" + id;
        let q = performQuery(query, res);
    });

    // Get all categories
    app.get("/api/getCategories", (req, res) => {
        let q = performQuery("SELECT * FROM categories ORDER BY name", res);
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
}