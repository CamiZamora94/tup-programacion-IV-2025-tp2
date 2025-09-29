
import { body, params, validationResult } from "express-validator";

// Validar campo tipo_tarea en body
export const tipo_tarea = body("tipo_tarea")
    .exists().withMessage("El campo 'tipo_tarea' es obligatorio")
    .isBoolean().withMessage("El campo 'tipo_tarea' debe ser booleano (true/false)");

// Validar id en params
export const validarId = [
    params("id")
    .isInt({ min: 1 })
    .withMessage("El 'id' debe ser un número entero positivo mayor a 0"),
];

// Middleware genérico para devolver errores de validación
export const validarValidaciones = (req, res, next) => {
    const validacion = validationResult(req);

    if (!validacion.isEmpty()) {
    return res.status(400).json({
    success: false,
    message: "Error en la validación",
    errors: validacion.array(),
    });
}
    next();
};

// Validar query param tipo_tarea
export const querydescripcion = (req, res, next) => {
    const { tipo_tarea } = req.query;
    if (
    typeof tipo_tarea !== "undefined" &&
    tipo_tarea !== "true" &&
    tipo_tarea !== "false"
    ) {
    return res.status(400).json({
    success: false,
    message: "El parámetro 'tipo_tarea' debe ser 'true' o 'false'",
    });
}
    next();
};
