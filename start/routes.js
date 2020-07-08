'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// ROTAS PARA AS VIEWS
Route.on('/').render('login')
Route.on('/principal').render('principal')
Route.on('/Survey').render('Survey')
Route.on('/Analise').render('Analise')
Route.on('/Relatorio').render('Relatorio')

// rotas para as API
Route.post('/login','LoginController.login')

Route.get('/filiais','PesquisaController.index')
Route.get('/funcionario','PesquisaController.funcionario')
Route.get('/funcionario/:id','PesquisaController.funcionarioMatricula')
Route.get('/gerente/:filial','PesquisaController.gerente')
Route.post('/gravaPesquisa','PesquisaController.gravaPesquisa')
Route.get('/Pesquisa/:id','PesquisaController.PesquisaId')
Route.get('/Pesquisa','PesquisaController.Pesquisa')
Route.get('/PesquisaData/:data','PesquisaController.PesquisaData')
Route.post('/api/relatorio','RelatorioController.relatorio')


// ROTA CORINGA PARA MOSTRAR CASO NAO ENCONTRE AS DEMAIS
Route.on('*').render('404')
