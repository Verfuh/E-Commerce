//auth.js

const jwt = require('jsonwebtoken')
const secret = '123'; //Ponto de vulnarebalidade
//Recomenda-se gravar em variaveis de ambiente de sistema operacional

//Metodo para gerar o token jwt
async function generateToken(supplier) {
    const id = supplier.id;
    const cnpj = supplier.cnpj;
    const token = jwt.sign({ id, cnpj }, secret, { expiresIn: '1h' });
    return token;
}

//Metodo para verificar a validade do token
async function verifyToken(req, res, next) {
    //Extrair o cabeçalho (Header) que contem o token jkw
    const authHeader = req.headers['authorization'];
    //Extrar o token jwt
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token não informado' });
    }
    //Verificar a validade
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            //Caso ocorra erro
            return res.status(401).json({ message: 'Token inválido' });
        }
        req.supplier = decoded;
        next();
    });
}

module.exports = { generateToken, verifyToken };