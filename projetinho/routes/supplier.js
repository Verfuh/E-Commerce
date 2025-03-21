var express = require('express');
var router = express.Router();
const auth = require('../authSupplier')//Carregando os objetos do auth.js

//Carregar banco de dados
const db = require('../models');

//Carregando as classses service e controller da user
const SupplierService = require('../services/supplierService');
const SupplierController = require('../controllers/supplierController');

//Construir os objetos a partir das classes
const supplierService = new SupplierService(db.Supplier);
const supplierController = new SupplierController(supplierService);

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('Módulo de usuários rodando.');
});

//Rota para realizar o login
router.post('/login', async (req, res) => {
  supplierController.login(req, res);
})

//Rota para registrar novo usuário
router.post('/newSupplier', async (req, res) => {
  supplierController.createSupplier(req, res);
});

//Rota para retornar todos os usuários
router.get('/allSuppliers', auth.verifyToken, async (req, res) => {
  supplierController.findAllSupplier(req, res);
});

//Rota para retornar os usuários pelo ID
router.get('/getSupplierById', auth.verifyToken, async (req, res) => {
  supplierController.findSupplierById(req, res);
});


module.exports = router;