'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// ROTAS PARA AS VIEWS
Route.on('/').render('principal')
Route.on('/Survey').render('Survey')

// rotas para as API
Route.get('/filial','FilialController.index')


Route.get('/funcionario','FuncionarioController.funcionario')
Route.get('/funcionario/:id','FuncionarioController.funcionarioMatricula')
Route.get('/gerente/:filial','FuncionarioController.gerente')


// ROTA CORINGA PARA MOSTRAR CASO NAO ENCONTRE AS DEMAIS
Route.on('*').render('pag/404')
