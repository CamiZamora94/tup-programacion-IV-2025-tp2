import express, { Router } from "express"
import db from "./config/db.js"
import { validarId, validarLados, validarValidaciones } from "./middlewares/validaciones.js"

const app = express()
const port = 3000

app.use(express.json())

app.get("/" ,(req,res) => {
    res.send("Hola mundo")
});

app.get("/rectangulos", async (req, res) => {
    const sql ="SELECT * FROM rectangulos"
    const [rows] = await db.execute(sql);
    res.json({
        sucess: true, 
        data: rows,
})
});

const obtenersuperficie = (lado1, lado2) => {
    return lado1* lado2
}

const obtenerperimetro = (lado1, lado2) => {
    return 2 * (lado1 + lado2)
}

app.post("/rectangulos", validarLados, validarValidaciones, async (req, res) => {
    const { lado1, lado2 } = req.body;
    const perimetro = obtenerperimetro(lado1, lado2);
    const superficie = obtenersuperficie(lado1, lado2);
    const sql = "INSERT INTO rectangulos (lado1, lado2, perimetro, superficie) VALUES (?,?,?,?)";
    const [result] = await db.execute(sql, [lado1, lado2, perimetro, superficie]);
    res.status(201).json({
        success: true,
        data: { id: result.insertId, lado1, lado2, perimetro, superficie},
    });
})

app.get("/rectangulos/:id",validarId , validarValidaciones, async (req, res) => {
    const {id} = req.params;
    const sql= "SELECT * FROM rectangulos WHERE id = ?";
})

app.put("/rectangulos/:id", validarId, validarLados, validarValidaciones, async (req, res) => {
    const id = Number(req.params.id);
    const { lado1, lado2 } = req.body;
    const perimetro = obtenerperimetro(lado1, lado2);
    const superficie = obtenersuperficie(lado1, lado2);
    const sql = "UPDATE rectangulos SET lado1=?, lado2=?, perimetro=?, superficie=? WHERE id=?";
    const [result] = await db.execute(sql, [lado1, lado2, perimetro, superficie,id]); 
    if (result.affectedRows===0){
        return res.status(400).json({
            success:false,
            message: "No se encontro el rectangulo",
        })
    }
    res.status(201).json({
        success: true,
        data: { id: result.insertId, lado1, lado2, perimetro, superficie},
    });
})

app.delete("/:id", validarId, validarValidaciones, async (req, res) => {
    const {id} = req.params;
    const sql = "DELETE FROM rectangulos WHERE id=?";
    const[result] = await db. execute(sql, [id]);
    if (result.affectedRows===0){
        return res.status(400).json({
        success:false,
        message: "No se encontro el rectangulo",
    });
}
    res.json({
    sucess: true,
    data: id
    });
})

app.listen(port, () => {
    console.log("✅ Servidor funcionando")
});

export default app;


