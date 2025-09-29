
import express from "express";
import dotenv from "dotenv";
import app from "./app.js"; // 👈 importamos tu app con todas las rutas

// Cargar variables de entorno
dotenv.config();

// Puerto desde .env o por defecto 3000
const PORT = process.env.PORT || 3000;

// Inicializar servidor
app.listen(PORT, () => {
console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
