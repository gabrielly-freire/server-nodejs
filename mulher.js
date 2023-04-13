const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostraMulher(request, response){
    response.json({
        nome: "gabs",
        imagem:"https://avatars.githubusercontent.com/u/103790368?v=4",
        minibio: "estudante de ti"
    })
}

function mostrarPorta(){
    console.log("Servidor criado e rodando na porta "+porta)
}

app.use(router.get("/mulher", mostraMulher))
app.listen(porta, mostrarPorta)