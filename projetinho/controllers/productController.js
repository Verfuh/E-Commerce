class ProductController {

    constructor(ProductService) {
        this.productService = ProductService;
    }

    async createProduct(req, res) {

        const { name, description, category, price, stock } = req.body;
        try {
            const newProduct = await this.productService.createProduct(name, description, category, price, stock);
            res.status(200).json(newProduct);
            res.send();
        }
        catch (error) {
            res
                .status(500).json({ error: 'Ocorreu um erro ao gravar o novo usuário.' })
        }
    }

    async getAllProducts(req, res) {
        try {
            const Products = await this.productService.getAllProducts();
            res.status(200).json(Products);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    async findProductById(req, res) {
        const { id } = req.query;
        try {
            const Product = await this.productService.FindProductById(id);

            if (!Product) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }

            return res.status(200).json(Product);
        }
        catch (error) {
            res.status(500).json({ error: 'Ocorreu um erro ao localizar o produto pelo ID.' });
        }
    }

    async updateProduct(req, res) {
        const { id, name, description, price, category, stock } = req.body;

        try {
            const Product = await this.productService.updateProduct(id, { name, description, price, category, stock });
            if (Product) {
                res.status(200).json({ message: 'Produto atualizado com sucesso!' });
            } else {
                res.status(404).json({ message: 'Produto não encontrado.' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar produto.' });
        }
    }

    async deleteProduct(req, res) {
        const { id } = req.body;

        try {
            const result = await this.productService.deleteProduct(id);
            if (result) {
                res.status(200).json({ message: 'Produto excluído com sucesso!' });
            } else {
                res.status(404).json({ message: 'Produto não encontrado.' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao excluir produto.' });
        }
    }

}

module.exports = ProductController;
