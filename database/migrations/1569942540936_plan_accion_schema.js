'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlanAccionSchema extends Schema {
  up () {
    this.create('plan_accions', (table) => {
      table.increments()
      table.string('slug').unique();
      table.integer('tutor_id').notNullable();
      table.string('docente_id', 20).notNullable();
      table.string('persona_id', 20).notNullable();
      table.string('periodo_id', 20).notNullable();
      table.text('presentacion').notNullable();
      table.text('justificacion').notNullable();
      table.text('objetivo').notNullable();
      table.string('fecha_inicio').notNullable();
      table.string('fecha_final').notNullable();
      table.integer('count_actividades').defaultTo(0);
      table.boolean('activo').defaultTo(true);
      table.timestamps()
    })
  }

  down () {
    this.drop('plan_accions')
  }
}

module.exports = PlanAccionSchema
