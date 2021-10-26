const { application } = require('express');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect("mongodb://admin:pre1958@saude-shard-00-00.3nvl4.mongodb.net:27017,saude-shard-00-01.3nvl4.mongodb.net:27017,saude-shard-00-02.3nvl4.mongodb.net:27017/indications?authSource=admin&replicaSet=atlas-l839ip-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", { useNewUrlParser: true });


var Schema = mongoose.Schema;

// Define Database Schema
var TaskSchema = new Schema({
	nome: {type: String},
	nomemae: {type: String},
	nascimento: {type: String},
	deficiencia:{type: String},
	genero: {type: String},
	etnia: {type: String},
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



}, {collection: 'tasks'});



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




/* GET Task Single page. */
router.get('/add', function(req, res, next) {
	res.render('tasks/create', {title: "Licenciamento ambiental", success: req.session.success, errors: req.session.errors});
});


/* Post Task Single page. */
router.post('/store', function(req, res, next) {

	req.check('status', "Please give status for task").notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		req.session.errors = errors;
		req.session.success = false;
		res.redirect('/add');
	}else {
		req.session.success = true;

		var task = 
		{
			'nome' : req.body.nome,
			'nomemae': req.body.nomemae,
			'nascimento': req.body.nascimento,
			'sexo': req.body.sexo,
			'cor': req.body.cor,
			'deficiencia':req.body.deficiencia,
			'email': req.body.email,
			'telefonefixo': req.body.telefonefixo,
			'celular': req.body.celular,
			'fisico': req.body.fisico,
			'cpf': req.body.cpf,
			'sus': req.body.sus,
			'cep': req.body.cep,
			'rua': req.body.rua,
			'numero': req.body.numero,
			'complemento': req.body.complemento,
			'bairro': req.body.bairro,
			'cidade': req.body.cidade,
			'estado': req.body.estado,
			'comprovanteendereco': req.body.comprovanteendereco,
			'img': original(req.file),
			'etnia': req.body.etnia,
			'genero': req.body.genero

			
		};

		var task = new Task(task);
		task.save();res.redirect('/');
	}

});


	router.post('/update', function(req, res, next) {

			var id = req.body.id;
		

		//validate first
		req.check('status', "Please give status for task").notEmpty();

		var errors = req.validationErrors();
		if (errors) {
			req.session.errors = errors;
			req.session.success = false;
			res.redirect('/');
		}else {
			req.session.success = true;
			Task.findById(id, function (err, doc) {
				if (err) {
					console.log('Error To find the docs');
				}else {
					
					doc.empresa = req.body.empresa;
					doc.endereco = req.body.endereco;
					doc.status = req.body.status;
					doc.observation = req.body.observation;
					doc.notification = req.body.notification;
					doc.prazoentrega = req.body.prazoentrega;
					doc.entregadocumentos = req.body.entregadocumentos;
					doc.vencimentolicenca = req.body.vencimentolicenca;
					
					doc.save();
					res.redirect('/');
				} 
			})
		} 
	});

	function  original (file) {

		originalName = []
	
		var exemplo = file["originalname"]
	
		originalName.push(exemplo)
	
	
	return(originalName)
	
	}


	
			/* Delete Task */
			router.post('/delete', function(req, res, next) {
				var id = req.body.id;
				
				Task.findByIdAndRemove(id).exec();
			

				res.redirect('/');
			});



			module.exports = router;
