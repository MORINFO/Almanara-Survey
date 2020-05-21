'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PesquisaSchema extends Schema {
  up () {
    this.create('pesquisas', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('pesquisas')
  }
}

module.exports = PesquisaSchema
