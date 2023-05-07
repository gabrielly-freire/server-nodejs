const express = require("express") //iniciando o express
const router = express.Router() //configurando a primeira parte da rota
const cors = require('cors')//trazendo o pacote cors - que permite consumir a api no front-end
const conectaBancoDeDados = require('./bancoDeDados')//ligando ao arquivo bancoDeDados
conectaBancoDeDados()//chamando a função

const Mulher = require('./mulherModel')

const app = express() //iniciando o app
app.use(express.json())
app.use(cors())

const porta = 3333 //criando porta

//get
async function mostraMulheres(request, response){
	try{
		const mulheresVindasDoBancoDeDados = await Mulher.find()

		response.json(mulheresVindasDoBancoDeDados)
	}catch(erro){
		console.log(erro)
	}
}

//post
async function criaMulher(request, response){
	const novaMulher = new Mulher({
		nome: request.body.nome,
		imagem: request.body.imagem,
		minibio: request.body.minibio,
		citacao: request.body.citacao
	})

	try{
		const mulherCriada = await novaMulher.save()
		response.status(201).json(mulherCriada)
	}catch(erro){
		console.log(erro)
	}

}

//patch
async function corrigeMulher(request, response){
	try {
		const mullherEncontrada = await Mulher.findById(request.params.id)

		if(request.body.nome){
			mullherEncontrada.nome = request.body.nome
		}
	
		if(request.body.imagem){
			mullherEncontrada.imagem = request.body.imagem
		}
	
		if(request.body.minibio){
			mullherEncontrada.minibio = request.body.minibio
		}

		if(request.body.citacao){
			mullherEncontrada.citacao = request.body.citacao
		}
	
		const mulherAtualizadaNoBancoDeDados = await mullherEncontrada.save()
		response.json(mulherAtualizadaNoBancoDeDados)

	} catch (erro) {
		console.log(erro)
		
	}

}

//delete
async function deletaMulher(request, response){
	try {
		await Mulher.findByIdAndDelete(request.params.id)
		response.json( {messagem: 'Mulher deletada com sucesso!'})
		
	} catch (erro) {
		console.log(erro)
	}
}


app.use(router.get("/mulheres", mostraMulheres)) //configurando rota get /mulheres
app.use(router.post("/mulheres",criaMulher)) //confirando rota post
app.use(router.patch("/mulheres/:id", corrigeMulher))
app.use(router.delete("/mulheres/:id", deletaMulher))


//porta
function mostrarPorta(){
	console.log("Servidor criado e rodando na porta "+porta)
}

app.listen(porta, mostrarPorta) //servidor ouvindo a porta

