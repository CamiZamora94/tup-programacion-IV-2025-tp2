/*

import express from "express"
import db from "./config/db.js"
import {descripcion, validarId, validarValidaciones, querydescripcion} from "../middlewares/validaciones.js";

import {
    descripcion,
    querydescripcion,
    validarId,
    validarValidaciones
} from "./middlewares/validaciones.js";

export const app = express.app();

app.get("/", querydescripcion, async (req, res) => {
    const { descripcion } = req.query;
  let sql = "SELECT * FROM tareas";
    let params = [];
    if (typeof descripcion !== "undefined") {
    sql += " WHERE descripcion = ?";
    params.push(descripcion === "true" ? 1 : 0);
}
    const [rows] = await db.execute(sql, params);
    const tareas = rows.map((tarea) => ({
    ...tarea,
    descripcion: Boolean(tarea.descripcion),
}));
res.json({ success: true, data: tareas });
});

app.get("/:id", validarId, validarValidaciones, async (req, res) => {
const { id } = req.params;
    const sql = "SELECT * FROM tareas WHERE id = ?";
    const [rows] = await db.execute(sql, [id]);
    if (rows.length === 0) {
    return res
    .status(404)
    .json({ success: false, message: "Tarea no encontrada" });
}
    const tarea = { ...rows[0], descripcion: Boolean(rows[0].descripcion) };
    res.json({ success: true, data: tarea });
});


app.post("/", tipo_tarea, validarValidaciones, async (req, res) => {
const { descripcion } = req.body;
  const sqlCheck = "SELECT * FROM tareas WHERE descripcion = ?";
    const [existingRows] = await db.execute(sqlCheck, [descripcion]);
    if (existingRows.length > 0) {
    return res
    .status(400)
    .json({ success: false, message: "La tarea ya existe" });
}
    const sql = "INSERT INTO tareas (descripcion) VALUES (?)";
    const [result] = await db.execute(sql, [descripcion]);
    res.status(201).json({
    success: true,
    data: { id: result.insertId, descripcion },
});
});

app.put("/:id", validarId, validarValidaciones, async (req, res) => {
    const id = parseInt(req.params.id);
    const { descripcion } = req.body;
    const sqlUpdate = "UPDATE tareas SET descripcion = ? WHERE id = ?";
    const [rows] = await db.execute(sqlUpdate, [descripcion, id]);
    if (rows.length === 0) {
    return res
        .status(404)
        .json({ success: false, message: "Tarea no encontrada" });
    }
    res.json({
    success: true,
    message: "Tarea actualizada",
    });
}
);

app.delete("/:id", validarId , validarValidaciones, async (req, res) => {
const { id } = req.params;
const sqlDelete = "DELETE FROM tareas WHERE id = ?";
const [result] = await db.execute(sqlDelete, [id]);
if (result.affectedRows === 0) {
    return res.status(404).json({
    success: false,
    message: "No se encontró la tarea",
    });
}
res.json({ success: true, message: "Tarea eliminada" });
});

export default app;

*/

import express from "express";
import db from "./config/db.js";
import {tipo_tarea, validarId, validarValidaciones, querydescripcion} from "../middlewares/validaciones.js";

import express from "express";
import db from "./config/db.js";
import {
    tipo_tarea,
    validarId,
    validarValidaciones,
    querydescripcion,
} from "./middlewares/validaciones.js";

const app = express();
app.use(express.json());

// ✅ GET todas las tareas (con filtro opcional tipo_tarea=true/false)
app.get("/", querydescripcion, async (req, res) => {
    const { tipo_tarea } = req.query;
    let sql = "SELECT * FROM tareas";
    let params = [];

    if (tipo_tarea !== undefined) {
    sql += " WHERE tipo_tarea = ?";
    params.push(tipo_tarea === "true" ? 1 : 0);
}

    const [rows] = await db.execute(sql, params);

  // Convertimos a boolean para el cliente
    const tareas = rows.map((t) => ({
    ...t,
    tipo_tarea: Boolean(t.tipo_tarea),
    }));

    res.json({ success: true, data: tareas });
});

// ✅ GET tarea por ID
app.get("/:id", validarId, validarValidaciones, async (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM tareas WHERE id = ?";
    const [rows] = await db.execute(sql, [id]);

    if (rows.length === 0) {
    return res
    .status(404)
    .json({ success: false, message: "Tarea no encontrada" });
}

    const tarea = { ...rows[0], tipo_tarea: Boolean(rows[0].tipo_tarea) };
    res.json({ success: true, data: tarea });
});

// ✅ POST nueva tarea
app.post("/", tipo_tarea, validarValidaciones, async (req, res) => {
    let { tipo_tarea } = req.body;

  // Normalizamos a 0/1
    tipo_tarea = tipo_tarea === true || tipo_tarea === "true" ? 1 : 0;

  // Verificar si ya existe
  const sqlCheck = "SELECT * FROM tareas WHERE tipo_tarea = ?";
    const [existingRows] = await db.execute(sqlCheck, [tipo_tarea]);

    if (existingRows.length > 0) {
    return res
    .status(400)
    .json({ success: false, message: "La tarea ya existe" });
}

    const sql = "INSERT INTO tareas (tipo_tarea) VALUES (?)";
    const [result] = await db.execute(sql, [tipo_tarea]);

res.status(201).json({
    success: true,
    data: { id: result.insertId, tipo_tarea: Boolean(tipo_tarea) },
});
});

// ✅ PUT actualizar tarea
app.put("/:id", validarId, tipo_tarea, validarValidaciones, async (req, res) => {
    const id = parseInt(req.params.id);
    let { tipo_tarea } = req.body;

  // Normalizamos a 0/1
tipo_tarea = tipo_tarea === true || tipo_tarea === "true" ? 1 : 0;

const sqlUpdate = "UPDATE tareas SET tipo_tarea = ? WHERE id = ?";
const [result] = await db.execute(sqlUpdate, [tipo_tarea, id]);

if (result.affectedRows === 0) {
    return res
    .status(404)
    .json({ success: false, message: "Tarea no encontrada" });
}

res.json({
    success: true,
    message: "Tarea actualizada",
    data: { id, tipo_tarea: Boolean(tipo_tarea) },
});
});

// ✅ DELETE eliminar tarea
app.delete("/:id", validarId, validarValidaciones, async (req, res) => {
const { id } = req.params;
const sqlDelete = "DELETE FROM tareas WHERE id = ?";
const [result] = await db.execute(sqlDelete, [id]);

    if (result.affectedRows === 0) {
    return res.status(404).json({
    success: false,
    message: "No se encontró la tarea",
    });
}

res.json({ success: true, message: "Tarea eliminada" });
});

export default app;

