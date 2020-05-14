'use strict'

const Funcionario = use('App/Models/Funcionario')
const Database = use('Database')
class FuncionarioController {

  async funcionario ({ request, response, view }) {
    //funcao que carrega a data atual neste formato : AAAAMM
    var now = new Date
    const referencia = now.getFullYear() + (now.getMonth() < 9 ? '0': '') + (now.getMonth()+1)

    const data = await Database.select('Codigo', 'Nome', 'Referencia')
    .from('funcionarios001')
    .where('referencia', '=', '202002')


    return data
  }

  async gerente ({ request, response, view }) {
    //funcao que carrega a data atual neste formato : AAAAMM
    var now = new Date
    // PEGAR A REFERENTE DO MES ATUAL
    const referencia = now.getFullYear() + (now.getMonth() < 9 ? '0': '') + (now.getMonth()+1)

    const data = await Database.select('Codigo', 'Nome', 'Referencia')
    .from('funcionarios001')
    .where('referencia', '=', '202002')
    .whereIn('CodCargo',[2,3])

    return data
  }

}

module.exports = FuncionarioController
