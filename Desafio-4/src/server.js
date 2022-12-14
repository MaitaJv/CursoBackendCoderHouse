import express, { json, urlencoded } from "express";
import productosRouter from "./routes/productos.route.js";
import baseRouter from "./routes/base.route.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname + "/uploads")));
app.use("/public", express.static(path.join(__dirname + "/html")));

// Middleware de logeo de solicitudes
app.use((req, res, next) => {
  console.log(`X ${req.method} - ${req.path}`);

  next();
});

app.use("/api/productos", productosRouter);
app.use("/", baseRouter);

app.listen(8080, (error) => {
  if (error) {
    console.log("Error al iniciar la app", error);
  } else {
    console.log("Servidor ecuchando puerto 8080");
  }
});
