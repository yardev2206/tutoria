'use strict'

const Asistencia = use('App/Models/Asistencia');
const Tutor = use('App/Models/Tutor');
const PlanAccion = use('App/Models/PlanAccion');
const Tutoriado = use('App/Models/Tutoriado');
const typeAuth = require('../../../services/types/typeAuth');
const typeMatricula = require('../../../services/types/typeMatricula');
const { auth, matricula } = require('../../../services/apis');

class ReportController {

    constancia = async ({ request, response, view })  => {
        try {
            let { params } = request;
            let asistencia = await Asistencia.query()
                .with('plan_accion')
                .with('actividad')
                .where('activo', true)
                .where('id', params.tutoriado_id)
                .firstOrFail();
            // converir a JSON
            asistencia = asistencia.toJSON();
            // obtenemos datos del tutoriado
            await auth({ query: typeAuth.GET_PERSONA, variables: { dni: asistencia.persona_id } })
                .then(resData => resData.json())
                .then(async res => {
                    let { findPersona } = res.data;
                    asistencia.persona = findPersona;
                });
            // obtenemos datos del tutor
            await matricula({ query: typeMatricula.FIND_DOCENTE, variables: { dni: asistencia.plan_accion.docente_id } })
                .then(resData => resData.json())
                .then(async res => {
                    let { findDocente } = res.data;
                    asistencia.docente = findDocente;
                });
            let fecha = new Date(asistencia.actividad.fecha).toDateString();
            // rederizar vista
            return view.render('reports.constancia', { asistencia, fecha })
        } catch (error) {
            return 'No hay registros'
        }
    }


    plan_accion = async ({ request, response, view }) => {
        let { params } = request;
        let plan_accion = await PlanAccion.query()
            .with('actividades')
            .where('id', params.id)
            .firstOrFail();
        // convertir a JSON
        plan_accion = plan_accion.toJSON();
        return view.render('reports.plan_accion', { plan_accion });
    }


    ficha_tutoria = async ({ request, response, view }) => {
        let { params } = request;
        let tutoriado = await Tutoriado.findOrFail(params.id);
        let fecha = new Date().toDateString();
        return tutoriado;
        return view.render('reports.ficha_tutoria', { tutoriado, fecha });
    }

}

module.exports = ReportController
