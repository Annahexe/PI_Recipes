const fs = require("fs");
const { Router } = require("express");
const router = Router();

//localhost:8080/

// Carga JSON y Recetas
let recipes;

const loadRecipes = () => {
  let rawdata = fs.readFileSync("src/recipes.json");
  recipes = JSON.parse(rawdata);
};
loadRecipes();

//Rutas GET
router.get("/", (req, res) => {
  console.log("Alguien ha accedido al servidor");
  res.send(
    "Bienvenido al servidor, puedes acceder a las siguientes rutas: /about; /rutaRecetas; /rutaPizza; /rutaVegetarian; /rutaTomatoSauce"
  );
});

router.get("/about", (req, res) => {
  console.log("Alguien ha accedido a la ruta About");
  res.send(
    "Prototipo de ListOChef para consultar recetas y manejar inventario."
  );
});

router.get("/rutaRecetas", (req, res) => {
  console.log("Alguien ha accedido a la ruta Recetas");
  res.json(recipes);
});

router.get("/rutaPizza", (req, res) => {
  console.log("Alguien ha accedido a la ruta Pizza");

  //find necesita una funcion como parametro
  const response = recipes.recipes.find(
    (recipe) => recipe.name === "Classic Margherita Pizza"
  );
  res.json(response);
});

router.get("/rutaVegetarian", (req, res) => {
  console.log("Alguien ha accedido a la ruta Vegetarian");

  //filter funciona para multiples resultados
  const response = recipes.recipes.filter(
    (recipe) => recipe.preference === "vegetarian"
  );
  res.json(response);
});

router.get("/rutaTomatoSauce", (req, res) => {
  console.log("Alguien ha accedido a la ruta Tomato Sauce");

  const response = recipes.recipes.filter(
    (recipe) => recipe.ingredients.includes("tomato sauce")
    //utilizamos includes para el array ingredients
  );
  res.json(response);
});

module.exports = router;
