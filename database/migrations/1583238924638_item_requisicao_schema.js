'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemRequisicaoSchema extends Schema {
  up () {
    this.create('item_requisicaos', (table) => {
      table.integer('Numero',11)
      table.integer('CodEquipamento',11)
      table.integer('Quantidade',11)
      table.string('DescricaoEquipamento',70)
      table.string('TipoEquipamento',3)
      table.timestamps()
    })
  }

  down () {
    this.drop('item_requisicaos')
  }
}

module.exports = ItemRequisicaoSchema
