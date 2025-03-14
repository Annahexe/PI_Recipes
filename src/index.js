//Consultar el archivo README para más información sobre los módulos.

console.log("Annamaria Marino\n");
console.log("Ejercicio Proyecto Intermodular");

//npm run dev
const express = require("express");
const app = express();
const morgan = require("morgan");

//Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

//Settings Puerto
app.set("port", process.env.PORT || 8080);

//Routes
app.use(require("./routes/index"));

//Se inicia el servidor
app.listen(app.get("port"), () => {
  console.log("Hola desde el puerto: " + app.get("port"));
});
