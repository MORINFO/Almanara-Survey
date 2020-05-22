'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FiliaisSchema extends Schema {
  up () {
    this.create('filiais', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('filiais')
  }
}

module.exports = FiliaisSchema
