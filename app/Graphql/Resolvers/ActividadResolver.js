'use strict';

const Actividad = use('App/Models/Actividad');
const PlanAccion = use('App/Models/PlanAccion');
const slugify = require('slugify');

class ActividadResolver {

    async getActividades(root, { page, like, order = 'ASC' }) {
        let actividades = Actividad.query()
            .orderBy('periodo_id', order);
        // filtrar
        if (like) actividades.where('periodo_id', 'like', `%${like}%`)
                .orWhere('descripcion', 'like', `%${like}%`)
                .orWhere('fecha_inicio', 'like', `%${like}%`)
                .orWhere('fecha_final', 'like', `%${like}%`);
        //  paginar actividades
        actividades = await actividades.paginate(page, 30);
        // revolver actividades en formato JSON
        return actividades.toJSON();
    }


    async getActividadesPlanAccion(root, { plan_accion_id,  page }) {
        let actividades = Actividad.query()
            .where("plan_accion_id", plan_accion_id);
        //  paginar actividades
        actividades = await actividades.paginate(page, 30);
        // revolver actividades en formato JSON
        return actividades.toJSON();
    }


    findActividad = async (root, { id }) => {
        let actividad = await Actividad.query()
            .with('plan_accion')
            .with('asistencias')
            .where('id', id)
            .first();
        return actividad.toJSON();
    }   


    createActividad = async  (root, { plan_accion_id, input = {} }) => {
        try {
            let plan_accion = await PlanAccion.find(plan_accion_id);
            // validar plan de accion
            if (!plan_accion) throw new Error(`El Plan de Acción no existe!`);
            // crear slug
            let slug = slugify(`${plan_accion.id}${input.fecha}`, { lower: true });
            // prepara actividad antes  de insertar a la db
            await Actividad.create({
                slug,
                persona_id: plan_accion.persona_id,
                docente_id: plan_accion.docente_id,
                tutor_id: plan_accion.tutor_id,
                plan_accion_id: plan_accion.id,
                periodo_id: plan_accion.periodo_id,
                descripcion: input.descripcion,
                fecha: input.fecha,
                hora_inicio: input.hora_inicio,
                hora_final: input.hora_final,
                activo: true,
            });
            // actualizar el contador de las actividades
            plan_accion.count_actividades = plan_accion.count_actividades + 1;
            await plan_accion.save();
            // response
            return { success: true, code: "201", message: "La actividad se creó correctamente!" };
        } catch (error) {
            return { success: false, code: "501", message: error.message };
        }
     }   

}

module.exports = new ActividadResolver;