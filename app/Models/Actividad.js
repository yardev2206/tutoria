'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Actividad extends Model {

    plan_accion() {
        return this.belongsTo('App/Models/PlanAccion');
    }

    asistencias() {
        return this.hasMany('App/Models/Asistencia');
    }

}

module.exports = Actividad
