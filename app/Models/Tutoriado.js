'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tutoriado extends Model {

    tutor() {
        return this.belongsTo('App/Models/Tutor');
    }

    asistencias() {
        return this.hasMany('App/Models/Asistencia');
    }

    plan_tutorials() {
        return this.hasMany('App/Models/PlanTutorial');
    }

}

module.exports = Tutoriado
