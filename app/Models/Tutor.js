'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tutor extends Model {

    tutoriados() {
        return this.hasMany('App/Models/Tutoriado');
    }

    plan_acciones() {
        return this.hasMany('App/Models/PlanAccion');
    }

}

module.exports = Tutor
