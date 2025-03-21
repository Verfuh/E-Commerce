const db = require('../models');
const auth = require('../auth');
const bcrypt = require('bcrypt');
var round_salts = 10;

class UserService {
    constructor(UserModel) {
        this.User = UserModel;
    }

    async createLogin(username, email, password) {
        try {
            const hashpassword = await bcrypt.hash(password, parseInt(round_salts));
            const newUser = await this.User.create({
                username: username,
                email: email,
                password: hashpassword
            });
            return newUser ? newUser : null;
        }
        catch (error) {
            throw error;
        }
    }

    // Metodo para retornar todos os usuários

    async findAllUsers() {
        try {
            const AllUser = this.User.findAll();
            return AllUser ? AllUser : null;
        }
        catch (error) {
            throw error;
        }
    }

    // Metodo para retornar usuário pelo ID

    async FindUsersById(id) {
        try {
            const User = await this.User.findByPk(id);
            return User ? User : null;
        }
        catch (error) {
            throw error;
        }
    }

    //Metodo para login

    async login(email, password) {
        try {
            const User = await this.User.findOne({ where: { email } });

            if (User) {
                const validPassword = await bcrypt.compare(password, User.password);

                if (validPassword) {
                    const token = await auth.generateToken(User);

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

module.exports = UserService;