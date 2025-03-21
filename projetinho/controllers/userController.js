class UserController {
    constructor(UserService) {
        this.userService = UserService;
    }

    async createUser(req, res) {

        const { username, email, password } = req.body;
        try {
            const newUser = await this.userService.createLogin(username, email, password);
            res.status(200).json(newUser);
            res.send();
        }
        catch (error) {
            res
                .status(500).json({ error: 'Ocorreu um erro ao gravar o novo usuário.' })
        }
    }

    async findAllUsers(req, res) {
        try {
            const AllUser = await this.userService.findAllUsers();
            res.status(200).json(AllUser);
        }
        catch (error) {
            res
                .status(500).json({ error: 'Ocorreu um erro ao localizar os usuários.' })
        }
    }

    async findUserById(req, res) {

        const { id } = req.query;
        try {
            const User = await this.userService.FindUsersById(id);
            res.status(200).json(User);
        }
        catch (error) {
            res
                .status(500).json({ error: 'Ocorreu um erro ao localizar o usuário pelo ID.' })
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const User = await this.userService.login(email, password);

            if (User) {
                return res.status(200).json({
                    token: User.Token,
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
module.exports = UserController;