'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlanAccionSchema extends Schema {
  up () {
    this.create('plan_accions', (table) => {
      table.increments()
      table.integer('tutor_id').notNullable();
      table.integer('periodo_id').notNullable();
      table.string('descripcion').notNullable();
      table.date('fecha_inicio').notNullable();
      table.date('fecha_final').notNullable();
      table.boolean('activo').defaultTo(true);
      table.timestamps()
    })
  }

  down () {
    this.drop('plan_accions')
  }
}

module.exports = PlanAccionSchema
