import { body, param, validationResult } from "express-validator"

export const validarId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un entero positivo"),
]

export const validarMateria = [
  body("nombre")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    .notEmpty()
    .withMessage("El nombre no puede estar vacío"),
]

export const validarAlumno = [
  body("nombre")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto")
    .notEmpty()
    .withMessage("El nombre no puede estar vacío"),
]

export const validarInscripcion = [
  body("alumnoId")
    .isInt({ min: 1 })
    .withMessage("El ID del alumno debe ser un entero positivo"),
  body("materiaId")
    .isInt({ min: 1 })
    .withMessage("El ID de la materia debe ser un entero positivo"),
  body("nota1")
    .isFloat({ min: 0, max: 10 })
    .withMessage("La nota1 debe ser un número entre 0 y 10"),
  body("nota2")
    .isFloat({ min: 0, max: 10 })
    .withMessage("La nota2 debe ser un número entre 0 y 10"),
  body("nota3")
    .isFloat({ min: 0, max: 10 })
    .withMessage("La nota3 debe ser un número entre 0 y 10"),
]

export const validarNotas = [
  body("nota1")
    .isFloat({ min: 0, max: 10 })
    .withMessage("La nota1 debe ser un número entre 0 y 10"),
  body("nota2")
    .isFloat({ min: 0, max: 10 })
    .withMessage("La nota2 debe ser un número entre 0 y 10"),
  body("nota3")
    .isFloat({ min: 0, max: 10 })
    .withMessage("La nota3 debe ser un número entre 0 y 10"),
]

export const verificarValidaciones = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() })
  }
  next()
}
