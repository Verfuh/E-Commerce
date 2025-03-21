class SupplierController {
    constructor(SupplierService) {
        this.supplierService = SupplierService;
    }

    async createSupplier(req, res) {

        const { corporateName, cnpj, password } = req.body;
        try {
            const newSupplier = await this.supplierService.createLogin(corporateName, cnpj, password);
            res.status(200).json(newSupplier);
            res.send();
        }
        catch (error) {
            res
                .status(500).json({ error: 'Ocorreu um erro ao gravar o novo fornecedor.' })
        }
    }

    async findAllSupplier(req, res) {
        try {
            const AllSupplier = await this.supplierService.findAllSuppliers();
            res.status(200).json(AllSupplier);
        }
        catch (error) {
            res
                .status(500).json({ error: 'Ocorreu um erro ao localizar os fornecedores.' })
        }
    }

    async findSupplierById(req, res) {

        const { id } = req.query;
        try {
            const Supplier = await this.supplierService.FindSupplierById(id);
            res.status(200).json(Supplier);
        }
        catch (error) {
            res
                .status(500).json({ error: 'Ocorreu um erro ao localizar o fornecedor pelo ID.' })
        }
    }

    async login(req, res) {
        const { cnpj, password } = req.body;
        try {
            const Supplier = await this.supplierService.login(cnpj, password);

            if (Supplier) {
                return res.status(200).json({
                    token: Supplier.Token,
                    message: 'Login bem-sucedido',
                });
            } else {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Ocorreu um erro ao realizar o login.' });
        }
    }

}

module.exports = SupplierController;