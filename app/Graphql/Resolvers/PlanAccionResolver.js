'use strict';

const PlanAccion = use('App/Models/PlanAccion');
const Tutor = use('App/Models/Tutor');
const slugify = require('slugify');
const ActividadResolver = require('./ActividadResolver');

class PlanAccionResolver {

    getPlanAcciones = async (root, { page, docente_id,  like, order = 'ASC' }) => {
        let planAcciones = PlanAccion.query()
            .orderBy('fecha_inicio', order);
        // filtrar
        if (like) planAcciones = planAcciones.where('tutor_id', 'like', `%${like}%`)
                .orWhere('periodo_id', 'like', `%${like}%`)
                .orWhere('descripcion', 'like', `%${like}%`)
                .orWhere('fecha_inicio', 'like', `%${like}%`)
                .orWhere('fecha_final', 'like', `%${like}%`);
        // obtener plan accion x tutor_id
        if (docente_id) planAcciones = planAcciones.where('docente_id', docente_id); 
        // paginar resultado
        planAcciones = await planAcciones.paginate(page, 30);
        // devolver planAcciones en formato JSON {}
        return planAcciones.toJSON();
    }


    createPlanAccion = async (root, { tutor_id, input = {} }) => {
        try {
            let { presentacion, justificacion, objetivo, fecha_inicio, fecha_final } = input;
            // obtener tutor
            let tutor = await Tutor.find(tutor_id);
            // validar tutor
            if (!tutor) throw new Error('El Tutor no existe!');
            // generar slug
            let slug = slugify(`${tutor_id} ${tutor.periodo_id}`);
            // guardar plan de acción
            let plan_accion = await PlanAccion.create({
                slug,
                tutor_id,
                docente_id: tutor.docente_id,
                persona_id: tutor.persona_id,
                periodo_id: tutor.periodo_id,
                presentacion,
                justificacion,
                objetivo,
                fecha_inicio,
                fecha_final,
                activo: true
            });
            //configuración antes de crear la actividad
            let payload = {
                descripcion: "Informe Final",
                fecha: plan_accion.fecha_final,
                hora_inicio: "09:00:00",
                hora_final: "18:00:00"
            };
            // obtenemos el id del plan de acción
            let plan_accion_id = plan_accion.id;
            // crear actividad
            ActividadResolver.createActividad(root, { plan_accion_id, input: payload });
            return { code: "201", success: true, message: 'El plan de acción se creó correctamente!' }
        } catch (error) {
            console.log(error);
            return { code: "501", success: false, message: error.message }
        }
    }

}

module.exports = new PlanAccionResolver;