'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AsistenciaSchema extends Schema {
  up () {
    this.create('asistencias', (table) => {
      table.increments()
      table.integer('actividad_id').notNullable();
      table.integer('tutoriado_id').notNullable();
      table.integer('alumno_id').notNullable();
      table.integer('persona_id').notNullable();
      table.string('observacion')
      table.boolean('asistencia').defaultTo(false);
      table.boolean('activo').defaultTo(true);
      table.timestamps()
    })
  }

  down () {
    this.drop('asistencias')
  }
}

module.exports = AsistenciaSchema
