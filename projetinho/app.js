var express = require('express');//Para as rotas
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // Importando o CORS

// Importando o Sequelize e o modelo User
var sequelize = require('./models').sequelize;
var User = require('./models/user')(sequelize);
var Product = require('./models/product')(sequelize);
var Supplier = require('./models/supplier')(sequelize);


var indexRouter = require('./routes/index');//Para a rota principal do app
var usersRouter = require('./routes/users');//Para a rota users ./routes/users.js
var productRouter = require('./routes/product');//Para a rota users ./routes/product.js
var supplierRouter = require('./routes/supplier');


var app = express();//Ativa a API com o Express

var corsOptions = {
    origin: 'http://localhost:3000',  // Permite apenas o domínio especificado
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization']  // Cabeçalhos permitidos
};

app.use(cors(corsOptions)); // Adiciona o middleware do CORS


app.use(logger('dev'));
app.use(express.json()); //Permite o uso de JSon
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);//Cria a rota app/
app.use('/users', usersRouter);//Cria a rota app/users
app.use('/product', productRouter);//Cria a rota app/product
app.use('/supplier', supplierRouter);//Cria a rota app/product


// Sincronizando o Sequelize (em dev)
//Instanciar o banco de dados

const db = require('./models');

async function applyDataStructure() {
    await db.sequelize.sync({ alter: true });
}

applyDataStructure();
// if (process.env.NODE_ENV !== 'production') {
//     sequelize.sync({ force: true }) // use 'force: true' para recriar as tabelas a cada inicialização (útil em dev)
//         .then(() => {
//             console.log('Banco de dados sincronizado');
//         })
//         .catch(err => {
//             console.error('Erro ao sincronizar o banco de dados:', err);
//         });
// }

var port = 8080;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
module.exports = app;
