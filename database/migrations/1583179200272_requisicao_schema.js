'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RequisicaoSchema extends Schema {
  up () {
    this.create('requisicao', (table) => {
      table.integer('Numero',11)
      table.integer('CodFuncionario',11)
      table.string('NomeFuncionario', 255)
      table.longtext('Observacao')
      table.string('Usuario', 60)      
      table.timestamps()
    })
  }

  down () {
    this.drop('requisicao')
  }
}

module.exports = RequisicaoSchema
