'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TutorSchema extends Schema {
  up () {
    this.create('tutors', (table) => {
      table.increments()
      table.string('persona_id').notNullable();
      table.string('docente_id').notNullable();
      table.string('carrera_id').notNullable();
      table.string('facultad_id').notNullable();
      table.string('periodo_id').notNullable();
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
