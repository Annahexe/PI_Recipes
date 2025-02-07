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
    "Bienvenido al servidor, puedes acceder a las siguientes rutas:\n RUTAS GET: /about; /rutaRecetas; /rutaPizza; /rutaVegetarian; /rutaTomatoSauce\n RUTAS POST: /rutaPOST; /formulario; /agregarReceta; /buscarReceta; /filtrarPorIngrediente"
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

//POST

router.post("/rutaPOST", (req, res) => {
  console.log("Alguien ha accedido a la ruta POST.");
  res.send("hola haciendo pruebas con la ruta POST.");
});

router.post("/formulario", (req, res) => {
  req.body =
    "En el req body guardaremos los datos del formulario para enviarlos a la base de datos (ej. registro)";
  console.log("Alguien ha accedido al formulario.");
  res.json({ nombre: "Cosas POST para un formulario." });
});

router.post("/agregarReceta", (req, res) => {
  req.body =
    "En el req body guardaremos los datos de nuevas recetas que el usuario quiere agregar";
  console.log("Alguien ha intentado agregar una nueva receta.");
  res.json({ mensaje: "Receta agregada." });
});

router.post("/buscarReceta", (req, res) => {
  console.log("Alguien esta buscando una receta.");
  //En el req body guardaremos el nombre de la receta para buscar
  req.body = "Classic Margherita Pizza";
  const nombre = req.body;
  const recetaEncontrada = recipes.recipes.find(
    (recipe) => recipe.name === nombre
  );
  if (recetaEncontrada) {
    res.json(recetaEncontrada);
  } else {
    res.send("Receta no encontrada");
  }
});

router.post("/filtrarPorIngrediente", (req, res) => {
  console.log("Alguien esta filtrando por ingrediente.");
  //En el req body guardaremos los filtros a aplicar
  req.body = "parmesan cheese";
  const ingrediente = req.body;
  const filtroAplicado = recipes.recipes.filter((recipe) =>
    recipe.ingredients.includes(ingrediente)
  );
  res.json(filtroAplicado);
});

module.exports = router;
