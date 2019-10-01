'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Alumno extends Model {

    static get primaryKey() {
        return 'COD_ALUMNO';
    }

    static get table() {
        return 'ADA_ALUMNOS'
    }

}

module.exports = Alumno
