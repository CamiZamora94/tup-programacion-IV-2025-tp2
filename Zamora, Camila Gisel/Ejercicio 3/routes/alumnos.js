import express from "express"
import { db } from "../config/db.js"
import {
  validarAlumno,
  validarId,
  validarInscripcion,
  validarNotas,
  verificarValidaciones,
} from "../middlewares/validaciones.js"

const router = express.Router()

// GET
router.get("/", async (req, res) => {
  const sql =
    "SELECT am.id AS inscripcion_id, a.id AS alumno_id, a.nombre AS alumno, m.nombre AS materia, am.nota1, am.nota2, am.nota3 FROM alumno_materia am JOIN alumnos a ON am.alumno_id = a.id JOIN materias m ON am.materia_id = m.id"
  const [rows] = await db.execute(sql)

  res.json({
    success: true,
    data: rows,
  })
})

// GET por ID
router.get("/:id", validarId, verificarValidaciones, async (req, res) => {
  const id = Number(req.params.id)
  const sql =
    "SELECT am.id AS inscripcion_id, a.id AS alumno_id, a.nombre AS alumno, m.nombre AS materia, am.nota1, am.nota2, am.nota3 FROM alumno_materia am JOIN alumnos a ON am.alumno_id = a.id JOIN materias m ON am.materia_id = m.id WHERE a.id = ?"
  const [rows] = await db.execute(sql, [id])

  if (rows.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Alumno no encontrado",
    })
  }

  res.json({
    success: true,
    data: rows[0],
  })
})

// POST alumno
router.post("/", validarAlumno, verificarValidaciones, async (req, res) => {
  const { nombre } = req.body
  const sql = "INSERT INTO alumnos (nombre) VALUES (?)"
  const [result] = await db.execute(sql, [nombre])

  res.json({
    success: true,
    data: {
      idalumnos: result.insertId,
      nombre,
    },
  })
})

// POST inscripcion
router.post(
  "/inscripcion",
  validarInscripcion,
  verificarValidaciones,
  async (req, res) => {
    const { alumno_id, alumnosmateria_id, nota_1, nota_2, nota_3 } = req.body
    const sql =
      "INSERT INTO alumno_materia (alumno_id, materia_id, nota1, nota2, nota3) VALUES (?, ?, ?, ?, ?)"
    const [result] = await db.execute(sql, [
      alumno_id,
      alumnosmateria_id,
      nota_1,
      nota_2,
      nota_3,
    ])

    res.json({
      success: true,
      data: {
        id: result.insertId,
        alumno_id,
        alumnosmateria_id,
        nota_1,
        nota_2,
        nota_3,
      },
    })
  }
)

// UPDATE alumno
router.put(
  "/:id",
  validarId,
  validarAlumno,
  verificarValidaciones,
  async (req, res) => {
    const id = Number(req.params.id)
    const { nombre } = req.body
    const sql = "UPDATE alumnos SET nombre = ? WHERE id = ?"
    const [result] = await db.execute(sql, [nombre, id])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Alumno no encontrado",
      })
    }

    res.json({
      success: true,
      data: {
        id,
        nombre,
      },
    })
  }
)

// UPDATE notas
router.put(
  "/notas/:id",
  validarId,
  validarNotas,
  validarInscripcion,
  async (req, res) => {
    const id = Number(req.params.id)
    const { nota_1, nota_2, nota_3 } = req.body
    const sql =
      "UPDATE alumno_materia SET nota1 = ?, nota2 = ?, nota3 = ? WHERE alumno_id = ?"
    const [result] = await db.execute(sql, [nota_1, nota_2, nota_3, id])

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Inscripción no encontrada",
      })
    }

    res.json({
      success: true,
      data: {
        id,
        nota_1,
        nota_2,
        nota_3,
      },
    })
  }
)

// DELETE
router.delete("/:id", validarId, verificarValidaciones, async (req, res) => {
  const id = Number(req.params.id)
  const sql = "DELETE FROM alumnos WHERE id = ?"
  const [result] = await db.execute(sql, [id])

  if (result.affectedRows === 0) {
    return res.status(404).json({
      success: false,
      message: "Alumno no encontrado",
    })
  }

  res.json({
    success: true,
    message: "Alumno eliminado",
  })
})

export default router
