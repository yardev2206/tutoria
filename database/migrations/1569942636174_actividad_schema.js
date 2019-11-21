'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActividadSchema extends Schema {
  up () {
    this.create('actividads', (table) => {
      table.increments()
      table.integer('plan_accion_id').notNullable();
      table.integer('periodo_id').notNullable();
      table.string('descripcion').notNullable();
      table.date('fecha_inicio').notNullable();
      table.date('fecha_final').notNullable();
      table.boolean('activo').defaultTo(true);
      table.timestamps()
    })
  }

  down () {
    this.drop('actividads')
  }
}

module.exports = ActividadSchema
