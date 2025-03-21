const db = require('../models');
const auth = require('../auth');
const Product = require('../models').Product; // Certifique-se de que o modelo é acessado corretamente

class ProductService {
    constructor(ProductModel) {
        this.Product = ProductModel;
    }

    // Função para criar um novo produto
    async createProduct(name, description, category, price, stock) {
        try {
            const newProduct = await Product.create({
                name: name,
                description: description,
                category: category,
                price: price,
                stock: stock
            });
            return newProduct;
        } catch (error) {
            throw new Error(`Erro ao criar produto: ${error.message}`);
        }
    };

    // Função para obter todos os produtos
    async getAllProducts() {
        try {
            const products = await Product.findAll();
            return products;
        } catch (error) {
            throw new Error(`Erro ao buscar produtos: ${error.message}`);
        }
    };

    // Função para obter um produto por ID
    async FindProductById(id) {
        try {
            const Product = await this.Product.findByPk(id);
            return Product ? Product : null;
        }
        catch (error) {
            throw error;
        }
    }


    // Função para atualizar um produto
    async updateProduct(id, productData) {
        try {
            const [updated] = await Product.update(productData, {
                where: { id }
            });
            if (updated) {
                const updatedProduct = await Product.findOne({ where: { id } });
                return updatedProduct;
            }
            throw new Error('Produto não encontrado');
        } catch (error) {
            throw new Error(`Erro ao atualizar produto: ${error.message}`);
        }
    };

    // Função para deletar um produto
    async deleteProduct(id) {
        try {
            const deleted = await Product.destroy({
                where: { id }
            });
            if (deleted) {
                return { message: 'Produto deletado com sucesso' };
            }
            throw new Error('Produto não encontrado');
        } catch (error) {
            throw new Error(`Erro ao deletar produto: ${error.message}`);
        }
    }

};

module.exports = ProductService;
