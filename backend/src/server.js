const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');

//Criar aplicação
const app = express();
const uri = 'mongodb+srv://tattoour:7OivkRjdV2PjV1wk@tattour-m5yy0.mongodb.net/tattoour?retryWrites=true&w=majority'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// GET, PUT, POST, DELETE

// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edição, delete)
// req.body = Acessar corpo da requisição (para criação, edição)

app.use(express.json());
app.use(routes);

app.listen(3333);