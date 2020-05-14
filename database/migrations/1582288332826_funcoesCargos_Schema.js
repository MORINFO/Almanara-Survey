'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FuncoescargosSchema extends Schema {
  up () {
    this.create('funcoesCargos', (table) => {
      
      table.integer('Codigo',11)
      table.string('Descricao', 100)
      table.string('Enviado', 1).defaultTo('N')
      table.string('Alterado', 1).defaultTo('N')
    })
  }

  down () {
    this.drop('funcoesCargos')
  }
}

module.exports = FuncoescargosSchema
