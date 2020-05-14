'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// ROTAS PARA AS VIEWS
Route.on('/').render('principal')

// rotas para as API


Route.post('/epi','EpiController.store')
Route.get('/epi','EpiController.index')
Route.put('/epi/:id','EpiController.update')
Route.get('/epi/:id','EpiController.show')
Route.delete('/epi/:id','EpiController.destroy')

//Route.post('/departamento','DepartamentoController.store')
Route.get('/departamento','DepartamentoController.index')
//Route.put('/departamento/:Codigo','DepartamentoController.update')
Route.get('/departamento/:Codigo','DepartamentoController.show')

Route.post('/setor','SetoresController.store')
Route.get('/setor','SetoresController.index')
Route.put('/setor/:id','SetoresController.update')
Route.get('/setor/:id','SetoresController.show')
Route.delete('/setor/:id','SetoresController.destroy')

Route.get('/funcao','FuncoesCargosController.index')

Route.post('/epidepartamento','EpisDepartamentoController.store')
Route.get('/epidepartamento','EpisDepartamentoController.index')
Route.get('/epidepartamento/:id','EpisDepartamentoController.show')
Route.put('/epidepartamento','EpisDepartamentoController.update')
Route.delete('/epidepartamento/:id','EpisDepartamentoController.destroy')

Route.get('/funcionario','FuncionarioController.index')

// PARTE DO CORPO DA REQUISICAO DO EPI
Route.post('/requisicao','RequisicaoController.store')
Route.get('/requisicao','RequisicaoController.index')
Route.get('/requisicao/:id','RequisicaoController.show')
Route.put('/requisicao/:id','RequisicaoController.update')

// PARTE DOS ITENS DA REQUISICAO DO EPI
Route.post('/itemrequisicao','ItemRequisicaoController.store')
Route.get('/itemrequisicao/:id','ItemRequisicaoController.show')

// ROTA CORINGA PARA MOSTRAR CASO NAO ENCONTRE AS DEMAIS
Route.on('*').render('pag/404')
