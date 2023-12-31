const rotas = require('express').Router()
const usuario = require('./controladores/usuario')
const cliente = require('./controladores/cliente')
const categoria = require('./controladores/categoria')
const schemas = require('./validacoes/schemas')
const { validarDadosRequisicao, validarDadosParametro } = require('./intermediarios/validarDadosRequisicao')
const { autenticar } = require('./intermediarios/autenticador')
const { detalharCliente, atualizarCliente } = require('./controladores/cliente')

//definir qual vamos usar produto ou produtos 
const produto = require('./controladores/produto')

//rota pra teste do servidor
rotas.get('/', (req, res) => res.json({ mensagem: "OK" }))

rotas.post('/usuario', validarDadosRequisicao(schemas.schemaUsuario), usuario.cadastrarUsuario)
rotas.post('/login', validarDadosRequisicao(schemas.schemaLogin), usuario.login)
rotas.get('/categoria', categoria.listarCategorias)

//daqui para baixo, rotas protegidas
rotas.use(autenticar)

rotas.get('/usuario', usuario.detalharPerfil);
rotas.put('/usuario', validarDadosRequisicao(schemas.schemaUsuario), usuario.atualizarPerfil)

rotas.post('/cliente', validarDadosRequisicao(schemas.schemaCliente), cliente.cadastrarCliente)
rotas.get('/cliente', cliente.listarCliente)
rotas.get('/cliente/:id', validarDadosParametro(schemas.schemaClienteId), detalharCliente);
rotas.put('/cliente/:id', validarDadosParametro(schemas.schemaClienteId), validarDadosRequisicao(schemas.schemaCliente), atualizarCliente)

rotas.post('/produto', validarDadosRequisicao(schemas.schemaProduto), produto.cadastrarProduto);
rotas.get('/produto', produto.listarProdutos)
rotas.delete('/produto/:id', produto.excluirProduto);
rotas.put("/produto/:id", validarDadosRequisicao(schemas.schemaProduto), produto.atualizarProduto);
rotas.get("/produto/:id", produto.detalharProduto)

//rota pra testar autenticador
rotas.get('/autenticar', (req, res) => res.json({ mensagem: "OK", usuario: req.usuario }))





module.exports = rotas
