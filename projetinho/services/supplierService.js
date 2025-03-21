const db = require('../models');
const auth = require('../authSupplier');
const bcrypt = require('bcrypt');
var round_salts = 10;

class SupplierService {
    constructor(SupplierModel) {
        this.Supplier = SupplierModel;
    }

    async createLogin(corporateName, cnpj, password) {
        try {
            const hashpassword = await bcrypt.hash(password, parseInt(round_salts));
            const newSupplier = await this.Supplier.create({
                corporateName: corporateName,
                cnpj: cnpj,
                password: hashpassword
            });
            return newSupplier ? newSupplier : null;
        }
        catch (error) {
            throw error;
        }
    }

    // Metodo para retornar todos os usuários

    async findAllSuppliers() {
        try {
            const AllSupplier = this.Supplier.findAll();
            return AllSupplier ? AllSupplier : null;
        }
        catch (error) {
            throw error;
        }
    }

    // Metodo para retornar usuário pelo ID

    async FindSuppliersById(id) {
        try {
            const Supplier = await this.Supplier.findByPk(id);
            return Supplier ? Supplier : null;
        }
        catch (error) {
            throw error;
        }
    }

    //Metodo para login

    async login(cnpj, password) {
        try {
            const Supplier = await this.Supplier.findOne({ where: { cnpj } });

            if (Supplier) {
                const validPassword = await bcrypt.compare(password, Supplier.password);

                if (validPassword) {
                    const token = await auth.generateToken(Supplier);

                    return { Token: token };
                } else {
                    throw new Error('Senha inválida');
                }
            } else {
                throw new Error('Usuário não encontrado');
            }
        } catch (error) {
            throw error;
        }
    }

}


module.exports = SupplierService;