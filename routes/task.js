const { application } = require('express');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/teste", { useNewUrlParser: true });


var Schema = mongoose.Schema;

// Define Database Schema
var TaskSchema = new Schema({
	nome: {type: String},
	nomemae: {type: String},
	nascimento: {type: String},
	deficiencia:{type: String},
	email: {type: String},
	telefonefixo: {type: String},
	celular: {type: String}, 
	fisico: {type: String},
	cpf: {type: String},
	sus: {type: String},
	cep: {type: String},
	rua: {type: String},
	numero: {type: String},
	complemento: {type: String},
	bairro: {type: String},
	cidade: {type: String},
	estado: {type: String},
	comprovanteendereco: {type: String},
	img: {type: [String]}



}, {collection: 'categorias'});



// Define Schema Object
var Task = mongoose.model('Task', TaskSchema);

/* GET Tasks page. */
router.get('/', function(req, res, next) {
	Task.find().sort({_id: -1})
	.then(function(docs) {
		res.render('tasks/index', {tasks: docs})

	})
});


/* GET Task Single page. */
router.get('/view/id', function(req, res, next) {

	Task.findById(id)
	.then(function(docs) {
		res.render('tasks/show', {task: docs})

	})
});






	function  original (file) {

		originalName = []
	
		var exemplo = file["originalname"]
	
		originalName.push(exemplo)
	
	
	return(originalName)
	
	}

	
			
			module.exports = router;
