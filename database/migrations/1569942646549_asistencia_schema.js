'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AsistenciaSchema extends Schema {
  up () {
    this.create('asistencias', (table) => {
      table.increments()
      table.integer('actividad_id').notNullable();
      table.integer('plan_accion_id').notNullable();
      table.integer('tutoriado_id').notNullable();
      table.string('alumno_id').notNullable();
      table.string('persona_id').notNullable();
      table.boolean('activo').defaultTo(false);
      table.timestamps()
    })
  }

  down () {
    this.drop('asistencias')
  }
}

module.exports = AsistenciaSchema
