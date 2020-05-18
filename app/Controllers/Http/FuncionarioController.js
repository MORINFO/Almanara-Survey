'use strict'
const Funcionario = use('App/Models/Funcionario')
const Database = use('Database')
const Env = use('Env')
const Mail = use('Mail')

class FuncionarioController {

  async funcionario({ request, response, view }) {
    //funcao que carrega a data atual neste formato : AAAAMM
    var now = new Date
    const referencia = now.getFullYear() + (now.getMonth() < 9 ? '0' : '') + (now.getMonth() + 1)

    const data = await Database.select('Codigo', 'Nome', 'Referencia')
      .from('funcionarios001')
      .where('referencia', '=', '202002')

    return data
  }

  async gerente({ request, response, params }) {
    //funcao que carrega a data atual neste formato : AAAAMM
    var now = new Date
    // PEGAR A REFERENTE DO MES ATUAL
    const referencia = now.getFullYear() + (now.getMonth() < 9 ? '0' : '') + (now.getMonth() + 1)

    const data = await Database.select('Codigo', 'Nome', 'Email', 'EmailAlternativo')
      .from('funcionarios001')
      .where('referencia', '=', '202002')
      .andWhere('CodFilial', '=', params.filial)
      .whereIn('CodCargo', [2, 3])

    console.log(params.filial)
    return data[0]
  }

  async funcionarioMatricula({ request, response, params }) {
    //funcao que carrega a data atual neste formato : AAAAMM
    var now = new Date
    const referencia = now.getFullYear() + (now.getMonth() < 9 ? '0' : '') + (now.getMonth() + 1)

    const matricula = await params.id

    const data = await Database
      .select('func.Codigo', 'func.Nome as NomeFuncionario', 'func.Referencia', 'func.CodFilial', 'func.CodCargo', 'fi.Nome as NomeFilial')
      .from('funcionarios001 as func')
      .innerJoin('filiais as fi', 'fi.Codigo', 'func.CodFilial')
      .where('func.referencia', '=', '202002')
      .andWhere('func.Codigo', '=', matricula)

    if (data == 0) {
      return response.status(404).send({ mensagem: 'Funcionario Não Encontrado' })
    }

    return data[0]
  }
  async gravaPesquisa({ request, response, params }) {

    const data = await request.all()
    var now = new Date()
    console.log(now)

    //const pesquisa = await Funcionario.create(data)


    const { CodFilial, Filial, NomeFuncionario, Matricula, Responsavel, Gerente, Temperatura,
      Sintomas, FebreGripe, ContatoParente, HistoricoCovid, enviaEmail } = await request.all()

    const pesquisa = await Database
      .table('pesquisa')
      .insert({
        CodFilial: CodFilial,
        Filial: Filial,
        NomeFuncionario: NomeFuncionario,
        Matricula: Matricula,
        Responsavel: Responsavel,
        Gerente: Gerente,
        Temperatura: Temperatura,
        Sintomas: Sintomas,
        FebreGripe: FebreGripe,
        ContatoParente: ContatoParente,
        HistoricoCovid: HistoricoCovid,
        enviaEmail: enviaEmail,
        Data: now
      })


    //console.log(enviaEmail)
    if (enviaEmail == 'S') {
      try {
        await Mail.send('emails.email', {
          Matricula: Matricula,
          NomeFuncionario: NomeFuncionario,
          Temperatura: Temperatura,
          Responsavel: Responsavel,
          Sintomas: Sintomas,
          FebreGripe: FebreGripe,
          ContatoParente: ContatoParente,
          HistoricoCovid: HistoricoCovid,
          Data:now
        }, (message) => {
          message.from('morinfo@morinfo.com.br')
            .to('alex@morinfo.com.br')
            .cc('nicolas@morinfo.com.br')
            .subject('Notificação de Possível Covid')
        })
      }
      catch{
        return response.send({ mensagem: 'Erro ao enviar o Email ! ' })
      }

    }

  }

}

module.exports = FuncionarioController
