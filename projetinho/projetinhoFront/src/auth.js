const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey'; // Defina sua chave secreta para assinatura

module.exports = {
    generateToken: (user) => {
        return jwt.sign(
            { id: user.id, email: user.email }, // Dados do payload
            secretKey, // A chave secreta para gerar o token
            { expiresIn: '1h' } // Expiração do token
        );
    },

    verifyToken: (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1]; // Pega o token do header Authorization

        if (!token) {
            return res.status(403).json({ message: "Token não fornecido." });
        }

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Token inválido ou expirado." });
            }
            req.user = decoded; // Passa o usuário decodificado para as próximas rotas
            next();
        });
    },
};
