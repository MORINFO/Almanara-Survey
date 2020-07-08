'use strict'

const Pesquisa = use('App/Models/Pesquisa')
const Database = use('Database')
const Mail = use('Mail')

class PesquisaController {

  async funcionario({ request, response, view }) {
    //funcao que carrega a data atual neste formato : AAAAMM
    var now = new Date
    const referencia = now.getFullYear() + (now.getMonth() < 9 ? '0' : '') + (now.getMonth() + 1)

    const data = await Database.select('Codigo', 'Nome', 'Referencia')
      .from('funcionarios001')
      .where('referencia', '=', '202005')

    const filiais = await Database.select('Codigo', 'Nome')
      .from('filiais')

    return [data, filiais]
  }
  async index({ request, response }) {
    const filiais = await Database.select('Codigo', 'Nome')
      .from('filiais')

    return filiais

  }

  async gerente({ request, response, params }) {
    //funcao que carrega a data atual neste formato : AAAAMM
    var now = new Date
    // PEGAR A REFERENTE DO MES ATUAL
    const referencia = now.getFullYear() + (now.getMonth() < 9 ? '0' : '') + (now.getMonth() + 1)

    var cargo = 3

    if (params.filial == 11) {
      //CAMPINAS
      cargo = 621
    }
    if (params.filial == 16) {
      //ALPHAVILLE
      cargo = 821
    }
    if (params.filial == 18) {
      // JANDIRA
      cargo = 701
    }

    const data = await Database.select('Codigo', 'Nome', 'Email', 'EmailAlternativo', 'CodFilial', 'Turnante')
      .from('funcionarios001')
      .where('CodFilial', '=', params.filial)
      .andWhere('referencia', '=', '202005')
      .andWhere('CodCargo', '=', cargo)
      .orWhere('Turnante', '=', 'S')
      .orderBy('Nome')

    return data
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
      .where('func.referencia', '=', '202005')
      .andWhere('func.Codigo', '=', matricula)

    if (data == 0) {
      return response.status(404).send({ mensagem: 'Funcionario Não Encontrado' })
    }

    return data[0]
  }

  async gravaPesquisa({ request, response, params }) {

    const data = await request.all()

    var now = new Date()

    const { CodFilial, Filial, NomeFuncionario, Matricula, Responsavel, Gerentes, Temperatura,
      Sintomas, FebreGripe, ContatoParente, HistoricoCovid, enviaEmail, DiaDiagnosticado } = await request.all()

    const pesquisa = await Database
      .table('pesquisas')
      .insert({
        CodFilial: CodFilial,
        Filial: Filial,
        NomeFuncionario: NomeFuncionario,
        Matricula: Matricula,
        Responsavel: Responsavel,
        Temperatura: Temperatura,
        Sintomas: Sintomas,
        FebreGripe: FebreGripe,
        ContatoParente: ContatoParente,
        HistoricoCovid: HistoricoCovid,
        enviaEmail: enviaEmail,
        DiaDiagnosticado: DiaDiagnosticado,
        Data: now
      })

    if (enviaEmail == 'S') {
      try {
        await Mail.send('emails.emailrh', {
          Matricula: Matricula,
          NomeFuncionario: NomeFuncionario,
          Temperatura: Temperatura,
          Responsavel: Responsavel,
          Sintomas: Sintomas,
          FebreGripe: FebreGripe,
          ContatoParente: ContatoParente,
          HistoricoCovid: HistoricoCovid,
          Data: now.toLocaleString()
        }, (message) => {
          message.from('morinfo@morinfo.com.br')
            .to('rh@almanara.com.br')
            .cc(['rh1@almanara.com.br', 'rh2@almanara.com.br', 'rh6@almanara.com.br', 'rh4@almanara.com.br'])
            .bcc('nicolas@morinfo.com.br')
            .subject('Notificação de Possível Covid - ' + Filial)
        })
      }
      catch{
        return response.status(500).send({ mensagem: 'Erro ao enviar o Email ! ' })
      }
      for (var i = 0; i < Gerentes.length; i++) {

        if (!Gerentes[i] == '') {
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
              Data: now.toLocaleString()
            }, (message) => {
              message.from('morinfo@morinfo.com.br')
                .to(Gerentes[i])
                .subject('Notificação de Possível Covid - ' + Filial)
            })
          }
          catch{
            return response.status(500).send({ mensagem: 'Erro ao enviar o Email ! ' })
          }
        }
      }
    }
  }

  async Pesquisa({ request, response, params }) {

    const data = await Database.select('Filial', 'Data')
      .from('pesquisas')
      .where('EnviaEmail', 'S')
      .count({ Total: 'CodFilial' })
      .groupBy('CodFilial')

    const teste = await Database.select('Data')
      .from('pesquisas')
      .where('EnviaEmail', 'S')
      .groupBy('CodFilial')

    return [data, teste]

  }

  async PesquisaData({ request, response, params }) {

    const data = await Database
      .raw(`select Filial, DATE_FORMAT(Data, "%m%Y") as Data, count(CodFilial) as Total  from pesquisas where EnviaEmail = "S" and DATE_FORMAT(Data, "%m%Y")='${params.data}'  GROUP BY CodFilial`)

    return data[0]
  }
  async PesquisaId({ request, response, params }) {
    try {

      const data = await Pesquisa.findByOrFail('id', params.id)

      return data

    } catch{
      return response.send({ mensagem: 'Pesquisa não Localizada !' })
    }

  }

}

module.exports = PesquisaController
