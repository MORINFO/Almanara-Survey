'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// ROTAS PARA AS VIEWS
Route.on('/').render('principal')
Route.on('/Survey').render('Survey')
Route.on('/Analise').render('Analise')

// rotas para as API
Route.get('/filial','PesquisaController.index')
Route.get('/funcionario','PesquisaController.funcionario')
Route.get('/funcionario/:id','PesquisaController.funcionarioMatricula')
Route.get('/gerente/:filial','PesquisaController.gerente')
Route.post('/gravaPesquisa','PesquisaController.gravaPesquisa')
Route.get('/Pesquisa/:id','PesquisaController.PesquisaId')
Route.get('/Pesquisa','PesquisaController.Pesquisa')


// ROTA CORINGA PARA MOSTRAR CASO NAO ENCONTRE AS DEMAIS
Route.on('*').render('404')
