'use strict'

const Filial = use('App/Models/Filiais')
const Database = use('Database')
class FilialController {

  async index ({ request, response, view }) {

    const data = await Database.select('Codigo', 'Nome').from('filiais')

    return data
  }

}

module.exports = FilialController
