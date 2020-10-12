const express = require('express')
const http = require("http") // adicionar
const consign = require("consign")
const jwt = require("jsonwebtoken");
const cors = require('cors')

require('dotenv').config();

const app = express();
const server = http.Server(app) // adicionar

app.use(cors({ origin: '*', credentials: true }))

app.set('jwt', jwt)

app.use(express.json());
app.use(express.urlencoded({ extended: false }))


consign({ cwd: 'src' })
    .include("db")
    .then("utils")
    .then("middlewares")
    .then("models")
    .then("controllers")
    .then("routes")
    .into(app)

const io = require("socket.io")(server)
let usuarios_conectados = 0;
io.on('connection', (client) => {
    console.log("Um usuário conectado")
    usuarios_conectados++;

    client.broadcast.emit('usuarios_conectados', usuarios_conectados)
    client.emit('usuarios_conectados', usuarios_conectados)

    client.on('disconnect', () => {
        usuarios_conectados--;
        console.log("Um usuário se desconectou")
        client.broadcast.emit('usuarios_conectados', usuarios_conectados)
    })
    
})


server.listen(8080, function() { // modificar
    console.log("Servidor rodando na porta 8080");
})