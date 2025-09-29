import express from "express"
import { db } from "../config/db.js"
import {
  validarId,
  validarMateria,
  verificarValidaciones,
} from "../middlewares/validaciones.js"

const router = express.Router()

// GET
router.get("/", async (req, res) => {
  const sql = "SELECT * FROM materias"
  const [rows] = await db.execute(sql)

  res.json({
    success: true,
    data: rows,
  })
})

// GET por ID
router.get("/:id", validarId, verificarValidaciones, async (req, res) => {
  const id = Number(req.params.id)
  const sql = "SELECT * FROM materias WHERE id = ?"
  const [rows] = await db.execute(sql, [id])

  if (rows.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Materia no encontrada",
    })
  }

  res.json({
    success: true,
    data: rows,
  })
})

// POST
router.post("/", validarMateria, verificarValidaciones, async (req, res) => {
  const { nombre } = req.body
  const sql = "INSERT INTO materias (nombre) VALUES (?)"
  const [result] = await db.execute(sql, [nombre])

  res.status(201).json({
    success: true,
    message: "Materia creada",
    data: { id: result.insertId, nombre },
  })
})

// PUT
router.put("/:id", validarMateria, verificarValidaciones, async (req, res) => {
  const id = Number(req.params.id)
  const { nombre } = req.body
  const sql = "UPDATE materias SET nombre = ? WHERE id = ?"
  const [result] = await db.execute(sql, [nombre, id])

  if (result.affectedRows === 0) {
    return res.status(404).json({
      success: false,
      message: "Materia no encontrada",
    })
  }

  res.json({
    success: true,
    message: "Materia actualizada",
    data: { id, nombre },
  })
})

// DELETE
router.delete("/:id", validarId, verificarValidaciones, async (req, res) => {
  const id = Number(req.params.id)
  const sql = "DELETE FROM materias WHERE id = ?"
  const [result] = await db.execute(sql, [id])

  if (result.affectedRows === 0) {
    return res.status(404).json({
      success: false,
      message: "Materia no encontrada",
    })
  }

  res.json({
    success: true,
    message: "Materia eliminada",
  })
})

export default router
