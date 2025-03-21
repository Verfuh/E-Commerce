var express = require('express');
var router = express.Router();
const auth = require('../authSupplier')//Carregando os objetos do auth.js

//Carregar banco de dados
const db = require('../models');

const ProductService = require('../services/productService');
const ProductController = require('../controllers/productController');

//Construir os objetos a partir das classes
const productService = new ProductService(db.Product);
const productController = new ProductController(productService);

//Rota para cadastrar produtos
router.post('/createProduct', auth.verifyToken, async (req, res) => {
    productController.createProduct(req, res);
});

//Rota para retornar todos os produtos
router.get('/getAllProducts', auth.verifyToken, async (req, res) => {
    productController.getAllProducts(req, res);
});

//Rota para retornar os usuários pelo ID
router.get('/getProductById', auth.verifyToken, async (req, res) => {
    productController.findProductById(req, res);
});

//Rota para atualizar produtos
router.put('/updateProduct', auth.verifyToken, async (req, res) => {
    productController.updateProduct(req, res);
});

//Rota para deletar produtos
router.delete('/deleteProduct', auth.verifyToken, async (req, res) => {
    productController.deleteProduct(req, res);
});

module.exports = router;