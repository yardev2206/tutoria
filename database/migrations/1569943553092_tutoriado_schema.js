'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TutoriadoSchema extends Schema {
  up () {
    this.create('tutoriados', (table) => {
      table.increments()
      table.string('persona_id').notNullable();
      table.string('alumno_id').notNullable();
      table.string('docente_id').notNullable();
      table.integer('tutor_id').notNullable();
      table.string('periodo_id').notNullable();
      table.text('motivos');
      table.text('recomendaciones');
      table.string('activo').defaultTo(true);
      table.timestamps()
    })
  }

  down () {
    this.drop('tutoriados')
  }
}

module.exports = TutoriadoSchema
