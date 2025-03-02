const fs = require("fs");
const { Router } = require("express");
const router = Router();

//localhost:8080/

// Carga JSON y Recetas
let recipesData;

const loadRecipes = () => {
  let rawdata = fs.readFileSync("src/recipes.json");
  recipesData = JSON.parse(rawdata);
};
loadRecipes();

router.get("/", (req, res) => {
  console.log("Alguien ha accedido al servidor");
  res.send(
    "Bienvenido al servidor, puedes acceder a las siguientes rutas:\n RUTAS GET: /about; /rutaRecetas; /rutaPizza; /rutaVegetarian; /rutaTomatoSauce\n RUTAS POST: /rutaPOST; /buscarReceta; /filtrarPorIngrediente"
  );
});

//RUTAS POST CON HTML
router.post("/formulario", (req, res) => {
  console.log("Enviada peticion POST /formulario.");
  console.log(req.body);
  console.log(req.body.nombre);
  console.log(req.body.apellido);
  console.log(req.body.email);
  res.redirect("http://127.0.0.1:5500/src/index.html");
});

router.post("/addRecipe", (req, res) => {
  console.log("Alguien ha intentado agregar una nueva receta.");
  console.log(req.body);
  res.json({
    name: req.body.name,
    ingredients: req.body.ingredients,
    preference: req.body.preference,
    description: req.body.description,
  });
});

//RUTAS GET

router.get("/about", (req, res) => {
  console.log("Alguien ha accedido a la ruta About");
  res.send("Prototipo de ListOChef para consultar recetas y manejar inventario.");
});

router.get("/rutaRecetas", (req, res) => {
  console.log("Alguien ha accedido a la ruta Recetas");
  res.json(recipes);
});

router.get("/rutaPizza", (req, res) => {
  console.log("Alguien ha accedido a la ruta Pizza");

  //find necesita una funcion como parametro
  const response = recipesData.recipes.find((recipe) => recipe.name === "Classic Margherita Pizza");
  res.json(response);
});

router.get("/rutaVegetarian", (req, res) => {
  console.log("Alguien ha accedido a la ruta Vegetarian");

  //filter funciona para multiples resultados
  const response = recipesData.recipes.filter((recipe) => recipe.preference === "vegetarian");
  res.json(response);
});

router.get("/rutaTomatoSauce", (req, res) => {
  console.log("Alguien ha accedido a la ruta Tomato Sauce");

  const response = recipesData.recipes.filter(
    (recipe) => recipe.ingredients.includes("tomato sauce")
    //utilizamos includes para el array ingredients
  );
  res.json(response);
});

//POST

router.post("/filtrarPorIngrediente", (req, res) => {
  console.log("Alguien esta filtrando por ingrediente.");
  //En el req body guardaremos los filtros a aplicar
  req.body = "parmesan cheese";
  const ingrediente = req.body;
  const filtroAplicado = recipesData.recipes.filter((recipe) => recipe.ingredients.includes(ingrediente));
  res.json(filtroAplicado);
});

module.exports = router;
