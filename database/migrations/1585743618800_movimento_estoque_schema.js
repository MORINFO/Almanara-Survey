'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MovimentoEstoqueSchema extends Schema {
  up () {
    this.create('movimento_estoques', (table) => {
      table.increments('NumLancto',11)
      table.integer('CodEquipamento',11)
      table.string('Ca')
      table.date('Validade')
      table.string('Observacao')
      table.integer('Qtde')
      table.string('TipoLancto',1)
      table.integer('NumeroRequisicao',11)
      table.string('Usuario', 60)
      table.timestamps()
    })
  }

  down () {
    this.drop('movimento_estoques')
  }
}

module.exports = MovimentoEstoqueSchema
