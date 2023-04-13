const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

const mulheres = [
    {
        nome: "gabs",
        imagem:"https://avatars.githubusercontent.com/u/103790368?v=4",
        minibio: "estudante de ti"
    },
    {
        nome: "maria",
        imagem:"https://avatars.githubusercontent.com/u/103790368?v=4",
        minibio: "dev"
    },
    {
        nome: "ju",
        imagem:"https://avatars.githubusercontent.com/u/103790368?v=4",
        minibio: "dev front-end"
    }

]

function mostraMulheres(request, response){
    response.json(mulheres)
}

function mostrarPorta(){
    console.log("Servidor criado e rodando na porta "+porta)
}

app.use(router.get("/mulheres", mostraMulheres))
app.listen(porta, mostrarPorta)