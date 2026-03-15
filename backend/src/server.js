import express, { json } from "express"
import cors from "cors"

import testRoutes from "./routes/test.routes"

const app = express()

app.use(cors())
app.use(json())

app.use("/test", testRoutes)

app.get("/", (req,res)=>{
 res.json({message:"API funcionando"})
})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
 console.log(`Servidor rodando na porta ${PORT}`)
})