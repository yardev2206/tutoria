'use strict';

const PlanAccion = use('App/Models/PlanAccion');

class PlanAccionResolver {

    getPlanAcciones(root, { page, like, order = 'ASC' }) {
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

}

module.exports = new PlanAccionResolver;