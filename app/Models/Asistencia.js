'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Asistencia extends Model {

    actividad() {
        return this.belongsTo('App/Models/Actividad');
    }

    tutoriado() {
        return this.belongsTo('App/Models/Tutoriado');
    }

}

module.exports = Asistencia
