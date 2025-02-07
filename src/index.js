//Consultar el archivo README para más información sobre los módulos.

console.log("Annamaria Marino | 2024 | Florida Universitària \n");
console.log(
  "Ejercicio de configuracion prototipo de servidor (PI_005_Prototipo)"
);

//npm run dev
const express = require("express");
const app = express();
const morgan = require("morgan");

app.set("port", process.env.PORT || 8080);

app.use(morgan("dev"));
//Routes
app.use(require("./routes/index"));

//Se inicia el servidor
app.listen(app.get("port"), () => {
  console.log("Hola desde el puerto: " + app.get("port"));
});
