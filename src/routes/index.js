const { Router } = require("express");
const router = Router();

//localhost:8080/rutaGet
//Rutas GET

router.get("/", (req, res) => {
  console.log("Alguien ha accedido al servidor");
  res.send("Bienvenido al servidor");
});

router.get("/rutaGet", (req, res) => {
  console.log("Alguien ha accedido a la ruta Get");
  res.send("Hola desde una web llamada en el servidor");
});

router.get("/rutaHolaMundo", (req, res) => {
  res.send("Hola mundo! 🌍");
});

router.get("/rutaGetJSON", (req, res) => {
  console.log("Alguien ha accedido a la ruta JSON");
  res.json({
    Title: "Hola mundo con JSON",
  });
});

module.exports = router;
