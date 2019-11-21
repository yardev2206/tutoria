'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PlanAccion extends Model {

    tutor() {
        return this.belongsTo('App/Models/Tutor');
    }

    actividades() {
        return this.hasMany('App/Models/Actividad');
    }

}

module.exports = PlanAccion
