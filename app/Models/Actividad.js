'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Actividad extends Model {

    plan_accion() {
        return this.belongsTo('Appl/Models/PlanAccion');
    }

    actividades() {
        return this.hasMany('App/Models/Actividad');
    }

}

module.exports = Actividad
