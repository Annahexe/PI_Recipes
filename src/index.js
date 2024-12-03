//Consultar el archivo README para más información sobre los módulos.

console.log("Annamaria Marino | 2024 | Florida Universitària \n");
console.log(
  "Ejercicio de configuracion en GitHub de la asignatura Proyecto Intermodular (PI_003_Github Archivo)"
);

const rl = require("readline-sync");

const askName = () => rl.question("Hola Mundo! :) cual es tu nombre? ");

const saludo = () => {
  const nombre = askName();
  return "Hola " + nombre + ", encantado de saludarte!";
};

console.log(saludo());
