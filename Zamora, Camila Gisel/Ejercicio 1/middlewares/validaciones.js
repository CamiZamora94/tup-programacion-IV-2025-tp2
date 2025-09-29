import { body, param, validationResult} from "express-validator";

export const validarLados = [ body ("lado1").isFloat({min:0.1}).withMessage("lado1 debe ser mayor a  0"),
body ("lado2").isFloat({min:0.1}).withMessage("lado2 debe ser mayor a 0")]

export const validarId =[param ("id").isInt({min:1}).withMessage("id debe ser un entero positivo")]

export const validarValidaciones = (req, res , next) => {
    const validacion = validationResult(req)
    if (!validacion.isEmpty()) {
        return res.status(400).json({
        sucess: false,
        message: "Error de validacion",
        errors: validacion.array()
    })
    }
    next();
}


