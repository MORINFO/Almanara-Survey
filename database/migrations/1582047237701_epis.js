'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CadastroEpiSchema extends Schema {
  up () {
    this.create('epis', (table) => {
      table.increments()
      table.string('DescricaoInterno')
      table.string('DescricaoMinTrabalho')
      table.string('Tipo')
      table.string('Agentes')
      table.string('Riscos')
      table.string('Setor')
      table.timestamps()
    })
  }

  down () {
    this.drop('epis')
  }
}

module.exports = CadastroEpiSchema
