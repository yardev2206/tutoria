'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TutorSchema extends Schema {
  up () {
    this.create('tutors', (table) => {
      table.increments()
      table.integer('persona_id').notNullable();
      table.integer('docente_id').notNullable();
      table.integer('carrera_id').notNullable();
      table.integer('facultad_id').notNullable();
      table.integer('periodo_id').notNullable();
      table.string('observacion');
      table.boolean('activo').defaultTo(true);
      table.timestamps();
    })
  }

  down () {
    this.drop('tutors')
  }
}

module.exports = TutorSchema
