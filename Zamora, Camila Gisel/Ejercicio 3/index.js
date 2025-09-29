import express from "express"
import { conectarDB } from "./config/db.js"
import alumnosRouter from "./routes/alumnos.js"
import materiasRouter from "./routes/materias.js"

const app = express()
const port = 3000

conectarDB()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hola mundo!")
})

app.use("/materias", materiasRouter)
app.use("/alumnos", alumnosRouter)

app.listen(port, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${port}`)
})
