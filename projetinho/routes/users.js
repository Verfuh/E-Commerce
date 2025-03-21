var express = require('express');
var router = express.Router();
const auth = require('../auth')//Carregando os objetos do auth.js

//Carregar banco de dados
const db = require('../models');

//Carregando as classses service e controller da user
const UserService = require('../services/userService');
const UserController = require('../controllers/userController');

//Construir os objetos a partir das classes
const userService = new UserService(db.User);
const userController = new UserController(userService);

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('Módulo de usuários rodando.');
});

//Rota para realizar o login
router.post('/login', async (req, res) => {
  userController.login(req, res);
})

//Rota para registrar novo usuário
router.post('/newUser', async (req, res) => {
  userController.createUser(req, res);
});

//Rota para retornar todos os usuários
router.get('/allUsers', auth.verifyToken, async (req, res) => {
  userController.findAllUsers(req, res);
});

//Rota para retornar os usuários pelo ID
router.get('/getUserById', async (req, res) => {
  userController.findUserById(req, res);
});


module.exports = router;