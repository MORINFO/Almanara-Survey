'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DepartamentosSchema extends Schema {
  up () {
    this.create('departamentos', (table) => {
      table.increments()
      tabele.string('Descricao', 40)
      tabele.string('CentroCusto', 10)
     
    })
  }

  down () {
    this.drop('departamentos')
  }
}

module.exports = DepartamentosSchema
