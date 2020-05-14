'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsuarioSchema extends Schema {
  up () {
    this.create('usuarios', (table) => {      
      table.string('Usuario', 25).notNullable().unique()
      table.string('Nome', 80).notNullable()      
      table.string('Senha', 25).notNullable()
      table.string('EmpresaPadrao', 80)
      table.string('Departamento', 3)
      table.string('Administrador')
      table.string('RefPadrao', 6)
      table.integer('TipoCalculo',11)
      table.integer('Filial', 11)
      table.timestamps()
    })
  }

  down () {
    this.drop('usuarios')
  }
}

module.exports = UsuarioSchema
