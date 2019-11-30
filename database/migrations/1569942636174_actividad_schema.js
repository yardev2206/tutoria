'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ActividadSchema extends Schema {
  up () {
    this.create('actividads', (table) => {
      table.increments()
      table.string('slug', 20).unique();
      table.string('persona_id', 20);
      table.string('docente_id', 20);
      table.integer('tutor_id', 20);
      table.integer('plan_accion_id', 20).notNullable();
      table.string('periodo_id').notNullable();
      table.string('descripcion').notNullable();
      table.string('fecha').notNullable();
      table.time('hora_inicio').notNullable();
      table.time('hora_final').notNullable();
      table.integer('count_asistencias').defaultTo(0);
      table.boolean('reunion').default(false);
      table.boolean('obligatorio').default(false);
      table.boolean('activo').defaultTo(true);
      table.timestamps()
    })
  }

  down () {
    this.drop('actividads')
  }
}

module.exports = ActividadSchema
