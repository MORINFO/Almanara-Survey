'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FuncionarioSchema extends Schema {
  up () {
    this.create('pesquisa', (table) => {

      table.timestamps()
    })
  }

  down () {
    this.drop('pesquisa')
  }
}

module.exports = FuncionarioSchema