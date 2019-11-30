'use strict';

const PlanAccion = use('App/Models/PlanAccion');
const Tutor = use('App/Models/Tutor');
const slugify = require('slugify');

class PlanAccionResolver {

    getPlanAcciones = (root, { page, like, order = 'ASC' }) => {
        let planAcciones = PlanAccion.query()
            .orderBy('fecha_inicio', order);
        // filtrar
        if (like) planAcciones = planAcciones.where('tutor_id', 'like', `%${like}%`)
                .orWhere('periodo_id', 'like', `%${like}%`)
                .orWhere('descripcion', 'like', `%${like}%`)
                .orWhere('fecha_inicio', 'like', `%${like}%`)
                .orWhere('fecha_final', 'like', `%${like}%`);
        // paginar resultado
        planAcciones = planAcciones.paginate(page, 30);
        // devolver planAcciones en formato JSON {}
        return planAcciones.toJSON();
    }


    createPlanAccion = async (root, { tutor_id, input = {} }) => {
        try {
            let { presentacion, justificacion, objetivo, fecha_inicio, fecha_final } = input;
            // generar slug
            let slug = slugify(`${tutor_id} ${fecha_inicio} ${fecha_final}`);
            // obtener tutor
            let tutor = await Tutor.find(tutor_id);
            // validar tutor
            if (!tutor) throw new Error('El Tutor no existe!');
            // guardar plan de acción
            await PlanAccion.create({
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

            return { code: "201", success: true, message: 'El plan de acción se creó correctamente!' }
        } catch (error) {
            console.log(error);
            return { code: "501", success: false, message: error.message }
        }
    }

}

module.exports = new PlanAccionResolver;