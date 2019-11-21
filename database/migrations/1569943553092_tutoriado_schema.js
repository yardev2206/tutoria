'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TutoriadoSchema extends Schema {
  up () {
    this.create('tutoriados', (table) => {
      table.increments()
      table.integer('persona_id').notNullable();
      table.integer('alumno_id').notNullable();
      table.integer('tutor_id').notNullable();
      table.integer('periodo_id')
      table.string('observacion');
      table.string('activo').defaultTo(true);
      table.timestamps()
    })
  }

  down () {
    this.drop('tutoriados')
  }
}

module.exports = TutoriadoSchema
