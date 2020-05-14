'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EpisDepartamentosSchema extends Schema {
  up () {
    this.create('epis_departamentos', (table) => {
      table.integer('idEpi').notNullable()
      table.integer('idDepartamento').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('epis_departamentos')
  }
}

module.exports = EpisDepartamentosSchema
